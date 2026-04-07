'use client';

import { Search } from 'lucide-react';
import { SearchSkeleton } from '@/components/skeletons';
import type { Product } from '@/lib/server/api-client';
import { ProductGrid } from './product-grid';

interface SearchResultsProps {
  loading: boolean;
  products: Product[];
  hasSearched: boolean;
  query: string;
  category: string;
}

export function SearchResults({
  loading,
  products,
  hasSearched,
  query,
  category,
}: SearchResultsProps) {
  if (loading) {
    return <SearchSkeleton />;
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-16 text-gray-400">
        <Search size={40} strokeWidth={1} />
        <p className="text-sm">
          No products found{query ? ` for "${query}"` : ''}
        </p>
      </div>
    );
  }

  return (
    <>
      {hasSearched && (
        <p className="mb-4 text-gray-500 text-sm">
          {products.length} result{products.length !== 1 ? 's' : ''}
          {query ? ` for "${query}"` : ''}
          {category ? ` in ${category}` : ''}
        </p>
      )}
      <ProductGrid products={products} />
    </>
  );
}
