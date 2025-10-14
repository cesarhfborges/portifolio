import {inject} from '@angular/core';
import {TranslationService} from '../../app/shared/services/translation.service';
import {TranslateService} from '@ngx-translate/core';

export async function initializeAppConfig(): Promise<void> {
  const translationService = inject(TranslationService);
  const _translateService = inject(TranslateService);
  const a = _translateService.getBrowserLang();

  if (a !== undefined) {
    translationService.currentLang = <"en" | "pt">a;
  }

  return Promise.resolve();
}
