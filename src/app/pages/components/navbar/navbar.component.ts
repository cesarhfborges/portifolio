import {Component, HostListener, inject} from '@angular/core';
import {Language, TranslationService} from '../../../shared/services/translation.service';
import {faGithub} from '@fortawesome/free-brands-svg-icons';
import {faBars, faGlobe, faTimes} from '@fortawesome/free-solid-svg-icons';
import animations from '../../../shared/animations/animations';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  animations: animations
})
export class NavbarComponent {

  faBars = faBars;
  faTimes = faTimes;

  public isDropdownOpen: boolean = false;
  isMenuOpen: boolean = false; // Controla o menu responsivo
  isMobile: boolean = false; // Flag para saber se está em tela pequena

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
      if (!dropdownMenu || !dropdownMenu.contains(targetElement)) {
        this.isDropdownOpen = false;
      }
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // window.scrollY é a posição vertical de rolagem em pixels
    const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;

    // Atualiza a variável de estado
    this.isScrolled = scrollPosition > this.SCROLL_THRESHOLD;
  }

  setLang(value: Language) {
    this._translationService.currentLang = value;
    this.isDropdownOpen = false;
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    // Opcional: Fechar o dropdown ao abrir/fechar o menu principal
    this.isDropdownOpen = false;

    // TRUQUE PARA BLOQUEAR O SCROLL DO CORPO DA PÁGINA QUANDO O MENU ESTÁ ABERTO
    if (this.isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  private checkScreenSize(): void {
    // O breakpoint md (768px) é o padrão do Tailwind, usamos ele aqui.
    this.isMobile = window.innerWidth < 768;

    // Se o menu estava aberto no mobile e a tela for redimensionada para desktop, feche o menu (para evitar overlay no desktop)
    if (!this.isMobile) {
      this.isMenuOpen = false;
    }
  }
}
