import {Component, inject} from '@angular/core';
import {
  faArrowUp, faBell, faCircleXmark, faCodeBranch, faTerminal, faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import {WorkspaceService} from '../../services/workspace.service';
import {TranslationService} from '../../services/translation.service';

/** Barra de status fixa na base da tela, no estilo de uma IDE. */
@Component({
  selector: 'app-status-bar',
  standalone: false,
  templateUrl: './status-bar.component.html',
  styleUrl: './status-bar.component.css',
})
export class StatusBarComponent {
  readonly workspace = inject(WorkspaceService);
  readonly translation = inject(TranslationService);

  readonly faCodeBranch = faCodeBranch;
  readonly faCircleXmark = faCircleXmark;
  readonly faTriangleExclamation = faTriangleExclamation;
  readonly faArrowUp = faArrowUp;
  readonly faBell = faBell;
  readonly faTerminal = faTerminal;

  /** Alterna para o próximo idioma da lista. */
  toggleLang(): void {
    const langs = this.translation.langs;
    const i = langs.findIndex(l => l.value === this.translation.currentLang);
    this.translation.currentLang = langs[(i + 1) % langs.length].value;
  }

  scrollTop(): void {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }
}
