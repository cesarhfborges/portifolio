import {Component, OnInit, Renderer2} from '@angular/core';
import {
  faAndroid,
  faAngular,
  faGithub,
  faJava,
  faLinkedin,
  faNode,
  faPhp,
  faPython,
  faReact,
  faWhatsapp
} from '@fortawesome/free-brands-svg-icons';
import {faAt, faBuilding, faEarthAmericas, faPhone, faStar, faStarHalfStroke} from '@fortawesome/free-solid-svg-icons';
import {animate, style, transition, trigger} from '@angular/animations';
import {parse, parseISO} from 'date-fns';

interface Framework {
  label: string;
  icon: any;
  iconColor: string;
  rate: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('enterLeftAnimation', [
      transition(':enter', [
        style({opacity: 0, transform: 'translateX(-200px)'}),
        animate(
          '550ms ease-in',
          style({opacity: 1, transform: 'translateX(0)'})
        ),
      ]),
      transition(':leave', [
        animate(
          '550ms ease-in',
          style({opacity: 0, transform: 'translateX(-200px)'})
        ),
      ]),
    ]),
    trigger('enterRightAnimation', [
      transition(':enter', [
        style({opacity: 0, transform: 'translateX(200px)'}),
        animate(
          '550ms ease-in',
          style({opacity: 1, transform: 'translateX(0)'})
        ),
      ]),
      transition(':leave', [
        animate(
          '550ms ease-in',
          style({opacity: 0, transform: 'translateX(200px)'})
        ),
      ]),
    ]),
  ]
})
export class HomeComponent implements OnInit {

  icons = {
    world: faEarthAmericas,
    phone: faPhone,
    email: faAt,
    trabalho: faBuilding,
    star: faStar,
    fractionStar: faStarHalfStroke
  };

  frameworks: Array<Framework> = [
    {
      label: 'Angular',
      icon: faAngular,
      iconColor: '#AF2B2D',
      rate: 9
    },
    {
      label: 'PHP',
      icon: faPhp,
      iconColor: '#334280',
      rate: 8
    },
    {
      label: 'Node',
      icon: faNode,
      iconColor: '#3B7F3A',
      rate: 8.5
    },
    {
      label: 'Java',
      icon: faJava,
      iconColor: '#027396',
      rate: 7.5
    },
    {
      label: 'React',
      icon: faReact,
      iconColor: '#3D4DB8',
      rate: 6
    },
    {
      label: 'Android',
      icon: faAndroid,
      iconColor: '#8DB646',
      rate: 5.5
    },
    {
      label: 'Python',
      icon: faPython,
      iconColor: '#EEC855',
      rate: 5
    },
  ];

  links: Array<{ label: string, url: string, icon: any }> = [
    {
      label: 'cesarhfborges@gmail.com',
      url: 'mailto:cesarhfborges@gmail.com',
      icon: faAt,
    },
    {
      label: 'cesarhfborges',
      url: 'https://github.com/cesarhfborges',
      icon: faGithub,
    },
    {
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/cesar-henrique-ferreira-borges/',
      icon: faLinkedin,
    },
    {
      label: '(61) 99150-8973',
      url: 'https://api.whatsapp.com/send?phone=61991508973&text=Ola,%20teste',
      icon: faWhatsapp,
    }
  ];

  listaEducacao: Array<{ instituicao: string; curso: string; status: 'cursando' | 'concluido'; conclusao: Date; }> = [
    {
      instituicao: 'CEPED',
      curso: 'Ensino Médio',
      status: 'concluido',
      conclusao: parse('05/10/2017', 'dd/MM/yyyy', new Date())
    },
    {
      instituicao: 'Estácio de sá',
      curso: 'Sistemas de Informação (8º semestre)',
      status: 'cursando',
      conclusao: parse('01/01/2022', 'dd/MM/yyyy', new Date())
    }
  ];

  listaFormacao: Array<{
    curso: string,
    instituicao: string,
    itens: Array<string>
  }> = [
    {
      curso: 'Curso Web Designer linguagem HTML5, CSS3 e Javascript',
      instituicao: 'Curso em video',
      itens: [
        'Design Responsivo',
        'Semântica',
        'Interfaces',
      ]
    },
    {
      curso: 'Curso Algoritmos de programação',
      instituicao: 'Curso em video',
      itens: [
        'Estruturas de repetição',
        'Rotinas, Vetores e Matrizes',
        'Operadores lógicos, relacionais, condicionais',
      ]
    },
    {
      curso: 'Curso Web Designer linguagem HTML5, CSS3 e Javascript',
      instituicao: 'Curso em video',
      itens: [
        'Design Responsivo',
        'Semântica',
        'Interfaces',
      ]
    },
    {
      curso: 'Curso Algoritmos de programação',
      instituicao: 'Curso em video',
      itens: [
        'Estruturas de repetição',
        'Rotinas, Vetores e Matrizes',
        'Operadores lógicos, relacionais',
      ]
    },
    {
      curso: 'Curso Java Orientado a Objetos FJ11',
      instituicao: 'Caelum',
      itens: [
        'Bibliotecas',
        'Orientação a Objetos',
        'Collections framework',
      ]
    },
    {
      curso: 'Curso Java para web',
      instituicao: 'Udemy',
      itens: [
        'Sockets',
        'DAO/MySqli/Json/XML',
        'Java 8 EE',
      ]
    },
    {
      curso: 'Curso Android',
      instituicao: 'Udemy',
      itens: [
        'Conceitos',
        'Interface Gráfica',
        'Manipulação de Dados/Requests',
      ]
    },
    {
      curso: 'Curso PHP 7',
      instituicao: 'Udemy',
      itens: [
        'Sessions',
        'Orientação e Objetos',
        'Sistema de API em Json Rest/RestFull',
      ]
    },
    {
      curso: 'Curso IONIC 4',
      instituicao: 'Udemy',
      itens: [
        'IONIC Creator',
        'API Integrations',
        'Estruturas',
      ]
    },
    {
      curso: 'Curso KOTLIN Developer',
      instituicao: 'Udemy',
      itens: [
        'Estruturas',
        'Creator',
        'Services',
        'Interceptor Creator',
      ]
    },
    {
      curso: 'Curso Laravel 5.8',
      instituicao: 'Udemy',
      itens: [
        'Estruturas e Parâmetros',
        'MVC Eloquent / ORM / Tinker',
        'Cors, headers',
        'Eloquent',
      ]
    },
    {
      curso: 'SPA com Vue JS',
      instituicao: 'Udemy',
      itens: [
        'Components',
        'Templates',
        'Sevices, Interceptors',
        'Axio e API',
      ]
    },
    {
      curso: 'Angular 8',
      instituicao: 'Udemy',
      itens: [
        'Components',
        'Node',
        'Interface',
        'WebPack',
        'Interceptor',
      ]
    }
  ];

  listaCertificacoes: Array<string> = [
    'Cerficação de Suporte – Alterdata',
    'Cerficação Karoo – Alterdata',
    'PHP (em andamento)'
  ];

  listaOutrasCapacitacoes: Array<any> = [
    {
      nome: 'Curso Técnico de Montagem e Manutenção de Microcomputadores',
      empresa: 'SENAC DF',
    },
    {
      nome: 'Curso Técnico de Manutenção de notebooks e placas em geral',
      empresa: 'CAPACITA TI',
    },
    {
      nome: 'Dark Mira PHP',
      empresa: 'Dark Mira',
    }
  ];

  listaDeExperiencias: Array<any> = [
    {
      empresa: 'CooperSystem',
      funcao: 'Programador Sênior',
      periodo: '01/2021 - Atual',
      itens: [
        'Linguagens: Java 8 e 11 (SpringBoot, Quarkus),Typescript (Angular, React), Javascript.',
        'Api/WebService: Rest, Operações bancarias',
        'Frameworks visuais: Bootstrap, Material, PrimeNg, Nebular e Interna.',
      ]
    },
    {
      empresa: 'Campanha Nacional das Escolas da Comunidade - CNEC',
      funcao: 'Programador Pleno',
      periodo: '01/2020 - 06/2020',
      itens: [
        'Linguagens: PHP 5, 7.4 (Laravel, Yii2), Typescript (Angular, Vue, Ionic), Javascript/Jquery, python.',
        'Api/WebService: Rest, SOAP, integração (TOTVS, Cielo, SPCOM, Google)',
        'Frameworks visuais: Bootstrap, Material, Primefaces.',
        'DB: SqlServer, MySql.',
      ]
    },
    {
      empresa: 'Sebrae DF',
      funcao: 'Programador Pleno',
      periodo: '07/2019 - 12/2019',
      itens: [
        'Linguagens: PHP 5 (Laravel, PHPSlim), Javascript/Jquery',
        'Api/WebService: Rest, SOAP, integração (TOTVS, LDAP)',
        'DB: SqlServer, MySql.',
      ]
    },
    {
      empresa: 'SdRedes',
      funcao: 'Programador Pleno / Coordenador de Desenvolvimento',
      periodo: '08/2018 - 10/2019',
      itens: [
        'Técnologias: PHP 7+ (Laravel, PHPSlim), Typescript (Angular, Vue, Ionic, React), Javascript/Jquery, python, pascal.',
        'Api/WebService: Rest, SOAP, integração (TOTVS, SendGrid, Sophos firewall, LDAP, Google, Facebook)',
        'DB: SqlServer, MySql, mongo, firebase.',
      ]
    },
    {
      empresa: 'Recopeças Industrial LTDA (PLATOFLEX)',
      funcao: 'Programador',
      periodo: '03/2014 - 07/2018',
      itens: [
        'Linguagens: PHP 5+ (PHPSlim, Yii2), Typescript (Angular), Javascript/Jquery.',
        'Api/WebService: Rest, SOAP, integração (Cigam ERP)',
        'Frameworks visuais: Bootstrap, Material.',
        'DB: SqlServer, MySql, Oracle XE, SQLite. (Ms Access em algumas situações)',
      ]
    }
  ];

  constructor(
    private renderer: Renderer2
  ) {
  }

  ngOnInit(): void {
  }

  getSortedFrameWorks(): Array<Framework> {
    return this.frameworks.sort((a, b) => {
      if (a.rate > b.rate) {
        return -1;
      }
      if (b.rate > a.rate) {
        return 1;
      }
      return 0;
    });
  }

  downloadPDF() {
    const link = this.renderer.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', 'assets/curriculo.pdf');
    link.setAttribute('download', `curriculo.pdf`);
    link.click();
    link.remove();
  }
}
