import SizeSelector from "./SizeSelector";
import QuantitySelector from "./QuantitySelector";
import AddToCartButton from "./AddToCartButton";

interface Props {
  product: any;
}

export default function ProductInfo({ product }: Props) {
  return (
    <div className="flex flex-col justify-center">

      <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#7AC943]">
        {product.category}
      </p>

      <h1 className="mt-4 text-5xl font-black">
        {product.name}
      </h1>

      <p className="mt-4 text-3xl font-bold">
        R{product.price}
      </p>

      <p className="mt-6 max-w-lg text-black/60 leading-8">
        {product.description}
      </p>

      <div className="my-8 h-px bg-black/10" />

      <SizeSelector sizes={product.sizes} />

      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <QuantitySelector />

        <AddToCartButton />
      </div>

      <p className="mt-6 text-sm text-green-600">
        ✓ {product.stock} items in stock
      </p>

    </div>
  );
}