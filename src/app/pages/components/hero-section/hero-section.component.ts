import {Component, computed, inject, OnDestroy, OnInit, signal} from '@angular/core';
import type {HLJSApi} from 'highlight.js';
import {faFileDownload} from '@fortawesome/free-solid-svg-icons';
import {faGithub, faLinkedin, faTelegram, faWhatsapp} from '@fortawesome/free-brands-svg-icons';
import {faEnvelope} from '@fortawesome/free-regular-svg-icons';
import {personalData} from '../../../shared/data/personal.data';
import {TranslateService} from '@ngx-translate/core';
import animations from '../../../shared/animations/animations';
import {differenceInYears} from 'date-fns';

/** Carrega o highlight.js sob demanda (fora do bundle inicial). */
async function loadHighlighter(): Promise<HLJSApi> {
  const [{default: hljs}, {default: typescript}] = await Promise.all([
    import('highlight.js/lib/core'),
    import('highlight.js/lib/languages/typescript'),
  ]);
  hljs.registerLanguage('typescript', typescript);
  return hljs;
}

/** Caracteres digitados por "tecla" e intervalo entre teclas (ms). */
const CHARS_PER_TICK = 3;
const TICK_MS = 18;
const TERMINAL_COMMAND = 'person.hireable()';

@Component({
  selector: 'app-hero-section',
  standalone: false,
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css',
  animations: animations
})
export class HeroSectionComponent implements OnInit, OnDestroy {

  personalData = personalData;
  faGithub = faGithub;
  faLinkedin = faLinkedin;
  faDownload = faFileDownload;
  faEnvelope = faEnvelope;
  faWhatsapp = faWhatsapp;
  faTelegram = faTelegram;

  private readonly _service = inject(TranslateService);
  private timer?: ReturnType<typeof setTimeout>;
  private destroyed = false;

  /** Código completo — calculado uma vez (a idade muda no máximo por dia). */
  readonly fullCode = this.codeString;
  readonly lineNumbers = this.fullCode.split('\n').map((_, i) => i + 1);

  private readonly hljs = signal<HLJSApi | null>(null);
  private readonly typedLength = signal(0);
  readonly terminalTyped = signal('');
  readonly showResult = signal(false);
  readonly codeDone = computed(() => this.typedLength() >= this.fullCode.length);

  /** HTML destacado do trecho já digitado + cursor piscando no final. */
  readonly typedHtml = computed(() => {
    const code = this.fullCode.slice(0, this.typedLength());
    const hljs = this.hljs();
    const html = hljs ? hljs.highlight(code, {language: 'typescript'}).value : escapeHtml(code);
    return this.codeDone() ? html : html + '<span class="type-caret"></span>';
  });

  readonly terminalCommand = TERMINAL_COMMAND;

  ngOnInit(): void {
    const ready = loadHighlighter()
      .then(hljs => this.hljs.set(hljs))
      .catch(() => undefined); // sem destaque, o código aparece em texto puro

    const reduceMotion = typeof window !== 'undefined'
      && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      this.typedLength.set(this.fullCode.length);
      this.terminalTyped.set(TERMINAL_COMMAND);
      this.showResult.set(true);
      return;
    }
    // espera o highlighter e a animação de entrada da janela antes de digitar
    const minDelay = new Promise(resolve => setTimeout(resolve, 550));
    Promise.all([ready, minDelay]).then(() => {
      if (!this.destroyed) this.typeCode();
    });
  }

  ngOnDestroy(): void {
    this.destroyed = true;
    clearTimeout(this.timer);
  }

  private typeCode(): void {
    let next = this.typedLength() + CHARS_PER_TICK;
    // pula a indentação de uma vez, como um editor faria
    while (this.fullCode[next] === ' ' && this.fullCode[next - 1] === ' ') next++;
    this.typedLength.set(Math.min(next, this.fullCode.length));

    if (this.codeDone()) {
      this.timer = setTimeout(() => this.typeTerminal(), 400);
    } else {
      this.timer = setTimeout(() => this.typeCode(), TICK_MS);
    }
  }

  private typeTerminal(): void {
    const current = this.terminalTyped();
    if (current.length < TERMINAL_COMMAND.length) {
      this.terminalTyped.set(TERMINAL_COMMAND.slice(0, current.length + 1));
      this.timer = setTimeout(() => this.typeTerminal(), 45);
    } else {
      this.timer = setTimeout(() => this.showResult.set(true), 350);
    }
  }

  get whatsappLink(): string {
    return `https://wa.me/${personalData.phone}?text=Hello`;
  }

  get telegramLink(): string {
    return `https://t.me/${personalData.telegram}`;
  }

  get codeString(): string {
    return `const person: Coder = {
  name: 'César Borges',
  age: ${differenceInYears(new Date(), new Date('1990-07-22'))},
  coding: [
    'JavaScript', 'TypeScript', 'PHP',
    'Java', 'Python'
  ],
  frameworks: [
    'Angular', 'React', 'React Native', 'Vue',
    'Laravel', 'Spring Boot', 'Quarkus',
    'Node', 'Express', 'Next.js', 'NestJS'
  ],
  databases: [
    'MySQL', 'MariaDB', 'MongoDB', 'PostgreSQL',
    'Firebase', 'SQLServer', 'Oracle', 'SQLite'
  ],
  cache: ['Redis', 'Memcached'],
  tools: [
    'Postman', 'Insomnia', 'SoapUI', 'Mockoon',
    'JMeter', 'Power BI', 'DBeaver', 'Appwrite',
    'Supabase', 'PocketBase', 'Socket.IO'
  ],
  hardWorker: true,
  quickLearner: true,
  problemSolver: true,
  hireable: function () {
    return (
      this.hardWorker &&
      this.problemSolver &&
      this.coding.length >= 5
    );
  },
};`;
  }

  getInstantTranslation() {
    let text: string = this._service.instant('app.heroSection.text');
    const nameSpan = `<span class="text-pink-500">${this.personalData.name}</span>`;
    const txt = this._service.instant('app.heroSection.designation');
    const designationSpan = `<span class="text-[#16f2b3]">${txt}</span>`;
    text = text.replace('%USERNAME%', nameSpan);
    text = text.replace('%USERNAME%', nameSpan);
    text = text.replace('%DESIGNATION%', designationSpan);
    text = text.replaceAll('\n', '<br>');
    return text;
  }
}

function escapeHtml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
