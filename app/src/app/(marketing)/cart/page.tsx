import type { Metadata } from 'next';
import { CartPageContent } from '@/components/cart/cart-page-content';

export const metadata: Metadata = {
  title: 'Cart',
  robots: { index: false, follow: false },
};

export default function CartPage() {
  return (
    <div className="mx-auto py-12">
      <h1 className="mb-8 font-bold text-3xl">Your Cart</h1>
      <CartPageContent />
    </div>
  );
}
