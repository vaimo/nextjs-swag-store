import { ShoppingBag } from 'lucide-react';
import { X } from 'lucide-react';

interface CartHeaderProps {
  totalItems: number;
  onClose: () => void;
}

export function CartHeader({ totalItems, onClose }: CartHeaderProps) {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b">
      <div className="flex items-center gap-2 font-semibold text-lg">
        <ShoppingBag size={20} />
        Cart
        {totalItems > 0 && (
          <span className="text-sm font-normal text-gray-500">
            ({totalItems} items)
          </span>
        )}
      </div>
      <button
        onClick={onClose}
        aria-label="Close cart"
        className="p-1 hover:text-gray-500 transition cursor-pointer"
      >
        <X size={20} />
      </button>
    </div>
  );
}
