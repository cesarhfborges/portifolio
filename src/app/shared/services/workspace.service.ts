import {computed, Injectable, NgZone, OnDestroy, inject, signal} from '@angular/core';
import {HERO_FILE, WORKSPACE_FILES, WorkspaceFile} from '../data/workspace.data';

/** Altura aproximada de uma "linha" para o indicador "Ln X" da barra de status. */
const LINE_HEIGHT_PX = 24;

/**
 * Estado da "IDE" compartilhado entre header (abas/breadcrumb) e barra de status:
 * qual arquivo (seção) está ativo e em que "linha" da página o usuário está.
 */
@Injectable({providedIn: 'root'})
export class WorkspaceService implements OnDestroy {
  /** A seção conta como ativa quando o topo dela passa desta linha (altura do header + folga). */
  static readonly SPY_OFFSET = 130;
  /** Distância entre a base do header e o título da seção ao navegar por âncora. */
  static readonly ANCHOR_GAP = 24;

  readonly files = WORKSPACE_FILES;
  readonly activeId = signal<string>(HERO_FILE.id);
  readonly line = signal(1);
  readonly scrolled = signal(false);
  /** Paleta de comandos aberta (atalho Ctrl+K / Ctrl+Shift+P ou botão na barra de status). */
  readonly paletteOpen = signal(false);

  readonly activeFile = computed<WorkspaceFile>(
    () => this.files.find(f => f.id === this.activeId()) ?? HERO_FILE
  );

  private readonly zone = inject(NgZone);
  private readonly listener = () => this.zone.run(() => this.update());
  private readonly clickListener = (e: MouseEvent) => this.onDocumentClick(e);
  /** Hash trocado sem recarregar (digitado na barra de endereço, link externo à página). */
  private readonly hashListener = () => {
    const id = location.hash.slice(1);
    if (this.files.some(f => f.id === id)) this.goTo(id, 'instant');
  };

  constructor() {
    if (typeof window === 'undefined') return;
    window.addEventListener('scroll', this.listener, {passive: true});
    window.addEventListener('resize', this.listener, {passive: true});
    document.addEventListener('click', this.clickListener);
    window.addEventListener('hashchange', this.hashListener);
    queueMicrotask(() => this.update());
    this.scrollToInitialHash();
  }

  ngOnDestroy(): void {
    if (typeof window === 'undefined') return;
    window.removeEventListener('scroll', this.listener);
    window.removeEventListener('resize', this.listener);
    document.removeEventListener('click', this.clickListener);
    window.removeEventListener('hashchange', this.hashListener);
  }

  openPalette(): void {
    this.paletteOpen.set(true);
  }

  closePalette(): void {
    this.paletteOpen.set(false);
  }

  /**
   * Rola até a seção (ou o topo, para o hero) e atualiza a URL como um link âncora faria.
   * O alvo é o título da seção (app-section-title), não o topo dela: cada seção tem um
   * espaçamento interno diferente antes do título, então alinhar pelo topo deixava uns
   * títulos cortados pelo header e outros com sobra de espaço.
   */
  goTo(id: string, behavior: ScrollBehavior = 'smooth'): void {
    const section = id === 'hero' ? null : document.getElementById(id);
    let top = 0;
    if (section) {
      const target = section.querySelector<HTMLElement>('app-section-title') ?? section;
      const header = document.querySelector<HTMLElement>('header.nav-bar');
      const headerHeight = header?.getBoundingClientRect().height ?? 0;
      top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - headerHeight - WorkspaceService.ANCHOR_GAP);
    }
    window.scrollTo({top, behavior});
    history.replaceState(null, '', id === 'hero' ? location.pathname : `#${id}`);
  }

  /** Links "#secao" / "/#secao" de qualquer lugar da página passam pelo goTo (posição consistente). */
  private onDocumentClick(event: MouseEvent): void {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = (event.target as Element | null)?.closest?.('a[href]');
    const href = link?.getAttribute('href') ?? '';
    const match = /^\/?#([\w-]+)$/.exec(href);
    if (!match || !this.files.some(f => f.id === match[1])) return;
    event.preventDefault();
    this.goTo(match[1]);
  }

  /** Abriu a página já com "#secao" na URL: reposiciona depois que o layout assentou. */
  private scrollToInitialHash(): void {
    const id = location.hash.slice(1);
    if (!id || !this.files.some(f => f.id === id)) return;
    const run = () => setTimeout(() => this.goTo(id, 'instant'), 300);
    if (document.readyState === 'complete') run();
    else window.addEventListener('load', run, {once: true});
  }

  update(): void {
    const y = window.scrollY || document.documentElement.scrollTop || 0;
    this.scrolled.set(y > 16);
    this.line.set(Math.floor(y / LINE_HEIGHT_PX) + 1);

    // seção cujo topo passou mais recentemente da linha do header (não depende da ordem)
    let current = HERO_FILE.id;
    let closestTop = -Infinity;
    for (const file of this.files) {
      const el = document.getElementById(file.id);
      if (!el) continue;
      const top = el.getBoundingClientRect().top;
      if (top <= WorkspaceService.SPY_OFFSET && top > closestTop) {
        closestTop = top;
        current = file.id;
      }
    }
    this.activeId.set(current);
  }
}
