import Link from 'next/link';

interface ProjectNavigationProps {
  nextProject?: {
    id: string;
    title: string;
  };
  previousProject?: {
    id: string;
    title: string;
  };
}

export default function ProjectNavigation({ nextProject, previousProject }: ProjectNavigationProps) {
  return (
    <div className="container mx-auto px-6 sm:px-12 lg:px-16 xl:px-24 2xl:px-32 border-t border-black/10 py-8">
      <div className="flex justify-between items-center">
        {previousProject && (
          <Link 
            href={`/projects/${previousProject.id}`}
            className="text-sm tracking-wide hover:opacity-50 transition-opacity duration-300"
          >
            ← {previousProject.title}
          </Link>
        )}
        {nextProject && (
          <Link 
            href={`/projects/${nextProject.id}`}
            className="text-sm tracking-wide hover:opacity-50 transition-opacity duration-300"
          >
            {nextProject.title} →
          </Link>
        )}
      </div>
    </div>
  );
}
