import {platformBrowser} from '@angular/platform-browser';
import {AppModule} from './app/app.module';

try {
  await platformBrowser().bootstrapModule(AppModule, {
    ngZoneEventCoalescing: true,
  });
} catch (err) {
  console.error(err)
}
