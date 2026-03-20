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
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') { onSearch(); }
          }}
          placeholder="Search products…"
          className="w-full border py-2 pl-9 pr-4 text-sm outline-none focus:border-black"
        />
      </div>
      <select
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="border px-3 py-2 text-sm outline-none focus:border-black sm:w-48"
      >
        <option value="">All categories</option>
        {categories.map((cat) => (
          <option key={cat.slug} value={cat.slug}>
            {cat.name}
          </option>
        ))}
      </select>
      <button
        type="button"
        onClick={onSearch}
        className="bg-black px-6 py-2 font-medium text-sm text-white transition hover:bg-gray-800"
      >
        Search
      </button>
    </div>
  );
}

