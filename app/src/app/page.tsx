import type { Metadata } from 'next';
import { Suspense } from 'react';
import { FeaturedProductsSkeleton } from '@/components/skeletons';
import { FeaturedProducts } from '@/components/widgets/featured-products';
import { GalleryGrid } from '@/components/widgets/gallery-grid';
import { HeroBanner } from '@/components/widgets/hero-banner';

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME;
const APP_URL = process.env.NEXT_PUBLIC_APP_URL;
const DESCRIPTION = `${APP_NAME} — premium swag and merch. Shop t-shirts, hoodies, bottles and more.`;

export const metadata: Metadata = {
  title: 'Home',
  description: DESCRIPTION,
  openGraph: {
    title: APP_NAME,
    description: DESCRIPTION,
    url: APP_URL,
    siteName: APP_NAME,
    type: 'website',
    images: [
      {
        url: `${APP_URL}/globe.svg`,
        width: 1200,
        height: 630,
        alt: `${APP_NAME} — Home`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: APP_NAME,
    description: DESCRIPTION,
    images: [`${APP_URL}/globe.svg`],
  },
  alternates: {
    canonical: APP_URL
  },
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
