import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { AddToCart } from '@/components/add-to-cart';
import { StockIndicator } from '@/components/stock-indicator';
import { formatPrice } from '@/lib/format-price';
import { fetchProductBySlug, fetchProductStock } from '@/lib/server/api-client';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);
  if (!product) {
    return { title: 'Product Not Found' };
  }
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const stock = await fetchProductStock(product.slug);
  const inStock = stock?.inStock ?? true;
  const quantity = stock?.stock ?? 0;

  return (
    <div className="mx-auto py-12">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <div className="relative aspect-square bg-gray-50">
          <Image
            alt={product.name}
            className="object-cover"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            src={product.images[0] ?? ''}
          />
          <StockIndicator stock={stock} />
        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-6">
          {/* Category breadcrumb */}
          <span className="text-gray-400 text-xs uppercase tracking-widest">
            {product.category}
          </span>

          {/* Name & Price */}
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-3xl leading-tight">{product.name}</h1>
            <p className="font-semibold text-2xl">
              {formatPrice(product.price, product.currency)}
            </p>
          </div>

          <p className="text-gray-600 text-sm leading-relaxed">
            {product.description}
          </p>

          {/* Tags */}
          {product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span
                  className="border px-2 py-1 text-gray-500 text-xs uppercase tracking-wide"
                  key={tag}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Quantity + Add to cart */}
          <AddToCart
            inStock={inStock}
            maxQuantity={quantity}
            productId={product.id}
          />
        </div>
      </div>
    </div>
  );
}
