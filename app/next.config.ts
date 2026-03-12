import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    cacheComponents: true,
    products: {
        stale: 300, // 5 minutes
        revalidate: 900, // 15 minutes
        expire: 3600, // 1 hour
    }
};

export default nextConfig;
