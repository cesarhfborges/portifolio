import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EducationComponent} from './education.component';
import {TranslateModule} from '@ngx-translate/core';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {experiences} from '../../../shared/data/experience.data';
import {ExperienceComponent} from '../experience/experience.component';
import {educationsData} from '../../../../utils/data/educations.data';

let requestAnimationFrameSpy: jasmine.Spy;
let cancelAnimationFrameSpy: jasmine.Spy;

describe('EducationComponent', () => {
  let component: EducationComponent;
  let fixture: ComponentFixture<EducationComponent>;

  let fetchSpy: jasmine.Spy;
  let consoleErrorSpy: jasmine.Spy;
  let rafCallback: FrameRequestCallback | undefined;

  const mockLottieData = {
    v: '5.5.2',
    nm: 'Lottie Mock',
  };
  const mockResponse = {
    ok: true,
    json: () => Promise.resolve(mockLottieData),
  } as Response;

  beforeEach(async () => {
    rafCallback = undefined;
    requestAnimationFrameSpy = spyOn(window, 'requestAnimationFrame').and.callFake((callback: FrameRequestCallback) => {
      rafCallback = callback;
      return 123;
    });

    cancelAnimationFrameSpy = spyOn(window, 'cancelAnimationFrame').and.callThrough();
    await TestBed.configureTestingModule({
      declarations: [EducationComponent],
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


  });

  beforeEach(() => {
    fetchSpy = spyOn(window, 'fetch');

    consoleErrorSpy = spyOn(console, 'error');
    fetchSpy.and.returnValue(Promise.resolve(mockResponse));

    fixture = TestBed.createComponent(EducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    if (component['animationFrameId']) {
      cancelAnimationFrame(component['animationFrameId']);
      component['animationFrameId'] = null;
    }
    consoleErrorSpy.calls.reset();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
    expect(component.educations).toEqual(educationsData);
    expect(component.workspaceIcon).toBeDefined();
  });

  it('init: deve carregar o arquivo lottie com sucesso', async () => {
    expect(fetchSpy).toHaveBeenCalledWith('assets/lottie/programmer.json');
    await fixture.whenStable();
    expect(component.lottieFile).toEqual(mockLottieData);
  });

  it('init: deve logar erro se o carregamento do lottie falhar', async () => {
    const error = new Error('Erro de rede');
    fetchSpy.and.returnValue(Promise.reject(error));
    await component.init();
    await fixture.whenStable();
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error loading Lottie animation:', error);
    expect(component).toBeTruthy();
  });


  function createMockContainer(blobId: string = 'blob', fakeBlobId: string = 'fakeblob'): HTMLElement {
    const container = document.createElement('div');
    const blob = document.createElement('div');
    blob.className = blobId;
    blob.style.opacity = '0';
    const fakeBlob = document.createElement('div');
    fakeBlob.className = fakeBlobId;
    spyOn(fakeBlob, 'getBoundingClientRect').and.returnValue({
      left: 100,
      top: 100,
      width: 50,
      height: 50,
      x: 100,
      y: 100,
      bottom: 150,
      right: 150,
      toJSON: () => JSON.stringify({})
    });
    container.appendChild(blob);
    container.appendChild(fakeBlob);
    return container;
  }

  it('onCardMouseEnter: deve definir a opacidade do .blob para 1', () => {
    const container = createMockContainer();
    const blob = container.querySelector('.blob') as HTMLElement;
    component.onCardMouseEnter(container);
    expect(blob.style.opacity).toBe('1');
  });

  it('onCardMouseLeave: deve definir a opacidade do .blob para 0 e cancelar o requestAnimationFrame', () => {
    const container = createMockContainer();
    const blob = container.querySelector('.blob') as HTMLElement;
    component['animationFrameId'] = 999;
    component.onCardMouseLeave(container);
    expect(blob.style.opacity).toBe('0');
    expect(cancelAnimationFrameSpy).toHaveBeenCalledWith(999);
    expect(component['animationFrameId']).toBeNull();
  });

  it('onCardMouseMove: deve chamar requestAnimationFrame para atualizar a posição do blob', () => {
    const container = createMockContainer();
    const event = new MouseEvent('mousemove', {clientX: 200, clientY: 150});
    component.onCardMouseMove(container, event);
    expect(requestAnimationFrameSpy).toHaveBeenCalled();
    expect(component['animationFrameId']).toBe(123);
  });

  it('updateBlobPosition: deve calcular e aplicar a transformação de translate correta', () => {
    const container = createMockContainer();
    const blob = container.querySelector('.blob') as HTMLElement;
    const mouseEvent = new MouseEvent('mousemove', {clientX: 200, clientY: 150});
    component['updateBlobPosition'](container, mouseEvent);
    expect(rafCallback).toBeDefined();
    if (rafCallback) {
      rafCallback(0);
    }
    const expectedTranslate = 'translate(75px, 25px)';
    expect(blob.style.transform).toBe(expectedTranslate);
    expect(component['animationFrameId']).toBeNull();
  });

  it('updateBlobPosition: deve cancelar o RAF anterior antes de iniciar um novo', () => {
    const container = createMockContainer();
    const mouseEvent = new MouseEvent('mousemove', {clientX: 0, clientY: 0});
    component['animationFrameId'] = 456;
    component['updateBlobPosition'](container, mouseEvent);
    expect(cancelAnimationFrameSpy).toHaveBeenCalledWith(456);
    expect(requestAnimationFrameSpy).toHaveBeenCalled();
    expect(component['animationFrameId']).toBe(123);
  });

  it('updateBlobPosition: deve retornar se faltarem elementos .blob ou .fakeblob', () => {
    const container = document.createElement('div');
    const mouseEvent = new MouseEvent('mousemove', {clientX: 0, clientY: 0});
    component['animationFrameId'] = 111;
    component['updateBlobPosition'](container, mouseEvent);
    expect(rafCallback).toBeDefined();
    if (rafCallback) {
      rafCallback(0);
    }
    expect(component).toBeTruthy();
  });
});
