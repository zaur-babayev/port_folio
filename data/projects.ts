export interface ProjectSection {
  title?: string;
  content?: string[];
  image?: string;
  imageAlt?: string;
  imageCaption?: string;
}

export interface ProjectDetails {
  location: string;
  year: string;
  status: string;
  area: string;
  client: string;
  architect: string;
}

export interface Project {
  id: number;
  number: string;
  title: string;
  year: string;
  category: string;
  image: string;
  description: string;
  details: ProjectDetails;
  sections: ProjectSection[];
  images: string[];
}

export const projects: Project[] = [
  {
    id: 1,
    number: '84',
    title: 'Bocci Showroom Berlin',
    year: '2023',
    category: 'Architecture',
    image: '/images/project1.jpg',
    description: 'Former Courthouse, Berlin, Germany',
    details: {
      location: 'Berlin, Germany',
      year: '2023',
      status: 'Completed',
      area: '450 sq m',
      client: 'Bocci',
      architect: 'Studio Name',
    },
    sections: [
      {
        title: 'Overview',
        content: [
          `The Bocci Showroom Berlin project represents a significant transformation of a historic courthouse into a contemporary exhibition space. The renovation carefully preserves and highlights the building's original architectural elements while introducing modern interventions that create a dialogue between past and present.`,
          `The showroom spans multiple floors, each offering a unique perspective on how light and space can interact within a historic framework. The project demonstrates our commitment to adaptive reuse and sustainable architecture.`,
        ]
      },
      {
        title: 'Design Approach',
        content: [
          `Our approach focused on maintaining the building's historic character while creating flexible spaces for displaying contemporary lighting installations. The original courtroom features were preserved and restored, becoming focal points that contrast with the modern exhibition elements.`,
          `The lighting design was carefully considered to enhance both the historic architecture and the displayed pieces, creating a harmonious balance between old and new.`,
        ],
        image: '/images/project1-detail1.jpg',
        imageAlt: 'Interior view of the restored courtroom',
        imageCaption: 'The restored courtroom features original architectural details alongside contemporary lighting installations'
      },
      {
        title: 'Materials and Execution',
        content: [
          `The material palette was chosen to complement the existing structure while adding contemporary touches. Original materials were restored where possible, and new interventions were executed with a minimal aesthetic to maintain focus on the historic elements.`,
          `The technical infrastructure was carefully integrated to support modern exhibition requirements without compromising the building's character.`,
        ],
        image: '/images/project1-detail2.jpg',
        imageAlt: 'Detail of material transitions',
        imageCaption: 'Careful attention was paid to the transition between historic and contemporary materials'
      }
    ],
    images: [
      '/images/project1.jpg',
      '/images/project1-detail1.jpg',
      '/images/project1-detail2.jpg',
    ]
  },
  {
    id: 2,
    number: '100',
    title: 'Surrey House',
    year: '2023',
    category: 'Architecture',
    image: '/images/project2.jpg',
    description: 'Surrey, Canada',
    details: {
      location: 'Surrey, Canada',
      year: '2023',
      status: 'Completed',
      area: '320 sq m',
      client: 'Private',
      architect: 'Studio Name',
    },
    sections: [
      {
        title: 'Project Brief',
        content: [
          `Surrey House was conceived as a harmonious blend of indoor and outdoor living spaces, responding to the client's desire for a home that would embrace its natural surroundings while providing contemporary comfort.`,
          `The project presented an opportunity to explore the relationship between architecture and landscape in a residential context.`,
        ]
      },
      {
        title: 'Spatial Design',
        content: [
          `The house is organized around a central courtyard that serves as both a visual anchor and a transitional space between different areas of the home. Large sliding glass doors blur the boundary between interior and exterior spaces.`,
          `Each room was carefully positioned to maximize natural light and views while maintaining privacy.`,
        ],
        image: '/images/project2-detail1.jpg',
        imageAlt: 'Central courtyard view',
        imageCaption: 'The central courtyard creates a seamless transition between indoor and outdoor spaces'
      }
    ],
    images: [
      '/images/project2.jpg',
      '/images/project2-detail1.jpg',
      '/images/project2-detail2.jpg',
    ]
  }
];
