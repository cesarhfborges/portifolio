import {inject, Injectable, Renderer2, RendererFactory2} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {BehaviorSubject} from 'rxjs';
import {DOCUMENT} from '@angular/common';

export type Language = 'en' | 'pt-BR';

interface Translation {
  icon: string;
  label: string;
  code: string;
  value: Language;
}

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  private _translations: Translation[] = [
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


  private _language = new BehaviorSubject<Language>('en');
  private _translate = inject(TranslateService);
  private _rendererFactory = inject(RendererFactory2);
  private _document = inject(DOCUMENT);
  private _renderer: Renderer2;

  constructor() {
    this._renderer = this._rendererFactory.createRenderer(null, null);
  }

  get langs(): Translation[] {
    return this._translations;
  }

  get currentLang(): Language {
    return this._language.value;
  }

  set currentLang(value: string | undefined) {
    if (value === undefined) {
      this._setLanguage(this._translations[0].value);
    }
    const l = this._translations.find(e => e.code === value || e.value === value);
    if (l !== undefined) {
      this._setLanguage(l.value);
    } else {
      this._setLanguage(this._translations[0].value);
    }
  }

  private _setLanguage(value: Language) {
    this._translate.use(value);
    this._renderer.setAttribute(this._document.documentElement, 'lang', value);
    this._language.next(value);
  }
}
