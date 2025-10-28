import { Component } from '@angular/core';
import {skillsData} from '../../../../utils/data/skills.data';
import skillsImage from '../../../../utils/helpers/skill-image';

@Component({
  selector: 'app-skills',
  standalone: false,
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent {
  skills = skillsData;
  getSkillImage = skillsImage;

  private animationFrameId: number | null = null;

  public onCardMouseEnter(container: HTMLElement): void {
    const blob = container.querySelector('.blob') as HTMLElement;
    if (blob) {
      blob.style.opacity = '1';
    }
  }

  public onCardMouseLeave(container: HTMLElement): void {
    const blob = container.querySelector('.blob') as HTMLElement;
    if (blob) {
      blob.style.opacity = '0';
    }
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  public onCardMouseMove(container: HTMLElement, event: MouseEvent): void {
    this.updateBlobPosition(container, event);
  }

  private updateBlobPosition(container: HTMLElement, mouseEvent: MouseEvent): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    this.animationFrameId = requestAnimationFrame(() => {
      const blob = container.querySelector('.blob') as HTMLElement;
      const fblob = container.querySelector('.fakeblob') as HTMLElement;

      if (!blob || !fblob) {
        return;
      }
      const rec = fblob.getBoundingClientRect();
      const translateX = (mouseEvent.clientX - rec.left) - (rec.width / 2);
      const translateY = (mouseEvent.clientY - rec.top) - (rec.height / 2);
      blob.style.transform = `translate(${translateX}px, ${translateY}px)`;
      this.animationFrameId = null;
    });
  }
}
