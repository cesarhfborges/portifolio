export class Formacao {
  curso: string;
  instituicao: string;
  itens: Array<string>;

  constructor(options: {curso: string, instituicao: string, itens: Array<string>}) {
    this.curso = options.curso;
    this.instituicao = options.instituicao;
    this.itens = options.itens;
  }
}
