'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Clock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/posts/${id}`);
        const data = await response.json();
        
        if (response.ok) {
          setPost(data);
        } else {
          setError(data.error || 'Failed to load post');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-500">{error}</h2>
          <Link href="/" className="mt-4 inline-flex items-center text-blue-600">
            <ArrowLeft size={16} className="mr-1" />
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  if (!post) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto px-4 py-8"
    >
      <Link href="/" className="mb-6 inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors">
        <ArrowLeft size={18} className="mr-2" />
        Back to all posts
      </Link>

      <article className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Post Image - only shown if image exists */}
        {post.image && (
          <div className="relative h-96 w-full">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}

        <div className="p-6 md:p-8">
          {/* Date */}
          <div className="flex justify-end mb-4">
            <span className="text-sm text-gray-500 flex items-center">
              <Clock size={14} className="mr-1" />
              {formatDate(post.createdAt)}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>

          {/* Content */}
          <div className="prose max-w-none text-gray-700 mb-8">
            {post.content || 'No content available'}
          </div>

          {/* Updated At - if you want to show when it was last updated */}
          {post.updatedAt && (
            <div className="text-xs text-gray-400 text-right mt-4">
              Last updated: {formatDate(post.updatedAt)}
            </div>
          )}
        </div>
      </article>
    </motion.div>
  );
}