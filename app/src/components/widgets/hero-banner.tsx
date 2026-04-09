import { cacheLife } from 'next/cache';
import { getImageProps } from 'next/image';

export async function HeroBanner() {
  'use cache';
  cacheLife('static');
  await Promise.resolve();
  const common = { alt: 'SWAG Store hero banner', sizes: '100vw' };

  // Desktop: wide landscape
  const {
    props: { srcSet: desktop },
  } = getImageProps({
    ...common,
    width: 1440,
    height: 560,
    quality: 85,
    src: 'https://picsum.photos/1440/560?random=street-modern-hero',
  });

  // Mobile: taller portrait
  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({
    ...common,
    width: 750,
    height: 900,
    quality: 75,
    src: 'https://picsum.photos/750/900?random=city-hero-mobile',
  });

  return (
    <div className="relative overflow-hidden">
      <picture>
        <source media="(min-width: 1024px)" srcSet={desktop} />
        <source media="(min-width: 640px)" srcSet={mobile} />
        <img
          {...rest}
          alt="SWAG Store hero banner"
          className="w-full object-cover"
          fetchPriority="high"
          style={{
            width: '100%',
            height: 'auto',
            maxHeight: '485px',
            objectFit: 'cover',
            borderRadius: '2px',
          }}
        />
      </picture>
      {/* Gradient overlay with text */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.05), rgba(0,0,0,0.75))',
        }}
      >
        <h1 className="mb-4 font-bold text-5xl text-white drop-shadow-lg md:text-7xl">
          {process.env.NEXT_PUBLIC_APP_NAME || 'SWAG Store'}
        </h1>
        <p className="mb-8 max-w-2xl text-white/90 text-xl drop-shadow md:text-2xl">
          Build faster, ship smarter, and scale seamlessly with modern web
          technologies.
        </p>
        <div className="flex justify-center gap-4">
          <a
            className="rounded-xs bg-white px-8 py-4 font-medium text-black text-lg transition hover:bg-gray-100"
            href="/search"
          >
            Get Started
          </a>
          <a
            className="rounded-xs border border-white px-8 py-4 font-medium text-lg text-white transition hover:bg-white/10"
            href="/"
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  );
}
