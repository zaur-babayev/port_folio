import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const projectsDirectory = path.join(process.cwd(), 'data', 'projects');

  try {
    if (req.method === 'GET') {
      // Read project file
      const filePath = path.join(projectsDirectory, `${id}.json`);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const project = JSON.parse(fileContents);
      res.status(200).json(project);
    } else if (req.method === 'PUT') {
      // Update project file
      const filePath = path.join(projectsDirectory, `${id}.json`);
      const updatedProject = req.body;
      fs.writeFileSync(filePath, JSON.stringify(updatedProject, null, 2));
      res.status(200).json(updatedProject);
    } else {
      res.setHeader('Allow', ['GET', 'PUT']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Failed to process request' });
  }
}
