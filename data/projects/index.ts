import { Project } from '../types';
import { bocciShowroom } from './bocci-showroom';

// Add next/previous project references
const allProjects: Project[] = [
  bocciShowroom,
  // Add more projects here
];

// Add next/previous project references
export const projects: Project[] = allProjects.map((project, index) => ({
  ...project,
  nextProject: index < allProjects.length - 1 
    ? { 
        id: allProjects[index + 1].id,
        title: allProjects[index + 1].title
      }
    : undefined,
  previousProject: index > 0
    ? {
        id: allProjects[index - 1].id,
        title: allProjects[index - 1].title
      }
    : undefined
}));
