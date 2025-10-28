import {Directive, ElementRef, HostBinding, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appAnimateOnScroll]',
  standalone: false
})
export class AnimateOnScrollDirective implements OnInit {
  @Input('appAnimateOnScroll') animationTriggerName = '';
  @HostBinding('@.disabled') animationDisabled = true;

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit(): void {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              this.animationDisabled = false;
              observer.unobserve(this.el.nativeElement);
            }
          }
        },
        {threshold: 0.1}
      );

      observer.observe(this.el.nativeElement);

    } else {
      this.animationDisabled = false;
    }
  }
}
