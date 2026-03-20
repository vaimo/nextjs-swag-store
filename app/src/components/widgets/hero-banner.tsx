import { getImageProps } from 'next/image';

export function HeroBanner() {
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
          fetchPriority="high"
          style={{
            width: '100%',
            height: 'auto',
            maxHeight: '485px',
            objectFit: 'cover',
            borderRadius: '2px',
          }}
          className="object-cover w-full"
          alt="SWAG Store hero banner"
        />
      </picture>
      {/* Gradient overlay with text */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.05), rgba(0,0,0,0.75))',
        }}
      >
        <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-lg mb-4">
          {process.env.NEXT_PUBLIC_APP_NAME || 'SWAG Store'}
        </h1>
        <p className="text-xl md:text-2xl text-white/90 max-w-2xl drop-shadow mb-8">
          Build faster, ship smarter, and scale seamlessly with modern web
          technologies.
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="/search"
            className="px-8 py-4 bg-white text-black rounded-xs font-medium text-lg hover:bg-gray-100 transition"
          >
            Get Started
          </a>
          <a
            href="/about"
            className="px-8 py-4 border border-white text-white rounded-xs font-medium text-lg hover:bg-white/10 transition"
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  );
}
