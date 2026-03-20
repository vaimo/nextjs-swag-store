'use client';

import { CartFooter } from '@/components/cart/cart-footer';
import { CartHeader } from '@/components/cart/cart-header';
import { CartItems } from '@/components/cart/cart-items';
import { clearCart, initCart } from '@/store/cart-slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

interface CartSidebarProps {
  open: boolean;
  onClose: () => void;
}

export function CartSidebar({ open, onClose }: CartSidebarProps) {
  const { items, totalItems, subtotal, currency } = useAppSelector(
    (s) => s.cart
  );
  const dispatch = useAppDispatch();

  const handleClear = () => {
    dispatch(clearCart());
    dispatch(initCart());
  };

  return (
    <>
      {open && (
        <button
          aria-label="Close cart"
          className="fixed inset-0 z-40 w-full bg-black/40"
          onClick={onClose}
          type="button"
        />
      )}
      <div
        className={`fixed top-0 right-0 z-50 flex h-full w-full max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <CartHeader onClose={onClose} totalItems={totalItems} />
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <CartItems items={items} onClose={onClose} />
        </div>
        {items.length > 0 && (
          <CartFooter
            currency={currency}
            onClear={handleClear}
            onClose={onClose}
            subtotal={subtotal}
          />
        )}
      </div>
    </>
  );
}
