import type { Metadata } from "next";
import { HeroBanner } from "@/components/hero-banner";


export const metadata: Metadata = {
    title: process.env.NEXT_PUBLIC_APP_NAME || "SWAG Store",
    description: "Welcome to our platform - Building the future of web development",
};

export default function HomePage() {
    return (
        <div className="mx-auto">
            <HeroBanner />
        </div>
    );
}
