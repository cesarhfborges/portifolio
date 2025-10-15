import {Component, ElementRef, HostListener, inject, OnInit} from '@angular/core';
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

  private el = inject(ElementRef)

  private animationFrameId: number | null = null;

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

  private updateBlobPosition(container: HTMLElement, mouseEvent: MouseEvent): void {

    // Se já houver um frame de animação pendente, cancelamos.
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }

    // Usamos requestAnimationFrame para garantir que a atualização
    // do DOM seja executada no momento ideal para o navegador.
    this.animationFrameId = requestAnimationFrame(() => {
      const blob = container.querySelector('.blob') as HTMLElement;
      const fblob = container.querySelector('.fakeblob') as HTMLElement;

      if (!blob || !fblob) {
        return;
      }

      const rec = fblob.getBoundingClientRect();

      // 4. Calcula o deslocamento
      const translateX = (mouseEvent.clientX - rec.left) - (rec.width / 2);
      const translateY = (mouseEvent.clientY - rec.top) - (rec.height / 2);

      // 5. Aplicar a transformação diretamente no estilo.
      // A Web Animations API é boa, mas em um loop muito rápido, atualizar
      // diretamente a propriedade transform tem se mostrado mais leve para mousemove,
      // desde que envolto em requestAnimationFrame.
      blob.style.transform = `translate(${translateX}px, ${translateY}px)`;

      // Reseta o ID do frame
      this.animationFrameId = null;
    });
  }

  // MÉTODOS PÚBLICOS CHAMADOS PELO HTML (mouseenter, mouseleave, mousemove)

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
    // Garante que qualquer animação pendente seja cancelada ao sair
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  public onCardMouseMove(container: HTMLElement, event: MouseEvent): void {
    // Apenas chama o método otimizado
    this.updateBlobPosition(container, event);
  }
}
