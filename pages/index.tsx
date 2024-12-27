import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

const projects = [
  {
    id: 1,
    number: '84',
    title: 'Bocci Showroom Berlin',
    year: '2023',
    category: 'Architecture',
    image: '/images/project1.jpg',
    description: 'Former Courthouse, Berlin, Germany'
  },
  {
    id: 2,
    number: '100',
    title: 'Surrey House',
    year: '2023',
    category: 'Architecture',
    image: '/images/project2.jpg',
    description: 'Surrey, Canada'
  },
  {
    id: 3,
    number: '96',
    title: 'Polygon Gallery Chandelier',
    year: '2022',
    category: 'Objects',
    image: '/images/project3.jpg',
    description: 'North Vancouver, Canada'
  },
  {
    id: 4,
    number: '92',
    title: 'Bocci Mexico City',
    year: '2022',
    category: 'Architecture',
    image: '/images/project4.jpg',
    description: 'Mexico City, Mexico'
  },
];

const filters = [
  { id: 'all', label: 'All' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'objects', label: 'Objects' },
  { id: 'exhibitions', label: 'Exhibitions' },
];

export default function Home() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const tableRef = useRef<HTMLTableElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setHoveredProject(null);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      setIsMenuVisible(true);
    } else {
      // Delay hiding the menu until after the fade out animation
      const timer = setTimeout(() => {
        setIsMenuVisible(false);
      }, 300); // Match this with your transition duration
      return () => clearTimeout(timer);
    }
  }, [isMenuOpen]);

  const handleMouseMove = (e: React.MouseEvent<HTMLTableRowElement>) => {
    if (!tableRef.current) return;
    
    const rect = tableRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    setMousePosition({ x, y: e.clientY });
  };

  return (
    <div className="min-h-screen bg-white font-light">
      <Head>
        <title>Zaur Baba | Digital Designer</title>
        <meta name="description" content="Digital product designer portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400&display=swap" rel="stylesheet" />
      </Head>

      {/* Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-black transition-all duration-500 ease-in-out ${
          isMenuOpen ? 'opacity-100' : 'opacity-0'
        } ${isMenuVisible ? 'visible z-40' : 'invisible -z-10'}`}
      >
        <div className={`container mx-auto px-6 sm:px-12 lg:px-16 xl:px-24 2xl:px-32 transition-transform duration-500 ease-in-out transform ${
          isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}>
          <div className="pt-32 grid grid-cols-2 gap-24">
            <div className="space-y-6">
              <Link href="/about">
                <span className="block text-[2.5rem] leading-tight font-light text-white hover:opacity-50 transition-opacity duration-300">About</span>
              </Link>
              <Link href="/contact">
                <span className="block text-[2.5rem] leading-tight font-light text-white hover:opacity-50 transition-opacity duration-300">Contact</span>
              </Link>
            </div>
            <div className="text-white space-y-8">
              <p className="text-sm tracking-wide opacity-50 uppercase">About</p>
              <div className="space-y-6">
                <p className="text-base leading-relaxed font-light">
                  Zaur Baba is a digital designer focused on creating meaningful experiences 
                  through thoughtful design solutions. With a background in architecture 
                  and interaction design, they bring a unique perspective to every project.
                </p>
                <p className="text-base leading-relaxed font-light">
                  Based in Baku, Azerbaijan, they work with clients worldwide to create 
                  innovative solutions that bridge the gap between form and function.
                </p>
                <div className="pt-8">
                  <p className="text-sm tracking-wide opacity-50 uppercase mb-4">Contact</p>
                  <a href="mailto:your@email.com" className="text-base hover:opacity-50 transition-opacity duration-300">
                    your@email.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
          <div className="flex items-center">
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

      {/* Main Content */}
      <main className={`pt-32 transition-all duration-500 transform ${
        isMenuOpen ? 'opacity-0 pointer-events-none translate-y-4' : 'opacity-100 translate-y-0'
      }`}>
        <div className="container mx-auto px-6 sm:px-12 lg:px-16 xl:px-24 2xl:px-32">
          {/* Filters */}
          <div className="mb-16">
            <div className="flex space-x-8 border-b border-black/10 pb-4 transition-all duration-300">
              {filters.map(filter => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`text-sm uppercase tracking-wide hover:opacity-50 transition-all duration-300 font-light ${
                    activeFilter === filter.id ? 'opacity-100' : 'opacity-50'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Table */}
          <div className="relative">
            <table ref={tableRef} className="w-full border-collapse">
              <tbody>
                {projects.map((project) => (
                  <tr
                    key={project.id}
                    className="group border-t border-black/10 hover:bg-gray-50/50 transition-all duration-300 cursor-pointer"
                    onMouseEnter={() => !isMobile && setHoveredProject(project.id)}
                    onMouseLeave={() => !isMobile && setHoveredProject(null)}
                    onMouseMove={handleMouseMove}
                    onClick={() => router.push(`/projects/${project.id}`)}
                  >
                    <td className="py-8 pr-4 w-16 sm:w-24 transition-all duration-300 align-top">
                      <span className="text-sm tracking-wide transition-all duration-300 font-light">{project.number}</span>
                    </td>
                    <td className="py-8 pr-4 transition-all duration-300">
                      <h3 className="text-xl tracking-wide transition-all duration-300 font-light mb-2">{project.title}</h3>
                      <p className="text-sm tracking-wide opacity-50 font-light">{project.description}</p>
                    </td>
                    <td className="hidden sm:table-cell py-8 pr-4 transition-all duration-300 align-top">
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
              {hoveredProject && !isMobile && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                  className="fixed pointer-events-none"
                  style={{
                    top: mousePosition.y - 250,
                    left: mousePosition.x,
                    width: '500px',
                    height: '600px',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 10
                  }}
                >
                  <Image
                    src={projects.find(p => p.id === hoveredProject)?.image || ''}
                    alt=""
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-16 sm:py-24 mt-16">
        <div className="container mx-auto px-6 sm:px-12 lg:px-16 xl:px-24 2xl:px-32">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-8 sm:space-y-0">
            <div className="space-y-4">
              <p className="tracking-wide">Get in touch</p>
              <a href="mailto:your@email.com" className="text-sm tracking-wide hover:opacity-50">
                your@email.com
              </a>
            </div>
            <div className="space-x-8 sm:space-x-12">
              <a href="#" className="text-sm tracking-wide hover:opacity-50">LinkedIn</a>
              <a href="#" className="text-sm tracking-wide hover:opacity-50">Twitter</a>
              <a href="#" className="text-sm tracking-wide hover:opacity-50">Instagram</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
