import Link from "next/link";
import { Star } from "lucide-react";
import type { Product } from "@/context/ProductContext";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm hover-lift">
      <Link href={`/products/${product.id}`} className="block relative aspect-square overflow-hidden bg-white p-6">
        <div className="absolute inset-0 z-10 bg-black/5 opacity-0 transition-opacity group-hover:opacity-100" />
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105 mix-blend-multiply"
        />
        <div className="absolute top-3 left-3 rounded-full bg-background/80 px-2.5 py-1 text-xs font-semibold backdrop-blur-sm uppercase tracking-wide">
          {product.category}
        </div>
      </Link>
      
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-2 mb-2">
          {product.rating ? (
            <div className="flex items-center gap-1 text-sm text-yellow-500">
              <Star size={14} className="fill-current" />
              <span className="font-medium text-foreground">{product.rating.rate}</span>
              <span className="text-muted-foreground text-xs">({product.rating.count})</span>
            </div>
          ) : (
             <div className="h-5" /> 
          )}
        </div>
        
        <Link href={`/products/${product.id}`} className="group-hover:text-primary transition-colors">
          <h3 className="line-clamp-2 font-semibold leading-snug">{product.title}</h3>
        </Link>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground flex-1">
          {product.description}
        </p>
        
        <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
          <span className="text-lg font-bold">${Number(product.price).toFixed(2)}</span>
          <Link
            href={`/products/${product.id}`}
            className="rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
