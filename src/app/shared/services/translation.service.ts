import {inject, Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {BehaviorSubject, Subject} from 'rxjs';

export type Language = 'en' | 'pt';

interface Translation {
  icon: string;
  label: string;
  value: Language;
}

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  private _translations: Translation[] = [
    {
      label: 'English',
      value: 'en',
      icon: 'https://flagsapi.com/US/shiny/64.png',
    },
    {
      label: 'Português',
      value: 'pt',
      icon: 'https://flagsapi.com/BR/shiny/64.png',
    }
  ];


  private _language = new BehaviorSubject<Language>('en');

  private _translate = inject(TranslateService);

  constructor() {
  }

  get langs(): Translation[] {
    return this._translations;
  }

  get currentLang(): Language {
    return this._language.value;
  }

  set currentLang(value: Language) {
    this._translate.use(value);
    this._language.next(value);
  }
}
