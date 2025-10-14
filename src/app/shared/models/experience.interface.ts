export interface Experience {
  id: number;
  duration: {
    from: Date;
    to?: Date;
  }
  title: string;
  company: string;
}
