import {Component, OnInit} from '@angular/core';
import {educations} from '../../../../utils/data/educations';
import {faGraduationCap} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-education',
  standalone: false,
  templateUrl: './education.component.html',
  styleUrl: './education.component.scss'
})
export class EducationComponent implements OnInit {
  educations = educations;
  workspaceIcon = faGraduationCap;
  lottieFile: any;

  async ngOnInit() {
    try {
      this.lottieFile = await fetch('assets/lottie/education.json').then(res => res.json());
    } catch (error) {
      console.error('Error loading Lottie animation:', error);
    }
  }
}
