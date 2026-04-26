"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, PackageX } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { useProducts, type Product } from "@/context/ProductContext";

interface ProductsClientProps {
  initialProducts: Product[];
  initialCategory?: string;
}

export default function ProductsClient({ initialProducts, initialCategory }: ProductsClientProps) {
  const { managedProducts } = useProducts();
  const allProducts = useMemo(() => [...managedProducts, ...initialProducts], [managedProducts, initialProducts]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || "all");
  const [sortBy, setSortBy] = useState("default");

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set(allProducts.map((p) => p.category));
    return ["all", ...Array.from(cats)];
  }, [allProducts]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = allProducts;

    // Filter by Category
    if (selectedCategory && selectedCategory !== "all") {
      result = result.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by Search Query
    if (searchQuery) {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort
    if (sortBy === "price-low") {
      result = [...result].sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortBy === "price-high") {
      result = [...result].sort((a, b) => Number(b.price) - Number(a.price));
    } else if (sortBy === "rating") {
      result = [...result].sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
    }

    return result;
  }, [allProducts, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6">
      <div className="mb-8 md:mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">All Products</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Discover our full range of premium items. Find exactly what you are looking for using our advanced filters.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar / Filters */}
        <div className="w-full md:w-64 shrink-0 space-y-8">
          <div className="space-y-4">
            <h3 className="flex items-center gap-2 font-bold text-lg border-b border-border pb-2">
              <Search size={18} /> Search
            </h3>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm"
            />
          </div>

          <div className="space-y-4">
            <h3 className="flex items-center gap-2 font-bold text-lg border-b border-border pb-2">
              <SlidersHorizontal size={18} /> Filter by Category
            </h3>
            <div className="flex flex-col gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    selectedCategory === cat
                      ? "bg-primary text-primary-foreground font-medium"
                      : "hover:bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="flex items-center gap-2 font-bold text-lg border-b border-border pb-2">
              Sort By
            </h3>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm"
            >
              <option value="default">Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-12 lg:p-24 border border-dashed border-border rounded-2xl bg-muted/30 text-center">
              <PackageX size={64} className="text-muted-foreground mb-4 opacity-50" />
              <h3 className="text-xl font-bold mb-2">No products found</h3>
              <p className="text-muted-foreground">
                We couldn&apos;t find any products matching your current filters. Try adjusting your search query or selected category.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="mt-6 rounded-full bg-primary/10 px-6 py-2 font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
