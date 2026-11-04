import {ComponentFixture, TestBed} from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import {TranslateModule} from '@ngx-translate/core';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';

const translations: any[] = [
  {
    label: 'English',
    code: 'en',
    value: 'en',
    icon: 'https://flagsapi.com/US/shiny/64.png',
  },
  {
    label: 'Português',
    code: 'pt',
    value: 'pt-BR',
    icon: 'https://flagsapi.com/BR/shiny/64.png',
  }
];

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [
        TranslateModule.forRoot({
          fallbackLang: 'pt'
        }),
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.toggleMenu();
    component.toggleMenu();
    expect(component).toBeTruthy();
  });

  it('onResize/checkScreenSize: deve definir isMobile como true se a largura for maior que 768px', () => {
    spyOnProperty(window, 'innerWidth', 'get').and.returnValue(900);

    component.isMenuOpen = true;

    window.dispatchEvent(new Event('resize'));
    fixture.detectChanges();

    expect(component.isMobile).toBeFalse();
    expect(component.isMenuOpen).toBeFalse();
  });

  it('onWindowScroll: deve definir isScrolled como true após a rolagem', () => {
    spyOnProperty(window, 'scrollY').and.returnValue(100);

    component.onWindowScroll();
    expect(component.isScrolled).toBeTrue();
  });

  it('onWindowScroll: deve definir isScrolled como false se a rolagem for mínima', () => {
    spyOnProperty(window, 'scrollY').and.returnValue(0);
    component.onWindowScroll();
    expect(component.isScrolled).toBeFalse();
  });

  it('setLang: deve definir a linguagem no translationService', () => {
    component.setLang(translations[1].value);
    expect(component._translationService.currentLang).toBe(translations[1].value);
    expect(component.isCurrentLang(translations[1].value)).toBeTrue();
    expect(component.isCurrentLang(translations[0].value)).toBeFalse();
  });

  it('indexLabel: deve numerar os itens com dois dígitos', () => {
    expect(component.indexLabel(0)).toBe('01.');
    expect(component.indexLabel(4)).toBe('05.');
  });

  it('navItems: deve seguir a ordem das seções na página', () => {
    expect(component.navItems.map(i => i.id)).toEqual(['about', 'experience', 'education', 'skills', 'projects']);
  });

  it('onEscape: deve fechar o menu mobile aberto', () => {
    component.toggleMenu();
    component.onEscape();
    expect(component.isMenuOpen).toBeFalse();
    expect(document.body.style.overflow).toBe('');
  });
});
