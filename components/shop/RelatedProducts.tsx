"use client";

import ProductCard from "@/components/shop/ProductCard";
import { Product } from "@/types/product";

interface RelatedProductsProps {
  currentProduct: Product;
  products: Product[];
}

export default function RelatedProducts({
  currentProduct,
  products,
}: RelatedProductsProps) {
  const related = products
    .filter(
      (product) =>
        product.id !== currentProduct.id &&
        product.category === currentProduct.category
    )
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section className="mt-24">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#7AC943]">
            You May Also Like
          </p>

          <h2 className="mt-2 text-4xl font-black tracking-tight">
            COMPLETE THE LOOK
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 xl:grid-cols-4">
        {related.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}