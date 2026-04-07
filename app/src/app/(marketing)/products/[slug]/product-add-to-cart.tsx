import { AddToCart } from '@/components/add-to-cart';
import { fetchProductStock } from '@/lib/server/api-client';

export async function ProductAddToCart({
  productId,
  slug,
}: {
  productId: string;
  slug: string;
}) {
  const stock = await fetchProductStock(slug);
  const inStock = stock?.inStock ?? true;
  const quantity = stock?.stock ?? 0;
  return (
    <AddToCart inStock={inStock} maxQuantity={quantity} productId={productId} />
  );
}
