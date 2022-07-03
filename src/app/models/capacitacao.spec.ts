import {Capacitacao} from './capacitacao';
import {parse} from 'date-fns';

describe('Capacitacao', () => {
  it('should create an instance', () => {
    expect(new Capacitacao({
      nome: 'Curso Técnico de Montagem e Manutenção de Microcomputadores',
      empresa: 'SENAC DF',
      data: parse('01/01/2019', 'dd/MM/yyyy', new Date()),
    })).toBeTruthy();
  });
});
