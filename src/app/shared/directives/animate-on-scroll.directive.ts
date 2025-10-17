import {Directive, ElementRef, HostBinding, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appAnimateOnScroll]',
  standalone: false
})
export class AnimateOnScrollDirective implements OnInit {
  @Input('appAnimateOnScroll') animationTriggerName: string = '';
  @HostBinding('@.disabled') animationDisabled = true;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    // Verifica se o navegador suporta Intersection Observer
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            // Quando o elemento está visível (intersecção > 0)
            if (entry.isIntersecting) {
              // Dispara a animação (desabilita a desabilitação)
              this.animationDisabled = false;

              // Se você quer que a animação só ocorra uma vez:
              observer.unobserve(this.el.nativeElement);
            }
          });
        },
        // Opções: rootMargin e threshold
        { threshold: 0.1 } // Dispara quando 10% do elemento está visível
      );

      observer.observe(this.el.nativeElement);

    } else {
      // Fallback para navegadores antigos: dispara a animação imediatamente
      this.animationDisabled = false;
    }
  }
}
