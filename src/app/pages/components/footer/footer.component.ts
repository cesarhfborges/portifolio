import { Component } from '@angular/core';
import {faCodeFork, faStar} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  now: Date = new Date();

  starIcon = faStar;
  forkIcon = faCodeFork;
}
