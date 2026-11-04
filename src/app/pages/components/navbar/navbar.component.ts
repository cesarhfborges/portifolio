import {Component, HostListener, inject} from '@angular/core';
import {Language, TranslationService} from '../../../shared/services/translation.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {

  isMenuOpen: boolean = false;
  isMobile: boolean = false;

  public _translationService = inject(TranslationService);

  /** Mesma ordem das seções na página — a numeração bate com os títulos ("02. Experiências"). */
  navItems = [
    {id: 'about', path: '/#about', label: 'app.menu.about'},
    {id: 'experience', path: '/#experience', label: 'app.menu.experiences'},
    {id: 'education', path: '/#education', label: 'app.menu.education'},
    {id: 'skills', path: '/#skills', label: 'app.menu.skills'},
    // {id: 'blog', path: '/blog', label: 'BLOGS'},
    {id: 'projects', path: '/#projects', label: 'app.menu.projects'}
  ];

  isScrolled: boolean = false;
  /** 0 → 1, para a barra de progresso de leitura. */
  scrollProgress: number = 0;
  activeSection: string | null = null;
  private readonly SCROLL_THRESHOLD = 16;
  /** Altura do header + folga: a seção conta como ativa quando o topo dela passa daqui. */
  private readonly SPY_OFFSET = 120;

  indexLabel(i: number): string {
    return String(i + 1).padStart(2, '0') + '.';
  }

  isCurrentLang(value: Language): boolean {
    return this._translationService.currentLang === value;
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    if (this.isMenuOpen) this.toggleMenu();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
    this.isScrolled = scrollPosition > this.SCROLL_THRESHOLD;

    const max = document.documentElement.scrollHeight - window.innerHeight;
    this.scrollProgress = max > 0 ? Math.min(1, Math.max(0, scrollPosition / max)) : 0;

    this.updateActiveSection();
  }

  private updateActiveSection(): void {
    // Escolhe a seção cujo topo passou mais recentemente da linha do header.
    let current: string | null = null;
    let closestTop = -Infinity;
    for (const item of this.navItems) {
      const el = document.getElementById(item.id);
      if (!el) continue;
      const top = el.getBoundingClientRect().top;
      if (top <= this.SPY_OFFSET && top > closestTop) {
        closestTop = top;
        current = item.id;
      }
    }
    this.activeSection = current;
  }

  setLang(value: Language) {
    this._translationService.currentLang = value;
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
  }

  private checkScreenSize(): void {
    this.isMobile = window.innerWidth < 768;
    if (!this.isMobile && this.isMenuOpen) {
      this.toggleMenu();
    }
  }
}
