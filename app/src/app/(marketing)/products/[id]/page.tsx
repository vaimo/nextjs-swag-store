import { getProduct } from '@/lib/products'
import { Suspense } from 'react'

export default async function ProductPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
      <div>
        <header>
          <h1>Product Details</h1>
        </header>

        <Suspense fallback={<ProductSkeleton />}>
          <ProductDetails id={id} />
        </Suspense>

        <footer>© 2026 ACME Corp</footer>
      </div>
  )
}

async function ProductDetails({ id }: { id: string }) {
  const product = await getProduct(id)

  return (
      <div>
        <h2>{product.name}</h2>
        <p>Price: ${product.price}</p>
        <p>In Stock: {product.inventory}</p>
      </div>
  )
}

function ProductSkeleton() {
  return (
      <div className="animate-pulse">
        <div className="h-8 w-48 bg-gray-200 rounded mb-4" />
        <div className="h-6 w-32 bg-gray-200 rounded mb-2" />
        <div className="h-6 w-24 bg-gray-200 rounded" />
      </div>
  )
}
