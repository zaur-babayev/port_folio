import { Project } from '../types';

export const salvUxImprovements: Project = {
  id: 1,
  number: "106",
  title: "Small Tweaks, Big Impact: UX Updates at Salv",
  year: "2023",
  category: "Architecture",
  image: "/projects/salv-ux-improvements/cover.jpg",
  description: "Former Courthouse, Berlin, Germany",
  details: {
    location: "Berlin, Germany",
    year: "2023",
    status: "Completed",
    area: "1,200 sqm",
    client: "Bocci",
    architect: "Zaur Baba"
  },
  sections: [
    {
      title: "Overview",
      content: [
        "The Bocci Showroom Berlin project involved the transformation of a historic courthouse into a contemporary exhibition space. The design carefully balances the preservation of the building's historic character with modern interventions.",
        "The main exhibition space features soaring ceilings and restored architectural details, providing an ideal backdrop for Bocci's lighting installations."
      ],
      images: [
        {
          src: "/projects/bocci-showroom/sections/overview-1.jpg",
          alt: "Main exhibition space with original architectural details",
          caption: "Main exhibition space featuring restored architectural elements"
        },
        {
          src: "/projects/bocci-showroom/sections/overview-2.jpg",
          alt: "Detail view of lighting installation",
          caption: "Custom lighting installation in the main hall"
        }
      ],
      layout: "sideBySide"
    },
    {
      title: "Design Approach",
      content: [
        "Our approach focused on minimal intervention, allowing the building's original features to shine while creating flexible spaces for various exhibition configurations.",
        "New lighting systems were carefully integrated to highlight both the architectural features and the exhibited pieces."
      ],
      images: [
        {
          src: "/projects/bocci-showroom/sections/design-1.jpg",
          alt: "Integration of modern systems",
          caption: "Seamless integration of contemporary systems"
        },
        {
          src: "/projects/bocci-showroom/sections/design-2.jpg",
          alt: "Original architectural details",
          caption: "Preserved historical elements"
        },
        {
          src: "/projects/bocci-showroom/sections/design-3.jpg",
          alt: "Lighting detail",
          caption: "Custom lighting solutions"
        }
      ],
      layout: "grid"
    }
  ],
  images: [
    "/projects/bocci-showroom/gallery/01.jpg",
    "/projects/bocci-showroom/gallery/02.jpg",
    "/projects/bocci-showroom/gallery/03.jpg"
  ]
};
