import {AfterViewInit, Component, Renderer2, ViewChild} from '@angular/core';
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
import {format, parse} from 'date-fns';
import {Curriculo} from '../models/curriculo';
import {Educacao} from '../models/educacao';
import {Link} from '../models/link';
import {Framework as Frmwork} from '../models/framework';
import {Formacao} from '../models/formacao';
import {Certificacao} from '../models/certificacao';
import {Capacitacao} from '../models/capacitacao';
import {Experiencia} from '../models/experiencia';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {DomSanitizer} from '@angular/platform-browser';

import * as pdfmake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import {TDocumentDefinitions} from 'pdfmake/interfaces';
import {ptBR} from 'date-fns/locale';

(<any>pdfmake).vfs = pdfFonts.pdfMake.vfs;

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
export class HomeComponent implements AfterViewInit {

  @ViewChild('dialog') dialog: any;
  @ViewChild('loadingPDF') loadingPDF: any;

  curriculo: Curriculo = new Curriculo({
    nome: 'César Henrique',
    sobrenome: 'Ferreira Borges',
    titulo: 'Programador Sênior',
    civil: 'Solteiro',
    sexo: 'Masculino',
    residencia: 'Brasília, DF, Brasil',
    dataNasc: parse('22/07/1990', 'dd/MM/yyyy', new Date()),
    sobre: 'Como profissional na área de TI adquiri experiência em desenvolvimento de software e sistemas em linguagens Java, PHP, Python, JavaScript/Typescript, Dart, C++, VBScript, Pascal, Banco de dados – Oracle, MySQL, MSSql, SQLite, Firebase, Node, desenvolvimento de aplicativos Android, experiencia em framework: laravel 5.8+, yii2, php-slim, zend2, angular6+, vue, ionic, react, frameworks visuais bootstrap 4-3, materialize, component pack primeng, primefaces, nebular, além de conhecimento e experiencia usando responsividade.',
    conhecimentosAdicionais: 'Outros conhecimentos e informações: GSuite, Social Login (facebook, google, git), telegram, Totvs RM api soap e estrutura de banco, SpCom api, sendgrid api, zabbix api, pusher, sockets, upload, sistemas legados em delphi e C#, DB2, java.',
    foto: 'assets/imgs/perfil.jpg'
  });

  icons = {
    star: faStar,
    fractionStar: faStarHalfStroke
  };

  constructor(
    private renderer: Renderer2,
    private dialogService: NbDialogService,
    protected _sanitizer: DomSanitizer,
    private toastrService: NbToastrService
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

  generateCurriculo(): void {
    const dialog = this.dialogService.open(this.loadingPDF);
    try {
      // throw new Error('Method not implemented.');
      const docDefinition: TDocumentDefinitions = {
        info: {
          author: this.curriculo.nome,
          creator: this.curriculo.nome,
          title: 'Currículo',
          keywords: 'curriculo, cv, curriculum, personal, resume, pdf, print',
          modDate: new Date(),
          subject: 'Currículo',
        },
        pageOrientation: 'portrait',
        pageMargins: [16, 12],
        pageSize: 'A4',
        content: [
          {text: 'Currículo', style: 'header'},
          {image: this.curriculo.tempFoto, style: 'foto', width: 84, height: 84, relativePosition: {x: -20, y: 40}},
          {text: 'Informações pessoais:', style: 'subheader'},
          {text: `Nome: ${this.curriculo.nome} ${this.curriculo.sobrenome}`, style: 'text'},
          {text: `Sexo: ${this.curriculo.sexo}`, style: 'text'},
          {text: `Data de nascimento: ${format(this.curriculo.dataNasc, 'dd/MM/yyyy')}`, style: 'text'},
          {
            text: `Telefones: ${this.curriculo.links.filter(l => l.type === 'telefone').map(l => l.label).join(' / ')}`,
            style: 'text'
          },
          {
            text: `E-Mail: ${this.curriculo.links.filter(l => l.type === 'email').map(l => l.label).join(' / ')}`,
            style: 'text'
          },
          {
            text: `GitHub: ${this.curriculo.links.filter(l => l.type === 'link' && l.url.includes('github')).map(l => l.url.substring('https://'.length)).join(' / ')}`,
            style: 'text'
          },
          {
            text: `LinkedIn: ${this.curriculo.links.filter(l => l.type === 'link' && l.url.includes('linkedin')).map(l => l.url.substring('https://'.length)).join(' / ')}`,
            style: 'text'
          },
          {text: this.curriculo.sobre, style: 'text', margin: [16, 28, 16, 16]},
          {text: 'Formação acadêmica:', style: 'subheader'},
          {
            ul: this.curriculo.educacao.map(i => ({text: i.curso + ' - ' + i.instituicao})),
            style: 'text',
          },
          {text: 'Formação técnica:', style: 'subheader'},
          {
            ul: this.curriculo.formacao.map(i => [
              {text: i.curso + ' - ' + i.instituicao},
              ...i.itens.map(j => ({text: '- ' + j, type: 'none', style: 'subText'}))
            ]),
            headlineLevel: 10,
            style: 'text',
            decorationStyle: 'wavy',
            decorationColor: '#e30000',
          },
          {text: 'Certificações:', style: 'subheader'},
          {ul: this.curriculo.certificacoes.map(i => ({text: i.nome + ' - ' + i.instituicao})), style: 'text'},
          {text: 'Outras capacitações:', style: 'subheader'},
          {ul: this.curriculo.outrasCapacitacoes.map(i => ({text: i.nome + ' - ' + i.empresa})), style: 'text'},
          {text: this.curriculo.conhecimentosAdicionais, style: 'text', margin: [16, 8, 16, 8]},
          {text: 'Experiência profissional:', style: 'subheader'},
          {
            ul: this.curriculo.experiencias.map(i => [
              {text: 'EMPRESA: ' + i.empresa, type: 'square', margin: [0, 8, 0, 0]},
              {text: 'FUNÇÃO: ' + i.funcao, type: 'square'},
              {
                text: 'PERÍODO: ' + format(i.periodoStart, 'MM/yyyy') + ' - ' + (i.periodoEnd ? format(i.periodoEnd, 'MM/yyyy') : 'atual'),
                type: 'square'
              },
              ...i.itens.map(j => ({text: '- ' + j, type: 'none', style: 'subText'})),
            ]),
            headlineLevel: 0,
            style: 'text',
            type: 'none',
            decorationStyle: 'wavy',
            decorationColor: '#e30000',
          },
          {
            text: format(new Date(), 'dd \'de\' MMMM \'de\' yyyy', {locale: ptBR}) + ` - ${this.curriculo.residencia}`,
            style: 'rodape'
          },
          {text: 'Baixar versão atualizada', link: 'https://portifolio.chfb.com.br', style: 'link'}
        ],
        styles: {
          header: {
            fontSize: 32,
            bold: false,
            alignment: 'center',
            margin: [0, 12, 0, 8]
          },
          subheader: {
            fontSize: 16,
            bold: true,
            margin: [16, 20, 0, 4]
          },
          text: {
            fontSize: 12,
            bold: false,
            margin: [16, 0, 16, 2]
          },
          subText: {
            fontSize: 12,
            bold: false,
            margin: [6, 3, 0, 0],
          },
          foto: {
            alignment: 'right',
          },
          rodape: {
            alignment: 'center',
            fontSize: 8,
            margin: [0, 32, 0, 0]
          },
          link: {
            alignment: 'center',
            fontSize: 8,
            margin: [0, 4, 0, 0]
          },
          tableExample: {
            margin: [0, 0, 0, 0]
          }
        }
      };
      // pdfmake.createPdf(docDefinition).getDataUrl((data) => {
      //   this.dialogService.open(this.dialog, {context: this._sanitizer.bypassSecurityTrustResourceUrl(data + '#toolbar=1&view=fitH')});
      // });
      setTimeout(() => {
        dialog.close();
        this.toastrService.show('PDF gerado com sucesso.', `:)`, {
          status: 'success',
          preventDuplicates: true,
          icon: 'checkmark-outline',
          hasIcon: true,
          destroyByClick: true,
          duration: 5000
        });
        pdfmake.createPdf(docDefinition).download(`${this.curriculo.nome} - ${this.curriculo.titulo}.pdf`);
      }, 1100);
    } catch (e) {
      dialog.close();
      this.toastrService.show('Parece que alguma coisa não deu certo, já registrei aqui e logo que possível vou ajustar.', `:(`, {
        status: 'warning',
        preventDuplicates: true,
        icon: 'checkmark-outline',
        hasIcon: true,
        destroyByClick: true,
        duration: 5000
      });
    }
  }

  ngAfterViewInit(): void {
    // this.generateCurriculo();
  }

  private initialize(): void {
    this.curriculo.links = [
      new Link({
        label: 'cesarhfborges@gmail.com',
        url: 'mailto:cesarhfborges@gmail.com',
        icon: faAt,
        type: 'email'
      }),
      new Link({
        label: 'cesarhfborges',
        url: 'https://github.com/cesarhfborges',
        icon: faGithub,
        type: 'link'
      }),
      new Link({
        label: 'LinkedIn',
        url: 'https://www.linkedin.com/in/cesar-henrique-ferreira-borges',
        icon: faLinkedin,
        type: 'link'
      }),
      new Link({
        label: '(61) 99150-8973',
        url: 'https://api.whatsapp.com/send?phone=61991508973&text=Ola,%20teste',
        icon: faWhatsapp,
        type: 'telefone'
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
      }),
      new Formacao({
        curso: 'Quarkus 3 - Java',
        instituicao: 'Udemy',
        itens: [
          'Panache Entity',
          'Databases, JDBC, SQL',
          'Followers, Verbos HTTP, request e response',
          'Swagger',
          'Entity Relations',
          'Testes Automatizados',
        ]
      }),
      new Formacao({
        curso: 'Spring Boot Expert: JPA, RESTFul API, Security, JWT - Java',
        instituicao: 'Udemy',
        itens: [
          'Persistência Usando JPA',
          'Beans e Validators',
          'Security e JWT',
          'Swagger',
          'Build e Deploy'
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
