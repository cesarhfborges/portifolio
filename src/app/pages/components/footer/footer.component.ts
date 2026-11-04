import {Component, inject} from '@angular/core';
import {faCircleCheck, faCodeBranch} from '@fortawesome/free-solid-svg-icons';
import {faGithub, faLinkedin, faStackOverflow, faTelegram} from '@fortawesome/free-brands-svg-icons';
import {personalData} from '../../../shared/data/personal.data';
import {TranslationService} from '../../../shared/services/translation.service';

@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  readonly now: Date = new Date();
  readonly personalData = personalData;
  readonly translation = inject(TranslationService);

  readonly faCodeBranch = faCodeBranch;
  readonly faCircleCheck = faCircleCheck;

  /** Mesma ordem e numeração do menu e dos títulos de seção. */
  readonly sections = [
    {path: '/#about', label: 'app.menu.about'},
    {path: '/#experience', label: 'app.menu.experiences'},
    {path: '/#education', label: 'app.menu.education'},
    {path: '/#skills', label: 'app.menu.skills'},
    {path: '/#projects', label: 'app.menu.projects'},
    {path: '/#contact', label: 'app.footer.contact'},
  ];

  readonly socials = [
    {icon: faGithub, url: personalData.github, label: 'GitHub'},
    {icon: faLinkedin, url: personalData.linkedIn, label: 'LinkedIn'},
    {icon: faStackOverflow, url: personalData.stackOverflow, label: 'Stack Overflow'},
    {icon: faTelegram, url: `https://t.me/${personalData.telegram}`, label: 'Telegram'},
  ];

  readonly stack = ['Angular 20', 'TypeScript', 'Tailwind CSS', 'highlight.js'];

  indexLabel(i: number): string {
    return String(i + 1).padStart(2, '0') + '.';
  }
}
