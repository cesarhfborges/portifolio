import {inject} from '@angular/core';
import {TranslationService} from '../../app/shared/services/translation.service';
import {TranslateService} from '@ngx-translate/core';

export async function initializeAppConfig(): Promise<void> {
  const translationService = inject(TranslationService);
  const _translateService = inject(TranslateService);
  translationService.currentLang = _translateService.getBrowserLang();
  return;
}
