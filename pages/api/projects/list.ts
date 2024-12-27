import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { Project } from '../../../data/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const projectsDir = path.join(process.cwd(), 'data/projects');
    const projectFiles = fs.readdirSync(projectsDir)
      .filter(file => file.endsWith('.json'))
      .sort((a, b) => {
        const idA = path.basename(a, '.json');
        const idB = path.basename(b, '.json');
        return Number(idA) - Number(idB);
      });

    const projects: Project[] = projectFiles.map(file => {
      const filePath = path.join(projectsDir, file);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(fileContents);
    });

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

    return res.status(200).json(projects);
  } catch (error) {
    console.error('Error loading projects:', error);
    return res.status(500).json({ error: 'Failed to load projects' });
  }
}
