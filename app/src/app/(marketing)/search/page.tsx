'use client';

import { Search } from 'lucide-react';
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

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasSearched, setHasSearched] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  useEffect(() => {
    doSearch('', '');
    fetch('/api/categories')
      .then((r) => r.json())
      .then((d) => setCategories(d.data ?? []))
      .catch(() => setCategories([]));
  }, [doSearch]);

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    if (query.length >= 3 || category) {
      setHasSearched(true);
      debounceRef.current = setTimeout(() => doSearch(query, category), 400);
    } else if (query.length === 0 && !category && hasSearched) {
      setHasSearched(false);
      doSearch('', '');
    }
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query, category, hasSearched, doSearch]);

  const triggerSearch = () => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    setHasSearched(true);
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
