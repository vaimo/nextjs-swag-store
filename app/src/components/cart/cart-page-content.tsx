"use client";

import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { clearCart, initCart } from "@/store/cart-slice";
import { CartItems } from "@/components/cart/cart-items";
import { formatPrice } from "@/lib/format-price";
import { Trash2 } from "lucide-react";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";

export function CartPageContent() {
    const { items, totalItems, subtotal, currency } = useAppSelector((s) => s.cart);
    const dispatch = useAppDispatch();

    const handleClear = () => {
        dispatch(clearCart());
        dispatch(initCart());
    };

    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-24 gap-4 text-gray-400">
                <ShoppingBag size={56} strokeWidth={1} />
                <p className="text-lg">Your cart is empty</p>
                <Link href="/" className="mt-2 px-6 py-3 bg-black text-white text-sm font-medium hover:bg-gray-800 transition">
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Items */}
            <div className="lg:col-span-2">
                <CartItems items={items} />
            </div>

            {/* Summary */}
            <div className="flex flex-col gap-4 border p-6 h-fit">
                <h2 className="text-lg font-semibold border-b pb-4">Order Summary</h2>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Items ({totalItems})</span>
                    <span>{formatPrice(subtotal, currency)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold border-t pt-4">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal, currency)}</span>
                </div>
                <button className="w-full py-3 bg-black text-white text-sm font-medium hover:bg-gray-800 transition">
                    Proceed to Checkout
                </button>
                <Link href="/" className="text-center text-sm text-gray-500 hover:text-black transition">
                    Continue Shopping
                </Link>
                <button
                    onClick={handleClear}
                    className="flex items-center justify-center gap-2 w-full py-2 text-sm text-red-500 hover:text-red-700 transition cursor-pointer"
                >
                    <Trash2 size={14} />
                    Clear cart
                </button>
            </div>
        </div>
    );
}

