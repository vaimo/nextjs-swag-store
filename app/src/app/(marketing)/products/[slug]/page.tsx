import type { Metadata } from 'next';
import { cacheLife, cacheTag } from 'next/cache';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { formatPrice } from '@/lib/format-price';
import { fetchAllProducts, fetchProductBySlug } from '@/lib/server/api-client';
import { AddToCartFallback } from './add-to-cart-fallback';
import { ProductAddToCart } from './product-add-to-cart';
import { ProductStockBadge, StockBadgeFallback } from './product-stock-badge';

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME;
const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

export async function generateStaticParams() {
  'use cache';
  cacheLife('products');
  const products = await fetchAllProducts();
  return products.map((p) => ({ slug: p.slug }));
}

async function getProduct(slug: string) {
  'use cache';
  cacheLife('products');
  cacheTag('products', `product-${slug}`);
  return await fetchProductBySlug(slug);
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return { title: 'Product Not Found' };
  }

  const image = product.images[0];
  const url = `${APP_URL}/products/${product.slug}`;

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: `${product.name} | ${APP_NAME}`,
      description: product.description,
      url,
      siteName: APP_NAME,
      type: 'website',
      images: image
        ? [{ url: image, alt: product.name, width: 800, height: 800 }]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | ${APP_NAME}`,
      description: product.description,
      images: image ? [image] : [],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

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
          <Suspense fallback={<StockBadgeFallback />}>
            <ProductStockBadge slug={product.slug} />
          </Suspense>
        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-6">
          <span className="text-gray-400 text-xs uppercase tracking-widest">
            {product.category}
          </span>
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-3xl leading-tight">{product.name}</h1>
            <p className="font-semibold text-2xl">
              {formatPrice(product.price, product.currency)}
            </p>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            {product.description}
          </p>
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
          <Suspense fallback={<AddToCartFallback />}>
            <ProductAddToCart productId={product.id} slug={product.slug} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
