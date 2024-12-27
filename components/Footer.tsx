import Link from 'next/link';

export default function Footer() {
  const currentYear = 2025;
  
  return (
    <footer className="w-full py-12 mt-auto font-medium">
      <div className="container mx-auto px-6 sm:px-12 lg:px-16 xl:px-24 2xl:px-32">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-6 sm:space-y-0">
          <div className="text-xs tracking-wide opacity-40">
            Copyright © {currentYear}. Zaur Babayev. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <Link 
              href="mailto:zaur.babayev@network.rca.ac.uk" 
              className="text-xs tracking-wide opacity-40 hover:opacity-100 transition-opacity duration-300"
            >
              Email
            </Link>
            <Link 
              href="https://www.linkedin.com/in/zaurbabayev" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs tracking-wide opacity-40 hover:opacity-100 transition-opacity duration-300"
            >
              LinkedIn
            </Link>
            <Link 
              href="https://www.instagram.com/zaurbaba" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs tracking-wide opacity-40 hover:opacity-100 transition-opacity duration-300"
            >
              Instagram
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
