import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { cacheLife, cacheTag } from 'next/cache';
import { AddToCart } from '@/components/add-to-cart';
import { StockIndicator } from '@/components/stock-indicator';
import { formatPrice } from '@/lib/format-price';
import { fetchProductBySlug, fetchProductStock, fetchAllProducts } from '@/lib/server/api-client';

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? 'SWAG Store';
const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? 'https://swag-store.vercel.app';

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
  return fetchProductBySlug(slug);
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
