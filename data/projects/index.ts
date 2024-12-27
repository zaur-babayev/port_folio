import { Project } from '../types';


// Convert JSON to Project type

// Export all projects
export const projects: Project[] = [
];

// Add next/previous project references
projects.forEach((project, index) => {
  if (index < projects.length - 1) {
    project.nextProject = {
      id: projects[index + 1].id,
      title: projects[index + 1].title
    };
  }
  if (index > 0) {
    project.previousProject = {
      id: projects[index - 1].id,
      title: projects[index - 1].title
    };
  }
});
