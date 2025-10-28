import { Component } from '@angular/core';
import {personalData} from '../../../shared/data/personal.data';
import {
  faEnvelope,
  faPhone,
  faLocationDot
} from '@fortawesome/free-solid-svg-icons';
import {
  faGithub,
  faLinkedin,
  faTwitter,
  faStackOverflow,
  faFacebook
} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.component.html'
})
export class ContactComponent {
  personalData = personalData;

  // Font Awesome Icons
  faEnvelope = faEnvelope;
  faPhone = faPhone;
  faLocationDot = faLocationDot;
  faGithub = faGithub;
  faLinkedin = faLinkedin;
  faTwitter = faTwitter;
  faStackOverflow = faStackOverflow;
  faFacebook = faFacebook;
}
