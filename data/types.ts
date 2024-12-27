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

export interface Project {
  id: string;
  number: string;
  title: string;
  year: string;
  category: string;
  image: string;
  description: string;
  details: ProjectDetails;
  sections: ProjectSection[];
  images: string[];
  nextProject?: {
    id: string;
    title: string;
  };
  previousProject?: {
    id: string;
    title: string;
  };
}
