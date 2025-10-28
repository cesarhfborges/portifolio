import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimationLottieComponent } from './animation-lottie.component';
import {TranslateModule} from '@ngx-translate/core';
import {provideAnimations} from '@angular/platform-browser/animations';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';

describe('AnimationLottieComponent', () => {
  let component: AnimationLottieComponent;
  let fixture: ComponentFixture<AnimationLottieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnimationLottieComponent],
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

    fixture = TestBed.createComponent(AnimationLottieComponent);
    component = fixture.componentInstance;

    component.animationPath = 'assets/lottie/programmer.json';
    component.width = '10';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
