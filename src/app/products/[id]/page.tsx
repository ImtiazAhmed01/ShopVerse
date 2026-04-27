import ProductDetailClient from "./ProductDetailClient";
import type { Product } from "@/context/ProductContext";

import clientPromise from "@/lib/mongodb";

async function getProduct(id: string): Promise<Product | null> {
  if (id.startsWith("custom_")) return null;
  try {
    const numericId = parseInt(id, 10);
    const filter = isNaN(numericId) ? { id } : { id: numericId };
    const client = await clientPromise;
    const db = client.db("shopverse");
    const p = await db.collection("products").findOne(filter);

    if (!p) return null;
    return {
      id: p.id || p._id.toString(),
      title: p.title,
      price: p.price,
      description: p.description,
      category: p.category,
      image: p.image,
      rating: p.rating,
    } as Product;
  } catch (error) {
    return null;
  }
}

async function getSimilarProducts(category: string): Promise<Product[]> {
  if (!category) return [];
  try {
    const client = await clientPromise;
    const db = client.db("shopverse");
    const products = await db.collection("products").find({ category }).limit(4).toArray();

    return products.map(p => ({
      id: p.id || p._id.toString(),
      title: p.title,
      price: p.price,
      description: p.description,
      category: p.category,
      image: p.image,
      rating: p.rating,
    })) as Product[];
  } catch (error) {
    return null as any;
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
