import {Component, HostListener, inject} from '@angular/core';
import {Language, TranslationService} from '../../../shared/services/translation.service';
import {faBars, faGlobe, faTimes} from '@fortawesome/free-solid-svg-icons';
import animations from '../../../shared/animations/animations';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  animations: animations
})
export class NavbarComponent {

  faBars = faBars;
  faTimes = faTimes;

  public isDropdownOpen: boolean = false;
  isMenuOpen: boolean = false;
  isMobile: boolean = false;

  public _translationService = inject(TranslationService);

  navItems = [
    {id: 'about', path: '/#about', label: 'app.menu.about'},
    {id: 'experience', path: '/#experience', label: 'app.menu.experiences'},
    {id: 'skills', path: '/#skills', label: 'app.menu.skills'},
    {id: 'education', path: '/#education', label: 'app.menu.education'},
    // {id: 'blog', path: '/blog', label: 'BLOGS'},
    {id: 'projects', path: '/#projects', label: 'app.menu.projects'}
  ];

  faGlobe = faGlobe;
  isScrolled: boolean = false;
  activeSection: string | null = null;
  private readonly SCROLL_THRESHOLD = 16;
  /** Altura do header + folga: a seção conta como ativa quando o topo dela passa daqui. */
  private readonly SPY_OFFSET = 120;

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize();
  }

  @HostListener('document:click', ['$event'])
  onClick(event: Event) {
    const targetElement = event.target as HTMLElement;
    const dropdownToggle = document.getElementById('dropdownToggle');

    if (this.isDropdownOpen && dropdownToggle && !dropdownToggle.contains(targetElement)) {
      const dropdownMenu = document.getElementById('dropdownMenu');
      if (!dropdownMenu?.contains(targetElement)) {
        this.isDropdownOpen = false;
      }
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
    this.isScrolled = scrollPosition > this.SCROLL_THRESHOLD;
    this.updateActiveSection();
  }

  private updateActiveSection(): void {
    // Escolhe a seção cujo topo passou mais recentemente da linha do header.
    // Não depende da ordem do menu (na página, Educação vem antes de Habilidades).
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
    this.isDropdownOpen = false;
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    this.isDropdownOpen = false;
    if (this.isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  private checkScreenSize(): void {
    this.isMobile = window.innerWidth < 768;
    if (!this.isMobile) {
      this.isMenuOpen = false;
    }
  }
}
