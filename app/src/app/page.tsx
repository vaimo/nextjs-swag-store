import type { Metadata } from 'next';
import { Suspense } from 'react';
import { FeaturedProductsSkeleton } from '@/components/skeletons';
import { FeaturedProducts } from '@/components/widgets/featured-products';
import { GalleryGrid } from '@/components/widgets/gallery-grid';
import { HeroBanner } from '@/components/widgets/hero-banner';

export const metadata: Metadata = {
  title: 'SWAG Homepage',
  description:
    'Welcome to our platform! Explore our features and discover how we can help you achieve your goals.',
};

export default function HomePage() {
  return (
    <div className="mx-auto">
      <Suspense fallback={<div className="h-[485px] w-full animate-pulse bg-gray-200" />}>
        <HeroBanner />
      </Suspense>
      <Suspense fallback={<FeaturedProductsSkeleton />}>
        <FeaturedProducts />
      </Suspense>
      <section className="mx-auto">
        <Suspense fallback={<div className="grid grid-cols-3 gap-4">{Array.from({ length: 3 }).map((_, i) => <div key={i} className="aspect-4/3 animate-pulse bg-gray-200" />)}</div>}>
          <GalleryGrid />
        </Suspense>
      </section>
    </div>
  );
}
