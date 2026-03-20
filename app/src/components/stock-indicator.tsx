import type { Stock } from '@/lib/server/api-client';

interface StockIndicatorProps {
  stock: Stock | null;
}

export function StockIndicator({ stock }: StockIndicatorProps) {
  const inStock = stock?.inStock ?? true;
  const lowStock = stock?.lowStock ?? false;
  const quantity = stock?.stock ?? 0;

  const labelStyle = !inStock
    ? 'bg-red-100 text-red-700'
    : lowStock
      ? 'bg-amber-100 text-amber-700'
      : 'bg-green-100 text-green-700';

  const label = !inStock
    ? 'Out of stock'
    : lowStock
      ? `Only ${quantity} left`
      : `In stock`;

  return (
    <span
      className={`absolute top-2 right-2 text-xs font-medium px-2 py-1 ${labelStyle}`}
    >
      {label}
    </span>
  );
}
