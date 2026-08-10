"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Search,
  ShoppingBag,
  Menu,
  X,
  User,
  Heart,
} from "lucide-react";

import { useCart } from "@/contexts/CartContext";

const navigation = [
  { name: "HOME", href: "/" },
  { name: "SHOP", href: "/shop" },
  { name: "NEW ARRIVALS", href: "/new-arrivals" },
  { name: "KIDS", href: "/kids" },
  { name: "ACCESSORIES", href: "/accessories" },
  { name: "SALE", href: "/sale" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const { cartCount, openCart } = useCart();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-black/5 bg-[#F5F5F3]/95 px-4 py-3 backdrop-blur-xl lg:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="flex shrink-0 items-center gap-3"
          >
            <Image
              src="/images/logo.jpeg"
              alt="Busted Child"
              width={44}
              height={44}
              className="rounded-full object-cover"
            />

            <div className="hidden sm:block">
              <p className="text-sm font-black tracking-tight">
                BUSTED CHILD
              </p>

              <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-black/40">
                Built Different.
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-6 lg:flex">
            {navigation.map((item) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative py-2 text-[11px] font-bold tracking-wide transition ${
                    active
                      ? "text-black"
                      : "text-black/40 hover:text-black"
                  }`}
                >
                  {item.name}

                  {active && (
                    <span className="absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-[#7AC943]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-1">
            {/* Search */}
            <button
              type="button"
              aria-label="Search"
              className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-black/5"
            >
              <Search size={18} />
            </button>

            {/* Account */}
            <Link
              href="/login"
              aria-label="Account"
              className="hidden h-10 w-10 items-center justify-center rounded-full transition hover:bg-black/5 sm:flex"
            >
              <User size={18} />
            </Link>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className="hidden h-10 w-10 items-center justify-center rounded-full transition hover:bg-black/5 sm:flex"
            >
              <Heart size={18} />
            </Link>

            {/* Cart */}
            <button
              type="button"
              onClick={openCart}
              aria-label="Shopping Cart"
              className="relative flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-black/5"
            >
              <ShoppingBag size={18} />

              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#7AC943] px-1 text-[10px] font-bold text-black">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu */}
            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-black/5 lg:hidden"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="fixed inset-x-0 top-[69px] z-40 border-b border-black/5 bg-[#F5F5F3] px-5 pb-6 pt-4 shadow-xl lg:hidden">
          <nav className="mx-auto max-w-7xl">
            {navigation.map((item) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between border-b border-black/5 py-4 text-sm font-bold transition ${
                    active
                      ? "text-black"
                      : "text-black/40 hover:text-black"
                  }`}
                >
                  <span>{item.name}</span>

                  {active && (
                    <span className="h-2 w-2 rounded-full bg-[#7AC943]" />
                  )}
                </Link>
              );
            })}

            {/* Mobile Actions */}
            <div className="mt-5 grid grid-cols-3 gap-2">
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 rounded-2xl bg-white py-3 text-xs font-bold"
              >
                <User size={15} />
                ACCOUNT
              </Link>

              <Link
                href="/wishlist"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 rounded-2xl bg-white py-3 text-xs font-bold"
              >
                <Heart size={15} />
                WISHLIST
              </Link>

              <button
                type="button"
                onClick={() => {
                  openCart();
                  setMobileOpen(false);
                }}
                className="flex items-center justify-center gap-2 rounded-2xl bg-black py-3 text-xs font-bold text-white"
              >
                <ShoppingBag size={15} />
                CART
              </button>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}