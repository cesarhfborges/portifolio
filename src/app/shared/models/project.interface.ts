export interface Project {
  name: string;
  description: string;
  tags: string[];
  code: string;
  demo: string;
  image?: {
    src: string;
  };
  features?: string[];
}
