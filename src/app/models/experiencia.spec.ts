import {Experiencia} from './experiencia';

describe('Experiencia', () => {
  it('should create an instance', () => {
    expect(new Experiencia({
      empresa: '',
      funcao: '',
      itens: [],
      periodoStart: new Date(),
      periodoEnd: undefined
    })).toBeTruthy();
  });
});
