import { Project } from '../types';

export const bocciShowroom: Project = {
  id: 1,
  number: "84",
  title: "Bocci Showroom Berlinnn",
  year: "2023",
  category: "Architecture",
  image: "/projects/bocci-showroom/cover.jpg",
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
      image: "/projects/bocci-showroom/sections/overview.jpg",
      imageAlt: "Main exhibition space with original architectural details",
      imageCaption: "Main exhibition space featuring restored architectural elements"
    },
    {
      title: "Design Approach",
      content: [
        "Our approach focused on minimal intervention, allowing the building's original features to shine while creating flexible spaces for various exhibition configurations.",
        "New lighting systems were carefully integrated to highlight both the architectural features and the exhibited pieces."
      ],
      image: "/projects/bocci-showroom/sections/design.jpg",
      imageAlt: "Detail showing integration of modern systems with historic architecture",
      imageCaption: "Seamless integration of contemporary systems with historic elements"
    }
  ],
  images: [
    "/projects/bocci-showroom/gallery/01.jpg",
    "/projects/bocci-showroom/gallery/02.jpg",
    "/projects/bocci-showroom/gallery/03.jpg"
  ]
};
