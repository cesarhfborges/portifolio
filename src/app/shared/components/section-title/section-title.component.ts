import {
  AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, Input, OnChanges, OnDestroy, signal,
  SimpleChanges
} from '@angular/core';

/**
 * Título de seção com cara de editor: "02. Experiências▌".
 * O texto é digitado na primeira vez que o título entra na tela.
 */
@Component({
  selector: 'app-section-title',
  standalone: false,
  templateUrl: './section-title.component.html',
  styleUrl: './section-title.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionTitleComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input({required: true}) label = '';
  @Input() index = 1;

  readonly typed = signal('');
  private hasTyped = false;
  private observer?: IntersectionObserver;
  private timer?: ReturnType<typeof setTimeout>;
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  get number(): string {
    return String(this.index).padStart(2, '0') + '.';
  }

  ngOnChanges(changes: SimpleChanges): void {
    // troca de idioma depois de já digitado: mostra o novo texto direto
    if (changes['label'] && this.hasTyped) {
      clearTimeout(this.timer);
      this.typed.set(this.label);
    }
  }

  ngAfterViewInit(): void {
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || typeof IntersectionObserver === 'undefined') {
      this.finish();
      return;
    }
    this.observer = new IntersectionObserver(entries => {
      if (entries.some(e => e.isIntersecting)) {
        this.observer?.disconnect();
        this.hasTyped = true;
        this.typeNext();
      }
    }, {threshold: 0.6});
    this.observer.observe(this.host.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    clearTimeout(this.timer);
  }

  private typeNext(): void {
    const current = this.typed();
    if (current.length >= this.label.length) return;
    this.typed.set(this.label.slice(0, current.length + 1));
    this.timer = setTimeout(() => this.typeNext(), 45);
  }

  private finish(): void {
    this.hasTyped = true;
    this.typed.set(this.label);
  }
}
