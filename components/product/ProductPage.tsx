import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";

interface Props {
  product: any;
}

export default function ProductPage({ product }: Props) {
  return (
    <section className="px-5 py-14 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2">

        <ProductGallery
          images={product.images}
          name={product.name}
        />

        <ProductInfo product={product} />

      </div>
    </section>
  );
}