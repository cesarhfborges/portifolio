import {AfterViewInit, Component, ElementRef, inject, OnDestroy, signal} from '@angular/core';
import {personalData} from '../../../shared/data/personal.data';
import {faArrowRight, faCheck, faCopy, faEnvelope, faLocationDot} from '@fortawesome/free-solid-svg-icons';
import {faGithub, faLinkedin, faStackOverflow, faTelegram, faWhatsapp} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent implements AfterViewInit, OnDestroy {
  personalData = personalData;

  faEnvelope = faEnvelope;
  faLocationDot = faLocationDot;
  faWhatsapp = faWhatsapp;
  faTelegram = faTelegram;
  faGithub = faGithub;
  faLinkedin = faLinkedin;
  faStackOverflow = faStackOverflow;
  faCopy = faCopy;
  faCheck = faCheck;
  faArrowRight = faArrowRight;

  /** Liga a revelação das linhas do terminal quando a seção entra na tela. */
  readonly visible = signal(false);
  readonly copied = signal(false);

  private observer?: IntersectionObserver;
  private copiedTimer?: ReturnType<typeof setTimeout>;
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  get whatsappLink(): string {
    return `https://wa.me/${personalData.phone.replace(/\D/g, '')}`;
  }

  get telegramLink(): string {
    return `https://t.me/${personalData.telegram}`;
  }

  /** "+5561991508973" → "+55 61 99150-8973" */
  get phoneFormatted(): string {
    const m = personalData.phone.replace(/\D/g, '').match(/^(\d{2})(\d{2})(\d{4,5})(\d{4})$/);
    return m ? `+${m[1]} ${m[2]} ${m[3]}-${m[4]}` : personalData.phone;
  }

  ngAfterViewInit(): void {
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || typeof IntersectionObserver === 'undefined') {
      this.visible.set(true);
      return;
    }
    this.observer = new IntersectionObserver(entries => {
      if (entries.some(e => e.isIntersecting)) {
        this.visible.set(true);
        this.observer?.disconnect();
      }
    }, {threshold: 0.25});
    this.observer.observe(this.host.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    clearTimeout(this.copiedTimer);
  }

  async copyEmail(): Promise<void> {
    try {
      await navigator.clipboard.writeText(personalData.email);
      this.copied.set(true);
      clearTimeout(this.copiedTimer);
      this.copiedTimer = setTimeout(() => this.copied.set(false), 2000);
    } catch {
      // sem permissão de clipboard: abre o cliente de e-mail como alternativa
      window.location.href = `mailto:${personalData.email}`;
    }
  }
}
