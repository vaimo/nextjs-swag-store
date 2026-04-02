import { cacheLife, cacheTag } from 'next/cache';
import { fetchPromotion } from '@/lib/server/api-client';

export async function PromoBanner() {
  'use cache';
  cacheLife('products');
  cacheTag('promotions');

  const promo = await fetchPromotion();

  if (!promo?.active) {
    return null;
  }

  return (
    <div className="w-full bg-[#333] px-4 py-2 text-center text-[#f7f7f7] text-sm">
      <span className="font-semibold">{promo.title}</span>
      {' — '}
      {promo.description}
      {' Use code '}
      <span className="mx-1 border border-white/40 px-1.5 py-0.5 font-bold font-mono tracking-wider">
        {promo.code}
      </span>
      {' for '}
      <span className="font-bold">{promo.discountPercent}% off</span>
    </div>
  );
}
