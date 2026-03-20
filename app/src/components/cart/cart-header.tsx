import { ShoppingBag, X } from 'lucide-react';

interface CartHeaderProps {
  totalItems: number;
  onClose: () => void;
}

export function CartHeader({ totalItems, onClose }: CartHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b px-6 py-4">
      <div className="flex items-center gap-2 font-semibold text-lg">
        <ShoppingBag size={20} />
        Cart
        {totalItems > 0 && (
          <span className="font-normal text-gray-500 text-sm">
            ({totalItems} items)
          </span>
        )}
      </div>
      <button
        aria-label="Close cart"
        className="cursor-pointer p-1 transition hover:text-gray-500"
        onClick={onClose}
        type="button"
      >
        <X size={20} />
      </button>
    </div>
  );
}
