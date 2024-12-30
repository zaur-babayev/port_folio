import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const form = formidable({
      uploadDir: path.join(process.cwd(), 'public/temp'),
      keepExtensions: true,
      maxFiles: 1,
      filter: ({ mimetype }) => {
        return mimetype ? mimetype.includes('image') : false;
      },
    });

    // Ensure upload directories exist
    const tempDir = path.join(process.cwd(), 'public/temp');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    const { fields, files } = await new Promise<{ fields: any; files: any }>((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    });

    const file = files.file?.[0];
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const projectId = fields.projectId?.[0];
    const section = fields.section?.[0];
    
    if (!projectId) {
      return res.status(400).json({ error: 'Project ID is required' });
    }

    // Create project directory if it doesn't exist
    const projectDir = path.join(process.cwd(), 'public/projects', projectId);
    if (!fs.existsSync(projectDir)) {
      fs.mkdirSync(projectDir, { recursive: true });
    }

    // If section is specified, create section directory
    const targetDir = section 
      ? path.join(projectDir, 'sections')
      : path.join(projectDir, 'gallery');
    
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    // Generate unique filename
    const ext = path.extname(file.originalFilename || '');
    const filename = `${Date.now()}${ext}`;
    const targetPath = path.join(targetDir, filename);

    // Move file from temp to target directory
    fs.renameSync(file.filepath, targetPath);

    // Generate public URL
    const publicPath = `/projects/${projectId}${section ? '/sections' : '/gallery'}/${filename}`;

    return res.status(200).json({ 
      url: publicPath,
      success: true 
    });
  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ error: 'Upload failed' });
  }
}
