export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto py-10 px-4 animate-pulse">
      <div className="grid md:grid-cols-2 gap-10">
        {/* Image Skeleton */}
        <div className="h-96 bg-gray-300 skeleton rounded-xl"></div>

        {/* Details Skeleton */}
        <div className="space-y-4">
          <div className="h-8 w-3/4 bg-gray-300 skeleton rounded"></div>
          <div className="h-6 w-1/2 bg-gray-300 skeleton rounded"></div>
          <div className="h-6 w-1/3 bg-gray-300 skeleton rounded"></div>
          <div className="h-10 w-full bg-gray-300 skeleton rounded"></div>
          <div className="h-20 w-full bg-gray-300 skeleton rounded"></div>
        </div>
      </div>

      <div className="mt-10 space-y-4">
        <div className="h-6 w-1/4 bg-gray-300 skeleton rounded"></div>
        <div className="h-24 w-full bg-gray-300 skeleton rounded"></div>
      </div>
    </div>
  );
}
