import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import products, { getProductBySlug } from '@/lib/products'
import ProductLandingPage from '@/components/ProductLandingPage'

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return products.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProductBySlug(params.slug)
  if (!product) return {}
  return {
    title: `${product.name} – Faforlife`,
    description: product.tagline,
  }
}

export default function Page({ params }: Props) {
  const product = getProductBySlug(params.slug)
  if (!product) notFound()
  return <ProductLandingPage product={product} />
}
