import { cacheLife, cacheTag } from 'next/cache';
import { Suspense } from 'react';
import { ProductCard } from '@/components/product-card';
import { StockIndicator } from '@/components/stock-indicator';
import {
  fetchFeaturedProducts,
  fetchProductStock,
} from '@/lib/server/api-client';

// Cached: product list changes rarely — 15 min is fine
async function getFeaturedProducts() {
  'use cache';
  cacheLife('products');
  cacheTag('products', 'featured-products');
  return await fetchFeaturedProducts();
}

async function ProductStockBadge({ slug }: { slug: string }) {
  const stock = await fetchProductStock(slug);
  return <StockIndicator stock={stock} />;
}

function StockBadgeFallback() {
  return (
    <span className="absolute top-2 right-2 h-5 w-16 animate-pulse bg-gray-200" />
  );
}

// Not cached: stock is real-time data, must always be fresh
export async function FeaturedProducts() {
  const products = await getFeaturedProducts();

  if (!products.length) {
    return null;
  }

  return (
    <section className="mx-auto py-12">
      <h2 className="mb-8 text-2xl">Featured Products</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            stock={null}
            stockSlot={
              <Suspense fallback={<StockBadgeFallback />}>
                <ProductStockBadge slug={product.slug} />
              </Suspense>
            }
          />
        ))}
      </div>
    </section>
  );
}
