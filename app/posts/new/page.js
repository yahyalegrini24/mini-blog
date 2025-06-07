'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, ImagePlus, Loader2, X } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function NewPostPage() {
  const router = useRouter();
  const fileInputRef = useRef(null);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate image file
    if (!file.type.match('image.*')) {
      setError('Please select an image file (JPEG, PNG, GIF, WebP)');
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      setError('Image size should be less than 5MB');
      return;
    }

    setImage(file);
    setError(null);
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImage(null);
    setPreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.match('image.*')) {
        const syntheticEvent = {
          target: { files: [file] }
        };
        handleImageChange(syntheticEvent);
      } else {
        setError('Please drop an image file');
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  async function handleSubmit(e) {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    
    if (!content.trim()) {
      setError('Content is required');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let imageUrl = '';
      let imagePublicId = '';

      // First upload image if exists
      if (image) {
        const formData = new FormData();
        formData.append('file', image);

        const uploadRes = await fetch('/api/posts/upload', {
          method: 'POST',
          body: formData,
        });

        const uploadData = await uploadRes.json();
        
        if (!uploadData.success) {
          throw new Error(uploadData.message || 'Image upload failed');
        }

        imageUrl = uploadData.imageUrl;
        imagePublicId = uploadData.publicId;
      }

      // Then create post using your existing posts API
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          title: title.trim(), 
          content: content.trim(), 
          image: imageUrl,
          imagePublicId: imagePublicId
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to create post');
      }

      toast.success('Post created successfully!');
      router.push('/');
      
    } catch (err) {
      console.error('Submit error:', err);
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Create New Post</h1>
        <p className="text-lg text-gray-600">Share your thoughts and ideas with the community</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Image Upload */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <label className="block text-lg font-semibold text-gray-700 mb-4">Featured Image</label>
          
          {preview ? (
            <div className="relative group">
              <div className="relative h-80 w-full rounded-xl overflow-hidden shadow-lg">
                <img 
                  src={preview} 
                  alt="Preview" 
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all"></div>
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg opacity-0 group-hover:opacity-100"
                  disabled={loading}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="mt-3 text-sm text-gray-500 text-center">
                Hover over the image and click the × button to remove
              </p>
            </div>
          ) : (
            <div 
              className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all duration-200"
              onClick={() => !loading && fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="p-4 bg-blue-100 rounded-full">
                  <Upload className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <p className="text-lg font-medium text-gray-700">
                    <span className="text-blue-600 hover:text-blue-700">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    JPEG, PNG, GIF, WebP up to 5MB
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
            disabled={loading}
          />
        </div>

        {/* Title */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <label htmlFor="title" className="block text-lg font-semibold text-gray-700 mb-4">
            Post Title *
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            disabled={loading}
            className="w-full px-4 py-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:cursor-not-allowed"
            placeholder="Enter a compelling title that captures your reader's attention..."
            maxLength={100}
          />
          <p className="mt-2 text-sm text-gray-500">
            {title.length}/100 characters
          </p>
        </div>

        {/* Content */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <label htmlFor="content" className="block text-lg font-semibold text-gray-700 mb-4">
            Post Content *
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={12}
            disabled={loading}
            className="w-full px-4 py-4 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:cursor-not-allowed resize-vertical"
            placeholder="Write your post content here... Share your story, insights, or ideas with the community."
          />
          <p className="mt-2 text-sm text-gray-500">
            {content.length} characters
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
            <div className="flex">
              <div className="flex-shrink-0">
                <X className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3">
                <p className="text-red-800 font-medium">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Submit Buttons */}
        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={() => router.push('/')}
            className="px-8 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading || !title.trim() || !content.trim()}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg font-medium text-white shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all flex items-center disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Publishing...
              </>
            ) : (
              <>
                <ImagePlus className="w-5 h-5 mr-2" />
                Publish Post
              </>
            )}
          </button>
        </div>
      </form>
    </main>
  );
}