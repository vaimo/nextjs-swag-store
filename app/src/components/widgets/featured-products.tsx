import { cacheLife, cacheTag } from 'next/cache';
import { ProductCard } from '@/components/product-card';
import {
  fetchFeaturedProducts,
  fetchProductStock,
} from '@/lib/server/api-client';

// Cached: product list changes rarely — 15 min is fine
async function getFeaturedProducts() {
  'use cache';
  cacheLife('products');
  cacheTag('products', 'featured-products');
  return fetchFeaturedProducts();
}

// Not cached: stock is real-time data, must always be fresh
export async function FeaturedProducts() {
  const products = await getFeaturedProducts();

  if (!products.length) {
    return null;
  }

  // Always fetch fresh stock in parallel
  const stocks = await Promise.all(
    products.map((p) => fetchProductStock(p.slug))
  );

  return (
    <section className="mx-auto py-12">
      <h2 className="mb-8 text-2xl">Featured Products</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product, i) => (
          <ProductCard
            key={product.id}
            product={product}
            stock={stocks[i] ?? null}
          />
        ))}
      </div>
    </section>
  );
}
