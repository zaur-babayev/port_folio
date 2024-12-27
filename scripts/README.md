# Image Optimization Scripts

This directory contains scripts for optimizing project images.

## Setup

1. Install dependencies:
```bash
cd scripts
npm install
```

## Usage

Run the image optimization script:
```bash
node optimize-images.js
```

## What it does

The script will:
1. Scan the `/public/projects` directory for images
2. Optimize each image based on its location:
   - Cover images: 1600x900px
   - Section images: 1920x1080px max
   - Gallery images: 1600x1200px max
3. Compress images to reduce file size while maintaining quality
4. Save the optimized images in place

## Image Types

The script handles different image types based on their location:

1. Cover Images (`/projects/project-name/cover.jpg`)
   - Optimized to exactly 1600x900px
   - Cropped to fit if necessary

2. Section Images (`/projects/project-name/sections/*.jpg`)
   - Max size 1920x1080px
   - Maintains aspect ratio
   - Won't upscale smaller images

3. Gallery Images (`/projects/project-name/gallery/*.jpg`)
   - Max size 1600x1200px
   - Maintains aspect ratio
   - Won't upscale smaller images

## Quality Settings

- JPEG Quality: 80%
- PNG Compression: Enabled
- Maintains original format (JPG/PNG)
