import Image from 'next/image';

// Simple gray blur placeholder (base64 encoded 1x1 SVG)
const blurDataURL =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxIDEiPjxyZWN0IGZpbGw9IiM5Y2EzYWYiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiLz48L3N2Zz4=';

const galleryImages = [
  { src: 'https://picsum.photos/800/600?random=1', alt: 'Mountain landscape' },
  { src: 'https://picsum.photos/800/600?random=2', alt: 'Ocean sunset' },
  { src: 'https://picsum.photos/800/600?random=3', alt: 'Forest path' },
];

export function GalleryGrid() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {galleryImages.map((image) => (
        <div className="relative aspect-4/3" key={image.src}>
          <Image
            alt={image.alt}
            blurDataURL={blurDataURL}
            className="object-cover"
            fill
            placeholder="blur"
            quality={75}
            sizes="(max-width: 768px) 100vw, 50vw"
            src={image.src}
          />
        </div>
      ))}
    </div>
  );
}
