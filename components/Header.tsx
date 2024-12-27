import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-sm z-50 border-b border-gray-100">
      <div className="container mx-auto px-6 sm:px-12 lg:px-16 xl:px-24 2xl:px-32">
        <nav className="flex items-center justify-between h-16">
          <Link href="/" className="text-lg font-medium hover:text-gray-600 transition-colors">
            Zaur Baba
          </Link>
          <div className="flex items-center space-x-8">
            <Link href="/about" className="text-sm hover:text-gray-600 transition-colors">
              About
            </Link>
            <Link href="/projects" className="text-sm hover:text-gray-600 transition-colors">
              Projects
            </Link>
            <Link href="/contact" className="text-sm hover:text-gray-600 transition-colors">
              Contact
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
