import Link from "next/link";
import { ArrowRight, ShieldCheck, Truck, RefreshCw, Star } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/context/ProductContext";

async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const res = await fetch("https://fakestoreapi.com/products?limit=4", {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-background py-20 lg:py-32">
        <div className="absolute inset-0 bg-primary/5 -z-10" />
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[800px] rounded-full bg-primary/10 blur-[100px] -z-10" />
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
              Shop the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-violet-500">Latest Products</span> with ShopVerse
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">
              Experience the pinnacle of online shopping. Premium quality, expertly curated catalog, and seamless delivery directly to you.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/products"
                className="flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground hover-lift shadow-lg shadow-primary/25"
              >
                Browse Products <ArrowRight size={20} />
              </Link>
              <Link
                href="/about"
                className="rounded-full bg-secondary/10 border border-border px-8 py-4 text-base font-semibold text-foreground hover:bg-muted transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Perks / Features Section */}
      <section className="py-16 bg-muted/50 border-y border-border">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center p-6 bg-card rounded-2xl shadow-sm border border-border">
              <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                <Truck size={28} />
              </div>
              <h3 className="text-lg font-bold mb-2">Free Delivery</h3>
              <p className="text-muted-foreground">Free worldwide express shipping on all orders over $99.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-card rounded-2xl shadow-sm border border-border">
              <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                <ShieldCheck size={28} />
              </div>
              <h3 className="text-lg font-bold mb-2">Secure Payments</h3>
              <p className="text-muted-foreground">Checkout securely with our encrypted payment gateway.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-card rounded-2xl shadow-sm border border-border">
              <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                <RefreshCw size={28} />
              </div>
              <h3 className="text-lg font-bold mb-2">Easy Returns</h3>
              <p className="text-muted-foreground">Not satisfied? Return within 30 days for a full refund.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Products */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-12">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Trending Now</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Our most popular products based on sales. Updated daily.
              </p>
            </div>
            <Link href="/products" className="hidden sm:flex text-primary font-semibold items-center gap-1 hover:underline">
              View All <ArrowRight size={16} />
            </Link>
          </div>

          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-muted-foreground bg-muted rounded-2xl">
              Unable to load featured products. Please try again later.
            </div>
          )}
          
          <div className="mt-10 sm:hidden">
            <Link href="/products" className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-3 font-semibold hover:bg-muted">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Categories Section */}
      <section className="py-24 bg-card border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-12">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[
              { name: "Electronics", url: "electronics", color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-900" },
              { name: "Jewelry", url: "jewelery", color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900" },
              { name: "Men's", url: "men's%20clothing", color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900" },
              { name: "Women's", url: "women's%20clothing", color: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-900" }
            ].map((cat) => (
              <Link 
                key={cat.name} 
                href={`/products?category=${cat.url}`}
                className={`flex flex-col items-center justify-center p-8 rounded-3xl border transition-all hover-lift ${cat.color}`}
              >
                <div className="font-bold text-lg">{cat.name}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Testimonials */}
      <section className="py-24 bg-primary/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight">What Our Customers Say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Sarah J.", role: "Verified Buyer", text: "ShopVerse has completely transformed how I shop online. The quality is unmatched and delivery is rapid!" },
              { name: "Michael T.", role: "Premium Member", text: "I bought a jacket and some electronics. Both arrived in perfect condition and exceeded my expectations." },
              { name: "Emily R.", role: "Fashion Blogger", text: "The UI design is gorgeous and finding what I need takes seconds. Highly recommended store." }
            ].map((testimonial) => (
              <div key={testimonial.name} className="bg-card p-8 rounded-2xl shadow-sm border border-border flex flex-col">
                <div className="flex gap-1 text-yellow-500 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} size={18} className="fill-current" />)}
                </div>
                <p className="text-muted-foreground flex-1 mb-6">&ldquo;{testimonial.text}&rdquo;</p>
                <div>
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
