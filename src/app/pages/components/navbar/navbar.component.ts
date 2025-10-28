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
    {path: '/#about', label: 'app.menu.about'},
    {path: '/#experience', label: 'app.menu.experiences'},
    {path: '/#skills', label: 'app.menu.skills'},
    {path: '/#education', label: 'app.menu.education'},
    // {path: '/blog', label: 'BLOGS'},
    {path: '/#projects', label: 'app.menu.projects'}
  ];

  faGlobe = faGlobe;
  isScrolled: boolean = false;
  private readonly SCROLL_THRESHOLD = 1;

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
