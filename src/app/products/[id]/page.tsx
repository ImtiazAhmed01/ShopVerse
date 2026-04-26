import ProductDetailClient from "./ProductDetailClient";
import type { Product } from "@/context/ProductContext";

async function getProduct(id: string): Promise<Product | null> {
  if (id.startsWith("custom_")) return null;
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    return null;
  }
}

async function getSimilarProducts(category: string): Promise<Product[]> {
  if (!category) return [];
  try {
    const res = await fetch(
      `https://fakestoreapi.com/products/category/${encodeURIComponent(category)}?limit=4`
    );
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    return [];
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const initialProduct = await getProduct(id);
  const similarProducts = initialProduct
    ? await getSimilarProducts(initialProduct.category)
    : [];

  return (
    <ProductDetailClient
      id={id}
      initialProduct={initialProduct}
      similarProducts={similarProducts}
    />
  );
}
