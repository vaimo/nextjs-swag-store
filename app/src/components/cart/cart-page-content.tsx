'use client';

import { ShoppingBag, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { CartItems } from '@/components/cart/cart-items';
import { formatPrice } from '@/lib/format-price';
import { clearCart, initCart } from '@/store/cart-slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

export function CartPageContent() {
  const { items, totalItems, subtotal, currency } = useAppSelector(
    (s) => s.cart
  );
  const dispatch = useAppDispatch();

  const handleClear = () => {
    dispatch(clearCart());
    dispatch(initCart());
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-24 text-gray-400">
        <ShoppingBag size={56} strokeWidth={1} />
        <p className="text-lg">Your cart is empty</p>
        <Link
          className="mt-2 bg-black px-6 py-3 font-medium text-sm text-white transition hover:bg-gray-800"
          href="/"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
      {/* Items */}
      <div className="lg:col-span-2">
        <CartItems items={items} />
      </div>

      {/* Summary */}
      <div className="flex h-fit flex-col gap-4 border p-6">
        <h2 className="border-b pb-4 font-semibold text-lg">Order Summary</h2>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Items ({totalItems})</span>
          <span>{formatPrice(subtotal, currency)}</span>
        </div>
        <div className="flex justify-between border-t pt-4 font-bold text-sm">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal, currency)}</span>
        </div>
        <button
          className="w-full bg-black py-3 font-medium text-sm text-white transition hover:bg-gray-800"
          type="button"
        >
          Proceed to Checkout
        </button>
        <Link
          className="text-center text-gray-500 text-sm transition hover:text-black"
          href="/"
        >
          Continue Shopping
        </Link>
        <button
          className="flex w-full cursor-pointer items-center justify-center gap-2 py-2 text-red-500 text-sm transition hover:text-red-700"
          onClick={handleClear}
          type="button"
        >
          <Trash2 size={14} />
          Clear cart
        </button>
      </div>
    </div>
  );
}
