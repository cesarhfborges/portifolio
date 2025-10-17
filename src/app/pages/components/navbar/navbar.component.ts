import {Component, HostListener, inject} from '@angular/core';
import {Language, TranslationService} from '../../../shared/services/translation.service';
import {faGithub} from '@fortawesome/free-brands-svg-icons';
import {faGlobe} from '@fortawesome/free-solid-svg-icons';
import animations from '../../../shared/animations/animations';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  animations: animations
})
export class NavbarComponent {

  public isDropdownOpen: boolean = false;
  isMobileMenuOpen: boolean = false;

  public _translationService = inject(TranslationService);

  navItems = [
    {path: '/#about', label: 'app.menu.about'},
    {path: '/#experience', label: 'app.menu.experiences'},
    {path: '/#skills', label: 'app.menu.skills'},
    {path: '/#education', label: 'app.menu.education'},
    // {path: '/blog', label: 'BLOGS'},
    {path: '/#projects', label: 'app.menu.projects'}
  ];

  faGithub = faGithub;
  faGlobe = faGlobe;

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: Event) {
    const targetElement = event.target as HTMLElement;
    const dropdownToggle = document.getElementById('dropdownToggle');

    if (this.isDropdownOpen && dropdownToggle && !dropdownToggle.contains(targetElement)) {
      const dropdownMenu = document.getElementById('dropdownMenu');
      if (!dropdownMenu || !dropdownMenu.contains(targetElement)) {
        this.isDropdownOpen = false;
      }
    }
  }

  setLang(value: Language) {
    this._translationService.currentLang = value;
    this.isDropdownOpen = false;
  }
}
