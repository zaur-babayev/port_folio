import { useRouter } from 'next/router';
import { GetStaticProps, GetStaticPaths } from 'next';
import Layout from '../../components/Layout';
import { projects } from '../../data/projects';
import { Project } from '../../data/types';
import ProjectHero from '../../components/ProjectHero';
import ProjectContent from '../../components/ProjectContent';
import ProjectGallery from '../../components/ProjectGallery';
import ProjectNavigation from '../../components/ProjectNavigation';

interface ProjectPageProps {
  project: Project | null;
}

export default function ProjectPage({ project }: ProjectPageProps) {
  const router = useRouter();

  // Handle fallback state
  if (router.isFallback) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-xl opacity-50">Loading...</p>
        </div>
      </Layout>
    );
  }

  // Handle 404
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

export const getStaticPaths: GetStaticPaths = async () => {
  // Get paths for all projects
  const paths = projects.map((project) => ({
    params: { id: project.id.toString() }
  }));

  return {
    paths,
    fallback: false // Return 404 for unknown paths
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id;
  const project = projects.find(p => p.id === id) || null;

  return {
    props: {
      project
    }
  };
};
