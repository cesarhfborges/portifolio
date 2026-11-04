import {Component, effect, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {faCircleInfo, faXmark} from '@fortawesome/free-solid-svg-icons';
import {WorkspaceService} from '../../services/workspace.service';

const STORAGE_KEY = 'portfolio.tip.palette.dismissed';
const SHOW_AFTER_MS = 4000;

/** Notificação no canto da tela, no estilo de uma IDE, apresentando a paleta de comandos. */
@Component({
  selector: 'app-tip-toast',
  standalone: false,
  templateUrl: './tip-toast.component.html',
  styleUrl: './tip-toast.component.css',
})
export class TipToastComponent implements OnInit, OnDestroy {
  private readonly workspace = inject(WorkspaceService);

  readonly faCircleInfo = faCircleInfo;
  readonly faXmark = faXmark;
  readonly visible = signal(false);
  /** Sem teclado físico (celular/tablet) a dica aponta para o botão da barra de status. */
  readonly touch = typeof window !== 'undefined' && !!window.matchMedia?.('(hover: none)').matches;

  private timer?: ReturnType<typeof setTimeout>;

  constructor() {
    // a dica perde o sentido quando a paleta é aberta (por ela ou pelo atalho)
    effect(() => {
      if (this.workspace.paletteOpen()) this.visible.set(false);
    });
  }

  ngOnInit(): void {
    if (this.wasDismissed()) return;
    this.timer = setTimeout(() => {
      if (!this.workspace.paletteOpen()) this.visible.set(true);
    }, SHOW_AFTER_MS);
  }

  ngOnDestroy(): void {
    clearTimeout(this.timer);
  }

  tryIt(): void {
    this.visible.set(false);
    this.workspace.openPalette();
  }

  close(): void {
    this.visible.set(false);
  }

  dismissForever(): void {
    this.visible.set(false);
    try {
      localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      // armazenamento bloqueado (aba anônima etc.): apenas fecha
    }
  }

  private wasDismissed(): boolean {
    try {
      return localStorage.getItem(STORAGE_KEY) === '1';
    } catch {
      return false;
    }
  }
}
