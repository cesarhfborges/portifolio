import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
    NbButtonModule,
    NbCardModule,
    NbDialogModule,
    NbIconModule,
    NbLayoutModule, NbSpinnerModule,
    NbThemeModule, NbToastrModule,
    NbUserModule
} from '@nebular/theme';
import {NbEvaIconsModule} from '@nebular/eva-icons';
import {HomeComponent} from './home/home.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {BarRatingModule} from 'ngx-bar-rating';
import ptBr from '@angular/common/locales/pt';
import {registerLocaleData} from '@angular/common';

registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        NbThemeModule.forRoot({name: 'default'}),
        NbDialogModule.forRoot(),
        NbToastrModule.forRoot(),
        NbLayoutModule,
        NbEvaIconsModule,
        NbCardModule,
        NbUserModule,
        NbButtonModule,
        NbIconModule,
        FontAwesomeModule,
        BarRatingModule,
        NbSpinnerModule
    ],
  providers: [
    {provide: LOCALE_ID, useValue: 'pt-BR'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
