import { Component } from '@angular/core';
import { personalData } from "../../../shared/data/personal.data";

@Component({
  selector: 'app-about',
  standalone: false,
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  personalData = personalData;
}
