"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Product = {
  id: number | string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: { rate: number; count: number };
};

type ProductContextType = {
  managedProducts: Product[];
  addProduct: (product: Omit<Product, "id">) => void;
  removeProduct: (id: string | number) => void;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  const [managedProducts, setManagedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("custom_products");
    if (stored) {
      try {
        setManagedProducts(JSON.parse(stored));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const addProduct = (product: Omit<Product, "id">) => {
    const newProduct = { ...product, id: "custom_" + Date.now() };
    const updated = [newProduct, ...managedProducts];
    setManagedProducts(updated);
    localStorage.setItem("custom_products", JSON.stringify(updated));
  };

  const removeProduct = (id: string | number) => {
    const updated = managedProducts.filter((p) => p.id !== id);
    setManagedProducts(updated);
    localStorage.setItem("custom_products", JSON.stringify(updated));
  };

  return (
    <ProductContext.Provider
      value={{ managedProducts, addProduct, removeProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};
