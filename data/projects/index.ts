import { Project } from '../types';

// Import JSON files directly
import project1735317806064 from './1735317806064.json';
import project1735317812160 from './1735317812160.json';
import project1735317830179 from './1735317830179.json';
import project1735317897754 from './1735317897754.json';
import project1735324442184 from './1735324442184.json';
import project1735325292455 from './1735325292455.json';

// Convert to array and sort by ID (timestamp)
export const projects: Project[] = [
  project1735317806064,
  project1735317812160,
  project1735317830179,
  project1735317897754,
  project1735324442184,
  project1735325292455,
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
