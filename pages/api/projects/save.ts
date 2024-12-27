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

    // Save project JSON file
    const projectsDir = path.join(process.cwd(), 'data/projects');
    const projectFilePath = path.join(projectsDir, `${project.id}.json`);

    fs.writeFileSync(
      projectFilePath,
      JSON.stringify(project, null, 2)
    );

    // Get all project files
    const projectFiles = fs.readdirSync(projectsDir)
      .filter(file => file.endsWith('.json'))
      .sort((a, b) => {
        const idA = path.basename(a, '.json');
        const idB = path.basename(b, '.json');
        return Number(idA) - Number(idB);
      });

    // Generate index.ts content
    let indexContent = `import { Project } from '../types';\n\n`;
    indexContent += '// Import JSON files directly\n';
    
    // Add imports
    projectFiles.forEach(file => {
      const projectId = path.basename(file, '.json');
      indexContent += `import project${projectId} from './${file}';\n`;
    });

    indexContent += '\n// Convert to array and sort by ID (timestamp)\n';
    indexContent += 'export const projects: Project[] = [\n';
    projectFiles.forEach(file => {
      const projectId = path.basename(file, '.json');
      indexContent += `  project${projectId},\n`;
    });
    indexContent += '].sort((a, b) => Number(a.id) - Number(b.id));\n\n';

    // Add next/previous project references
    indexContent += `// Add next/previous project references
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
});\n`;

    // Write index.ts
    const indexPath = path.join(projectsDir, 'index.ts');
    fs.writeFileSync(indexPath, indexContent);

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Save error:', error);
    return res.status(500).json({ error: 'Failed to save project' });
  }
}
