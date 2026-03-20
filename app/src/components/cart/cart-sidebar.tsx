'use client';

import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { clearCart, initCart } from '@/store/cart-slice';
import { CartHeader } from '@/components/cart/cart-header';
import { CartItems } from '@/components/cart/cart-items';
import { CartFooter } from '@/components/cart/cart-footer';

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
        <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />
      )}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 flex flex-col shadow-2xl transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <CartHeader totalItems={totalItems} onClose={onClose} />
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <CartItems items={items} onClose={onClose} />
        </div>
        {items.length > 0 && (
          <CartFooter
            subtotal={subtotal}
            currency={currency}
            onClose={onClose}
            onClear={handleClear}
          />
        )}
      </div>
    </>
  );
}
