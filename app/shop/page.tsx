"use client";

import { useMemo, useState } from "react";

import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import ProductCard from "@/components/shop/ProductCard";

import { products } from "@/data/products";

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const categories = [
    { label: "ALL", value: "all" },
    { label: "HOODIES", value: "hoodies" },
    { label: "T-SHIRTS", value: "t-shirts" },
    { label: "TRACKSUITS", value: "tracksuits" },
    { label: "ACCESSORIES", value: "accessories" },
  ];
  const visibleProducts = useMemo(() => {
    const filtered = activeCategory === "all"
      ? [...products]
      : products.filter((product) => product.category === activeCategory);

    if (sortBy === "price-low") return filtered.sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") return filtered.sort((a, b) => b.price - a.price);
    if (sortBy === "newest") return filtered.sort((a, b) => Number(Boolean(b.isNew)) - Number(Boolean(a.isNew)));
    return filtered.sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
  }, [activeCategory, sortBy]);

  return (
    <>
      <AnnouncementBar />

      <Navbar />

      <main className="min-h-screen bg-[#F5F5F3]">
        {/* Hero */}
        <section className="border-b border-black/5 px-5 py-16 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#7AC943]">
              Busted Child
            </p>

            <h1 className="mt-3 text-5xl font-black tracking-tight md:text-7xl">
              SHOP
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-black/60">
              Discover premium streetwear built for people who refuse to fit in.
              Every piece is designed to make a statement.
            </p>

            <div className="mt-8 flex items-center gap-3 text-sm font-semibold text-black/50">
              <span>{visibleProducts.length} Product{visibleProducts.length !== 1 && "s"}</span>
            </div>
          </div>
        </section>

        {/* Category Buttons */}
        <section className="px-5 py-8 lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => {
                const active = activeCategory === category.value;
                return (
                  <button
                    key={category.value}
                    type="button"
                    onClick={() => setActiveCategory(category.value)}
                    aria-pressed={active}
                    className={`rounded-full px-6 py-3 text-xs font-bold tracking-wider transition ${active ? "bg-black text-white" : "border border-black/10 bg-white hover:bg-black hover:text-white"}`}
                  >
                    {category.label}
                  </button>
                );
              })}
            </div>

            <label className="flex items-center gap-3 text-xs font-bold tracking-wider text-black/60">
              SORT
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className="rounded-full border border-black/10 bg-white px-4 py-3 text-xs font-bold text-black outline-none focus:border-black"
              >
                <option value="featured">FEATURED</option>
                <option value="newest">NEWEST</option>
                <option value="price-low">PRICE: LOW TO HIGH</option>
                <option value="price-high">PRICE: HIGH TO LOW</option>
              </select>
            </label>
          </div>
        </section>

        {/* Products */}
        <section className="px-5 pb-20 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {visibleProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
