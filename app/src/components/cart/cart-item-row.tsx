'use client';

import { Minus, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { formatPrice } from '@/lib/format-price';
import type { CartItem } from '@/store/cart-slice';
import { setCart } from '@/store/cart-slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useCartFetch } from '@/hooks/use-cart-fetch';

interface CartItemRowProps {
  item: CartItem;
  onClose?: () => void;
}

export function CartItemRow({ item, onClose }: CartItemRowProps) {
  const dispatch = useAppDispatch();
  const token = useAppSelector((s) => s.cart.token);
  const { cartFetch } = useCartFetch();
  const [loading, setLoading] = useState(false);

  const update = async (quantity: number) => {
    if (!token) {
      return;
    }
    setLoading(true);
    try {
      const method = quantity === 0 ? 'DELETE' : 'PATCH';
      const res = await cartFetch(`/api/cart/${item.productId}`, {
        method,
        ...(quantity > 0 && { body: JSON.stringify({ quantity }) }),
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
      setLoading(false);
    }
  };

  return (
    <li className="flex gap-4 border-b pb-4">
      <div className="relative h-16 w-16 shrink-0 bg-gray-50">
        <Image
          alt={item.product.name}
          className="object-cover"
          fill
          sizes="64px"
          src={item.product.images[0] ?? ''}
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <Link
          className="truncate font-medium text-sm leading-snug hover:underline"
          href={`/products/${item.product.slug}`}
          onClick={onClose}
        >
          {item.product.name}
        </Link>
        <p className="font-semibold text-sm">
          {formatPrice(item.lineTotal, item.product.currency)}
        </p>
        {/* Quantity controls */}
        <div className="mt-1 flex items-center gap-2">
          <div className="flex items-center border">
            <button
              aria-label="Decrease quantity"
              className="p-1 transition hover:bg-gray-100 disabled:opacity-30"
              disabled={loading}
              onClick={() => update(item.quantity - 1)}
              type="button"
            >
              <Minus size={12} />
            </button>
            <span className="w-8 text-center text-sm">{item.quantity}</span>
            <button
              aria-label="Increase quantity"
              className="p-1 transition hover:bg-gray-100 disabled:opacity-30"
              disabled={loading}
              onClick={() => update(item.quantity + 1)}
              type="button"
            >
              <Plus size={12} />
            </button>
          </div>
          <button
            aria-label="Remove item"
            className="p-1 text-gray-400 transition hover:text-red-500 disabled:opacity-30"
            disabled={loading}
            onClick={() => update(0)}
            type="button"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </li>
  );
}
