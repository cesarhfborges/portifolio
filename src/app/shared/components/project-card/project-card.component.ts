import {Component, Input} from '@angular/core';
import {ProjectCard} from '../../models/project-card.interface';

@Component({
  selector: 'app-project-card',
  standalone: false,
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.css'
})
export class ProjectCardComponent {
  @Input() project!: ProjectCard;

  /** Nome de arquivo fictício para a aba do "editor": "Maquininha PIX Brasal" → "maquininha-pix.ts" */
  get fileName(): string {
    const slug = (this.project?.name ?? '')
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .join('-');
    return `${slug || 'project'}.ts`;
  }
}
