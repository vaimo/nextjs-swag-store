import "server-only";

const BASE_URL = process.env.API_BASE_URL!;
const BYPASS_TOKEN = process.env.API_BYPASS_TOKEN!;

async function apiFetch<T>(path: string): Promise<T> {
    const res = await fetch(`${BASE_URL}${path}`, {
        headers: {
            "x-vercel-protection-bypass": BYPASS_TOKEN,
        },
        next: { revalidate: 60 }, // ISR: revalidate every 60 seconds
    });

    if (!res.ok) {
        throw new Error(`API error ${res.status}: ${res.statusText}`);
    }

    return res.json() as Promise<T>;
}

export interface Product {
    id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    currency: string;
    category: string;
    images: string[];
    tags: string[];
    featured: boolean;
    createdAt: string;
}

interface ProductsResponse {
    success: boolean;
    data: Product[];
    meta: {
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNextPage: boolean;
            hasPreviousPage: boolean;
        };
    };
}

export async function fetchFeaturedProducts(): Promise<Product[]> {
    const res = await apiFetch<ProductsResponse>("/products?featured=true&limit=4");
    return res.data;
}

export async function fetchProducts(): Promise<Product[]> {
    const res = await apiFetch<ProductsResponse>("/products");
    return res.data;
}

export interface Promotion {
    id: string;
    title: string;
    description: string;
    discountPercent: number;
    code: string;
    validFrom: string;
    validUntil: string;
    active: boolean;
}

interface PromotionResponse {
    success: boolean;
    data: Promotion;
}

export async function fetchPromotion(): Promise<Promotion | null> {
    try {
        const res = await apiFetch<PromotionResponse>("/promotions");
        return res.data;
    } catch {
        return null;
    }
}
