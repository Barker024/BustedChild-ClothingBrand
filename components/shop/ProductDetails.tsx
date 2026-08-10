"use client";

import { useState } from "react";
import { Heart, Minus, Plus, ShoppingBag, Truck } from "lucide-react";

import { Product } from "@/types/product";
import { useCart } from "@/contexts/CartContext";

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({
  product,
}: ProductDetailsProps) {
  const { addToCart } = useCart();

 const [selectedSize, setSelectedSize] = useState(product.sizes[0]);

const [selectedImage, setSelectedImage] = useState(0);

  const [quantity, setQuantity] = useState(1);

  const decrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increase = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      quantity,
    });
  };

  const isInStock = product.stock > 0;

  return (
    <div className="flex flex-col justify-center">

      <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#7AC943]">
        {product.category}
      </p>

      <h1 className="mt-3 text-5xl font-black tracking-tight">
        {product.name}
      </h1>

      <div className="mt-6 flex items-center gap-4">

        <span className="text-3xl font-black">
          R{product.price}
        </span>

        {product.originalPrice && (
          <span className="text-xl text-black/30 line-through">
            R{product.originalPrice}
          </span>
        )}

      </div>

      <p className="mt-8 max-w-xl text-base leading-8 text-black/60">
        {product.description}
      </p>

      {/* Sizes */}

      <div className="mt-10">

        <p className="mb-4 text-sm font-bold uppercase tracking-wider">
          Select Size
        </p>

        <div className="flex flex-wrap gap-3">

          {product.sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`h-12 w-12 rounded-xl border text-sm font-bold transition ${
                selectedSize === size
                  ? "border-black bg-black text-white"
                  : "border-black/10 bg-white hover:border-black"
              }`}
            >
              {size}
            </button>
          ))}

        </div>

      </div>

      {/* Quantity */}

      <div className="mt-8">

        <p className="mb-4 text-sm font-bold uppercase tracking-wider">
          Quantity
        </p>

        <div className="flex w-fit items-center rounded-xl border border-black/10 bg-white">

          <button
            onClick={decrease}
            className="p-4 hover:bg-black/5"
          >
            <Minus size={18} />
          </button>

          <span className="w-14 text-center font-bold">
            {quantity}
          </span>

          <button
            onClick={increase}
            className="p-4 hover:bg-black/5"
          >
            <Plus size={18} />
          </button>

        </div>

      </div>

      {/* Buttons */}

      <div className="mt-10 flex flex-col gap-4 sm:flex-row">

        <button
          type="button"
          onClick={handleAddToCart}
          disabled={!isInStock}
          className="flex flex-1 items-center justify-center gap-3 rounded-full bg-black px-8 py-4 text-sm font-bold text-white transition hover:bg-[#7AC943] hover:text-black disabled:cursor-not-allowed disabled:bg-black/30"
        >
          <ShoppingBag size={18} />
          ADD TO CART
        </button>

        <button
          type="button"
          aria-label="Add to wishlist"
          className="flex items-center justify-center rounded-full border border-black/10 bg-white px-6 py-4 transition hover:border-black"
        >
          <Heart size={20} />
        </button>

      </div>

      {/* Stock */}

      <div className="mt-10 rounded-2xl border border-black/10 bg-white p-5">

        <p className="font-bold">
          {product.stock > 0
            ? "✅ In Stock"
            : "❌ Out of Stock"}
        </p>

        <p className="mt-2 text-sm text-black/60">
          {product.stock} items available
        </p>

      </div>

      {/* Shipping */}

      <div className="mt-6 flex items-start gap-4 rounded-2xl bg-white p-5">

        <Truck className="mt-1" />

        <div>

          <p className="font-bold">
            Free delivery on orders over R1000
          </p>

          <p className="mt-2 text-sm text-black/60">
            Delivery anywhere in South Africa within
            2–5 business days.
          </p>

        </div>

      </div>

    </div>
  );
}
