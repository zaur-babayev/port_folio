import Link from 'next/link';
import { useState } from 'react';
import dynamic from 'next/dynamic';

const HamburgerIcon = dynamic(() => import('./HamburgerIcon'), { ssr: false });
const Menu = dynamic(() => import('./Menu'), { ssr: false });

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header 
        className={`fixed top-0 w-full backdrop-blur-sm z-[60] border-b transition-colors duration-300 ${
          isMenuOpen 
            ? 'bg-black border-white/10' 
            : 'bg-white/80 border-gray-100'
        }`}
      >
        <div className="container mx-auto px-6 sm:px-12 lg:px-16 xl:px-24 2xl:px-32">
          <nav className="flex items-center justify-between h-16">
            <Link 
              href="/" 
              className={`text-lg font-medium transition-colors ${
                isMenuOpen 
                  ? 'text-white hover:text-gray-300' 
                  : 'text-black hover:text-gray-600'
              } flex flex-col`}
            >
              <span className="text-base tracking-tight">Zaur Babayev</span>
              <span className="text-xs tracking-wide opacity-40 mt-0.5">Product Designer & PhD Candidate</span>
            </Link>
            <div className="relative z-[70] flex items-center h-16">
              <HamburgerIcon isOpen={isMenuOpen} onClick={() => setIsMenuOpen(!isMenuOpen)} />
            </div>
          </nav>
        </div>
      </header>
      
      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

export default Header;
