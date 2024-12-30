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

export interface ProjectTeamMember {
  name: string;
  role: string;
  url?: string;
}

export interface ProjectDetails {
  year: string;
  role: string;
  team?: ProjectTeamMember[];
}

export interface ProjectFeatured {
  url: string;
  platform: string;
  publication: string;
  type: string;
  label: string;
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
  images: string[];
  image?: string;
  content: string;
  details: ProjectDetails;
  sections?: ProjectSection[];
  featured?: ProjectFeatured;
  nextProject?: {
    id: string;
    title: string;
  };
  previousProject?: {
    id: string;
    title: string;
  };
}
