import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { Project } from '../../data/types';
import { projects } from '../../data/projects';
import ProjectHero from '../../components/ProjectHero';
import ProjectContent from '../../components/ProjectContent';
import ProjectGallery from '../../components/ProjectGallery';
import ProjectNavigation from '../../components/ProjectNavigation';

export default function ProjectPage() {
  const router = useRouter();
  const { id } = router.query;
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    
    const currentProject = projects.find(p => p.id === id);
    setProject(currentProject || null);
    setIsLoading(false);
  }, [id]);

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-xl opacity-50">Loading...</p>
        </div>
      </Layout>
    );
  }

  if (!project) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-xl opacity-50">Project not found</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <ProjectHero project={project} />
      <ProjectContent project={project} />
      <ProjectGallery images={project.images || []} />
      <ProjectNavigation 
        nextProject={project.nextProject} 
        previousProject={project.previousProject} 
      />
    </Layout>
  );
}
