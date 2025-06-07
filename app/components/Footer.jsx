'use client';
import { motion } from 'framer-motion';
import { Heart, Code, Github } from 'lucide-react';

export default function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
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
    <motion.footer
      className="border-t border-gray-200 mt-12 py-8 bg-white/80 backdrop-blur-sm"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-3xl mx-auto px-4">
        <motion.div 
          className="flex flex-col items-center gap-4"
          variants={containerVariants}
        >
          <motion.p 
            className="flex items-center gap-1 text-gray-600"
            variants={itemVariants}
          >
            © {new Date().getFullYear()} Mini Blog
          </motion.p>
          
          <motion.div 
            className="flex items-center gap-4"
            variants={containerVariants}
          >
            <motion.a
              href="https://nextjs.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-gray-500 hover:text-gray-800 transition-colors"
              whileHover={hoverEffect}
              whileTap={tapEffect}
              variants={itemVariants}
            >
              <Code className="w-4 h-4" />
              <span>Next.js</span>
            </motion.a>
            
            <motion.span 
              className="text-gray-300"
              variants={itemVariants}
            >
              •
            </motion.span>
            
            <motion.a
              href="https://www.prisma.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-gray-500 hover:text-gray-800 transition-colors"
              whileHover={hoverEffect}
              whileTap={tapEffect}
              variants={itemVariants}
            >
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
              <span>Prisma</span>
            </motion.a>
            
            <motion.span 
              className="text-gray-300"
              variants={itemVariants}
            >
              •
            </motion.span>
            
            <motion.a
              href="https://github.com/yahyalegrini24/mini-blog"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-gray-500 hover:text-gray-800 transition-colors"
              whileHover={hoverEffect}
              whileTap={tapEffect}
              variants={itemVariants}
            >
              <Github className="w-4 h-4" />
              <span>Source</span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </motion.footer>
  );
}