import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { fetchProductBySlug, fetchInventory } from "@/lib/server/api-client";
import { AddToCart } from "@/components/add-to-cart";
import { formatPrice } from "@/lib/format-price";

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const product = await fetchProductBySlug(slug);
    if (!product) return { title: "Product Not Found" };
    return {
        title: product.name,
        description: product.description,
    };
}


export default async function ProductPage({ params }: Props) {
    const { slug } = await params;
    const product = await fetchProductBySlug(slug);

    if (!product) notFound();

    const inventory = await fetchInventory(product.id);
    const inStock = inventory?.inStock ?? true;
    const quantity = inventory?.quantity ?? 0;

    return (
        <div className="mx-auto py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Product Image */}
                <div className="relative aspect-square bg-gray-50">
                    <Image
                        src={product.images[0] ?? ""}
                        alt={product.name}
                        fill
                        priority
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                    />
                </div>

                {/* Product Info */}
                <div className="flex flex-col gap-6">
                    {/* Category breadcrumb */}
                    <span className="text-xs uppercase tracking-widest text-gray-400">
                        {product.category}
                    </span>

                    {/* Name & Price */}
                    <div className="flex flex-col gap-2">
                        <h1 className="text-3xl font-bold leading-tight">{product.name}</h1>
                        <p className="text-2xl font-semibold">
                            {formatPrice(product.price, product.currency)}
                        </p>
                    </div>

                    {/* Stock indicator */}
                    <div className="flex items-center gap-2">
                        <span
                            className={`w-2 h-2 rounded-full ${inStock ? "bg-green-500" : "bg-red-500"}`}
                        />
                        <span className="text-sm text-gray-600">
                            {inStock
                                ? `In stock${quantity > 0 ? ` — ${quantity} available` : ""}`
                                : "Out of stock"}
                        </span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>

                    {/* Tags */}
                    {product.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {product.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="text-xs px-2 py-1 border text-gray-500 uppercase tracking-wide"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Quantity + Add to cart */}
                    <AddToCart maxQuantity={quantity > 0 ? quantity : 99} inStock={inStock} />
                </div>
            </div>
        </div>
    );
}

