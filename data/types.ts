export interface ProjectSection {
  title?: string;
  content?: string[];
  image?: string;
  imageAlt?: string;
  imageCaption?: string;
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
  id: number;
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
    id: number;
    title: string;
  };
  previousProject?: {
    id: number;
    title: string;
  };
}
