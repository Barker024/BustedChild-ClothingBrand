"use client";

import { useState } from "react";

interface Props {
  sizes: string[];
}

export default function SizeSelector({ sizes }: Props) {
  const [selected, setSelected] = useState("");

  return (
    <div>
      <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em]">
        Select Size
      </p>

      <div className="flex flex-wrap gap-3">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => setSelected(size)}
            className={`rounded-full px-6 py-3 text-sm font-semibold transition ${
              selected === size
                ? "bg-black text-white"
                : "border border-black/10 bg-white hover:border-black"
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}