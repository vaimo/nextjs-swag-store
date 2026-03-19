import Image from "next/image";

// Simple gray blur placeholder (base64 encoded 1x1 SVG)
const blurDataURL =
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxIDEiPjxyZWN0IGZpbGw9IiM5Y2EzYWYiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiLz48L3N2Zz4=";

const galleryImages = [
    { src: "https://picsum.photos/800/600?random=1", alt: "Mountain landscape" },
    { src: "https://picsum.photos/800/600?random=2", alt: "Ocean sunset" },
    { src: "https://picsum.photos/800/600?random=3", alt: "Forest path" }
];

export function GalleryGrid() {
    return (
        <div className="grid grid-cols-3 gap-4">
            {galleryImages.map((image, i) => (
                <div key={i} className="relative aspect-4/3">
                    <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        quality={75}
                        placeholder="blur"
                        blurDataURL={blurDataURL}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                    />
                </div>
            ))}
        </div>
    );
}

