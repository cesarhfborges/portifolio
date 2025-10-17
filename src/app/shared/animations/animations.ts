import {animate, style, transition, trigger} from '@angular/animations';

const animations: any[] = [
  trigger('leftToRight', [
    transition(':enter', [
      style({ opacity: 0, transform: 'translateX(-180%)' }), // Starting styles
      animate('500ms ease-in', style({ opacity: 1, transform: 'translateX(0)' })) // Ending styles and duration
    ])
  ]),
  trigger('rightToLeft', [
    transition(':enter', [
      style({ opacity: 0, transform: 'translateX(180%)' }), // Starting styles
      animate('500ms ease-in', style({ opacity: 1, transform: 'translateX(0)' })) // Ending styles and duration
    ])
  ]),
];

export default animations
