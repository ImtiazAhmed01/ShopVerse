import ProductsClient from "./ProductsClient";
import type { Product } from "@/context/ProductContext";

import clientPromise from "@/lib/mongodb";

async function getProducts(): Promise<Product[]> {
  try {
    const client = await clientPromise;
    const db = client.db("shopverse");
    const products = await db.collection("products").find({}).toArray();

    // Map MongoDB _id to string or omit it so it can be passed to client components safely
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
    console.error("Error fetching products from MongoDB:", error);
    return [];
  }
}

export const dynamic = 'force-dynamic';

export default async function ProductsPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const categoryRaw = searchParams?.category;
  const category = Array.isArray(categoryRaw) ? categoryRaw[0] : categoryRaw;
  const initialProducts = await getProducts();
  return <ProductsClient initialProducts={initialProducts} initialCategory={category} />;
}
