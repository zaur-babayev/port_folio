import { ProjectImage as ProjectImageType } from '../data/types';
import ProjectImage from './ProjectImage';

interface SectionImagesProps {
  images: ProjectImageType[];
  layout?: 'single' | 'grid' | 'fullwidth' | 'sideBySide';
}

export default function SectionImages({ images, layout = 'single' }: SectionImagesProps) {
  if (!images || images.length === 0) return null;

  switch (layout) {
    case 'grid':
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {images.map((image, index) => (
            <div key={index} className="relative aspect-[4/3]">
              <ProjectImage
                src={image.src}
                alt={image.alt || ''}
                priority={index === 0}
              />
              {image.caption && (
                <p className="text-sm tracking-wide opacity-50 mt-4">{image.caption}</p>
              )}
            </div>
          ))}
        </div>
      );

    case 'sideBySide':
      return (
        <div className="flex flex-col md:flex-row gap-8">
          {images.map((image, index) => (
            <div key={index} className="flex-1 relative aspect-[3/4]">
              <ProjectImage
                src={image.src}
                alt={image.alt || ''}
                priority={index === 0}
              />
              {image.caption && (
                <p className="text-sm tracking-wide opacity-50 mt-4">{image.caption}</p>
              )}
            </div>
          ))}
        </div>
      );

    case 'fullwidth':
      return (
        <div className="space-y-16">
          {images.map((image, index) => (
            <div key={index} className="relative aspect-[21/9]">
              <ProjectImage
                src={image.src}
                alt={image.alt || ''}
                priority={index === 0}
              />
              {image.caption && (
                <p className="text-sm tracking-wide opacity-50 mt-4">{image.caption}</p>
              )}
            </div>
          ))}
        </div>
      );

    default:
      return (
        <div className="space-y-16">
          {images.map((image, index) => (
            <div key={index} className="relative aspect-[16/9]">
              <ProjectImage
                src={image.src}
                alt={image.alt || ''}
                priority={index === 0}
              />
              {image.caption && (
                <p className="text-sm tracking-wide opacity-50 mt-4">{image.caption}</p>
              )}
            </div>
          ))}
        </div>
      );
  }
}
