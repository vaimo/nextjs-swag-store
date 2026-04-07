'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { Product } from '@/lib/server/api-client';

interface Category {
  slug: string;
  name: string;
}

export interface SearchLogicResult {
  query: string;
  setQuery: (q: string) => void;
  category: string;
  setCategory: (c: string) => void;
  products: Product[];
  categories: Category[];
  loading: boolean;
  hasSearched: boolean;
  triggerSearch: () => void;
}

export function useSearchLogic(): SearchLogicResult {
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
