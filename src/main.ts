import {platformBrowser} from '@angular/platform-browser';
import {AppModule} from './app/app.module';

const init = async () => {
  try {
    await platformBrowser().bootstrapModule(AppModule, {
      ngZoneEventCoalescing: true,
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

void init();
