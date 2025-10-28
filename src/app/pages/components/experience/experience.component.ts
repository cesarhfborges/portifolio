import {Component, OnInit} from '@angular/core';
import {faBriefcase} from '@fortawesome/free-solid-svg-icons';
import {experiences} from "../../../shared/data/experience.data";

@Component({
  selector: 'app-experience',
  standalone: false,
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css'
})
export class ExperienceComponent implements OnInit {
  experiences = experiences;
  workIcon = faBriefcase;
  lottieFile: any;

  private animationFrameId: number | null = null;

  ngOnInit() {
    void this.init();
  }

  async init(): Promise<void> {
    try {
      this.lottieFile = await fetch('assets/lottie/code.json').then(res => {
        return res.json();
      });
    } catch (error) {
      console.error('Error loading Lottie animation:', error);
    }
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
