export interface ProjectImage {
  src: string;
  alt?: string;
  caption?: string;
}

export interface ProjectSection {
  title?: string;
  content?: string[];
  images?: ProjectImage[];
  layout?: 'single' | 'grid' | 'fullwidth' | 'sideBySide';
}

export interface ProjectDetails {
  location: string;
  year: string;
  status: string;
  area: string;
  client: string;
  architect: string;
}

export enum ProjectCategory {
  All = 'All',
  Research = 'Research',
  Product = 'Product',
  Sensorial = 'Sensorial',
  Exploration = 'Exploration',
  Education = 'Education'
}

export interface Project {
  id: string;
  number: string;
  title: string;
  description: string;
  category: ProjectCategory;
  year: string;
  images: string[];
  content: string;
  nextProject?: {
    id: string;
    title: string;
  };
  previousProject?: {
    id: string;
    title: string;
  };
}
