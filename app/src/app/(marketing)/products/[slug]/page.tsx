import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { fetchProductBySlug, fetchProductStock } from "@/lib/server/api-client";
import { AddToCart } from "@/components/add-to-cart";
import { formatPrice } from "@/lib/format-price";
import { StockIndicator } from "@/components/stock-indicator";

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

    const stock = await fetchProductStock(product.slug);
    const inStock = stock?.inStock ?? true;
    const quantity = stock?.stock ?? 0;

    return (
        <div className="mx-auto py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="relative aspect-square bg-gray-50">
                    <Image
                        src={product.images[0] ?? ""}
                        alt={product.name}
                        fill
                        priority
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                    />
                    <StockIndicator stock={stock} />
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
                    <AddToCart maxQuantity={quantity} inStock={inStock} />
                </div>
            </div>
        </div>
    );
}
