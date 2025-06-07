'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock, Eye, MessageSquare, Bookmark } from 'lucide-react';
import { formatDate } from '../../lib/utils';
import { motion } from 'framer-motion';

export default function PostCard({ post }) {
  return (
    <motion.div 
      className="group border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1.5 overflow-hidden"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Link href={`/posts/${post.id}`} className="block h-full">
        {/* Post Image */}
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={post.image || '/default-post.jpg'}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Bookmark button */}
          <button 
            className="absolute top-3 right-3 p-2 bg-white/80 rounded-full backdrop-blur-sm hover:bg-white transition-colors shadow-sm"
            onClick={(e) => {
              e.preventDefault();
              // Handle bookmark logic
            }}
          >
            <Bookmark size={18} className="text-gray-700 hover:text-blue-600" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* Category and Date */}
          <div className="flex justify-between items-center">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {post.category || 'General'}
            </div>
            <span className="text-xs text-gray-500 flex items-center">
              <Clock size={12} className="mr-1" />
              {formatDate(post.createdAt)}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
            {post.title}
          </h2>

          {/* Excerpt */}
          <p className="text-gray-600 line-clamp-2">
            {post.content.slice(0, 150)}...
          </p>

          {/* Metadata and Read More */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span className="flex items-center">
                <Eye size={14} className="mr-1" />
                {post.views || 0}
              </span>
              <span className="flex items-center">
                <MessageSquare size={14} className="mr-1" />
                {post.comments || 0}
              </span>
            </div>

            <div className="flex items-center gap-1 text-blue-600 font-medium group-hover:underline">
              <span className="text-sm">Read more</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}