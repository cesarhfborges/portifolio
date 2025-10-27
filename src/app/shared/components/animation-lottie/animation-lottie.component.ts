import {Component, Input} from '@angular/core';
import {AnimationOptions} from 'ngx-lottie';
import player from 'lottie-web';


export function playerFactory() {
  return player;
}

@Component({
  selector: 'app-animation-lottie',
  standalone: false,
  templateUrl: './animation-lottie.component.html',
  styleUrl: './animation-lottie.component.css'
})
export class AnimationLottieComponent {
  @Input() set animationPath(value: any) {
    this.options = {
      ...this.options,
      animationData: value
    };
  }

  @Input() set width(value: string) {
    this.styles = {
      ...this.styles,
      width: value
    };
  }

  options: AnimationOptions = {
    path: '',
    loop: true,
    autoplay: true
  };

  styles: any = {
    width: '95%'
  };
}
