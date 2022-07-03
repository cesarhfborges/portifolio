import {IconDefinition} from '@fortawesome/fontawesome-common-types';

export class Link {
  label: string;
  url: string;
  icon: IconDefinition;


  constructor(options: { label: string, url: string, icon: IconDefinition }) {
    this.label = options.label;
    this.url = options.url;
    this.icon = options.icon;
  }
}
