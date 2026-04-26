"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useProducts } from "@/context/ProductContext";
import { PlusCircle } from "lucide-react";

export default function AddProductPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { addProduct } = useProducts();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("electronics");
  const [image, setImage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <div className="min-h-[50vh] flex items-center justify-center">Loading...</div>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate
    if (!title || !description || !price || isNaN(Number(price))) {
      setIsSubmitting(false);
      return;
    }

    try {
      addProduct({
        title,
        description,
        price: Number(price),
        category: category.toLowerCase(),
        image: image || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop", 
      });
      setSuccess(true);
      // Reset form
      setTitle("");
      setDescription("");
      setPrice("");
      setImage("");
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight">Add New Product</h1>
        <p className="mt-2 text-muted-foreground">
          Create a new product listing in your catalog.
        </p>
      </div>

      <div className="rounded-3xl border border-border bg-card p-6 md:p-10 shadow-sm">
        {success && (
          <div className="mb-8 rounded-xl bg-green-500/10 p-4 text-green-600 dark:bg-green-500/20 dark:text-green-400 font-medium">
            Product added successfully! View it in the Manage Products section.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="col-span-2">
              <label className="mb-2 block text-sm font-medium">Product Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                placeholder="Premium Wireless Headphones"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Price ($) *</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                placeholder="99.99"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none"
                required
              >
                <option value="electronics">Electronics</option>
                <option value="jewelery">Jewelry</option>
                <option value="men's clothing">Men&apos;s Clothing</option>
                <option value="women's clothing">Women&apos;s Clothing</option>
              </select>
            </div>

            <div className="col-span-2">
              <label className="mb-2 block text-sm font-medium">Image URL (Optional)</label>
              <input
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="col-span-2">
              <label className="mb-2 block text-sm font-medium">Description *</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-y"
                placeholder="Describe your product detailing specifications, benefits..."
                required
              />
            </div>
          </div>

          <div className="border-t border-border pt-6 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 rounded-full bg-primary px-8 py-3 font-semibold text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              <PlusCircle size={18} />
              {isSubmitting ? "Adding..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
