import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { ProductProvider } from "@/context/ProductContext";

export const metadata: Metadata = {
  title: "ShopVerse | Premium E-Commerce",
  description: "Shop the latest and greatest products at ShopVerse.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <AuthProvider>
          <ProductProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </ProductProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
