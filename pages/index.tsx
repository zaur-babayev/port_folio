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
        <div className="container mx-auto px-6 sm:px-12 lg:px-16 xl:px-24 2xl:px-32 py-24">
          <div className="mb-12">
            {/* Filter Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8">
              <div>
                <div className="flex space-x-8">
                  {Object.values(ProjectCategory).map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`text-sm uppercase tracking-wide hover:opacity-50 transition-all duration-300 font-light ${
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
            <div className="relative">
              <table ref={tableRef} className="w-full border-collapse">
                <tbody>
                  {filteredProjects.map((project, index) => (
                    <tr
                      key={project.id}
                      className="group border-t border-black/10 hover:bg-gray-50/50 transition-all duration-300 cursor-pointer"
                      onMouseEnter={() => !isMobile && setHoveredProject(index)}
                      onMouseLeave={() => !isMobile && setHoveredProject(null)}
                      onMouseMove={handleMouseMove}
                      onClick={() => router.push(`/projects/${project.id}`)}
                    >
                      <td className="hidden sm:table-cell py-8 pr-4 w-16 sm:w-24 transition-all duration-300 align-top">
                        <span className="text-sm tracking-wide transition-all duration-300 font-light">#{project.number}</span>
                      </td>
                      <td className="py-8 pr-4 transition-all duration-300">
                        <h3 className="text-xl tracking-wide transition-all duration-300 font-light mb-2">{project.title}</h3>
                        <p className="text-sm tracking-wide opacity-50 font-light">{project.description}</p>
                      </td>
                      <td className="py-8 pr-4 transition-all duration-300 align-top">
                        <span className="text-sm tracking-wide font-light">{project.category}</span>
                      </td>
                      <td className="py-8 text-right w-24 transition-all duration-300 align-top">
                        <span className="text-sm tracking-wide font-light">{project.year}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Hover Image */}
              <AnimatePresence>
                {hoveredProject !== null && !isMobile && filteredProjects[hoveredProject]?.image && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                    className="fixed pointer-events-none"
                    style={{
                      top: mousePosition.y,
                      left: mousePosition.x,
                      width: '500px',
                      height: '600px',
                      transform: 'translate(-50%, -50%)',
                      zIndex: 50
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
