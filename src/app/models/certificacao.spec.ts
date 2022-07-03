import { Certificacao } from './certificacao';
import {parse} from 'date-fns';

describe('Certificacao', () => {
  it('should create an instance', () => {
    expect(new Certificacao({
      nome: 'Certified engineer 2017-PHP',
      instituicao: 'Zend',
      data: parse('01/04/2019', 'dd/MM/yyyy', new Date()),
    })).toBeTruthy();
  });
});
