import { Component } from '@angular/core';
import {skillsData} from '../../../../utils/data/skills';
import skillsImage from '../../../../utils/helpers/skill-image';

@Component({
  selector: 'app-skills',
  standalone: false,
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent {
  skills = skillsData;
  getSkillImage = skillsImage;
}
