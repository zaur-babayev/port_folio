import { Project } from '../data/types';
import SectionImages from './SectionImages';

interface ProjectContentProps {
  project: Project;
}

export default function ProjectContent({ project }: ProjectContentProps) {
  return (
    <div className="container mx-auto px-6 sm:px-12 lg:px-16 xl:px-24 2xl:px-32 mb-24">
      <div className="prose prose-lg max-w-none">
        {project.sections?.map((section, index) => (
          <div key={index} className="mb-16">
            {section.title && (
              <h2 className="text-2xl font-light mb-6">{section.title}</h2>
            )}
            {section.content && (
              <div className="text-lg leading-relaxed opacity-70 mb-8">
                {section.content}
              </div>
            )}
            {section.images && section.images.length > 0 && (
              <SectionImages images={section.images} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
