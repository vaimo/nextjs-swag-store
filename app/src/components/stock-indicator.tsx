import type { Stock } from '@/lib/server/api-client';

interface StockIndicatorProps {
  stock: Stock | null;
}

function getLabelStyle(inStock: boolean, lowStock: boolean): string {
  if (!inStock) {
    return 'bg-red-100 text-red-700';
  }
  if (lowStock) {
    return 'bg-amber-100 text-amber-700';
  }
  return 'bg-green-100 text-green-700';
}

function getLabel(
  inStock: boolean,
  lowStock: boolean,
  quantity: number
): string {
  if (!inStock) {
    return 'Out of stock';
  }
  if (lowStock) {
    return `Only ${quantity} left`;
  }
  return `${quantity} In stock`;
}

export function StockIndicator({ stock }: StockIndicatorProps) {
  const inStock = stock?.inStock ?? true;
  const lowStock = stock?.lowStock ?? false;
  const quantity = stock?.stock ?? 0;

  const labelStyle = getLabelStyle(inStock, lowStock);
  const label = getLabel(inStock, lowStock, quantity);

  return (
    <span
      className={`absolute top-2 right-2 px-2 py-1 font-medium text-xs ${labelStyle}`}
    >
      {label}
    </span>
  );
}
