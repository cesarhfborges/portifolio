import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';

import {FooterComponent} from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FooterComponent],
      imports: [TranslateModule.forRoot({fallbackLang: 'pt'})],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('indexLabel: deve numerar as seções com dois dígitos', () => {
    expect(component.indexLabel(0)).toBe('01.');
    expect(component.indexLabel(5)).toBe('06.');
  });

  it('não deve apontar para o LinkedIn do template original', () => {
    const html: string = fixture.nativeElement.innerHTML;
    expect(html).not.toContain('javeed-ishaq');
  });
});
