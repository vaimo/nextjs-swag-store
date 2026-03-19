import type { Metadata } from "next";
import { CartPageContent } from "@/components/cart/cart-page-content";

export const metadata: Metadata = {
    title: "Cart",
};

export default function CartPage() {
    return (
        <div className="mx-auto py-12">
            <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
            <CartPageContent />
        </div>
    );
}

