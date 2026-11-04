import {ComponentFixture, TestBed, fakeAsync, tick} from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';

import {TipToastComponent} from './tip-toast.component';
import {WorkspaceService} from '../../services/workspace.service';

describe('TipToastComponent', () => {
  let component: TipToastComponent;
  let fixture: ComponentFixture<TipToastComponent>;

  beforeEach(async () => {
    localStorage.removeItem('portfolio.tip.palette.dismissed');
    await TestBed.configureTestingModule({
      declarations: [TipToastComponent],
      imports: [TranslateModule.forRoot({fallbackLang: 'pt'})],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(TipToastComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => localStorage.removeItem('portfolio.tip.palette.dismissed'));

  it('deve aparecer depois de alguns segundos', fakeAsync(() => {
    fixture.detectChanges();
    expect(component.visible()).toBeFalse();
    tick(4000);
    expect(component.visible()).toBeTrue();
  }));

  it('"Não mostrar novamente" deve impedir que apareça de novo', fakeAsync(() => {
    fixture.detectChanges();
    tick(4000);
    component.dismissForever();
    expect(component.visible()).toBeFalse();

    const again = TestBed.createComponent(TipToastComponent);
    again.detectChanges();
    tick(4000);
    expect(again.componentInstance.visible()).toBeFalse();
  }));

  it('"Experimentar" deve abrir a paleta e fechar a dica', fakeAsync(() => {
    const workspace = TestBed.inject(WorkspaceService);
    fixture.detectChanges();
    tick(4000);
    component.tryIt();
    expect(workspace.paletteOpen()).toBeTrue();
    expect(component.visible()).toBeFalse();
    workspace.closePalette();
  }));
});
