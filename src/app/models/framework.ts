export class Framework {
  label: string;
  icon: any;
  iconColor: string;
  rate: number;

  constructor(options: { label: string, icon: any, iconColor: string, rate: number }) {
    this.label = options.label;
    this.icon = options.icon;
    this.iconColor = options.iconColor;
    this.rate = options.rate;
  }
}
