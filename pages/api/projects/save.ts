import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { Project } from '../../../data/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const project: Project = req.body;

    // Validate project data
    if (!project.id || !project.title) {
      return res.status(400).json({ error: 'Invalid project data' });
    }

    // Read existing projects
    const projectsDir = path.join(process.cwd(), 'data/projects');
    const projectsIndexPath = path.join(projectsDir, 'index.ts');
    const projectFilePath = path.join(projectsDir, `${project.id}.json`);

    // Save individual project file
    fs.writeFileSync(
      projectFilePath,
      JSON.stringify(project, null, 2)
    );

    // Get all project files, including existing ones
    const projectFiles = fs.readdirSync(projectsDir)
      .filter(file => file.endsWith('.json'))
      .sort((a, b) => {
        // Sort by file creation time to maintain order
        const timeA = fs.statSync(path.join(projectsDir, a)).birthtimeMs;
        const timeB = fs.statSync(path.join(projectsDir, b)).birthtimeMs;
        return timeA - timeB;
      });

    // Create index.ts content
    let indexContent = `import { Project } from '../types';\n\n`;

    // Add imports for all projects
    projectFiles.forEach(file => {
      const projectId = path.basename(file, '.json');
      indexContent += `import project${projectId}Data from './${projectId}.json';\n`;
    });

    // Convert JSON projects to TypeScript
    indexContent += `\n// Convert JSON to Project type\n`;
    projectFiles.forEach(file => {
      const projectId = path.basename(file, '.json');
      indexContent += `export const project${projectId}: Project = project${projectId}Data as Project;\n`;
    });

    // Export all projects
    indexContent += `\n// Export all projects\n`;
    indexContent += `export const projects: Project[] = [\n`;
    projectFiles.forEach(file => {
      const projectId = path.basename(file, '.json');
      indexContent += `  project${projectId},\n`;
    });
    indexContent += `];\n`;

    // Add next/previous project references
    indexContent += `\n// Add next/previous project references\n`;
    indexContent += `projects.forEach((project, index) => {
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
});\n`;

    // Write the index file
    fs.writeFileSync(projectsIndexPath, indexContent);

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Save error:', error);
    return res.status(500).json({ error: 'Failed to save project' });
  }
}
