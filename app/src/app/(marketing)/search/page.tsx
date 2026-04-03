'use client';

import { Search } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ProductCard } from '@/components/product-card';
import { SearchForm } from '@/components/search-form';
import { SearchSkeleton } from '@/components/skeletons';
import type { Product } from '@/lib/server/api-client';

interface Category {
  slug: string;
  name: string;
}

function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} stock={null} />
      ))}
    </div>
  );
}

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(() => searchParams.get('q') ?? '');
  const [category, setCategory] = useState(() => searchParams.get('category') ?? '');
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasSearched, setHasSearched] = useState(
    () => !!(searchParams.get('q') || searchParams.get('category'))
  );
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync state to URL
  const deepLinkSearchUrl = useCallback(
    (q: string, cat: string) => {
      const params = new URLSearchParams();
      if (q) params.set('q', q);
      if (cat) params.set('category', cat);
      const qs = params.toString();
      router.replace(qs ? `/search?${qs}` : '/search', { scroll: false });
    },
    [router]
  );

  const doSearch = useCallback(async (q: string, cat: string) => {
    setLoading(true);
    try {
      const qs = new URLSearchParams();
      if (q) qs.set('search', q);
      if (cat) qs.set('category', cat);
      qs.set('limit', '5');
      const res = await fetch(`/api/products?${qs}`);
      const data = await res.json();
      setProducts(data.data ?? []);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // On mount: run search with whatever is in the URL
  useEffect(() => {
    doSearch(query, category);
    fetch('/api/categories')
      .then((r) => r.json())
      .then((d) => setCategories(d.data ?? []))
      .catch(() => setCategories([]));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (query.length >= 3 || category) {
      setHasSearched(true);
      deepLinkSearchUrl(query, category);
      debounceRef.current = setTimeout(() => doSearch(query, category), 400);
    } else if (query.length === 0 && !category && hasSearched) {
      setHasSearched(false);
      deepLinkSearchUrl('', '');
      doSearch('', '');
    }

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, category, hasSearched, doSearch, deepLinkSearchUrl]);

  const triggerSearch = () => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setHasSearched(true);
    deepLinkSearchUrl(query, category);
    doSearch(query, category);
  };

  return (
    <div className="mx-auto py-2">
      <h1 className="mb-8 font-bold text-3xl">Search</h1>
      <SearchForm
        query={query}
        category={category}
        categories={categories}
        onQueryChange={(q) => setQuery(q)}
        onCategoryChange={(cat) => setCategory(cat)}
        onSearch={triggerSearch}
      />

      {loading ? (
        <SearchSkeleton />
      ) : products.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 py-16 text-gray-400">
          <Search size={40} strokeWidth={1} />
          <p className="text-sm">
            No products found{query ? ` for "${query}"` : ''}
          </p>
        </div>
      ) : (
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
      )}
    </div>
  );
}
