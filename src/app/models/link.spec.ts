import {Link} from './link';
import {faStar} from '@fortawesome/free-solid-svg-icons';

describe('Link', () => {
  it('should create an instance', () => {
    expect(new Link({
      icon: faStar,
      label: 'star',
      url: 'http://localhost:8080/star'
    })).toBeTruthy();
  });
});
