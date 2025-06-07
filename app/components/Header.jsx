'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, PenSquare, NotebookText } from 'lucide-react';

export default function Header() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10
      }
    }
  };

  const hoverEffect = {
    scale: 1.05,
    transition: { type: 'spring', stiffness: 300 }
  };

  const tapEffect = {
    scale: 0.95
  };

  return (
    <motion.header 
      className="border-b border-gray-200 py-4 mb-8 bg-white/80 backdrop-blur-sm sticky top-0 z-50"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-3xl mx-auto flex justify-between items-center px-4">
        <motion.div variants={itemVariants}>
          <Link href="/" className="flex items-center gap-2">
            <motion.span 
              className="text-2xl font-bold text-black flex items-center"
              whileHover={hoverEffect}
              whileTap={tapEffect}
            >
              <NotebookText className="w-6 h-6 text-indigo-600" />
              <span className="ml-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Mini Blog
              </span>
            </motion.span>
          </Link>
        </motion.div>

        <motion.nav 
          className="flex items-center gap-4"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <Link 
              href="/" 
              className="text-gray-600 hover:text-black flex items-center gap-1 transition-colors"
            >
              <motion.span 
                className="flex items-center"
                whileHover={hoverEffect}
                whileTap={tapEffect}
              >
                <Home className="w-5 h-5" />
                <span className="ml-1 hidden sm:inline">Home</span>
              </motion.span>
            </Link>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Link 
              href="/posts/new" 
              className="text-gray-600 hover:text-black flex items-center gap-1 transition-colors"
            >
              <motion.span 
                className="flex items-center"
                whileHover={hoverEffect}
                whileTap={tapEffect}
              >
                <PenSquare className="w-5 h-5" />
                <span className="ml-1 hidden sm:inline">Add Post</span>
              </motion.span>
            </Link>
          </motion.div>
        </motion.nav>
      </div>
    </motion.header>
  );
}