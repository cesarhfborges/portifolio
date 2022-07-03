export class Certificacao {
  nome: string;
  instituicao: string;
  data: Date;


  constructor(options: {nome: string, instituicao: string, data: Date}) {
    this.nome = options.nome;
    this.instituicao = options.instituicao;
    this.data = options.data;
  }
}
