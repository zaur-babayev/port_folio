import sharp from 'sharp';
import { glob } from 'glob';
import path from 'path';
import fs from 'fs/promises';
import chalk from 'chalk';
import ora from 'ora';

const PROJECTS_DIR = '../public/projects';
const QUALITY = 80;
const METADATA_FILE = '.image-optimization.json';

const IMAGE_CONFIGS = {
  cover: {
    width: 1600,
    height: 900,
    fit: 'cover'
  },
  section: {
    width: 1920,
    height: 1080,
    fit: 'inside'
  },
  gallery: {
    width: 1600,
    height: 1200,
    fit: 'inside'
  }
};

// Load or create optimization metadata
async function loadMetadata() {
  try {
    const data = await fs.readFile(METADATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return {};
  }
}

// Save optimization metadata
async function saveMetadata(metadata) {
  await fs.writeFile(METADATA_FILE, JSON.stringify(metadata, null, 2));
}

// Check if image needs optimization
async function needsOptimization(filepath, metadata) {
  try {
    const stats = await fs.stat(filepath);
    const lastModified = stats.mtimeMs;
    
    // If image is not in metadata or was modified after last optimization
    return !metadata[filepath] || metadata[filepath].lastModified < lastModified;
  } catch (error) {
    return true;
  }
}

async function getImageType(filepath) {
  if (filepath.includes('/cover.')) return 'cover';
  if (filepath.includes('/sections/')) return 'section';
  if (filepath.includes('/gallery/')) return 'gallery';
  return 'section'; // default
}

async function optimizeImage(filepath) {
  try {
    const imageType = await getImageType(filepath);
    const config = IMAGE_CONFIGS[imageType];
    
    // Get original file stats
    const originalStats = await fs.stat(filepath);
    const originalSize = originalStats.size;

    // Create optimized image
    const image = sharp(filepath);
    const metadata = await image.metadata();

    // Resize based on configuration
    image.resize({
      width: config.width,
      height: config.height,
      fit: config.fit,
      withoutEnlargement: true
    });

    // Convert to appropriate format based on input
    if (metadata.format === 'png') {
      image.png({ quality: QUALITY });
    } else {
      image.jpeg({ quality: QUALITY });
    }

    // Save optimized image
    const result = await image.toBuffer({ resolveWithObject: true })
      .then(async ({ data, info }) => {
        await fs.writeFile(filepath, data);
        const savings = ((originalSize - info.size) / originalSize * 100).toFixed(1);
        return {
          originalSize,
          newSize: info.size,
          savings,
          width: info.width,
          height: info.height,
          lastModified: Date.now()
        };
      });

    return result;
  } catch (error) {
    console.error(chalk.red(`Error optimizing ${filepath}:`), error);
    return null;
  }
}

async function processNewImages() {
  const spinner = ora('Loading optimization history...').start();
  
  try {
    // Load optimization metadata
    const metadata = await loadMetadata();
    
    // Find all image files
    spinner.text = 'Scanning for images...';
    const files = await glob('**/*.{jpg,jpeg,png}', {
      cwd: PROJECTS_DIR,
      absolute: true
    });

    if (files.length === 0) {
      spinner.info(chalk.yellow('No images found to optimize.'));
      return;
    }

    // Filter files that need optimization
    const filesToOptimize = [];
    for (const file of files) {
      if (await needsOptimization(file, metadata)) {
        filesToOptimize.push(file);
      }
    }

    if (filesToOptimize.length === 0) {
      spinner.succeed(chalk.green('All images are already optimized!'));
      return;
    }

    spinner.text = `Found ${filesToOptimize.length} images to optimize...`;

    // Process each image
    let optimized = 0;
    for (const file of filesToOptimize) {
      spinner.text = `Optimizing: ${path.basename(file)}`;
      const result = await optimizeImage(file);
      
      if (result) {
        metadata[file] = result;
        optimized++;
        
        // Save metadata after each successful optimization
        await saveMetadata(metadata);
      }
    }

    spinner.succeed(chalk.green(
      `Successfully optimized ${optimized} of ${filesToOptimize.length} images. ` +
      `${files.length - filesToOptimize.length} images were already optimized.`
    ));
  } catch (error) {
    spinner.fail(chalk.red('Error processing images:'));
    console.error(error);
  }
}

// Run the optimization
processNewImages();
