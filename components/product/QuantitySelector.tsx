"use client";

import { useState } from "react";

export default function QuantitySelector() {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex h-14 w-40 items-center justify-between rounded-full border border-black/10 bg-white px-5">
      <button
        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
        className="text-xl"
      >
        −
      </button>

      <span className="font-bold">{quantity}</span>

      <button
        onClick={() => setQuantity((q) => q + 1)}
        className="text-xl"
      >
        +
      </button>
    </div>
  );
}