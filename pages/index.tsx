import { useState, useRef } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { projects } from '../data/projects';
import { ProjectCategory } from '../data/types';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function Home() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>(ProjectCategory.All);
  const tableRef = useRef<HTMLTableElement>(null);
  const router = useRouter();
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const filteredProjects = projects.filter(project => 
    selectedCategory === ProjectCategory.All || project.category === selectedCategory
  );

  return (
    <Layout>
      <Head>
        <title>Zaur Babayev | Portfolio</title>
        <meta name="description" content="Portfolio of Zaur Babayev - Designer and Creative Technologist" />
      </Head>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-16 xl:px-24 2xl:px-32 py-20 sm:py-40">
          <div className="mb-8 sm:mb-12">
            {/* Filter Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 sm:mb-8">
              <div className="w-full overflow-x-auto -mx-4 px-4 sm:w-auto sm:overflow-visible sm:pb-0 sm:mx-0 sm:px-0">
                <div className="flex space-x-6 sm:space-x-8 min-w-max">
                  {Object.values(ProjectCategory).map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`text-sm uppercase tracking-wide hover:opacity-50 transition-all duration-300 font-normal whitespace-nowrap ${
                        selectedCategory === category ? 'opacity-100' : 'opacity-50'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Projects Table */}
            <div className="relative -mx-4 sm:mx-0">
              <div className="w-full">
                {filteredProjects.map((project, index) => (
                  <div
                    key={project.id}
                    className="group border-t border-black/10 hover:bg-gray-50/50 transition-all duration-300 cursor-pointer px-4 sm:px-0"
                    onMouseEnter={() => !isMobile && setHoveredProject(index)}
                    onMouseLeave={() => !isMobile && setHoveredProject(null)}
                    onMouseMove={handleMouseMove}
                    onClick={() => router.push(`/projects/${project.id}`)}
                  >
                    <div className="flex flex-col sm:flex-row py-6 sm:py-8 gap-4">
                      <div className="flex-grow">
                        <h4 className="mb-2 text-lg sm:text-xl break-words">{project.title}</h4>
                        <p className="opacity-50 text-sm sm:text-base">{project.description}</p>
                      </div>
                      <div className="flex justify-between items-start sm:w-48 sm:flex-shrink-0">
                        <span className="text-caption opacity-50">{project.category}</span>
                        <span className="text-caption opacity-50">{project.details.year}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Hover Image */}
              <AnimatePresence>
                {hoveredProject !== null && !isMobile && filteredProjects[hoveredProject]?.image && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                    className="fixed pointer-events-none hidden sm:block"
                    style={{
                      top: mousePosition.y,
                      left: mousePosition.x,
                      width: '40vw',
                      maxWidth: '600px',
                      height: 'auto',
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    <div className="relative w-full h-full overflow-hidden">
                      <Image
                        src={filteredProjects[hoveredProject].image}
                        alt={filteredProjects[hoveredProject].title}
                        layout="fill"
                        objectFit="cover"
                        priority
                        className="transition-transform duration-300"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
}
