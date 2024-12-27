# Portfolio Project Structure

## Adding a New Project

1. Add project images to `/public/projects/[project-name]/`:
   ```
   public/
     projects/
       project-id/
         cover.jpg       # Main project image
         01.jpg         # Project detail images
         02.jpg
         sections/      # Section-specific images
           01.jpg
           02.jpg
   ```

2. Add project data to `/data/projects/[project-name].ts`:
   ```typescript
   import { Project } from '../types';

   export const projectName: Project = {
     id: 1,
     number: "01",
     title: "Project Title",
     year: "2023",
     category: "Architecture",
     image: "/projects/project-name/cover.jpg",
     description: "Brief project description",
     details: {
       location: "Location",
       year: "2023",
       status: "Completed",
       area: "1000 sqm",
       client: "Client Name",
       architect: "Architect Name"
     },
     sections: [
       {
         title: "Section Title",
         content: [
           "Paragraph 1",
           "Paragraph 2"
         ],
         image: "/projects/project-name/sections/01.jpg",
         imageAlt: "Image description",
         imageCaption: "Image caption"
       }
     ],
     images: [
       "/projects/project-name/01.jpg",
       "/projects/project-name/02.jpg"
     ]
   };
   ```

3. Import and add to `/data/projects/index.ts`

## Project Types

See `types.ts` for detailed type definitions.
