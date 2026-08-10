"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { products } from "@/data/products";
import ProductCard from "@/components/shop/ProductCard";

export default function NewDrop() {
  // Show the first 5 featured/new products
  const featuredProducts = products
    .filter((product) => product.featured || product.newArrival)
    .slice(0, 5);

  return (
    <section className="bg-[#F5F5F3] px-5 pb-20 pt-10 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-[#7AC943]">
              New Drop
            </p>

            <h2 className="text-4xl font-black tracking-tight md:text-5xl">
              FRESH PIECES.
              <br className="md:hidden" />
              {" "}LIMITED DROP.
            </h2>
          </div>

          <Link
            href="/shop"
            className="hidden items-center gap-2 rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-semibold shadow-sm transition hover:-translate-y-1 hover:shadow-md md:flex"
          >
            VIEW ALL
            <ArrowRight size={17} />
          </Link>
        </div>

        {/* Products */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

        {/* Mobile Button */}
        <Link
          href="/shop"
          className="mt-8 flex items-center justify-center gap-2 rounded-full bg-black px-6 py-4 text-sm font-semibold text-white md:hidden"
        >
          VIEW ALL PRODUCTS
          <ArrowRight size={17} />
        </Link>
      </div>
    </section>
  );
}