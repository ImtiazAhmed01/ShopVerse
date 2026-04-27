"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Trash2, ArrowUpRight, Package, Plus } from "lucide-react";
import type { Product } from "@/context/ProductContext";

export default function ManageProductsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [managedProducts, setManagedProducts] = useState<Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  const fetchProducts = async () => {
    setIsLoadingProducts(true);
    try {
      const { getProductsFromDb } = await import("@/app/actions");
      const data = await getProductsFromDb();
      setManagedProducts(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadingProducts(false);
    }
  };

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    } else if (user) {
      fetchProducts();
    }
  }, [user, loading, router]);

  const handleRemove = async (id: string | number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        const { removeProductFromDb } = await import("@/app/actions");
        await removeProductFromDb(id);
        await fetchProducts(); // Refresh the list
      } catch (e) {
        console.error("Failed to delete", e);
      }
    }
  };

  if (loading || !user) {
    return <div className="min-h-[50vh] flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Manage Products</h1>
          <p className="mt-2 text-muted-foreground">
            View and manage products in the MongoDB database.
          </p>
        </div>
        <Link
          href="/products/add"
          className="flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 font-semibold text-primary-foreground hover:bg-primary/90 transition-colors shrink-0 max-w-fit"
        >
          <Plus size={18} /> Add Product
        </Link>
      </div>

      <div className="rounded-3xl border border-border bg-card shadow-sm overflow-hidden text-sm">
        {isLoadingProducts ? (
          <div className="p-16 text-center text-muted-foreground">Loading products from database...</div>
        ) : managedProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-16 text-center">
            <div className="h-16 w-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
              <Package size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">No products found</h3>
            <p className="text-muted-foreground max-w-md">
              There are no products in the database. Add some!
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-muted/50 text-muted-foreground border-b border-border">
                <tr>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">Product Details</th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">Category</th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">Price</th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {managedProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-muted/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 shrink-0 rounded-lg border border-border overflow-hidden bg-white flex items-center justify-center p-1">
                          <img
                            src={product.image}
                            alt=""
                            className="max-w-full max-h-full object-contain mix-blend-multiply"
                          />
                        </div>
                        <div>
                          <div className="font-semibold text-foreground line-clamp-1">{product.title}</div>
                          <div className="text-muted-foreground text-xs mt-1">ID: {product.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 capitalize text-muted-foreground">{product.category}</td>
                    <td className="px-6 py-4 font-semibold">${Number(product.price).toFixed(2)}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/products/${product.id}`}
                          className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-background hover:text-foreground border border-transparent hover:border-border transition-all"
                          title="View on Store"
                        >
                          <ArrowUpRight size={18} />
                        </Link>
                        <button
                          onClick={() => handleRemove(product.id)}
                          className="flex h-9 w-9 items-center justify-center rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950 transition-all font-medium"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
