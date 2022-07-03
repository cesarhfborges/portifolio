import {Formacao} from './formacao';

describe('Formacao', () => {
  it('should create an instance', () => {
    expect(new Formacao({
      curso: '',
      instituicao: '',
      itens: []
    })).toBeTruthy();
  });
});
