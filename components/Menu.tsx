import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const Menu = ({ isOpen, onClose }: MenuProps) => {
  const menuVariants = {
    closed: {
      opacity: 0,
      y: "-100%",
      transition: {
        duration: 0.3,
        ease: [0.23, 1, 0.32, 1]
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.23, 1, 0.32, 1]
      }
    }
  };

  const categories = [
    { name: 'All', href: '/' },
    { name: 'Architecture', href: '/architecture' },
    { name: 'Objects', href: '/objects' },
    { name: 'Exhibitions', href: '/exhibitions' }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black z-[55]"
          initial="closed"
          animate="open"
          exit="closed"
          variants={menuVariants}
        >
          <div className="container mx-auto px-6 sm:px-12 lg:px-16 xl:px-24 2xl:px-32 h-full">
            <div className="flex flex-col md:flex-row h-full py-24">
              {/* Left side - Categories */}
              <div className="flex-1 mb-12 md:mb-0">
                <nav className="space-y-6">
                  {categories.map((category) => (
                    <Link
                      key={category.name}
                      href={category.href}
                      className="block text-white text-3xl md:text-4xl font-light hover:text-gray-400 transition-colors"
                      onClick={onClose}
                    >
                      {category.name}
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Right side - Profile */}
              <div className="flex-1 text-white">
                <div className="max-w-md space-y-8">
                  <div className="space-y-4">
                    <h2 className="text-xl font-light">About</h2>
                    <p className="text-gray-400 font-light leading-relaxed">
                      I primarily design and make music. I can also code. A little.
                      <br />
                      <br />
                      I'm good at pattern recognition and recall. As a huge geek who uses a lot of software and hardware, my curiosity drives me to research beyond my immediate interests. That said, most of the days I try not to reinvent the wheel.
                      <br />
                      <br />
                      People tell me that I am easy to work with and a good collaborator. I build relationships and trust with colleagues, and we often have fun while building products together.
                      <br />
                      <br />
                      I always try to do what's right rather than just what is easy, aspiring to be the person I hope to become.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-xl font-light">Connect</h2>
                    <div className="space-y-2">
                      <a href="mailto:your@email.com" className="block text-gray-400 hover:text-white transition-colors">
                        your@email.com
                      </a>
                      <div className="flex space-x-6">
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">LinkedIn</a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">Instagram</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Menu;
