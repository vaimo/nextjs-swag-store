import { ShoppingBag } from "lucide-react";

export function Header() {
    return (
        <header className="border-b bg-white">
            <nav className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <a href="/" className="font-bold text-xl">
                            {process.env.NEXT_PUBLIC_APP_NAME || "SWAG Store"}
                        </a>
                        <div className="hidden md:flex gap-6">
                            <a href="/" className="hover:text-gray-600 transition">
                                Home
                            </a>
                            <a href="/search" className="hover:text-gray-600 transition">
                                Search
                            </a>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <a href="/cart" className="p-2 hover:text-gray-600 transition" aria-label="Cart">
                            <ShoppingBag size={24} />
                        </a>
                    </div>
                </div>
            </nav>
        </header>
    );
}
