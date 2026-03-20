'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCart } from '@/store/cart-slice';
import { formatPrice } from '@/lib/format-price';
import type { CartItem } from '@/store/cart-slice';

interface CartItemRowProps {
  item: CartItem;
  onClose?: () => void;
}

export function CartItemRow({ item, onClose }: CartItemRowProps) {
  const dispatch = useAppDispatch();
  const token = useAppSelector((s) => s.cart.token);
  const [loading, setLoading] = useState(false);

  const update = async (quantity: number) => {
    if (!token) return;
    setLoading(true);
    try {
      const method = quantity === 0 ? 'DELETE' : 'PATCH';
      const res = await fetch(`/api/cart/${item.productId}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'x-cart-token': token,
        },
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
      <div className="relative w-16 h-16 shrink-0 bg-gray-50">
        <Image
          src={item.product.images[0] ?? ''}
          alt={item.product.name}
          fill
          sizes="64px"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-1 flex-1 min-w-0">
        <Link
          href={`/products/${item.product.slug}`}
          onClick={onClose}
          className="text-sm font-medium leading-snug hover:underline truncate"
        >
          {item.product.name}
        </Link>
        <p className="text-sm font-semibold">
          {formatPrice(item.lineTotal, item.product.currency)}
        </p>
        {/* Quantity controls */}
        <div className="flex items-center gap-2 mt-1">
          <div className="flex items-center border">
            <button
              onClick={() => update(item.quantity - 1)}
              disabled={loading}
              aria-label="Decrease quantity"
              className="p-1 hover:bg-gray-100 disabled:opacity-30 transition"
            >
              <Minus size={12} />
            </button>
            <span className="w-8 text-center text-sm">{item.quantity}</span>
            <button
              onClick={() => update(item.quantity + 1)}
              disabled={loading}
              aria-label="Increase quantity"
              className="p-1 hover:bg-gray-100 disabled:opacity-30 transition"
            >
              <Plus size={12} />
            </button>
          </div>
          <button
            onClick={() => update(0)}
            disabled={loading}
            aria-label="Remove item"
            className="p-1 text-gray-400 hover:text-red-500 transition disabled:opacity-30"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </li>
  );
}
