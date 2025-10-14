import {Component, OnInit} from '@angular/core';
import {faBriefcase} from '@fortawesome/free-solid-svg-icons';
import { experiences } from "../../../shared/data/experience.data";

@Component({
  selector: 'app-experience',
  standalone: false,
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss'
})
export class ExperienceComponent implements OnInit {
  experiences = experiences;
  workIcon = faBriefcase;
  lottieFile: any;

  ngOnInit() {
    void this.init();
  }

  async init(): Promise<void> {
    try {
      this.lottieFile = await fetch('assets/lottie/code.json').then(res => res.json());
    } catch (error) {
      console.error('Error loading Lottie animation:', error);
    }
  }
}
