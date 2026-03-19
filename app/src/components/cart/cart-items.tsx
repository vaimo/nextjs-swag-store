import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { formatPrice } from "@/lib/format-price";
import type { CartItem } from "@/store/cart-slice";

interface CartItemsProps {
    items: CartItem[];
    onClose?: () => void;
}

export function CartItems({ items, onClose }: CartItemsProps) {
    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-gray-400">
                <ShoppingBag size={40} strokeWidth={1} />
                <p className="text-sm">Your cart is empty</p>
            </div>
        );
    }

    return (
        <ul className="flex flex-col gap-4">
            {items.map((item) => (
                <li key={item.productId} className="flex gap-4 border-b pb-4">
                    <div className="relative w-16 h-16 shrink-0 bg-gray-50">
                        <Image
                            src={item.product.images[0] ?? ""}
                            alt={item.product.name}
                            fill
                            sizes="64px"
                            className="object-cover"
                        />
                    </div>
                    <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                        <Link
                            href={`/products/${item.product.slug}`}
                            onClick={onClose}
                            className="text-sm font-medium leading-snug hover:underline truncate"
                        >
                            {item.product.name}
                        </Link>
                        <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                        <p className="text-sm font-semibold">
                            {formatPrice(item.lineTotal, item.product.currency)}
                        </p>
                    </div>
                </li>
            ))}
        </ul>
    );
}

