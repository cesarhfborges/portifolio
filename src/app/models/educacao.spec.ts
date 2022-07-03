import {Educacao} from './educacao';

describe('Educacao', () => {
  it('should create an instance', () => {
    expect(new Educacao({
      concluido: true,
      conclusao: new Date(),
      curso: 'example curso',
      instituicao: 'example instituicao',
    })).toBeTruthy();
  });
});
