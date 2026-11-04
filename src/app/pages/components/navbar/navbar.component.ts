import {AfterViewInit, Component, effect, ElementRef, HostListener, inject, ViewChild} from '@angular/core';
import {Language, TranslationService} from '../../../shared/services/translation.service';
import {WorkspaceService} from '../../../shared/services/workspace.service';
import {WorkspaceFile} from '../../../shared/data/workspace.data';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements AfterViewInit {

  isMenuOpen: boolean = false;
  isMobile: boolean = false;

  public _translationService = inject(TranslationService);
  private readonly workspace = inject(WorkspaceService);

  @ViewChild('tabs') private tabsRef?: ElementRef<HTMLElement>;

  /** Há abas fora da área visível (liga o esmaecimento na borda direita). */
  tabsOverflow = false;

  constructor() {
    // ao trocar de seção, rola a faixa de abas até a aba ativa (só a faixa, nunca a página)
    effect(() => {
      const id = this.workspace.activeId();
      queueMicrotask(() => this.revealTab(id));
    });
  }

  ngAfterViewInit(): void {
    queueMicrotask(() => this.measureTabs());
  }

  /** Cada seção é um "arquivo" — vira uma aba. Mesma ordem das seções na página. */
  readonly files: WorkspaceFile[] = this.workspace.files;

  /** Mantido para compatibilidade: ids das seções na ordem do menu. */
  get navItems(): { id: string }[] {
    return this.files;
  }

  get activeSection(): string {
    return this.workspace.activeId();
  }

  get activeFile(): WorkspaceFile {
    return this.workspace.activeFile();
  }

  get isScrolled(): boolean {
    return this.workspace.scrolled();
  }

  indexLabel(i: number): string {
    return String(i + 1).padStart(2, '0') + '.';
  }

  isCurrentLang(value: Language): boolean {
    return this._translationService.currentLang === value;
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
    this.measureTabs();
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    if (this.isMenuOpen) this.toggleMenu();
  }

  /** O WorkspaceService já escuta o scroll; este método força uma atualização (usado nos testes). */
  onWindowScroll() {
    this.workspace.update();
  }

  setLang(value: Language) {
    this._translationService.currentLang = value;
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
  }

  onTabsScroll(): void {
    this.measureTabs();
  }

  private measureTabs(): void {
    const el = this.tabsRef?.nativeElement;
    if (!el) return;
    const overflow = el.scrollWidth > el.clientWidth + 1;
    // só liga o esmaecimento se ainda houver abas escondidas à direita
    this.tabsOverflow = overflow && el.scrollLeft + el.clientWidth < el.scrollWidth - 1;
  }

  private revealTab(id: string): void {
    const container = this.tabsRef?.nativeElement;
    const tab = container?.querySelector<HTMLElement>(`a[href="/#${id}"]`);
    if (!container || !tab) {
      container?.scrollTo({left: 0});
    } else {
      const left = tab.offsetLeft - container.offsetLeft;
      const right = left + tab.offsetWidth;
      if (left < container.scrollLeft) {
        container.scrollTo({left: left - 16});
      } else if (right > container.scrollLeft + container.clientWidth) {
        container.scrollTo({left: right - container.clientWidth + 32});
      }
    }
    setTimeout(() => this.measureTabs(), 350);
  }

  private checkScreenSize(): void {
    this.isMobile = window.innerWidth < 768;
    if (!this.isMobile && this.isMenuOpen) {
      this.toggleMenu();
    }
  }
}
