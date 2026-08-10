"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  X,
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
} from "lucide-react";

import { useCart } from "@/contexts/CartContext";

export default function CartDrawer() {
  const {
    cart,
    total,
    cartCount,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
  } = useCart();
  const router = useRouter();
  const FREE_SHIPPING = 1000;

  const progress = Math.min(
    (total / FREE_SHIPPING) * 100,
    100
  );

  return (
    <>
      {/* Overlay */}
      <div
        onClick={closeCart}
        className={`fixed inset-0 z-[90] bg-black/50 transition-all duration-300 ${
          isCartOpen
            ? "visible opacity-100"
            : "invisible opacity-0"
        }`}
      />

      {/* Drawer */}
      <aside
        className={`fixed right-0 top-0 z-[100] flex h-screen w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ${
          isCartOpen
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b p-6">
          <div>
            <h2 className="text-xl font-black">
              YOUR CART
            </h2>

            <p className="text-sm text-black/50">
              {cartCount} item{cartCount !== 1 && "s"}
            </p>
          </div>

          <button
            onClick={closeCart}
            className="rounded-full p-2 hover:bg-gray-100"
          >
            <X />
          </button>
        </div>

        {/* Empty */}
        {cart.length === 0 && (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <ShoppingBag
              size={70}
              className="text-black/20"
            />

            <h3 className="mt-6 text-xl font-bold">
              Your cart is empty
            </h3>

            <p className="mt-2 text-black/50">
              Add some products to get started.
            </p>

            <button
              onClick={closeCart}
              className="mt-8 rounded-full bg-black px-8 py-3 font-bold text-white"
            >
              CONTINUE SHOPPING
            </button>
          </div>
        )}

        {/* Products */}
        {cart.length > 0 && (
          <>
            <div className="flex-1 space-y-6 overflow-y-auto p-6">
              {cart.map((item) => (
                <div
                  key={`${item.id}-${item.size}`}
                  className="flex gap-4"
                >
                  <div className="relative h-28 w-24 overflow-hidden rounded-xl bg-gray-100">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex flex-1 flex-col">
                    <h3 className="font-bold">
                      {item.name}
                    </h3>

                    <p className="text-sm text-black/40">
                      Size {item.size}
                    </p>

                    <p className="mt-1 font-bold">
                      R{item.price.toFixed(2)}
                    </p>

                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-2 rounded-full border px-2 py-1">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.size,
                              item.quantity - 1
                            )
                          }
                        >
                          <Minus size={16} />
                        </button>

                        <span className="w-6 text-center">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.size,
                              item.quantity + 1
                            )
                          }
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <button
                        onClick={() =>
                          removeFromCart(
                            item.id,
                            item.size
                          )
                        }
                      >
                        <Trash2
                          size={18}
                          className="text-red-500"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t p-6">
              <div className="mb-5">
                <div className="mb-2 flex justify-between text-sm">
                  <span>Free Shipping</span>

                  <span>
                    R{total.toFixed(2)} / R1000
                  </span>
                </div>

                <div className="h-2 rounded-full bg-gray-200">
                  <div
                    className="h-full rounded-full bg-[#7AC943]"
                    style={{
                      width: `${progress}%`,
                    }}
                  />
                </div>
              </div>

              <div className="mb-6 flex justify-between text-lg font-bold">
                <span>Subtotal</span>

                <span>R{total.toFixed(2)}</span>
              </div>

             <button
  onClick={() => {
    closeCart();
    router.push("/checkout");
  }}
  className="mb-3 w-full rounded-full bg-black py-4 font-bold text-white transition hover:bg-[#7AC943] hover:text-black"
>
  CHECKOUT
</button>

              <button
                onClick={closeCart}
                className="w-full rounded-full border py-4 font-bold"
              >
                CONTINUE SHOPPING
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}