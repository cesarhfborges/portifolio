import {Curriculo} from './curriculo';

describe('Curriculo', () => {
  it('should create an instance', () => {
    expect(new Curriculo({
      nome: 'Exemplo',
      titulo: 'Torneiro',
      residencia: 'Brasília, DF, Brasil',
      sobre: '',
      conhecimentosAdicionais: '',
      foto: 'assets/example.jpg'
    })).toBeTruthy();
  });
});
