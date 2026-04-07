import { Loader2, Minus, Plus } from 'lucide-react';

export function AddToCartFallback() {
  return (
    <div className="flex flex-col gap-4">
      {/* Quantity selector */}
      <div className="flex items-center gap-3">
        <span className="font-medium text-gray-600 text-sm">Quantity</span>
        <div className="flex items-center border">
          <button
            aria-label="Decrease quantity"
            className="p-2 opacity-30"
            disabled
            type="button"
          >
            <Minus size={14} />
          </button>
          <span className="w-10 text-center font-medium text-sm">1</span>
          <button
            aria-label="Increase quantity"
            className="p-2 opacity-30"
            disabled
            type="button"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>

      {/* Add to cart button — disabled with spinner */}
      <button
        className="relative flex w-full cursor-not-allowed items-center justify-center gap-2 bg-black px-6 py-3 font-medium text-sm text-white opacity-60"
        disabled
        type="button"
      >
        <Loader2 className="animate-spin" size={18} />
        Add to Cart
      </button>
    </div>
  );
}
