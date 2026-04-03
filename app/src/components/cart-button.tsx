'use client';

import { ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { CartSidebar } from '@/components/cart/cart-sidebar';
import { useAppSelector } from '@/store/hooks';

export function CartButton() {
  const totalItems = useAppSelector((s) => s.cart.totalItems);
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <button
        aria-label="Open cart"
        className="relative cursor-pointer p-2 transition hover:text-gray-600"
        onClick={() => setCartOpen(true)}
        type="button"
      >
        <ShoppingBag size={24} />
        {totalItems > 0 && (
          <span className="-top-0.5 -right-0.5 absolute flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-black px-1 font-bold text-[10px] text-white">
            {totalItems > 99 ? '99+' : totalItems}
          </span>
        )}
      </button>
      <CartSidebar onClose={() => setCartOpen(false)} open={cartOpen} />
    </>
  );
}

