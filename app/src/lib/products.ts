"use cache"

import { cacheLife, cacheTag } from 'next/cache'

/**
 * Fetch a single product by ID with caching.
 * Cache invalidated via revalidateTag() after mutations.
 */
export async function getProduct(id: string) {
    cacheLife('products') // 5min fresh, 15min revalidate, 1hr expire
    cacheTag('products', `product-${id}`) // Tag for invalidation

    const res = await fetch(`https://api.acme.com/products/${id}`)
    if (!res.ok) throw new Error('Failed to fetch product')

    return res.json() as Promise<Product>
}

/**
 * Fetch all products with caching.
 */
export async function getProducts() {
    cacheLife('products')
    cacheTag('products') // Invalidate when any product changes

    const res = await fetch('https://api.acme.com/products')
    if (!res.ok) throw new Error('Failed to fetch products')

    return res.json() as Promise<Product[]>
}

interface Product {
    id: string
    name: string
    price: number
    inventory: number
}
