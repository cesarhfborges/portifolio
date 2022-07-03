import {format} from 'date-fns';

export class Experiencia {
  empresa: string;
  funcao: string;
  itens: string[];
  periodoStart: Date;
  periodoEnd: Date | undefined;


  constructor(
    options: {
      empresa: string,
      funcao: string,
      itens: string[]
      periodoStart: Date,
      periodoEnd?: Date,
    }
  ) {
    this.empresa = options.empresa;
    this.funcao = options.funcao;
    this.itens = options.itens;
    this.periodoStart = options.periodoStart;
    this.periodoEnd = options.periodoEnd ?? undefined;
  }

  get periodo(): string {
    return `${format(this.periodoStart, 'MM/yyyy')} - ${this.periodoEnd ? format(this.periodoEnd, 'MM/yyyy') : 'Atual'}`;
  }
}
