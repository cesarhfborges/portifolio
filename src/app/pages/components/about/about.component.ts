import {AfterViewInit, Component, ElementRef, inject, OnDestroy, signal} from '@angular/core';
import {differenceInYears, min} from 'date-fns';
import {personalData} from '../../../shared/data/personal.data';
import {experiences} from '../../../shared/data/experience.data';
import {skillsData} from '../../../../utils/data/skills.data';
import {educationsData} from '../../../../utils/data/educations.data';

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

const COUNT_DURATION_MS = 1400;

@Component({
  selector: 'app-about',
  standalone: false,
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent implements AfterViewInit, OnDestroy {
  readonly personalData = personalData;

  /** Anos desde a primeira experiência — nunca fica desatualizado como um número fixo no texto. */
  readonly years = differenceInYears(new Date(), min(experiences.map(e => e.duration.from)));

  /** Emprego atual = experiência sem data de fim. */
  readonly current = experiences.find(e => !e.duration.to);

  /** Números calculados a partir dos dados do próprio portfólio. */
  readonly stats: Stat[] = [
    {value: this.years, suffix: '+', label: 'app.about.stat_years'},
    {value: experiences.length, suffix: '', label: 'app.about.stat_companies'},
    {value: new Set(skillsData).size, suffix: '+', label: 'app.about.stat_techs'},
    {value: educationsData.length, suffix: '', label: 'app.about.stat_courses'},
  ];

  /** Valor exibido em cada contador (anima de 0 até o valor real). */
  readonly displayed = signal<number[]>(this.stats.map(() => 0));

  private observer?: IntersectionObserver;
  private frame?: number;
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  ngAfterViewInit(): void {
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || typeof IntersectionObserver === 'undefined') {
      this.displayed.set(this.stats.map(s => s.value));
      return;
    }
    this.observer = new IntersectionObserver(entries => {
      if (entries.some(e => e.isIntersecting)) {
        this.observer?.disconnect();
        this.countUp();
      }
    }, {threshold: 0.3});
    const target = this.host.nativeElement.querySelector('.about-stats') ?? this.host.nativeElement;
    this.observer.observe(target);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    if (this.frame) cancelAnimationFrame(this.frame);
  }

  /** Substitui o %YEARS% dos textos traduzidos. */
  withYears(text: string): string {
    return text.replace('%YEARS%', String(this.years));
  }

  private countUp(): void {
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / COUNT_DURATION_MS);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
      this.displayed.set(this.stats.map(s => Math.round(s.value * eased)));
      if (t < 1) this.frame = requestAnimationFrame(step);
    };
    this.frame = requestAnimationFrame(step);
  }
}
