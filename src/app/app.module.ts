import {NgModule, provideZoneChangeDetection} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {HomeComponent} from './pages/home/home.component';
import {HeroSectionComponent} from './pages/components/hero-section/hero-section.component';
import {NavbarComponent} from './pages/components/navbar/navbar.component';
import {NgOptimizedImage} from "@angular/common";
import {FooterComponent} from './pages/components/footer/footer.component';
import {AboutComponent} from './pages/components/about/about.component';
import {ExperienceComponent} from './pages/components/experience/experience.component';
import {AnimationLottieComponent} from './shared/components/animation-lottie/animation-lottie.component';
import {LottieComponent, provideLottieOptions} from 'ngx-lottie';
import {provideToastr, ToastrModule} from 'ngx-toastr';

import player from 'lottie-web';
import { SkillsComponent } from './pages/components/skills/skills.component';
import { ProjectsComponent } from './pages/components/projects/projects.component';
import { EducationComponent } from './pages/components/education/education.component';
import { ContactComponent } from './pages/components/contact/contact.component';
import { ProjectCardComponent } from './shared/components/project-card/project-card.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeroSectionComponent,
    NavbarComponent,
    FooterComponent,
    AboutComponent,
    ExperienceComponent,
    AnimationLottieComponent,
    SkillsComponent,
    ProjectsComponent,
    EducationComponent,
    ContactComponent,
    ProjectCardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FontAwesomeModule,
    NgOptimizedImage,
    LottieComponent,
    ToastrModule.forRoot({}),
  ],
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideLottieOptions({
      player: () => player,
    }),
    provideToastr({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar: true,
      closeButton: true,
      newestOnTop: true,
    }),
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
