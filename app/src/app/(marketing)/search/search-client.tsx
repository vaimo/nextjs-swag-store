'use client';

import { SearchForm } from '@/components/search-form';
import { SearchResults } from './search-results';
import { useSearchLogic } from './use-search-logic';

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
