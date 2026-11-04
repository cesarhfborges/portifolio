import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';

import {CommandPaletteComponent, fuzzyScore} from './command-palette.component';

describe('CommandPaletteComponent', () => {
  let component: CommandPaletteComponent;
  let fixture: ComponentFixture<CommandPaletteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommandPaletteComponent],
      imports: [TranslateModule.forRoot({fallbackLang: 'pt'})],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CommandPaletteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => component.workspace.closePalette());

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('fuzzyScore: casa letras em ordem, ignora acentos e prioriza trechos contínuos', () => {
    expect(fuzzyScore('exp', 'Experiências')).toBeGreaterThan(0);
    expect(fuzzyScore('educ', 'Formação — educação')).toBeGreaterThan(0);
    expect(fuzzyScore('epc', 'Experiências')).toBeGreaterThan(0);
    expect(fuzzyScore('xyz', 'Experiências')).toBe(-1);
    expect(fuzzyScore('exp', 'Experiências')).toBeGreaterThan(fuzzyScore('epc', 'Experiências'));
  });

  it('Ctrl+K deve abrir e fechar a paleta', () => {
    component.onGlobalKey(new KeyboardEvent('keydown', {key: 'k', ctrlKey: true}));
    expect(component.workspace.paletteOpen()).toBeTrue();
    component.onGlobalKey(new KeyboardEvent('keydown', {key: 'k', ctrlKey: true}));
    expect(component.workspace.paletteOpen()).toBeFalse();
  });

  it('Ctrl+Shift+P também deve abrir a paleta', () => {
    component.onGlobalKey(new KeyboardEvent('keydown', {key: 'P', ctrlKey: true, shiftKey: true}));
    expect(component.workspace.paletteOpen()).toBeTrue();
  });

  it('deve listar uma navegação por seção e filtrar pela busca', () => {
    const all = component.results.length;
    expect(all).toBeGreaterThan(component.workspace.files.length);
    component.onInput('zzzz-nada');
    expect(component.results.length).toBe(0);
  });

  it('setas e Enter devem executar o comando selecionado', () => {
    const goTo = spyOn(component.workspace, 'goTo');
    component.workspace.openPalette();
    component.onKeydown(new KeyboardEvent('keydown', {key: 'ArrowDown'}));
    expect(component.activeIndex()).toBe(1);
    component.onKeydown(new KeyboardEvent('keydown', {key: 'Enter'}));
    // o 2º comando da lista é "Ir para" a 2ª seção (experiência)
    expect(goTo).toHaveBeenCalledWith(component.workspace.files[1].id);
    expect(component.workspace.paletteOpen()).toBeFalse();
  });

  it('Esc deve fechar a paleta', () => {
    component.workspace.openPalette();
    component.onKeydown(new KeyboardEvent('keydown', {key: 'Escape'}));
    expect(component.workspace.paletteOpen()).toBeFalse();
  });
});
