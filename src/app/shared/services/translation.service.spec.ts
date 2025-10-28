import { TestBed } from '@angular/core/testing';
import { Renderer2, RendererFactory2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT } from '@angular/common';
import { TranslationService } from './translation.service';

describe('TranslationService', () => {
  let service: TranslationService;
  let translateSpy: jasmine.SpyObj<TranslateService>;
  let rendererFactorySpy: jasmine.SpyObj<RendererFactory2>;
  let rendererSpy: jasmine.SpyObj<Renderer2>;
  let mockDocument: any;

  beforeEach(() => {
    // Mocks / spies
    translateSpy = jasmine.createSpyObj('TranslateService', ['use']);

    rendererSpy = jasmine.createSpyObj('Renderer2', ['setAttribute'] as any);
    // createRenderer deve retornar nosso rendererSpy
    rendererFactorySpy = jasmine.createSpyObj('RendererFactory2', ['createRenderer']);
    rendererFactorySpy.createRenderer.and.returnValue(rendererSpy);

    // Document stub com documentElement qualquer
    mockDocument = {
      documentElement: {}
    };

    TestBed.configureTestingModule({
      providers: [
        TranslationService,
        { provide: TranslateService, useValue: translateSpy },
        { provide: RendererFactory2, useValue: rendererFactorySpy },
        { provide: DOCUMENT, useValue: mockDocument }
      ]
    });

    service = TestBed.inject(TranslationService);
  });

  afterEach(() => {
    // limpar spies entre testes
    translateSpy.use.calls.reset();
    rendererSpy.setAttribute.calls.reset();
    rendererFactorySpy.createRenderer.calls.reset();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should expose available languages', () => {
    const langs = service.langs;
    expect(Array.isArray(langs)).toBeTrue();
    expect(langs.length).toBeGreaterThanOrEqual(2);
    // checar presença de english e portuguese por label/código
    const codes = langs.map(l => l.code || l.value);
    expect(codes).toContain('en');
    expect(codes).toContain('pt');
  });

  it('should start with default language "en"', () => {
    expect(service.currentLang).toBe('en');
    // criacao do renderer deve ter sido chamada no construtor
    expect(rendererFactorySpy.createRenderer).toHaveBeenCalled();
  });

  it('should change language when setting currentLang by code ("pt")', () => {
    service.currentLang = 'pt'; // code 'pt' should map to 'pt-BR'
    expect(translateSpy.use).toHaveBeenCalledWith('pt-BR');
    expect(rendererSpy.setAttribute).toHaveBeenCalledWith(mockDocument.documentElement, 'lang', 'pt-BR');
    expect(service.currentLang).toBe('pt-BR');
  });

  it('should change language when setting currentLang by value ("pt-BR")', () => {
    service.currentLang = 'pt-BR';
    expect(translateSpy.use).toHaveBeenCalledWith('pt-BR');
    expect(rendererSpy.setAttribute).toHaveBeenCalledWith(mockDocument.documentElement, 'lang', 'pt-BR');
    expect(service.currentLang).toBe('pt-BR');
  });

  it('should use default language when assigned undefined', () => {
    // primeiro muda pra pt-BR
    service.currentLang = 'pt';
    expect(service.currentLang).toBe('pt-BR');
    translateSpy.use.calls.reset();
    rendererSpy.setAttribute.calls.reset();

    // agora seta undefined -> deve cair no default (primeiro entry = 'en')
    service.currentLang = undefined;
    expect(translateSpy.use).toHaveBeenCalledWith('en');
    expect(rendererSpy.setAttribute).toHaveBeenCalledWith(mockDocument.documentElement, 'lang', 'en');
    expect(service.currentLang).toBe('en');
  });

  it('should fallback to default for unknown values', () => {
    service.currentLang = 'unknown-value' as any;
    expect(translateSpy.use).toHaveBeenCalledWith('en'); // fallback
    expect(rendererSpy.setAttribute).toHaveBeenCalledWith(mockDocument.documentElement, 'lang', 'en');
    expect(service.currentLang).toBe('en');
  });
});
