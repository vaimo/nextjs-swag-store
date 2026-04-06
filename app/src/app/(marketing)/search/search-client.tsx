'use client';

import { Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
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

interface SearchResultsProps {
  loading: boolean;
  products: Product[];
  hasSearched: boolean;
  query: string;
  category: string;
}

function SearchResults({
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

function useSearchLogic() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(() => searchParams.get('q') ?? '');
  const [category, setCategory] = useState(
    () => searchParams.get('category') ?? ''
  );
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasSearched, setHasSearched] = useState(
    () => !!(searchParams.get('q') || searchParams.get('category'))
  );
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const deepLinkSearchUrl = useCallback(
    (q: string, cat: string) => {
      const params = new URLSearchParams();
      if (q) {
        params.set('q', q);
      }
      if (cat) {
        params.set('category', cat);
      }
      const qs = params.toString();
      router.replace(qs ? `/search?${qs}` : '/search', { scroll: false });
    },
    [router]
  );

  const doSearch = useCallback(async (q: string, cat: string) => {
    setLoading(true);
    try {
      const qs = new URLSearchParams();
      if (q) {
        qs.set('search', q);
      }
      if (cat) {
        qs.set('category', cat);
      }
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

  const initialQuery = useRef(query);
  const initialCategory = useRef(category);

  // On mount: fetch categories and run initial search from URL
  useEffect(() => {
    doSearch(initialQuery.current, initialCategory.current);
    fetch('/api/categories')
      .then((r) => r.json())
      .then((d) => setCategories(d.data ?? []))
      .catch(() => setCategories([]));
  }, [doSearch]);

  // Debounced search on query/category change
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

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
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query, category, hasSearched, doSearch, deepLinkSearchUrl]);

  const triggerSearch = () => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    setHasSearched(true);
    deepLinkSearchUrl(query, category);
    doSearch(query, category);
  };

  return {
    query,
    setQuery,
    category,
    setCategory,
    products,
    categories,
    loading,
    hasSearched,
    triggerSearch,
  };
}

export function SearchClient() {
  const {
    query,
    setQuery,
    category,
    setCategory,
    products,
    categories,
    loading,
    hasSearched,
    triggerSearch,
  } = useSearchLogic();

  return (
    <div className="mx-auto py-2">
      <h1 className="mb-8 font-bold text-3xl">Search</h1>
      <SearchForm
        categories={categories}
        category={category}
        onCategoryChange={(cat) => setCategory(cat)}
        onQueryChange={(q) => setQuery(q)}
        onSearch={triggerSearch}
        query={query}
      />
      <SearchResults
        category={category}
        hasSearched={hasSearched}
        loading={loading}
        products={products}
        query={query}
      />
    </div>
  );
}
