import { StockIndicator } from '@/components/stock-indicator';
import { fetchProductStock } from '@/lib/server/api-client';

export async function ProductStockBadge({ slug }: { slug: string }) {
  const stock = await fetchProductStock(slug);
  return <StockIndicator stock={stock} />;
}

export function StockBadgeFallback() {
  return (
    <span className="absolute top-2 right-2 h-5 w-16 animate-pulse bg-gray-200" />
  );
}
