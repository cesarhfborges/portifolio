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
  faWhatsapp,
} from '@fortawesome/free-brands-svg-icons';
import {faAt, faStar, faStarHalfStroke} from '@fortawesome/free-solid-svg-icons';
import {animate, style, transition, trigger} from '@angular/animations';
import {parse} from 'date-fns';
import {Curriculo} from '../models/curriculo';
import {Educacao} from '../models/educacao';
import {Link} from '../models/link';
import {Framework as Frmwork} from '../models/framework';
import {Formacao} from '../models/formacao';
import {Certificacao} from '../models/certificacao';
import {Capacitacao} from '../models/capacitacao';
import {Experiencia} from '../models/experiencia';

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

  curriculo: Curriculo = new Curriculo({
    nome: 'César Henrique',
    titulo: 'Programador Sênior',
    residencia: 'Brasília, DF, Brasil',
    sobre: `
    Como profissional na área de TI adquiri experiência em desenvolvimento de software e sistemas em
    linguagens Java, PHP, Python, JavaScript/Typescript, Dart, C++, VBScript, Pascal, Banco de dados –
    Oracle,
    MySQL, MSSql, SQLite, Firebase, Node, desenvolvimento de aplicativos Android, experiencia em framework:
    laravel 5.8+, yii2, php-slim, zend2, angular6+, vue, ionic, react, frameworks visuais bootstrap 4-3,
    materialize,
    component pack primeng, primefaces, nebular.
    `,
    conhecimentosAdicionais: `
    Outros conhecimentos e informações: GSuite, Social Login (facebook, google, git), telegram, Totvs RM api
    soap e estrutura de banco, SpCom api, sendgrid api, zabbix api, pusher, sockets, upload, sistemas legados
    em delphi e C#, DB2, java.
    `,
    foto: 'assets/imgs/perfil.jpg'
  });

  icons = {
    star: faStar,
    fractionStar: faStarHalfStroke
  };

  constructor(
    private renderer: Renderer2
  ) {
    this.initialize();
  }

  ngOnInit(): void {
  }

  downloadPDF() {
    const link = this.renderer.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', 'assets/curriculo.pdf');
    link.setAttribute('download', `curriculo.pdf`);
    link.click();
    link.remove();
  }

  private initialize(): void {
    this.curriculo.links = [
      new Link({
        label: 'cesarhfborges@gmail.com',
        url: 'mailto:cesarhfborges@gmail.com',
        icon: faAt,
      }),
      new Link({
        label: 'cesarhfborges',
        url: 'https://github.com/cesarhfborges',
        icon: faGithub,
      }),
      new Link({
        label: 'LinkedIn',
        url: 'https://www.linkedin.com/in/cesar-henrique-ferreira-borges/',
        icon: faLinkedin,
      }),
      new Link({
        label: '(61) 99150-8973',
        url: 'https://api.whatsapp.com/send?phone=61991508973&text=Ola,%20teste',
        icon: faWhatsapp,
      })
    ];

    this.curriculo.frameworks = [
      new Frmwork({
        label: 'Angular',
        icon: faAngular,
        iconColor: '#AF2B2D',
        rate: 9
      }),
      new Frmwork({
        label: 'PHP',
        icon: faPhp,
        iconColor: '#334280',
        rate: 8
      }),
      new Frmwork({
        label: 'Node',
        icon: faNode,
        iconColor: '#3B7F3A',
        rate: 8.5
      }),
      new Frmwork({
        label: 'React',
        icon: faReact,
        iconColor: '#3D4DB8',
        rate: 8
      }),
      new Frmwork({
        label: 'Java',
        icon: faJava,
        iconColor: '#027396',
        rate: 7.5
      }),
      new Frmwork({
        label: 'Android',
        icon: faAndroid,
        iconColor: '#8DB646',
        rate: 5.5
      }),
      new Frmwork({
        label: 'Python',
        icon: faPython,
        iconColor: '#EEC855',
        rate: 5
      }),
    ];

    this.curriculo.educacao = [
      new Educacao({
        curso: 'CEPED',
        instituicao: 'Ensino Médio',
        conclusao: parse('05/10/2017', 'dd/MM/yyyy', new Date()),
        concluido: true
      }),
      new Educacao({
        instituicao: 'Estácio de sá',
        curso: 'Sistemas de Informação (8º semestre)',
        conclusao: parse('01/01/2022', 'dd/MM/yyyy', new Date()),
        concluido: true
      })
    ];

    this.curriculo.formacao = [
      new Formacao({
        curso: 'Curso Web Designer linguagem HTML5, CSS3 e Javascript',
        instituicao: 'Curso em video',
        itens: [
          'Design Responsivo',
          'Semântica',
          'Interfaces',
        ]
      }),
      new Formacao({
        curso: 'Curso Algoritmos de programação',
        instituicao: 'Curso em video',
        itens: [
          'Estruturas de repetição',
          'Rotinas, Vetores e Matrizes',
          'Operadores lógicos, relacionais, condicionais',
        ]
      }),
      new Formacao({
        curso: 'Curso Web Designer linguagem HTML5, CSS3 e Javascript',
        instituicao: 'Curso em video',
        itens: [
          'Design Responsivo',
          'Semântica',
          'Interfaces',
        ]
      }),
      new Formacao({
        curso: 'Curso Algoritmos de programação',
        instituicao: 'Curso em video',
        itens: [
          'Estruturas de repetição',
          'Rotinas, Vetores e Matrizes',
          'Operadores lógicos, relacionais',
        ]
      }),
      new Formacao({
        curso: 'Curso Java Orientado a Objetos FJ11',
        instituicao: 'Caelum',
        itens: [
          'Bibliotecas',
          'Orientação a Objetos',
          'Collections framework',
        ]
      }),
      new Formacao({
        curso: 'Curso Java para web',
        instituicao: 'Udemy',
        itens: [
          'Sockets',
          'DAO/MySqli/Json/XML',
          'Java 8 EE',
        ]
      }),
      new Formacao({
        curso: 'Curso Android',
        instituicao: 'Udemy',
        itens: [
          'Conceitos',
          'Interface Gráfica',
          'Manipulação de Dados/Requests',
        ]
      }),
      new Formacao({
        curso: 'Curso PHP 7',
        instituicao: 'Udemy',
        itens: [
          'Sessions',
          'Orientação e Objetos',
          'Sistema de API em Json Rest/RestFull',
        ]
      }),
      new Formacao({
        curso: 'Curso IONIC 4',
        instituicao: 'Udemy',
        itens: [
          'IONIC Creator',
          'API Integrations',
          'Estruturas',
        ]
      }),
      new Formacao({
        curso: 'Curso KOTLIN Developer',
        instituicao: 'Udemy',
        itens: [
          'Estruturas',
          'Creator',
          'Services',
          'Interceptor Creator',
        ]
      }),
      new Formacao({
        curso: 'Curso Laravel 5.8',
        instituicao: 'Udemy',
        itens: [
          'Estruturas e Parâmetros',
          'MVC Eloquent / ORM / Tinker',
          'Cors, headers',
          'Eloquent',
        ]
      }),
      new Formacao({
        curso: 'SPA com Vue JS',
        instituicao: 'Udemy',
        itens: [
          'Components',
          'Templates',
          'Sevices, Interceptors',
          'Axio e API',
        ]
      }),
      new Formacao({
        curso: 'Angular 8',
        instituicao: 'Udemy',
        itens: [
          'Components',
          'Node',
          'Interface',
          'WebPack',
          'Interceptor',
        ]
      })
    ];

    this.curriculo.certificacoes = [
      new Certificacao({
        nome: 'Cerficação de Suporte',
        instituicao: 'AlterData',
        data: parse('01/06/2017', 'dd/MM/yyyy', new Date()),
      }),
      new Certificacao({
        nome: 'Cerficação Karoo',
        instituicao: 'AlterData',
        data: parse('01/07/2017', 'dd/MM/yyyy', new Date()),
      }),
      new Certificacao({
        nome: 'Certified engineer 2017-PHP',
        instituicao: 'Zend',
        data: parse('01/04/2019', 'dd/MM/yyyy', new Date()),
      }),
    ];

    this.curriculo.outrasCapacitacoes = [
      new Capacitacao({
        nome: 'Curso Técnico de Montagem e Manutenção de Microcomputadores',
        empresa: 'SENAC DF',
        data: parse('01/01/2019', 'dd/MM/yyyy', new Date()),
      }),
      new Capacitacao({
        nome: 'Curso Técnico de Manutenção de notebooks e placas em geral',
        empresa: 'CAPACITA TI',
        data: parse('01/01/2019', 'dd/MM/yyyy', new Date()),
      }),
      new Capacitacao({
        nome: 'Dark Mira PHP',
        empresa: 'Dark Mira',
        data: parse('01/01/2019', 'dd/MM/yyyy', new Date()),
      })
    ];

    this.curriculo.experiencias = [
      new Experiencia({
        empresa: 'CooperSystem',
        funcao: 'Programador Sênior',
        // periodo: '01/2021 - Atual',
        periodoStart: parse('01/01/2021', 'dd/MM/yyyy', new Date()),
        itens: [
          'Linguagens: Java 8 e 11 (SpringBoot, Quarkus),Typescript (Angular, React), Javascript.',
          'Api/WebService: Rest, Operações bancarias',
          'Frameworks visuais: Bootstrap, Material, PrimeNg, Nebular e Interna.',
        ]
      }),
      new Experiencia({
        empresa: 'Brasal',
        funcao: 'Programador Pleno',
        periodoStart: parse('01/08/2020', 'dd/MM/yyyy', new Date()),
        periodoEnd: parse('01/12/2020', 'dd/MM/yyyy', new Date()),
        itens: [
          'Linguagens: PHP 5 a 7.4 (Laravel, Lumen), Typescript (Angular, Vue, Ionic, React native), Javascript/Jquery, Node',
          'Api/WebService: Rest/RestFull, SOAP, Json',
          'Frameworks visuais: Bootstrap, Material, PrimeNG, Nebular, Argon, Paper.',
          'DB: SqlServer, MySql, Oracle.',
        ]
      }),
      new Experiencia({
        empresa: 'Campanha Nacional das Escolas da Comunidade - CNEC',
        funcao: 'Programador Pleno',
        periodoStart: parse('01/01/2019', 'dd/MM/yyyy', new Date()),
        periodoEnd: parse('01/08/2020', 'dd/MM/yyyy', new Date()),
        itens: [
          'Linguagens: PHP 5, 7.4 (Laravel, Yii2), Typescript (Angular, Vue, Ionic), Javascript/Jquery, python.',
          'Api/WebService: Rest, SOAP, integração (TOTVS, Cielo, SPCOM, Google)',
          'Frameworks visuais: Bootstrap, Material, Primefaces.',
          'DB: SqlServer, MySql.',
        ]
      }),
      new Experiencia({
        empresa: 'Sebrae DF',
        funcao: 'Programador Pleno',
        periodoStart: parse('01/10/2019', 'dd/MM/yyyy', new Date()),
        periodoEnd: parse('01/12/2019', 'dd/MM/yyyy', new Date()),
        itens: [
          'Linguagens: PHP 5 (Laravel, PHPSlim), Javascript/Jquery',
          'Api/WebService: Rest, SOAP, integração (TOTVS, LDAP)',
          'DB: SqlServer, MySql.',
        ]
      }),
      new Experiencia({
        empresa: 'SdRedes',
        funcao: 'Programador Pleno / Coordenador de Desenvolvimento',
        periodoStart: parse('01/08/2018', 'dd/MM/yyyy', new Date()),
        periodoEnd: parse('01/10/2019', 'dd/MM/yyyy', new Date()),
        itens: [
          'Técnologias: PHP 7+ (Laravel, PHPSlim), Typescript (Angular, Vue, Ionic, React), Javascript/Jquery, python, pascal.',
          'Api/WebService: Rest, SOAP, integração (TOTVS, SendGrid, Sophos firewall, LDAP, Google, Facebook)',
          'DB: SqlServer, MySql, mongo, firebase.',
        ]
      }),
      new Experiencia({
        empresa: 'Recopeças Industrial LTDA (PLATOFLEX)',
        funcao: 'Programador',
        periodoStart: parse('01/03/2011', 'dd/MM/yyyy', new Date()),
        periodoEnd: parse('01/07/2018', 'dd/MM/yyyy', new Date()),
        itens: [
          'Linguagens: PHP 5+ (PHPSlim, Yii2), Typescript (Angular), Javascript/Jquery.',
          'Api/WebService: Rest, SOAP, integração (Cigam ERP)',
          'Frameworks visuais: Bootstrap, Material.',
          'DB: SqlServer, MySql, Oracle XE, SQLite. (Ms Access em algumas situações)',
        ]
      })
    ];
  }
}
