import Image from 'next/image';

interface ProjectGalleryProps {
  images: string[];
}

export default function ProjectGallery({ images }: ProjectGalleryProps) {
  if (!images || images.length === 0) return null;

  return (
    <div className="container mx-auto px-6 sm:px-12 lg:px-16 xl:px-24 2xl:px-32 mb-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {images.map((image, index) => (
          <div key={index} className="relative w-full">
            <Image
              src={image}
              alt={`Gallery image ${index + 1}`}
              width={1920}
              height={0}
              style={{ height: 'auto', width: '100%' }}
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
