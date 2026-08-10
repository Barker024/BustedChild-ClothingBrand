"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import { useCart } from "@/contexts/CartContext";

export default function CheckoutPage() {
  const { cart, total } = useCart();

  const shipping = total >= 1000 ? 0 : 100;
  const grandTotal = total + shipping;

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
  });
  const [checkoutMessage, setCheckoutMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const startPayment = () => {
    if (cart.length === 0) return;

    const missingDetails = Object.values(form).some((value) => !value.trim());
    if (missingDetails || !form.email.includes("@")) {
      setCheckoutMessage("Please complete your contact and delivery details before continuing.");
      return;
    }

    setCheckoutMessage("Your details are ready. Secure Yoco payment will open here once the payment account is connected.");
  };

  return (
    <>
      <AnnouncementBar />
      <Navbar />

      <main className="min-h-screen bg-[#F5F5F3] py-14 px-5 lg:px-8">
        <div className="mx-auto max-w-7xl">

          <h1 className="mb-12 text-5xl font-black">
            CHECKOUT
          </h1>

          {cart.length === 0 ? (
            <section className="rounded-3xl bg-white p-10 text-center shadow-sm">
              <h2 className="text-2xl font-black">YOUR CART IS EMPTY</h2>
              <p className="mt-3 text-black/60">Pick a piece from the shop before you check out.</p>
              <Link href="/shop" className="mt-7 inline-flex rounded-full bg-black px-7 py-4 text-sm font-bold text-white transition hover:bg-[#7AC943] hover:text-black">
                SHOP THE DROP
              </Link>
            </section>
          ) : (
          <div className="grid gap-10 lg:grid-cols-[1.4fr_0.8fr]">

            {/* LEFT */}

            <div className="space-y-8">

              <div className="rounded-3xl bg-white p-8 shadow-sm">

                <h2 className="mb-6 text-2xl font-bold">
                  Customer Information
                </h2>

                <div className="grid gap-5 md:grid-cols-2">

                  <input
                    name="firstName"
                    placeholder="First Name"
                    value={form.firstName}
                    onChange={handleChange}
                    className="rounded-xl border p-4 outline-none focus:border-black"
                  />

                  <input
                    name="lastName"
                    placeholder="Last Name"
                    value={form.lastName}
                    onChange={handleChange}
                    className="rounded-xl border p-4 outline-none focus:border-black"
                  />

                  <input
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="rounded-xl border p-4 outline-none focus:border-black md:col-span-2"
                  />

                  <input
                    name="phone"
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={handleChange}
                    className="rounded-xl border p-4 outline-none focus:border-black md:col-span-2"
                  />

                </div>

              </div>

              <div className="rounded-3xl bg-white p-8 shadow-sm">

                <h2 className="mb-6 text-2xl font-bold">
                  Shipping Address
                </h2>

                <div className="grid gap-5">

                  <input
                    name="address"
                    placeholder="Street Address"
                    value={form.address}
                    onChange={handleChange}
                    className="rounded-xl border p-4 outline-none focus:border-black"
                  />

                  <div className="grid gap-5 md:grid-cols-3">

                    <input
                      name="city"
                      placeholder="City"
                      value={form.city}
                      onChange={handleChange}
                      className="rounded-xl border p-4 outline-none focus:border-black"
                    />

                    <input
                      name="province"
                      placeholder="Province"
                      value={form.province}
                      onChange={handleChange}
                      className="rounded-xl border p-4 outline-none focus:border-black"
                    />

                    <input
                      name="postalCode"
                      placeholder="Postal Code"
                      value={form.postalCode}
                      onChange={handleChange}
                      className="rounded-xl border p-4 outline-none focus:border-black"
                    />

                  </div>

                </div>

              </div>

            </div>

            {/* RIGHT */}

            <aside className="rounded-3xl bg-white p-8 shadow-sm h-fit">

              <h2 className="mb-8 text-2xl font-bold">
                Order Summary
              </h2>

              <div className="space-y-5">

                {cart.map((item) => (
                  <div
                    key={`${item.id}-${item.size}`}
                    className="flex gap-4"
                  >
                    <div className="relative h-20 w-20 overflow-hidden rounded-xl bg-gray-100">

                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />

                    </div>

                    <div className="flex-1">

                      <h3 className="font-bold">
                        {item.name}
                      </h3>

                      <p className="text-sm text-black/50">
                        Size {item.size}
                      </p>

                      <p className="text-sm text-black/50">
                        Qty {item.quantity}
                      </p>

                    </div>

                    <div className="font-bold">
                      R
                      {(item.price * item.quantity).toFixed(2)}
                    </div>

                  </div>
                ))}

              </div>

              <div className="my-8 border-t" />

              <div className="space-y-4">

                <div className="flex justify-between">

                  <span>Subtotal</span>

                  <span>
                    R{total.toFixed(2)}
                  </span>

                </div>

                <div className="flex justify-between">

                  <span>Shipping</span>

                  <span>
                    {shipping === 0
                      ? "FREE"
                      : `R${shipping}`}
                  </span>

                </div>

                <div className="flex justify-between text-xl font-black">

                  <span>Total</span>

                  <span>
                    R{grandTotal.toFixed(2)}
                  </span>

                </div>

              </div>

              {checkoutMessage && (
                <p className="mt-6 rounded-2xl bg-[#F5F5F3] p-4 text-sm font-semibold text-black/70">
                  {checkoutMessage}
                </p>
              )}

              <button type="button" onClick={startPayment} className="mt-8 w-full rounded-full bg-black py-4 text-lg font-bold text-white transition hover:bg-[#7AC943] hover:text-black">

                PAY WITH YOCO

              </button>

              <Link
                href="/shop"
                className="mt-4 block text-center font-semibold"
              >
                Continue Shopping
              </Link>

            </aside>

          </div>
          )}

        </div>
      </main>

      <Footer />
    </>
  );
}
