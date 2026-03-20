import { Trash2 } from 'lucide-react';
import Link from 'next/link';
import { formatPrice } from '@/lib/format-price';

interface CartFooterProps {
  subtotal: number;
  currency: string;
  onClose: () => void;
  onClear: () => void;
}

export function CartFooter({
  subtotal,
  currency,
  onClose,
  onClear,
}: CartFooterProps) {
  return (
    <div className="flex flex-col gap-3 border-t px-6 py-4">
      <div className="flex justify-between font-semibold text-sm">
        <span>Subtotal</span>
        <span>{formatPrice(subtotal, currency)}</span>
      </div>
      <Link
        className="w-full bg-black py-3 text-center font-medium text-sm text-white transition hover:bg-gray-800"
        href="/cart"
        onClick={onClose}
      >
        View Cart
      </Link>
      <button
        className="flex w-full cursor-pointer items-center justify-center gap-2 py-2 text-red-500 text-sm transition hover:text-red-700"
        onClick={onClear}
        type="button"
      >
        <Trash2 size={14} />
        Clear cart
      </button>
    </div>
  );
}
