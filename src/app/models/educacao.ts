export class Educacao {
  instituicao: string;
  curso: string;
  conclusao: Date;
  concluido: boolean;


  constructor(options: {
    instituicao: string,
    curso: string,
    conclusao: Date,
    concluido?: boolean
  }) {
    this.instituicao = options.instituicao;
    this.curso = options.curso;
    this.conclusao = options.conclusao;
    this.concluido = options.concluido ?? false;
  }

  getStatus(): string {
    return this.concluido ? 'Concluído' : 'Em andamento';
  }
}
