export function PageSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="mb-4 h-8 w-1/3 rounded bg-gray-200" />
      <div className="mb-2 h-4 w-full rounded bg-gray-200" />
      <div className="h-4 w-2/3 rounded bg-gray-200" />
    </div>
  );
}

export function FeaturedProductsSkeleton() {
  return (
    <section className="mx-auto py-12">
      <div className="h-8 w-48 bg-gray-200 animate-pulse mb-8" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-3 animate-pulse">
            <div className="aspect-square bg-gray-200" />
            <div className="h-3 w-16 bg-gray-200" />
            <div className="h-4 w-full bg-gray-200" />
            <div className="h-4 w-12 bg-gray-200" />
          </div>
        ))}
      </div>
    </section>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="mx-auto py-12 animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="aspect-square bg-gray-200" />
        <div className="flex flex-col gap-6">
          <div className="h-3 w-20 bg-gray-200" />
          <div className="flex flex-col gap-2">
            <div className="h-8 w-3/4 bg-gray-200" />
            <div className="h-6 w-24 bg-gray-200" />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gray-200" />
            <div className="h-3 w-28 bg-gray-200" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-3 w-full bg-gray-200" />
            <div className="h-3 w-full bg-gray-200" />
            <div className="h-3 w-2/3 bg-gray-200" />
          </div>
          <div className="flex gap-2">
            <div className="h-6 w-16 bg-gray-200" />
            <div className="h-6 w-16 bg-gray-200" />
            <div className="h-6 w-16 bg-gray-200" />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="h-3 w-16 bg-gray-200" />
              <div className="h-9 w-28 bg-gray-200" />
            </div>
            <div className="h-11 w-full bg-gray-200" />
          </div>
        </div>
      </div>
    </div>
  );
}
