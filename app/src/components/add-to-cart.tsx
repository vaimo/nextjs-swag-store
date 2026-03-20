'use client';

import { Minus, Plus, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { setCart } from '@/store/cart-slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useCartFetch } from '@/hooks/use-cart-fetch';

interface AddToCartProps {
  productId: string;
  maxQuantity: number;
  inStock: boolean;
}

function getButtonLabel(isLoading: boolean, adding: boolean): string {
  if (isLoading) {
    return 'Creating cart…';
  }
  if (adding) {
    return 'Adding…';
  }
  return 'Add to Cart';
}

export function AddToCart({ productId, maxQuantity, inStock }: AddToCartProps) {
  const disabled = !inStock || maxQuantity === 0;
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const { token, status } = useAppSelector((s) => s.cart);
  const dispatch = useAppDispatch();
  const { cartFetch } = useCartFetch();
  const isLoading = status === 'loading';

  const decrement = () => setQuantity((q) => Math.max(1, q - 1));
  const increment = () => setQuantity((q) => Math.min(maxQuantity, q + 1));

  const handleAddToCart = async () => {
    if (!token) {
      return;
    }
    setAdding(true);
    try {
      const res = await cartFetch('/api/cart', {
        method: 'POST',
        body: JSON.stringify({ productId, quantity }),
      });
      if (res.ok) {
        const data = await res.json();
        dispatch(
          setCart({
            items: data.data.items,
            totalItems: data.data.totalItems,
            subtotal: data.data.subtotal,
            currency: data.data.currency,
          })
        );
      }
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Quantity selector */}
      <div className="flex items-center gap-3">
        <span className="font-medium text-gray-600 text-sm">Quantity</span>
        <div className="flex items-center border">
          <button
            aria-label="Decrease quantity"
            className="p-2 transition hover:bg-gray-100 disabled:opacity-30"
            disabled={disabled || quantity <= 1}
            onClick={decrement}
            type="button"
          >
            <Minus size={14} />
          </button>
          <span className="w-10 text-center font-medium text-sm">
            {quantity}
          </span>
          <button
            aria-label="Increase quantity"
            className="cursor-pointer p-2 transition hover:bg-gray-100 disabled:opacity-30"
            disabled={disabled || quantity >= maxQuantity}
            onClick={increment}
            type="button"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>

      {/* Add to cart button */}
      <button
        className="flex w-full cursor-pointer items-center justify-center gap-2 bg-black px-6 py-3 font-medium text-sm text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-40"
        disabled={disabled || isLoading || adding}
        onClick={handleAddToCart}
        type="button"
      >
        <ShoppingCart size={18} />
        {getButtonLabel(isLoading, adding)}
      </button>
    </div>
  );
}
