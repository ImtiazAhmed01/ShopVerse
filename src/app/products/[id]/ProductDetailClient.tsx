"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, Star, ShoppingBag, ShieldCheck, Truck } from "lucide-react";
import { useProducts, type Product } from "@/context/ProductContext";
import ProductCard from "@/components/ProductCard";

interface ProductDetailClientProps {
  id: string;
  initialProduct: Product | null;
  similarProducts: Product[];
}

export default function ProductDetailClient({
  id,
  initialProduct,
  similarProducts,
}: ProductDetailClientProps) {
  const { managedProducts } = useProducts();

  // Determine if it's a local managed product or from API
  const product = useMemo(() => {
    if (initialProduct) return initialProduct;
    return managedProducts.find((p) => String(p.id) === String(id));
  }, [initialProduct, managedProducts, id]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-24 sm:px-6 text-center">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <p className="text-muted-foreground mb-8">
          We couldn&apos;t find the product you were looking for. It might have been removed.
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground hover-lift"
        >
          <ArrowLeft size={18} /> Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:py-12">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center text-sm text-muted-foreground">
        <Link href="/products" className="hover:text-primary transition-colors hover:underline">
          Products
        </Link>
        <span className="mx-2">/</span>
        <span className="capitalize">{product.category}</span>
        <span className="mx-2">/</span>
        <span className="truncate max-w-[200px] text-foreground font-medium">{product.title}</span>
      </nav>

      {/* Product Main Section */}
      <div className="grid gap-12 lg:grid-cols-2">
        {/* Image Gallery */}
        <div className="rounded-3xl border border-border bg-white p-8 lg:p-16 flex items-center justify-center relative aspect-square overflow-hidden shadow-sm">
          <div className="absolute top-6 left-6 rounded-full bg-background/80 px-3 py-1 text-sm font-semibold backdrop-blur-sm uppercase tracking-wide border border-border/50">
            {product.category}
          </div>
          <img
            src={product.image}
            alt={product.title}
            className="max-h-full max-w-full object-contain mix-blend-multiply"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl mb-4 leading-tight">
            {product.title}
          </h1>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-3xl font-bold text-primary">
              ${Number(product.price).toFixed(2)}
            </span>
            {product.rating && (
              <div className="flex items-center gap-1.5 rounded-full bg-yellow-500/10 px-3 py-1 text-sm font-medium text-yellow-600 dark:text-yellow-500">
                <Star size={16} className="fill-current" />
                <span>{product.rating.rate} Rating</span>
                <span className="text-yellow-600/60 dark:text-yellow-500/60 font-normal">
                  ({product.rating.count} reviews)
                </span>
              </div>
            )}
          </div>

          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            {product.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-10 pb-10 border-b border-border">
            <button
              onClick={() => alert("Add to Cart - Bonus feature placeholder!")}
              className="flex-1 flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-bold text-primary-foreground hover-lift shadow-lg shadow-primary/25"
            >
              <ShoppingBag size={20} /> Add to Cart
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-muted/50 border border-border">
              <Truck size={24} className="text-primary" />
              <div>
                <p className="font-semibold text-foreground">Free Shipping</p>
                <p className="text-muted-foreground">Orders over $50</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-muted/50 border border-border">
              <ShieldCheck size={24} className="text-primary" />
              <div>
                <p className="font-semibold text-foreground">1-Year Warranty</p>
                <p className="text-muted-foreground">100% Secure Checkout</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {similarProducts.length > 0 && (
        <div className="mt-24">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold tracking-tight">You might also like</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {similarProducts.filter(p => String(p.id) !== String(id)).slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
