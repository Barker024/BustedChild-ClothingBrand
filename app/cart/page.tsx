"use client";

import Image from "next/image";
import Link from "next/link";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import { useCart } from "@/contexts/CartContext";

export default function CartPage() {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    total,
  } = useCart();

  const shipping = cart.length > 0 ? 120 : 0;
  const grandTotal = total + shipping;

  return (
    <>
      <AnnouncementBar />
      <Navbar />

      <main className="min-h-screen bg-[#F5F5F3]">

        {/* Hero */}
        <section className="border-b border-black/5 px-5 py-16 lg:px-8">
          <div className="mx-auto max-w-7xl">

            <Link
              href="/shop"
              className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-black/60 hover:text-black"
            >
              <span aria-hidden="true">←</span>
              Continue Shopping
            </Link>

            <h1 className="text-5xl font-black md:text-7xl">
              YOUR CART
            </h1>

            <p className="mt-4 text-black/60">
              {cart.length} item{cart.length !== 1 && "s"} in your cart
            </p>

          </div>
        </section>

        {cart.length === 0 ? (
          <section className="px-5 py-24 text-center">

            <h2 className="text-3xl font-black">
              Your cart is empty
            </h2>

            <p className="mt-4 text-black/50">
              Looks like you haven't added anything yet.
            </p>

            <Link
              href="/shop"
              className="mt-8 inline-flex rounded-full bg-black px-8 py-4 font-bold text-white transition hover:scale-105"
            >
              SHOP NOW
            </Link>

          </section>
        ) : (
          <section className="px-5 py-16 lg:px-8">
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[2fr_1fr]">

              {/* Cart Items */}
              <div className="space-y-6">

                {cart.map((item) => (
                  <div
                    key={`${item.id}-${item.size}`}
                    className="rounded-[28px] bg-white p-5 shadow-sm"
                  >
                    <div className="flex flex-col gap-6 md:flex-row">

                      <div className="relative h-36 w-32 overflow-hidden rounded-2xl bg-[#ECECE8]">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex flex-1 flex-col justify-between">

                        <div>
                          <h2 className="text-xl font-black">
                            {item.name}
                          </h2>

                          <p className="mt-2 text-sm text-black/50">
                            Size: {item.size}
                          </p>

                          <p className="mt-3 text-lg font-bold">
                            R{item.price.toLocaleString("en-ZA")}
                          </p>
                        </div>

                        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">

                          {/* Quantity */}
                          <div className="flex items-center rounded-full border">

                            <button
                              aria-label="Decrease quantity"
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  item.size,
                                  Math.max(1, item.quantity - 1)
                                )
                              }
                              className="p-3"
                            >
                              −
                            </button>

                            <span className="w-12 text-center font-bold">
                              {item.quantity}
                            </span>

                            <button
                              aria-label="Increase quantity"
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  item.size,
                                  item.quantity + 1
                                )
                              }
                              className="p-3"
                            >
                              +
                            </button>

                          </div>

                          <button
                            aria-label={`Remove ${item.name}`}
                            onClick={() =>
                              removeFromCart(item.id, item.size)
                            }
                            className="flex items-center gap-2 text-red-500 hover:text-red-700"
                          >
                            <span aria-hidden="true">×</span>
                            Remove
                          </button>

                        </div>

                      </div>
                    </div>
                  </div>
                ))}

                <button
                  onClick={clearCart}
                  className="rounded-full border border-red-500 px-6 py-3 font-bold text-red-500 transition hover:bg-red-500 hover:text-white"
                >
                  CLEAR CART
                </button>

              </div>

              {/* Summary */}
              <aside className="h-fit rounded-[32px] bg-white p-8 shadow-sm">

                <h2 className="text-2xl font-black">
                  ORDER SUMMARY
                </h2>

                <div className="mt-8 space-y-4">

                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>R{total.toLocaleString("en-ZA")}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>R{shipping}</span>
                  </div>

                  <hr />

                  <div className="flex justify-between text-xl font-black">
                    <span>Total</span>
                    <span>R{grandTotal.toLocaleString("en-ZA")}</span>
                  </div>

                </div>

                <Link href="/checkout" className="mt-8 block w-full rounded-full bg-[#7AC943] py-4 text-center font-black text-black transition hover:scale-[1.02]">
                  PROCEED TO CHECKOUT
                </Link>

              </aside>

            </div>
          </section>
        )}

      </main>

      <Footer />
    </>
  );
}
