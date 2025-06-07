'use client';

export function Skeleton({ className = '', ...props }) {
  return (
    <div
      className={`animate-pulse bg-gray-200 rounded-md ${className}`}
      {...props}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="border border-gray-200 rounded-xl p-6 bg-white">
      <Skeleton className="h-5 w-1/3 mb-4" />
      <Skeleton className="h-6 w-full mb-3" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-5/6 mb-2" />
      <Skeleton className="h-4 w-2/3 mb-6" />
      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
        <Skeleton className="h-4 w-20" />
        <div className="flex space-x-4">
          <Skeleton className="h-4 w-10" />
          <Skeleton className="h-4 w-10" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonPost() {
  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-sm">
      <Skeleton className="h-8 w-1/4 mb-6" />
      <Skeleton className="h-10 w-full mb-8" />
      <div className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-11/12" />
        <Skeleton className="h-4 w-10/12" />
        <Skeleton className="h-4 w-9/12" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-11/12" />
      </div>
      <div className="mt-12 pt-6 border-t border-gray-100">
        <Skeleton className="h-12 w-full rounded-lg" />
      </div>
    </div>
  );
}

export function SkeletonList({ count = 3 }) {
  return (
    <div className="space-y-6">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="p-4 border-b border-gray-100">
          <Skeleton className="h-5 w-1/4 mb-3" />
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  );
}