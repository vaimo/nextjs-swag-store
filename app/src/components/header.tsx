import Link from 'next/link';
import { cacheLife } from 'next/cache';
import { CartButton } from '@/components/cart-button';

export async function Header() {
  'use cache';
  cacheLife('static');
  return (
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
            <CartButton />
          </div>
        </div>
      </nav>
    </header>
  );
}
