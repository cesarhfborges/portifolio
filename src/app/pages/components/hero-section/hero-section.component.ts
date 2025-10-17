import {Component, inject} from '@angular/core';
import {faFileDownload} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebookSquare,
  faGithub,
  faLinkedin,
  faTelegram,
  faTwitterSquare,
  faWhatsapp
} from '@fortawesome/free-brands-svg-icons';
import {faEnvelope} from '@fortawesome/free-regular-svg-icons';
import {personalData} from '../../../shared/data/personal.data';
import {TranslateService} from '@ngx-translate/core';
import {animate, style, transition, trigger} from '@angular/animations';
import animations from '../../../shared/animations/animations';

@Component({
  selector: 'app-hero-section',
  standalone: false,
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss',
  animations: animations
})
export class HeroSectionComponent {

  personalData = personalData;
  faGithub = faGithub;
  faLinkedin = faLinkedin;
  faFacebook = faFacebookSquare;
  faTwitter = faTwitterSquare;
  faDownload = faFileDownload;
  faEnvelope = faEnvelope;
  faWhatsapp = faWhatsapp;
  faTelegram = faTelegram;
  private _service = inject(TranslateService);

  get whatsappLink(): string {
    return `https://wa.me/${personalData.phone}?text=Hello`;
  }

  get telegramLink(): string {
    return `https://t.me/${personalData.telegram}`;
  }

  getInstantTranslation() {
    let text: string = this._service.instant('app.heroSection.text');
    const nameSpan = `<span class="text-pink-500">${this.personalData.name}</span>`;
    const designationSpan = `<span class="text-[#16f2b3]">${this._service.instant('app.heroSection.designation')}</span>`;
    text = text.replace('%USERNAME%', nameSpan);
    text = text.replace('%USERNAME%', nameSpan);
    text = text.replace('%DESIGNATION%', designationSpan);
    text = text.replaceAll('\n', '<br>');
    return text;
  }
}
