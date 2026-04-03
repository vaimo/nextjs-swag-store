import type { Metadata } from 'next';
import { Suspense } from 'react';
import { SearchClient } from './search-client';
import { SearchSkeleton } from '@/components/skeletons';

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? 'SWAG Store';
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://swag-store.vercel.app';

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
        url: `${APP_URL}/og-search.png`,
        width: 1200,
        height: 630,
        alt: `${APP_NAME} — Search`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Search | ${APP_NAME}`,
    description: `Search and filter products in the ${APP_NAME} catalog.`,
    images: [`${APP_URL}/og-search.png`],
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

