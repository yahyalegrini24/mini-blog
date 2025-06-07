'use client';

import PostCard from './components/PostCard';
import Link from 'next/link';
import { Plus, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isHoveringCreate, setIsHoveringCreate] = useState(false);

  useEffect(() => {
    async function getPosts() {
      try {
        const res = await fetch(`/api/posts`);
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    }
    getPosts();
  }, []);

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <main className="max-w-6xl mx-auto py-8 px-4 sm:px-6">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 py-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl px-6 relative overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-blue-400 blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-indigo-400 blur-xl"></div>
        </div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 relative z-10"
        >
          Discover & Share <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            Creative Ideas
          </span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xl text-gray-600 max-w-2xl mx-auto relative z-10"
        >
          Explore insightful articles, tutorials, and stories from our community.
        </motion.p>
        
        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 max-w-md mx-auto relative z-10"
        >
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search articles..."
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-full bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:shadow-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </motion.div>
      </motion.section>

      {/* Content Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4"
      >
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Latest Articles</h2>
          <p className="text-gray-500">{filteredPosts.length} articles found</p>
        </div>

        <Link
          href="/posts/new"
          className="relative inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
          onMouseEnter={() => setIsHoveringCreate(true)}
          onMouseLeave={() => setIsHoveringCreate(false)}
        >
          <motion.span 
            animate={{ 
              x: isHoveringCreate ? 5 : 0,
              transition: { type: 'spring', stiffness: 500 }
            }}
            className="flex items-center gap-2 relative z-10"
          >
            <Plus size={18} />
            Create Post
          </motion.span>
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ 
              scale: isHoveringCreate ? 1 : 0,
              opacity: isHoveringCreate ? 1 : 0
            }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 z-0"
          />
        </Link>
      </motion.div>

      {loading ? (
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {[...Array(6)].map((_, i) => (
            <motion.div key={i} variants={item}>
              <SkeletonCard />
            </motion.div>
          ))}
        </motion.div>
      ) : filteredPosts.length > 0 ? (
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredPosts.map((post) => (
              <motion.div 
                key={post.id} 
                variants={item}
                layoutas
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: 'spring', damping: 20 }}
              >
                <PostCard post={post} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-16 bg-white rounded-xl shadow-sm"
        >
          <motion.div 
            animate={{ 
              y: [0, -5, 0],
              transition: { repeat: Infinity, duration: 3 }
            }}
            className="mx-auto w-48 mb-6 text-gray-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </motion.div>
          <h2 className="text-xl font-semibold text-gray-700">No matching articles found</h2>
          <p className="text-gray-500 mt-2">Try adjusting your search or create a new post.</p>
          <Link
            href="/posts/new"
            className="mt-6 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition-colors text-white font-medium py-2 px-6 rounded-full relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Plus size={16} />
              Write Your First Post
            </span>
            <span className="absolute inset-0 bg-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></span>
          </Link>
        </motion.div>
      )}
    </main>
  );
}

function SkeletonCard() {
  return (
    <div className="border border-gray-200 rounded-xl p-6 bg-white hover:shadow-md transition-all duration-300">
      <div className="animate-pulse space-y-4">
        <div className="h-5 w-1/3 bg-gray-200 rounded"></div>
        <div className="h-6 w-full bg-gray-200 rounded"></div>
        <div className="space-y-2">
          <div className="h-4 w-full bg-gray-200 rounded"></div>
          <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
          <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
        </div>
        <div className="h-4 w-24 bg-gray-200 rounded mt-6"></div>
      </div>
    </div>
  );
}