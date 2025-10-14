import {Component, inject} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'portifolio';

  // private _translate = inject(TranslateService);

  constructor() {
    // this._translate.addLangs(['en', 'pt']);
    // this._translate.setFallbackLang('en');
    // const browserLang = this._translate.getBrowserLang();
    // if (browserLang !== undefined) {
    //   this._translate.use(browserLang);
    // }
  }

}
