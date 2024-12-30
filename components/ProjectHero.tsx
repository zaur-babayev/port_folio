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
      className="project-hero"
    >
      {/* Project Image */}
      <div className="w-full mb-24">
        {project.image && (
          <div className="relative w-full overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              width={1920}
              height={0}
              style={{ height: 'auto', width: '100%' }}
              className="object-contain"
              priority
            />
          </div>
        )}
      </div>

      {/* Project Content */}
      <div className="container mx-auto px-6 sm:px-12 lg:px-16 xl:px-24 2xl:px-32">
        {/* Project Header */}
        <div className="grid grid-cols-12 gap-16 items-start">
          {/* Main Content */}
          <div className="col-span-12 lg:col-span-7">
            {project.featured && (
              <a
                href={project.featured.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mb-6 group"
              >
                <span className="flex items-center gap-2.5 px-4 py-2 bg-neutral-100 rounded-full text-sm hover:bg-neutral-200 transition-colors">
                  <svg 
                    className="w-3.5 h-3.5 text-green-600" 
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/>
                    <path d="m9 17 8-8-1.414-1.414L9 14.172V17z"/>
                    <path d="M8.999 12.999 15.586 6.414 14.172 5 7.585 11.585z"/>
                  </svg>
                  {project.featured.label || 'Published in'} {project.featured.platform}'s {project.featured.publication}
                </span>
                <svg 
                  className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" 
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            )}
            <div className="flex items-center gap-4 mb-4 text-sm opacity-50">
              <span>{project.category}</span>
              <span>•</span>
              <span>{project.details.year}</span>
            </div>
            <h1 className="mb-6">{project.title}</h1>
            <p className="text-lg opacity-70 max-w-2xl">{project.description}</p>
          </div>

          {/* Project Details */}
          <div className="col-span-12 lg:col-span-5">
            <div className="grid grid-cols-1 gap-8 lg:sticky lg:top-40">
              {project.details.role && (
                <div>
                  <h4 className="text-sm mb-3 opacity-40">Role</h4>
                  <p className="text-lg">{project.details.role}</p>
                </div>
              )}
              
              {project.details.team && project.details.team.length > 0 && (
                <div>
                  <h4 className="text-sm mb-3 opacity-40">Team</h4>
                  <ul className="space-y-2">
                    {project.details.team.map((member, index) => (
                      <li key={index}>
                        {member.url ? (
                          <a
                            href={member.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 group"
                          >
                            <span className="text-lg group-hover:text-neutral-600 transition-colors">
                              {member.name}
                              <span className="opacity-40"> — {member.role}</span>
                            </span>
                            <svg 
                              className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" 
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                              <polyline points="15 3 21 3 21 9" />
                              <line x1="10" y1="14" x2="21" y2="3" />
                            </svg>
                          </a>
                        ) : (
                          <span className="text-lg">
                            {member.name}
                            <span className="opacity-40"> — {member.role}</span>
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
