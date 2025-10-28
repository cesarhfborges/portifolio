import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SkillsComponent} from './skills.component';
import {TranslateModule} from '@ngx-translate/core';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';

let animationFrameCallback: FrameRequestCallback | null = null;
let animationFrameId: number = 0;

const mockRequestAnimationFrame = (callback: FrameRequestCallback): number => {
  animationFrameCallback = callback;
  return ++animationFrameId;
};

const mockCancelAnimationFrame = (id: number): void => {
  if (id === animationFrameId) {
    animationFrameCallback = null;
  }
};

const executeAnimationFrame = (time: number = 0) => {
  if (animationFrameCallback) {
    animationFrameCallback(time);
    animationFrameCallback = null;
  }
};

const mockSkillsData = [{name: 'Angular', category: 'Frontend'}, {name: 'Node', category: 'Backend'}];
const mockSkillsImage = (name: string) => `/assets/img/${name}.png`;

(SkillsComponent.prototype as any).skills = mockSkillsData;
(SkillsComponent.prototype as any).getSkillImage = mockSkillsImage;

describe('SkillsComponent', () => {
  let component: SkillsComponent;
  let fixture: ComponentFixture<SkillsComponent>;

  let rAFSpy: jasmine.Spy;
  let cAFSpy: jasmine.Spy;

  animationFrameCallback = null;
  animationFrameId = 0;

  beforeEach(async () => {
    rAFSpy = spyOn(window, 'requestAnimationFrame').and.callFake(mockRequestAnimationFrame as any);
    cAFSpy = spyOn(window, 'cancelAnimationFrame').and.callFake(mockCancelAnimationFrame as any);

    await TestBed.configureTestingModule({
      declarations: [SkillsComponent],
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

    fixture = TestBed.createComponent(SkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function createMockContainer(hasBlob: boolean = true): HTMLElement {
    const container = document.createElement('div');

    // Cria o elemento .fakeblob (usado para obter o posicionamento)
    const fakeblob = document.createElement('div');
    fakeblob.className = 'fakeblob';
    // Mocka getBoundingClientRect para fornecer valores previsíveis para cálculo de posição
    spyOn(fakeblob, 'getBoundingClientRect').and.returnValue({
      left: 50,
      top: 50,
      width: 40,
      height: 40,
      x: 50,
      y: 50,
      bottom: 90,
      right: 90,
      toJSON: () => {
        return JSON.stringify({});
      }
    } as DOMRect);
    container.appendChild(fakeblob);

    if (hasBlob) {
      const blob = document.createElement('div');
      blob.className = 'blob';
      container.appendChild(blob);
    }
    return container;
  }

  afterEach(() => {
    if ((component as any).animationFrameId) {
      (component as any).animationFrameId = null;
    }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve criar o componente e inicializar propriedades corretamente', () => {
    expect(component).toBeTruthy();
    expect(component.getSkillImage('Angular')).toBe('assets/svg/skills/angular.svg');
  });

  describe('onCardMouseEnter', () => {
    it('deve definir a opacidade do .blob para 1', () => {
      const container = createMockContainer(true);
      const blob = container.querySelector('.blob') as HTMLElement;
      component.onCardMouseEnter(container);
      expect(blob.style.opacity).toBe('1');
    });

    it('não deve falhar se o .blob não existir', () => {
      const container = createMockContainer(false);
      expect(() => component.onCardMouseEnter(container)).not.toThrow();
    });
  });

  describe('onCardMouseLeave', () => {
    it('deve definir a opacidade do .blob para 0 e cancelar o rAF', () => {
      const container = createMockContainer(true);
      const blob = container.querySelector('.blob') as HTMLElement;

      (component as any).animationFrameId = 999;

      component.onCardMouseLeave(container);

      expect(blob.style.opacity).toBe('0');
      expect(cAFSpy).toHaveBeenCalledWith(999);
      expect((component as any).animationFrameId).toBeNull();
    });

    it('não deve falhar se o .blob não existir ou rAF não estiver ativo', () => {
      const container = createMockContainer(false);
      (component as any).animationFrameId = null;
      expect(() => component.onCardMouseLeave(container)).not.toThrow();
      expect(cAFSpy).not.toHaveBeenCalled();
    });
  });

  describe('onCardMouseMove and updateBlobPosition', () => {
    it('deve agendar uma chamada requestAnimationFrame', () => {
      const container = createMockContainer(true);
      const mockEvent = new MouseEvent('mousemove', {clientX: 100, clientY: 100});

      component.onCardMouseMove(container, mockEvent);

      expect(rAFSpy).toHaveBeenCalled();
      expect((component as any).animationFrameId).toBeGreaterThan(0);
      expect(animationFrameCallback).not.toBeNull();
    });

    it('deve cancelar o rAF anterior antes de agendar um novo', () => {
      const container = createMockContainer(true);
      const mockEvent1 = new MouseEvent('mousemove', {clientX: 100, clientY: 100});
      const mockEvent2 = new MouseEvent('mousemove', {clientX: 105, clientY: 105});

      // 1. Primeira chamada (ID=1)
      component.onCardMouseMove(container, mockEvent1);
      const firstId = (component as any).animationFrameId; // ID deve ser 1

      // 2. Segunda chamada (cancela ID 1 e agenda ID 2)
      component.onCardMouseMove(container, mockEvent2);

      expect(cAFSpy).toHaveBeenCalledWith(firstId);
      // Deve ter um novo ID agendado
      expect((component as any).animationFrameId).not.toBe(firstId);
    });

    it('deve calcular corretamente a posição e aplicar o transform após a execução do rAF', () => {
      const container = createMockContainer(true);
      const blob = container.querySelector('.blob') as HTMLElement;

      // Dados Mockados:
      // fakeblob.left = 50, fakeblob.top = 50, fakeblob.width/2 = 20
      // Mouse Event: clientX = 100, clientY = 100

      // Cálculo Esperado:
      // translateX = (clientX - rec.left) - (rec.width / 2)
      // translateX = (100 - 50) - 20 = 30
      // translateY = (100 - 50) - 20 = 30
      const expectedTransform = `translate(30px, 30px)`;

      // 1. Agenda o rAF
      const mockEvent = {clientX: 100, clientY: 100} as MouseEvent;
      component.onCardMouseMove(container, mockEvent);

      // 2. Executa manualmente o rAF callback
      executeAnimationFrame();

      // 3. Verifica o resultado
      expect(blob.style.transform).toBe(expectedTransform);
      // O ID deve ser resetado para null após a execução bem-sucedida do rAF
      expect((component as any).animationFrameId).toBeNull();
    });

    it('deve retornar sem erro se .blob ou .fakeblob estiverem faltando', () => {
      const container = createMockContainer(false); // Container sem .blob
      const mockEvent = {clientX: 100, clientY: 100} as MouseEvent;

      // 1. Agenda o rAF
      component.onCardMouseMove(container, mockEvent);
      const initialId = (component as any).animationFrameId;

      // 2. Executa rAF (deve executar a função, mas retornar cedo sem erro)
      expect(() => executeAnimationFrame()).not.toThrow();

      // O rAF ID não é cancelado/resetado no componente se os elementos não forem encontrados.
      expect((component as any).animationFrameId).toBe(initialId);

      // Limpa para evitar side effects no próximo teste
      (component as any).animationFrameId = null;
    });
  });
});
