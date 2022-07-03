import {Framework} from './framework';

describe('Framework', () => {
  it('should create an instance', () => {
    expect(new Framework({
      icon: undefined,
      iconColor: '',
      label: '',
      rate: 0
    })).toBeTruthy();
  });
});
