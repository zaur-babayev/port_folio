import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { projects } from '../../data/projects';

export default function ProjectDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const project = projects.find(p => p.id === Number(id));

  useEffect(() => {
    if (isMenuOpen) {
      setIsMenuVisible(true);
    } else {
      const timer = setTimeout(() => {
        setIsMenuVisible(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isMenuOpen]);

  if (!project) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white font-light">
      <Head>
        <title>{project.title} | Zaur Baba</title>
        <meta name="description" content={project.description} />
      </Head>

      {/* Navigation */}
      <nav className={`fixed w-full top-0 z-50 ${isMenuOpen ? 'mix-blend-difference' : ''}`}>
        <div className="container mx-auto px-6 sm:px-12 lg:px-16 xl:px-24 2xl:px-32 py-8 flex justify-between items-center">
          <Link href="/">
            <span className={`text-lg tracking-wide transition-colors duration-300 ${
              isMenuOpen ? 'text-white' : 'text-black'
            } font-light`}>
              Zaur Baba
            </span>
          </Link>
          <div className="flex items-center space-x-8">
            <Link href="/">
              <span className="text-sm tracking-wide hover:opacity-50 transition-opacity duration-300">
                Back to Projects
              </span>
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative w-6 h-6 focus:outline-none"
              aria-label={isMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              <span 
                className={`absolute w-6 transform transition-all duration-300 ease-in-out hamburger-line ${
                  isMenuOpen 
                    ? 'rotate-45 translate-y-0 bg-white' 
                    : 'translate-y-[-5px] bg-black'
                }`}
              />
              <span 
                className={`absolute w-6 transform transition-all duration-300 ease-in-out hamburger-line ${
                  isMenuOpen 
                    ? '-rotate-45 translate-y-0 bg-white' 
                    : 'translate-y-[5px] bg-black'
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-black transition-all duration-500 ease-in-out ${
          isMenuOpen ? 'opacity-100' : 'opacity-0'
        } ${isMenuVisible ? 'visible z-40' : 'invisible -z-10'}`}
      >
        {/* ... Menu content ... */}
      </div>

      {/* Project Content */}
      <main className={`pt-32 transition-all duration-500 transform ${
        isMenuOpen ? 'opacity-0 pointer-events-none translate-y-4' : 'opacity-100 translate-y-0'
      }`}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        >
          {/* Project Header */}
          <div className="container mx-auto px-6 sm:px-12 lg:px-16 xl:px-24 2xl:px-32 mb-24">
            <div className="grid grid-cols-12 gap-8">
              {/* Project Title and Number */}
              <div className="col-span-12 lg:col-span-4 mb-16 lg:mb-0">
                <div>
                  <span className="text-sm tracking-wide opacity-50 block mb-4">{project.number}</span>
                  <h1 className="text-4xl font-light mb-6">{project.title}</h1>
                  <p className="text-lg leading-relaxed opacity-70 mb-8">
                    {project.description}
                  </p>
                  {/* Project Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {Object.entries(project.details).map(([key, value]) => (
                      <div key={key} className="border-t border-black/10 pt-4">
                        <p className="text-sm uppercase tracking-wide opacity-50 mb-2">{key}</p>
                        <p className="text-base">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Project Content */}
              <div className="col-span-12 lg:col-span-8">
                {/* Full Description */}
                <div className="prose prose-lg max-w-none mb-24">
                  {project.sections?.map((section, index) => (
                    <div key={index} className="mb-16">
                      {section.title && (
                        <h2 className="text-2xl font-light mb-6">{section.title}</h2>
                      )}
                      {section.content && (
                        <div className="text-lg leading-relaxed opacity-70 space-y-6">
                          {section.content.map((paragraph, pIndex) => (
                            <p key={pIndex}>{paragraph}</p>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="container mx-auto px-6 sm:px-12 lg:px-16 xl:px-24 2xl:px-32">
            <div className="space-y-24 mb-24">
              {/* Section Images */}
              {project.sections?.map((section, index) => (
                section.image && (
                  <div key={`section-image-${index}`}>
                    <div className="relative aspect-[16/9]">
                      <Image
                        src={section.image}
                        alt={section.imageAlt || ''}
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-500"
                      />
                    </div>
                    {section.imageCaption && (
                      <p className="text-sm tracking-wide opacity-50 mt-4">{section.imageCaption}</p>
                    )}
                  </div>
                )
              ))}

              {/* Gallery Images */}
              {project.images.map((image, index) => (
                <div key={`gallery-image-${index}`}>
                  <div className="relative aspect-[16/9]">
                    <Image
                      src={image}
                      alt={`${project.title} - Image ${index + 1}`}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Between Projects */}
          <div className="container mx-auto px-6 sm:px-12 lg:px-16 xl:px-24 2xl:px-32 border-t border-black/10 py-8">
            <div className="flex justify-between items-center">
              {project.id > 1 && (
                <Link href={`/projects/${project.id - 1}`}>
                  <span className="text-sm tracking-wide hover:opacity-50 transition-opacity duration-300">
                    Previous Project
                  </span>
                </Link>
              )}
              {project.id < projects.length && (
                <Link href={`/projects/${project.id + 1}`}>
                  <span className="text-sm tracking-wide hover:opacity-50 transition-opacity duration-300">
                    Next Project
                  </span>
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
