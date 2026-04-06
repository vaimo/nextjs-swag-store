import Image from 'next/image';
import Link from 'next/link';
import { formatPrice } from '@/lib/format-price';
import type { Product } from '@/lib/server/api-client';

export function ProductCard({ product }: { product: Product }) {
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
