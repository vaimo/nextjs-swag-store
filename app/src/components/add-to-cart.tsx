"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useAppSelector } from "@/store/hooks";

interface AddToCartProps {
    maxQuantity: number;
    inStock: boolean;
}

export function AddToCart({ maxQuantity, inStock }: AddToCartProps) {
    const disabled = !inStock || maxQuantity === 0;
    const [quantity, setQuantity] = useState(1);
    const { token, status } = useAppSelector((s) => s.cart);
    const isLoading = status === "loading";

    const decrement = () => setQuantity((q) => Math.max(1, q - 1));
    const increment = () => setQuantity((q) => Math.min(maxQuantity, q + 1));

    const handleAddToCart = async () => {
        if (!token) return;
        // TODO: call add-to-cart API with token + quantity
        console.log("Cart token:", token, "qty:", quantity);
    };

    return (
        <div className="flex flex-col gap-4">
            {/* Quantity selector */}
            <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-600">Quantity</span>
                <div className="flex items-center border">
                    <button
                        onClick={decrement}
                        disabled={disabled || quantity <= 1}
                        className="p-2 hover:bg-gray-100 disabled:opacity-30 transition"
                        aria-label="Decrease quantity"
                    >
                        <Minus size={14} />
                    </button>
                    <span className="w-10 text-center text-sm font-medium">{quantity}</span>
                    <button
                        onClick={increment}
                        disabled={disabled || quantity >= maxQuantity}
                        className="p-2 hover:bg-gray-100 disabled:opacity-30 transition"
                        aria-label="Increase quantity"
                    >
                        <Plus size={14} />
                    </button>
                </div>
            </div>

            {/* Add to cart button */}
            <button
                onClick={handleAddToCart}
                disabled={disabled || isLoading}
                className="flex items-center justify-center gap-2 w-full py-3 px-6 bg-black text-white font-medium text-sm hover:bg-gray-800 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
                <ShoppingCart size={18} />
                {isLoading ? "Creating cart…" : "Add to Cart"}
            </button>
        </div>
    );
}

