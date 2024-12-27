import { Project } from '../data/types';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ProjectHeroProps {
  project: Project;
}

export default function ProjectHero({ project }: ProjectHeroProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-6 sm:px-12 lg:px-16 xl:px-24 2xl:px-32 mb-24"
    >
      <div className="grid grid-cols-12 gap-8">
        {/* Project Info */}
        <div className="col-span-12 lg:col-span-4 mb-16 lg:mb-0">
          <span className="text-sm tracking-wide opacity-50 block mb-4">#{project.number}</span>
          <h1 className="text-4xl font-light mb-6">{project.title}</h1>
          <p className="text-lg leading-relaxed opacity-70">{project.description}</p>
        </div>

        {/* Hero Image */}
        <div className="col-span-12 lg:col-span-8">
          {project.image && (
            <div className="relative aspect-video">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
