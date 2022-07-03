export class Capacitacao {
  nome: string;
  empresa: string;
  data: Date;

  constructor(options: {nome: string, empresa: string, data: Date}) {
    this.nome = options.nome;
    this.empresa = options.empresa;
    this.data = options.data;
  }
}
