import {animate, style, transition, trigger} from '@angular/animations';

const animations: any[] = [
  trigger('leftToRight', [
    transition(':enter', [
      // deslocamento pequeno: com -180% o elemento saía da tela e gerava scroll horizontal na carga
      style({ opacity: 0, transform: 'translateX(-48px)' }),
      animate('600ms cubic-bezier(.2, .8, .2, 1)', style({ opacity: 1, transform: 'translateX(0)' }))
    ])
  ]),
  trigger('rightToLeft', [
    transition(':enter', [
      style({ opacity: 0, transform: 'translateX(48px)' }),
      animate('600ms cubic-bezier(.2, .8, .2, 1)', style({ opacity: 1, transform: 'translateX(0)' }))
    ])
  ]),
];

export default animations
