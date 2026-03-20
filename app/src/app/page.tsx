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
      <HeroBanner />
      <Suspense fallback={<FeaturedProductsSkeleton />}>
        <FeaturedProducts />
      </Suspense>
      <section className="mx-auto">
        <GalleryGrid />
      </section>
    </div>
  );
}
