import Image from 'next/image';
import Link from 'next/link';
import { StockIndicator } from '@/components/stock-indicator';
import { formatPrice } from '@/lib/format-price';
import {
  fetchFeaturedProducts,
  fetchProductStock,
  type Product,
  type Stock,
} from '@/lib/server/api-client';

function ProductCard({
  product,
  stock,
}: {
  product: Product;
  stock: Stock | null;
}) {
  return (
    <Link
      className="group flex flex-col border transition hover:shadow-lg"
      href={`/products/${product.slug}`}
    >
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <Image
          alt={product.name}
          className="object-cover transition duration-300 group-hover:scale-105"
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
          src={product.images[0] ?? 'https://picsum.photos/400/400?grayscale'}
        />
        <StockIndicator stock={stock} />
      </div>
      <div className="flex flex-col gap-2 p-4">
        <span className="text-gray-400 text-xs uppercase tracking-wide">
          {product.category}
        </span>
        <h3 className="font-semibold text-sm leading-snug">{product.name}</h3>
        <p className="font-medium text-sm">
          {formatPrice(product.price, product.currency)}
        </p>
      </div>
    </Link>
  );
}

export async function FeaturedProducts() {
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
