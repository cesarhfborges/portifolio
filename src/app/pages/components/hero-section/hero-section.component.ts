import {Component} from '@angular/core';
import {faFileDownload} from '@fortawesome/free-solid-svg-icons';
import {faFacebookSquare, faGithub, faLinkedin, faTwitterSquare} from '@fortawesome/free-brands-svg-icons';
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
}
