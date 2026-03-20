import { ShoppingBag } from 'lucide-react';
import { CartItemRow } from '@/components/cart/cart-item-row';
import type { CartItem } from '@/store/cart-slice';

interface CartItemsProps {
  items: CartItem[];
  onClose?: () => void;
}

export function CartItems({ items, onClose }: CartItemsProps) {
  if (items.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 text-gray-400">
        <ShoppingBag size={40} strokeWidth={1} />
        <p className="text-sm">Your cart is empty</p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-4">
      {items.map((item) => (
        <CartItemRow item={item} key={item.productId} onClose={onClose} />
      ))}
    </ul>
  );
}
