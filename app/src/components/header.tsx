'use client';

import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { CartSidebar } from '@/components/cart/cart-sidebar';
import { useAppSelector } from '@/store/hooks';

export function Header() {
  const totalItems = useAppSelector((s) => s.cart.totalItems);
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <header className="border-b bg-white">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link className="font-bold text-xl" href="/">
                {process.env.NEXT_PUBLIC_APP_NAME || 'SWAG Store'}
              </Link>
              <div className="hidden gap-6 md:flex">
                <Link className="transition hover:text-gray-600" href="/">
                  Home
                </Link>
                <Link className="transition hover:text-gray-600" href="/search">
                  Search
                </Link>
              </div>
            </div>
            <div className="flex gap-4">
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
            </div>
          </div>
        </nav>
      </header>
      <CartSidebar onClose={() => setCartOpen(false)} open={cartOpen} />
    </>
  );
}
