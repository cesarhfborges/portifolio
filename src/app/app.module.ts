import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {HomeComponent} from './pages/home/home.component';
import {HeroSectionComponent} from './pages/components/hero-section/hero-section.component';
import {NavbarComponent} from './pages/components/navbar/navbar.component';
import {NgOptimizedImage} from "@angular/common";
import { FooterComponent } from './pages/components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeroSectionComponent,
    NavbarComponent,
    FooterComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FontAwesomeModule,
        NgOptimizedImage
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
