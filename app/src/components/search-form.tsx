'use client';

import { Search } from 'lucide-react';

interface SearchFormProps {
  query: string;
  category: string;
  categories: { slug: string; name: string }[];
  onQueryChange: (q: string) => void;
  onCategoryChange: (cat: string) => void;
  onSearch: () => void;
}

export function SearchForm({
  query,
  category,
  categories,
  onQueryChange,
  onCategoryChange,
  onSearch,
}: SearchFormProps) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row">
      <div className="relative flex-1">
        <Search
          className="-translate-y-1/2 absolute top-1/2 left-3 text-gray-400"
          size={16}
        />
        <input
          className="w-full border py-2 pr-4 pl-9 text-sm outline-none focus:border-black"
          onChange={(e) => onQueryChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onSearch();
            }
          }}
          placeholder="Search products…"
          type="search"
          value={query}
        />
      </div>
      <select
        className="border px-3 py-2 text-sm outline-none focus:border-black sm:w-48"
        onChange={(e) => onCategoryChange(e.target.value)}
        value={category}
      >
        <option value="">All categories</option>
        {categories.map((cat) => (
          <option key={cat.slug} value={cat.slug}>
            {cat.name}
          </option>
        ))}
      </select>
      <button
        className="bg-black px-6 py-2 font-medium text-sm text-white transition hover:bg-gray-800"
        onClick={onSearch}
        type="button"
      >
        Search
      </button>
    </div>
  );
}
