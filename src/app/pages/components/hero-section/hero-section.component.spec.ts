import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HeroSectionComponent} from './hero-section.component';
import {TranslateModule} from '@ngx-translate/core';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {provideAnimations} from '@angular/platform-browser/animations';

describe('HeroSectionComponent', () => {
  let component: HeroSectionComponent;
  let fixture: ComponentFixture<HeroSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeroSectionComponent],
      imports: [
        TranslateModule.forRoot({
          fallbackLang: 'pt'
        }),
      ],
      providers: [
        provideAnimations()
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA,
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HeroSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
