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

  constructor() {
    if (typeof window === 'undefined') return;
    window.addEventListener('scroll', this.listener, {passive: true});
    window.addEventListener('resize', this.listener, {passive: true});
    queueMicrotask(() => this.update());
  }

  ngOnDestroy(): void {
    if (typeof window === 'undefined') return;
    window.removeEventListener('scroll', this.listener);
    window.removeEventListener('resize', this.listener);
  }

  openPalette(): void {
    this.paletteOpen.set(true);
  }

  closePalette(): void {
    this.paletteOpen.set(false);
  }

  /** Rola até a seção (ou o topo, para o hero) e atualiza a URL como um link âncora faria. */
  goTo(id: string): void {
    const el = id === 'hero' ? null : document.getElementById(id);
    const top = el ? el.getBoundingClientRect().top + window.scrollY - (WorkspaceService.SPY_OFFSET - 40) : 0;
    window.scrollTo({top, behavior: 'smooth'});
    history.replaceState(null, '', id === 'hero' ? location.pathname : `#${id}`);
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
