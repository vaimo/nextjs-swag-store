import Image from "next/image";
import { fetchFeaturedProducts, type Product } from "@/lib/server/api-client";
import { formatPrice } from "@/lib/format-price";

function ProductCard({ product }: { product: Product }) {
    return (
        <a href={`/products/${product.slug}`} className="group flex flex-col border hover:shadow-lg transition">
            <div className="relative aspect-square overflow-hidden bg-gray-50">
                <Image
                    src={product.images[0] ?? "https://picsum.photos/400/400?grayscale"}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    className="object-cover group-hover:scale-105 transition duration-300"
                />
            </div>
            <div className="p-4 flex flex-col gap-1">
                <span className="text-xs uppercase tracking-wide text-gray-400">{product.category}</span>
                <h3 className="font-semibold text-sm leading-snug">{product.name}</h3>
                <p className="text-sm font-medium mt-1">{formatPrice(product.price, product.currency)}</p>
            </div>
        </a>
    );
}

export async function FeaturedProducts() {
    const products = await fetchFeaturedProducts();

    if (!products.length) return null;

    return (
        <section className="mx-auto py-12">
            <h2 className="text-2xl mb-8">Featured Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
}


