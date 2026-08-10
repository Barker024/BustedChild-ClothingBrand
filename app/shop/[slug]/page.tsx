import { notFound } from "next/navigation";

import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RelatedProducts from "@/components/shop/RelatedProducts";
import ProductGallery from "@/components/shop/ProductGallery";
import ProductDetails from "@/components/shop/ProductDetails";

import { products } from "@/data/products";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <AnnouncementBar />
      <Navbar />

    <main className="min-h-screen bg-[#F5F5F3]">
  <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
    <div className="grid gap-14 lg:grid-cols-2">
      <ProductGallery product={product} />
      <ProductDetails product={product} />
    </div>

    <RelatedProducts
      currentProduct={product}
      products={products}
    />
  </section>
</main>

      <Footer />
    </>
  );
}