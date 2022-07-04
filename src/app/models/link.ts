import {IconDefinition} from '@fortawesome/fontawesome-common-types';

export class Link {
  label: string;
  url: string;
  icon: IconDefinition;
  type: 'telefone' | 'email' | 'link';


  constructor(options: { label: string, url: string, icon: IconDefinition, type: 'telefone' | 'email' | 'link' }) {
    this.label = options.label;
    this.url = options.url;
    this.icon = options.icon;
    this.type = options.type;
  }
}
