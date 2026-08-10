"use client";

import { useState } from "react";
import Image from "next/image";
import { Product } from "@/types/product";

interface Props {
  product: Product;
}

export default function ProductGallery({ product }: Props) {
  const [selected, setSelected] = useState(0);

  return (
    <div className="flex flex-col-reverse gap-4 sm:flex-row">
      {/* Thumbnails */}
      <div className="flex gap-3 overflow-x-auto pb-1 sm:flex-col sm:overflow-visible">
        {product.images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelected(index)}
            aria-label={`View ${product.name} image ${index + 1}`}
            className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border-2 transition sm:h-24 sm:w-24 ${
              selected === index
                ? "border-black"
                : "border-transparent"
            }`}
          >
            <Image
              src={image}
              alt={product.name}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="relative aspect-[4/5] flex-1 overflow-hidden rounded-[32px] bg-white sm:aspect-square">
        <Image
          src={product.images[selected]}
          alt={product.name}
          fill
          priority
          className="object-cover transition duration-500 hover:scale-110"
        />
      </div>
    </div>
  );
}
