import { fetchPromotion } from '@/lib/server/api-client';

export async function PromoBanner() {
  const promo = await fetchPromotion();

  if (!promo?.active) return null;

  return (
    <div className="w-full bg-[#333] text-[#f7f7f7] text-center py-2 px-4 text-sm">
      <span className="font-semibold">{promo.title}</span>
      {' — '}
      {promo.description}
      {' Use code '}
      <span className="font-mono font-bold tracking-wider border border-white/40 px-1.5 py-0.5 mx-1">
        {promo.code}
      </span>
      {' for '}
      <span className="font-bold">{promo.discountPercent}% off</span>
    </div>
  );
}
