import { Project } from '../types';

export const salvUxImprovements: Project = {
  id: 2,
  number: "106",
  title: "Small Tweaks, Big Impact: UX Updates at Salv",
  year: "2023",
  category: "UX design",
  image: "/projects/salv-ux-improvements/cover.jpg",
  description: "Former Courthouse, Berlin, Germany",
  details: {
    location: "Berlin, Germany",
    year: "2024",
    status: "Completed",
    area: "1,200 sqm",
    client: "Bocci",
    architect: "Zaur Baba"
  },
  sections: [
    {
      title: "Overview",
      content: [
        "During my time at Salv, I worked on several initiatives to improve user interactions and overall experience. Here I collected some of the small improvements that had positive impact on day-to-day workflows."
      ]
    },
    {
      title: "Page headers",
      content: [
        "When I first joined Salv, the platform had mostly two levels of navigation, so there was no need for a back button. However, the headers across the platform looked inconsistent because they hadn’t been set up as a proper component. Font sizes and padding varied a lot.",
        "Later, as some features required deeper navigation, the need for a back button emerged. Unfortunately, the solution was inconsistently applied across the platform, further contributing to visual and functional discrepancies."
      ],
      images: [
        {
          src: "/projects/salv-ux-improvements/sections/headers-01.jpg",
          alt: "Integration of modern systems",
          caption: "Seamless integration of contemporary systems"
        }
      ],
      layout: "single"
    },
    {
      title: "Page headers",
      content: [
        "When I first joined Salv, the platform had mostly two levels of navigation, so there was no need for a back button. However, the headers across the platform looked inconsistent because they hadn’t been set up as a proper component. Font sizes and padding varied a lot.",
        "Later, as some features required deeper navigation, the need for a back button emerged. Unfortunately, the solution was inconsistently applied across the platform, further contributing to visual and functional discrepancies."
      ],
      images: [
        {
          src: "/projects/salv-ux-improvements/sections/headers-01.jpg",
          alt: "Integration of modern systems",
          caption: "Seamless integration of contemporary systems"
        },
        {
          src: "/projects/salv-ux-improvements/sections/headers-01.jpg",
          alt: "Original architectural details",
          caption: "Preserved historical elements"
        },
        {
          src: "/projects/salv-ux-improvements/sections/headers-01.jpg",
          alt: "Lighting detail",
          caption: "Custom lighting solutions"
        }
      ],
      layout: "single"
    }
  ],
  images: [
    "/projects/salv-ux-improvements/sections/headers-01.jpg",
    "/projects/salv-ux-improvements/sections/headers-01.jpg",
    "/projects/salv-ux-improvements/sections/headers-01.jpg"
  ]
};
