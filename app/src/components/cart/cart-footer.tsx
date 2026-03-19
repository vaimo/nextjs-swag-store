import Link from "next/link";
import { Trash2 } from "lucide-react";
import { formatPrice } from "@/lib/format-price";

interface CartFooterProps {
    subtotal: number;
    currency: string;
    onClose: () => void;
    onClear: () => void;
}

export function CartFooter({ subtotal, currency, onClose, onClear }: CartFooterProps) {
    return (
        <div className="px-6 py-4 border-t flex flex-col gap-3">
            <div className="flex justify-between text-sm font-semibold">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal, currency)}</span>
            </div>
            <Link
                href="/cart"
                onClick={onClose}
                className="w-full py-3 bg-black text-white text-sm font-medium text-center hover:bg-gray-800 transition"
            >
                View Cart
            </Link>
            <button
                onClick={onClear}
                className="flex items-center justify-center gap-2 w-full py-2 text-sm text-red-500 hover:text-red-700 transition cursor-pointer"
            >
                <Trash2 size={14} />
                Clear cart
            </button>
        </div>
    );
}

