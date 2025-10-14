import {Component, Input} from '@angular/core';
import {ProjectCard} from '../../models/project-card.interface';

@Component({
  selector: 'app-project-card',
  standalone: false,
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss'
})
export class ProjectCardComponent {
  @Input() project!: ProjectCard;
}
