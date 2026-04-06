import type { Metadata } from 'next';
import { Suspense } from 'react';
import { SearchSkeleton } from '@/components/skeletons';
import { SearchClient } from './search-client';

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME;
const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

export const metadata: Metadata = {
  title: 'Search',
  description: `Search and filter products in the ${APP_NAME} catalog.`,
  openGraph: {
    title: `Search | ${APP_NAME}`,
    description: `Search and filter products in the ${APP_NAME} catalog.`,
    url: `${APP_URL}/search`,
    siteName: APP_NAME,
    type: 'website',
    images: [
      {
        url: `${APP_URL}/swag.png`,
        width: 1200,
        height: 900,
        alt: `${APP_NAME} — Search`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Search | ${APP_NAME}`,
    description: `Search and filter products in the ${APP_NAME} catalog.`,
    images: [`${APP_URL}/swag.png`],
  },
  alternates: {
    canonical: `${APP_URL}/search`,
  },
};

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchSkeleton />}>
      <SearchClient />
    </Suspense>
  );
}
