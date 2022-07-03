import {Framework} from './framework';
import {Educacao} from './educacao';
import {Formacao} from './formacao';
import {Certificacao} from './certificacao';
import {Capacitacao} from './capacitacao';
import {Experiencia} from './experiencia';
import {Link} from './link';

export class Curriculo {
  nome: string;
  titulo: string;
  residencia: string;
  sobre: string;
  conhecimentosAdicionais: string;
  foto: string;

  constructor(
    options: {
      nome: string,
      titulo: string,
      residencia: string,
      sobre: string,
      conhecimentosAdicionais: string,
      foto: string,
    }
  ) {
    this.nome = options.nome;
    this.titulo = options.titulo;
    this.residencia = options.residencia;
    this.sobre = options.sobre;
    this.conhecimentosAdicionais = options.conhecimentosAdicionais;
    this.foto = options.foto;

    this._links = [];
    this._frameworks = [];
    this._educacao = [];
    this._formacao = [];
    this._certificacoes = [];
    this._outrasCapacitacoes = [];
    this._experiencias = [];
  }

  private _links: Link[];

  get links(): Link[] {
    return this._links;
  }

  set links(value: Link[]) {
    this._links = value;
  }

  private _educacao: Educacao[];

  get educacao(): Educacao[] {
    return this._educacao;
  }

  set educacao(value: Educacao[]) {
    this._educacao = value;
  }

  private _formacao: Formacao[];

  get formacao(): Formacao[] {
    return this._formacao;
  }

  set formacao(value: Formacao[]) {
    this._formacao = value;
  }

  private _certificacoes: Certificacao[];

  get certificacoes(): Certificacao[] {
    return this._certificacoes.sort((a, b) => {
      if (a.data > b.data) {
        return -1;
      }
      if (b.data > a.data) {
        return 1;
      }
      return 0;
    });
  }

  set certificacoes(value: Certificacao[]) {
    this._certificacoes = value;
  }

  private _outrasCapacitacoes: Capacitacao[];

  get outrasCapacitacoes(): Capacitacao[] {
    return this._outrasCapacitacoes;
  }

  set outrasCapacitacoes(value: Capacitacao[]) {
    this._outrasCapacitacoes = value;
  }

  private _experiencias: Experiencia[];

  get experiencias(): Experiencia[] {
    return this._experiencias;
  }

  set experiencias(value: Experiencia[]) {
    this._experiencias = value;
  }

  private _frameworks: Framework[];

  get frameworks(): Framework[] {
    return this._frameworks.sort((a, b) => {
      if (a.rate > b.rate) {
        return -1;
      }
      if (b.rate > a.rate) {
        return 1;
      }
      return 0;
    });
  }

  set frameworks(value: Framework[]) {
    this._frameworks = value;
  }

  addLink(value: Link) {
    this._links.push(value);
  }

  addEducacao(value: Educacao) {
    this._educacao.push(value);
  }

  addFormacao(value: Formacao) {
    this._formacao.push(value);
  }

  addCertificacao(value: Certificacao) {
    this._certificacoes.push(value);
  }

  addOutraCapacitacao(value: Capacitacao) {
    this._outrasCapacitacoes.push(value);
  }

  addExperiencia(value: Experiencia) {
    this._experiencias.push(value);
  }

  addFramework(value: Framework) {
    this._frameworks.push(value);
  }
}
