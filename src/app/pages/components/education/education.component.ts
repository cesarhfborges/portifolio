import {Component, OnInit} from '@angular/core';
import {educationsData} from '../../../../utils/data/educations.data';
import {faGraduationCap} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-education',
  standalone: false,
  templateUrl: './education.component.html',
  styleUrl: './education.component.css'
})
export class EducationComponent implements OnInit {
  educations = educationsData;
  workspaceIcon = faGraduationCap;
  lottieFile: any = null;

  private animationFrameId: number | null = null;

  ngOnInit() {
    void this._load();
  }

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

  private async _load(): Promise<void> {
    try {
      this.lottieFile = await fetch('assets/lottie/programmer.json').then(res => res.json());
    } catch (error) {
      console.error('Error loading Lottie animation:', error);
    }
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
