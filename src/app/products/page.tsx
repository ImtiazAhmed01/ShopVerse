import ProductsClient from "./ProductsClient";
import type { Product } from "@/context/ProductContext";

async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch("https://fakestoreapi.com/products", {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const initialProducts = await getProducts();
  return <ProductsClient initialProducts={initialProducts} initialCategory={searchParams.category} />;
}
