import {Component, HostListener, OnInit} from '@angular/core';
import {faArrowUp} from "@fortawesome/free-solid-svg-icons";
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-scroll-to-top',
  standalone: false,
  templateUrl: './scroll-to-top.component.html',
  styleUrl: './scroll-to-top.component.css',
  animations: [
    trigger('fadeAnimation', [
      transition(':enter', [
        style({opacity: 0}),
        animate('300ms ease-in', style({opacity: 1}))
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({opacity: 0}))
      ])
    ])
  ]
})
export class ScrollToTopComponent implements OnInit {
  readonly SCROLL_THRESHOLD = 50;

  faArrowUp = faArrowUp;
  isVisible = false;

  ngOnInit(): void {
    this.handleScroll();
  }

  @HostListener('window:scroll', ['$event'])
  handleScroll(): void {
    this.isVisible = window.scrollY > this.SCROLL_THRESHOLD;
  }

  onClickBtn(): void {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }
}
