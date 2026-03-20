import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  cacheComponents: true,
  cacheLife: {
    products: {
      stale: 60 * 15, // 15 minutes
      revalidate: 60 * 15,
      expire: 60 * 60, // 1 hour
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i8qy5y6gxkdgdcv9.public.blob.vercel-storage.com',
        pathname: '/**',
      },
    ],
    // Match Tailwind breakpoints
    deviceSizes: [640, 768, 1024, 1280, 1536, 1920],
    // Common UI sizes
    imageSizes: [32, 48, 64, 96, 128, 192, 256],
    // Restrict quality values (required in Next.js 16)
    qualities: [75, 85],
    // Modern formats
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
