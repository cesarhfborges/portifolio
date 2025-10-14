import {Component} from '@angular/core';
import {faFileDownload} from '@fortawesome/free-solid-svg-icons';
import {faFacebookSquare, faGithub, faLinkedin, faTwitterSquare, faWhatsapp, faTelegram} from '@fortawesome/free-brands-svg-icons';
import {faEnvelope} from '@fortawesome/free-regular-svg-icons';
import {personalData} from '../../../shared/data/personal.data';

@Component({
  selector: 'app-hero-section',
  standalone: false,
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss'
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

  get whatsappLink(): string {
    return `https://wa.me/${personalData.phone}?text=Hello`;
  }
  get telegramLink(): string {
    return `https://t.me/${personalData.telegram}`;
  }
}
