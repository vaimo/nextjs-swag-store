import { Suspense } from "react";
import type { Metadata } from "next";
import { HeroBanner } from "@/components/hero-banner";
import { GalleryGrid } from "@/components/gallery-grid";
import { FeaturedProducts } from "@/components/featured-products";


export const metadata: Metadata = {
    title: "SWAG Homepage",
    description: "Welcome to our platform! Explore our features and discover how we can help you achieve your goals.",
};

export default function HomePage() {
    return (
        <div className="mx-auto">
            <HeroBanner />
            <Suspense fallback={<FeaturedProductsSkeleton />}>
                <FeaturedProducts />
            </Suspense>
            <section className="mx-auto">
                <GalleryGrid />
            </section>
        </div>
    );
}

function FeaturedProductsSkeleton() {
    return (
        <section className="max-w-6xl mx-auto px-4 py-12">
            <div className="h-8 w-48 bg-gray-200 animate-pulse mb-8" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex flex-col gap-3">
                        <div className="aspect-square bg-gray-200 animate-pulse" />
                        <div className="h-3 w-16 bg-gray-200 animate-pulse" />
                        <div className="h-4 w-full bg-gray-200 animate-pulse" />
                        <div className="h-4 w-12 bg-gray-200 animate-pulse" />
                    </div>
                ))}
            </div>
        </section>
    );
}
