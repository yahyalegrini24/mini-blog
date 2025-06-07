'use client';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="border-b border-gray-200 py-4 mb-8">
      <div className="max-w-3xl mx-auto flex justify-between items-center px-4">
        <Link href="/" className="text-2xl font-bold text-black">
          📝 Mini Blog
        </Link>
        <nav className="space-x-4">
          <Link href="/" className="text-gray-600 hover:text-black">Home</Link>
          <Link href="/posts/new" className="text-gray-600 hover:text-black">Add Post</Link>
        </nav>
      </div>
    </header>
  );
}
