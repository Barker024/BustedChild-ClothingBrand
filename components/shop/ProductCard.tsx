"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag } from "lucide-react";
import { useState } from "react";

import { Product } from "@/types/product";
import { useCart } from "@/contexts/CartContext";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({
  product,
}: ProductCardProps) {
  const { addToCart } = useCart();
  const [isSaved, setIsSaved] = useState(false);

  const handleAddToCart = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart({
      id: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0],
      price: product.price,
      quantity: 1,
      size: product.sizes[0] ?? "M",
    });
  };

  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group block"
    >
      <article>
        {/* Image */}
        <div className="relative overflow-hidden rounded-[28px] bg-[#F0F0ED]">

          <div className="relative aspect-[4/5]">

            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition duration-700 group-hover:scale-105"
            />

          </div>

          {/* Labels */}
          <div className="absolute left-4 top-4 flex flex-col gap-2">

            {product.isNew && (
              <span className="rounded-full bg-black px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white">
                NEW
              </span>
            )}

            {product.isSale && (
              <span className="rounded-full bg-[#7AC943] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-black">
                SALE
              </span>
            )}

          </div>

          {/* Wishlist */}
          <button
            type="button"
            aria-label={isSaved ? "Remove from wishlist" : "Add to wishlist"}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsSaved((saved) => !saved);
            }}
            className={`absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 backdrop-blur transition hover:scale-105 ${isSaved ? "text-red-500" : ""}`}
          >
            <Heart size={18} fill={isSaved ? "currentColor" : "none"} strokeWidth={1.8} />
          </button>

          {/* Add To Cart */}
          <button
            type="button"
            onClick={handleAddToCart}
            className="absolute bottom-4 left-4 right-4 flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-xs font-bold shadow-lg transition duration-300 hover:bg-black hover:text-white sm:opacity-0 sm:group-hover:opacity-100"
          >
            <ShoppingBag size={16} />
            ADD TO CART
          </button>

        </div>

        {/* Product Details */}
        <div className="px-1 pt-4">

          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/40">
            {product.category.replace("-", " ")}
          </p>

          <h3 className="mt-1 text-sm font-bold">
            {product.name}
          </h3>

          <div className="mt-2 flex items-center gap-2">

            <span className="text-sm font-bold">
              R{product.price.toLocaleString("en-ZA")}
            </span>

            {product.originalPrice && (
              <span className="text-sm text-black/30 line-through">
                R{product.originalPrice.toLocaleString("en-ZA")}
              </span>
            )}

          </div>

        </div>
      </article>
    </Link>
  );
}
