import { Component } from '@angular/core';
import { projects } from "../../../shared/data/projects.data";

@Component({
  selector: 'app-projects',
  standalone: false,
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  projects = projects.slice(0, 4);
}
