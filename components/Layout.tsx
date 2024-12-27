import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const router = useRouter();

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

  return (
    <div className="min-h-screen bg-white font-light">
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
            {router.pathname !== '/' && (
              <Link href="/">
                <span className="text-sm tracking-wide hover:opacity-50 transition-opacity duration-300">
                  Back to Projects
                </span>
              </Link>
            )}
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
        {/* Menu content */}
      </div>

      {/* Page Content */}
      <main className={`pt-32 transition-all duration-500 transform ${
        isMenuOpen ? 'opacity-0 pointer-events-none translate-y-4' : 'opacity-100 translate-y-0'
      }`}>
        {children}
      </main>
    </div>
  );
}
