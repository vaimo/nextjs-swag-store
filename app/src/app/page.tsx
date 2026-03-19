import { Suspense } from "react";
import type { Metadata } from "next";
import { HeroBanner } from "@/components/widgets/hero-banner";
import { GalleryGrid } from "@/components/widgets/gallery-grid";
import { FeaturedProducts } from "@/components/widgets/featured-products";
import { FeaturedProductsSkeleton } from "@/components/skeletons";


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
