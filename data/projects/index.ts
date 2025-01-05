import { Project, ProjectCategory } from '../types';

// Import JSON files directly
import project1735317806064 from './1735317806064.json';
import project1735317812160 from './1735317812160.json';
import project1735317830179 from './1735317830179.json';
import project1735317897754 from './1735317897754.json';
import project1735324442184 from './1735324442184.json';
import project1735325292455 from './1735325292455.json';
import project1735345423275 from './1735345423275.json';
import project1735581511168 from './1735581511168.json';

function validateProject(project: any): Project {
  // If category is empty or invalid, default to 'All'
  const category = project.category || 'All';
  
  if (!Object.values(ProjectCategory).includes(category)) {
    console.warn(`Invalid category "${category}" for project "${project.title}", defaulting to "All"`);
    return {
      ...project,
      category: ProjectCategory.All
    };
  }
  
  return {
    ...project,
    category: ProjectCategory[category as keyof typeof ProjectCategory]
  };
}

// Convert to array and sort by ID (timestamp)
export const projects: Project[] = [
  validateProject(project1735317806064),
  validateProject(project1735317812160),
  validateProject(project1735317830179),
  validateProject(project1735317897754),
  validateProject(project1735324442184),
  validateProject(project1735325292455),
  validateProject(project1735345423275),
  validateProject(project1735581511168)
].sort((a, b) => Number(a.id) - Number(b.id));

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
