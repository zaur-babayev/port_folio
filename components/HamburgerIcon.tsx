import { motion } from 'framer-motion';

interface HamburgerIconProps {
  isOpen: boolean;
  onClick: () => void;
}

const HamburgerIcon = ({ isOpen, onClick }: HamburgerIconProps) => {
  return (
    <button
      onClick={onClick}
      className="relative w-6 h-6 flex items-center justify-center focus:outline-none"
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      <div className="relative w-full h-full">
        <motion.span
          className="absolute left-0 right-0 h-[1px] bg-current"
          style={{ top: 'calc(50% - 3px)' }}
          animate={{
            rotate: isOpen ? 45 : 0,
            y: isOpen ? 3 : 0,
            backgroundColor: isOpen ? "#fff" : "#000"
          }}
          transition={{ duration: 0.3 }}
        />
        <motion.span
          className="absolute left-0 right-0 h-[1px] bg-current"
          style={{ top: 'calc(50% + 3px)' }}
          animate={{
            rotate: isOpen ? -45 : 0,
            y: isOpen ? -3 : 0,
            backgroundColor: isOpen ? "#fff" : "#000"
          }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </button>
  );
};

export default HamburgerIcon;
