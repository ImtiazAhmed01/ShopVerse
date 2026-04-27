"use server";

import clientPromise from "@/lib/mongodb";
import { revalidatePath } from "next/cache";

export async function getProductsFromDb() {
    try {
        const client = await clientPromise;
        const db = client.db("shopverse");
        const products = await db.collection("products").find({}).sort({ _id: -1 }).toArray();
        return products.map(p => ({
            id: p.id || p._id.toString(),
            title: p.title,
            price: p.price,
            description: p.description,
            category: p.category,
            image: p.image,
            rating: p.rating,
        }));
    } catch (error) {
        console.error("Failed to fetch products from MongoDB", error);
        return [];
    }
}

export async function addProductToDb(product: any) {
    try {
        const client = await clientPromise;
        const db = client.db("shopverse");

        // add an id similar to Fakestore or let MongoDB handle _id (we handle it already)
        const newProduct = {
            ...product,
            id: Date.now(),
            rating: { rate: 0, count: 0 }
        };

        await db.collection("products").insertOne(newProduct);
        revalidatePath("/products");
        return { success: true };
    } catch (error) {
        console.error("Failed to add product to MongoDB", error);
        throw new Error("Failed to add product");
    }
}

export async function removeProductFromDb(id: string | number) {
    try {
        const client = await clientPromise;
        const db = client.db("shopverse");

        // Try both numeric and string id
        const numericId = typeof id === "string" ? parseInt(id, 10) : id;
        const filter = (typeof numericId === "number" && !isNaN(numericId))
            ? { $or: [{ id: numericId }, { id: id }] }
            : { id };

        await db.collection("products").deleteOne(filter);
        revalidatePath("/products");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete product from MongoDB", error);
        throw new Error("Failed to remove product");
    }
}
