"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useAppSelector } from "@/store/hooks";

export function Header() {
    const totalItems = useAppSelector((s) => s.cart.totalItems);

    return (
        <header className="border-b bg-white">
            <nav className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <Link href="/" className="font-bold text-xl">
                            {process.env.NEXT_PUBLIC_APP_NAME || "SWAG Store"}
                        </Link>
                        <div className="hidden md:flex gap-6">
                            <Link href="/" className="hover:text-gray-600 transition">Home</Link>
                            <Link href="/search" className="hover:text-gray-600 transition">Search</Link>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <Link href="/cart" className="relative p-2 hover:text-gray-600 transition" aria-label="Cart">
                            <ShoppingBag size={24} />
                            {totalItems > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 min-w-4.5 h-4.5 bg-black text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                                    {totalItems > 99 ? "99+" : totalItems}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
}
