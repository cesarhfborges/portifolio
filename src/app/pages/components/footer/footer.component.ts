import { Component } from '@angular/core';
import {faCodeFork, faStar} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  starIcon = faStar;
  forkIcon = faCodeFork;
}
