import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';

import {StatusBarComponent} from './status-bar.component';

describe('StatusBarComponent', () => {
  let component: StatusBarComponent;
  let fixture: ComponentFixture<StatusBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatusBarComponent],
      imports: [TranslateModule.forRoot({fallbackLang: 'pt'})],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(StatusBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('toggleLang: deve alternar entre os idiomas disponíveis', () => {
    const langs = component.translation.langs.map(l => l.value);
    component.translation.currentLang = langs[0];
    component.toggleLang();
    expect(component.translation.currentLang).toBe(langs[1]);
    component.toggleLang();
    expect(component.translation.currentLang).toBe(langs[0]);
  });

  it('scrollTop: deve rolar a página para o topo', () => {
    const spy = spyOn<any>(window, 'scrollTo');
    component.scrollTop();
    expect(spy).toHaveBeenCalledWith({top: 0, behavior: 'smooth'});
  });
});
