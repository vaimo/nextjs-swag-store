import type { Metadata } from "next";
import { HeroBanner } from "@/components/hero-banner";
import { GalleryGrid } from "@/components/gallery-grid";


export const metadata: Metadata = {
    title: "SWAG Homepage",
    description: "Welcome to our platform! Explore our features and discover how we can help you achieve your goals.",
};

export default function HomePage() {
    return (
        <div className="mx-auto">
            <HeroBanner />
            <section className="mx-auto py-12">
                <GalleryGrid />
            </section>
        </div>
    );
}
