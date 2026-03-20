import { cacheLife } from 'next/cache';
import { ProductCard } from '@/components/product-card';
import {
  fetchFeaturedProducts,
  fetchProductStock,
} from '@/lib/server/api-client';

export async function FeaturedProducts() {
  'use cache';
  cacheLife({
    stale: 60 * 15, // 15 minutes
    revalidate: 60 * 15,
    expire: 60 * 60, // 1 hour hard expiry
  });
  const products = await fetchFeaturedProducts();

  if (!products.length) {
    return null;
  }

  // Fetch stock for all products in parallel
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
