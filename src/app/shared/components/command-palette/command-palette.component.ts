import {Component, effect, ElementRef, HostListener, inject, signal, ViewChild} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {IconDefinition} from '@fortawesome/free-solid-svg-icons';
import {faArrowUp, faCopy, faEnvelope, faFileLines, faLanguage} from '@fortawesome/free-solid-svg-icons';
import {faGithub, faLinkedin} from '@fortawesome/free-brands-svg-icons';
import {WorkspaceService} from '../../services/workspace.service';
import {TranslationService} from '../../services/translation.service';
import {personalData} from '../../data/personal.data';

export interface PaletteCommand {
  id: string;
  /** texto já traduzido mostrado na lista (também é o que a busca usa) */
  title: string;
  category: string;
  icon?: IconDefinition;
  /** "ícone" de tipo de arquivo, para os comandos de navegação */
  badge?: { text: string; color: string };
  run: () => void;
}

/**
 * Filtro "fuzzy": as letras da busca precisam aparecer em ordem (não necessariamente juntas).
 * Retorna a pontuação (maior = melhor) ou -1 se não casar.
 */
export function fuzzyScore(query: string, text: string): number {
  const q = normalize(query);
  if (!q) return 0;
  const t = normalize(text);
  const direct = t.indexOf(q);
  if (direct >= 0) return 1000 - direct; // trecho contínuo vence
  let score = 0;
  let pos = -1;
  for (const ch of q) {
    const next = t.indexOf(ch, pos + 1);
    if (next < 0) return -1;
    score += next === pos + 1 ? 5 : 1; // letras seguidas valem mais
    pos = next;
  }
  return score;
}

function normalize(s: string): string {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
}

@Component({
  selector: 'app-command-palette',
  standalone: false,
  templateUrl: './command-palette.component.html',
  styleUrl: './command-palette.component.css',
})
export class CommandPaletteComponent {
  readonly workspace = inject(WorkspaceService);
  private readonly translation = inject(TranslationService);
  private readonly translate = inject(TranslateService);

  @ViewChild('input') private inputRef?: ElementRef<HTMLInputElement>;
  @ViewChild('list') private listRef?: ElementRef<HTMLElement>;

  readonly query = signal('');
  readonly activeIndex = signal(0);
  readonly feedback = signal<string | null>(null);

  private previousFocus: HTMLElement | null = null;

  constructor() {
    effect(() => {
      if (this.workspace.paletteOpen()) {
        this.previousFocus = document.activeElement as HTMLElement | null;
        this.query.set('');
        this.activeIndex.set(0);
        setTimeout(() => this.inputRef?.nativeElement.focus());
      }
    });
  }

  /** Lista filtrada e ordenada pela busca. */
  get results(): PaletteCommand[] {
    const q = this.query();
    const all = this.commands();
    if (!q.trim()) return all;
    return all
      .map(c => ({c, s: Math.max(fuzzyScore(q, c.title), fuzzyScore(q, c.category) - 500)}))
      .filter(x => x.s >= 0)
      .sort((a, b) => b.s - a.s)
      .map(x => x.c);
  }

  @HostListener('document:keydown', ['$event'])
  onGlobalKey(event: KeyboardEvent): void {
    const key = event.key.toLowerCase();
    const mod = event.ctrlKey || event.metaKey;
    if (mod && (key === 'k' || (event.shiftKey && key === 'p'))) {
      event.preventDefault();
      if (this.workspace.paletteOpen()) {
        this.close();
      } else {
        this.workspace.openPalette();
      }
    }
  }

  onInput(value: string): void {
    this.query.set(value);
    this.activeIndex.set(0);
  }

  onKeydown(event: KeyboardEvent): void {
    const count = this.results.length;
    if (event.key === 'ArrowDown' && count) {
      event.preventDefault();
      this.activeIndex.set((this.activeIndex() + 1) % count);
      this.scrollActiveIntoView();
    } else if (event.key === 'ArrowUp' && count) {
      event.preventDefault();
      this.activeIndex.set((this.activeIndex() - 1 + count) % count);
      this.scrollActiveIntoView();
    } else if (event.key === 'Enter') {
      event.preventDefault();
      const cmd = this.results[this.activeIndex()];
      if (cmd) this.execute(cmd);
    } else if (event.key === 'Escape') {
      event.preventDefault();
      this.close();
    } else if (event.key === 'Tab') {
      event.preventDefault(); // mantém o foco dentro da paleta
    }
  }

  execute(cmd: PaletteCommand): void {
    this.close();
    cmd.run();
  }

  close(): void {
    this.workspace.closePalette();
    this.previousFocus?.focus?.();
  }

  private scrollActiveIntoView(): void {
    setTimeout(() => {
      this.listRef?.nativeElement
        .querySelector<HTMLElement>('[aria-selected="true"]')
        ?.scrollIntoView({block: 'nearest'});
    });
  }

  private t(key: string): string {
    return this.translate.instant(key);
  }

  private commands(): PaletteCommand[] {
    const nav = this.t('app.palette.cat_nav');
    const pref = this.t('app.palette.cat_pref');
    const contact = this.t('app.palette.cat_contact');
    const goTo = this.t('app.palette.go_to');

    const files: PaletteCommand[] = this.workspace.files.map(f => ({
      id: 'go-' + f.id,
      title: `${goTo}: ${this.t(f.label)} — ${this.t(f.file)}`,
      category: nav,
      badge: {text: f.badge, color: f.color},
      run: () => this.workspace.goTo(f.id),
    }));

    const langs: PaletteCommand[] = this.translation.langs
      .filter(l => l.value !== this.translation.currentLang)
      .map(l => ({
        id: 'lang-' + l.code,
        title: `${this.t('app.palette.lang')}: ${l.label}`,
        category: pref,
        icon: faLanguage,
        run: () => (this.translation.currentLang = l.value),
      }));

    const openUrl = (url: string) => () => window.open(url, '_blank', 'noopener');
    const {email, resume, github, linkedIn} = personalData;

    return [
      ...files,
      {id: 'top', title: this.t('app.palette.top'), category: nav, icon: faArrowUp, run: () => this.goTop()},
      ...langs,
      {
        id: 'copy-email', title: `${this.t('app.palette.copy_email')} (${email})`,
        category: contact, icon: faCopy, run: () => this.copyEmail(),
      },
      {
        id: 'mail', title: this.t('app.palette.send_email'),
        category: contact, icon: faEnvelope, run: () => (window.location.href = `mailto:${email}`),
      },
      {id: 'resume', title: this.t('app.palette.resume'), category: contact, icon: faFileLines, run: openUrl(resume)},
      {id: 'github', title: this.t('app.palette.github'), category: contact, icon: faGithub, run: openUrl(github)},
      {
        id: 'linkedin', title: this.t('app.palette.linkedin'),
        category: contact, icon: faLinkedin, run: openUrl(linkedIn),
      },
    ];
  }

  private goTop(): void {
    this.workspace.goTo('hero');
  }

  private async copyEmail(): Promise<void> {
    try {
      await navigator.clipboard.writeText(personalData.email);
      this.feedback.set(this.t('app.palette.copied'));
      setTimeout(() => this.feedback.set(null), 2000);
    } catch {
      window.location.href = `mailto:${personalData.email}`;
    }
  }
}
