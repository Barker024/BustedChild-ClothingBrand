import { ArrowUpRight } from "lucide-react";
import {
  SiInstagram,
  SiFacebook,
  SiTiktok,
} from "react-icons/si";

export default function Footer() {
  return (
    <footer className="bg-[#0D0D0D] px-5 pb-8 pt-16 text-white lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Main Footer */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4">
              <img
                src="/images/logo.jpeg"
                alt="Busted Child"
                className="h-14 w-14 rounded-full object-cover"
              />

              <div>
                <h2 className="text-2xl font-black tracking-tight">
                  BUSTED CHILD
                </h2>

                <p className="text-xs uppercase tracking-[0.25em] text-white/40">
                  Built Different.
                </p>
              </div>
            </div>

            <p className="mt-7 max-w-md text-sm leading-7 text-white/45">
              Premium streetwear for people who refuse to fit in.
              Wear your mindset. Own your identity. Stay different.
            </p>

            {/* Socials */}
            <div className="mt-7 flex gap-3">

              {/* Instagram */}
              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-black"
              >
                <SiInstagram size={18} />
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-black"
              >
                <SiFacebook size={18} />
              </a>

              {/* TikTok */}
              <a
                href="https://tiktok.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-black"
              >
                <SiTiktok size={18} />
              </a>

            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-[#7AC943]">
              Shop
            </h3>

            <ul className="space-y-4 text-sm text-white/55">
              <li>
                <a
                  href="/shop"
                  className="transition hover:text-white"
                >
                  All Products
                </a>
              </li>

              <li>
                <a
                  href="/shop?category=hoodies"
                  className="transition hover:text-white"
                >
                  Hoodies
                </a>
              </li>

              <li>
                <a
                  href="/shop?category=t-shirts"
                  className="transition hover:text-white"
                >
                  T-Shirts
                </a>
              </li>

              <li>
                <a
                  href="/shop?category=tracksuits"
                  className="transition hover:text-white"
                >
                  Tracksuits
                </a>
              </li>

              <li>
                <a
                  href="/shop?category=accessories"
                  className="transition hover:text-white"
                >
                  Accessories
                </a>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-[#7AC943]">
              Help
            </h3>

            <ul className="space-y-4 text-sm text-white/55">
              <li>
                <a
                  href="/contact"
                  className="transition hover:text-white"
                >
                  Contact Us
                </a>
              </li>

              <li>
                <a
                  href="/shipping"
                  className="transition hover:text-white"
                >
                  Shipping & Delivery
                </a>
              </li>

              <li>
                <a
                  href="/returns"
                  className="transition hover:text-white"
                >
                  Returns
                </a>
              </li>

              <li>
                <a
                  href="/size-guide"
                  className="transition hover:text-white"
                >
                  Size Guide
                </a>
              </li>

              <li>
                <a
                  href="/faq"
                  className="transition hover:text-white"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-7 text-xs text-white/35 md:flex-row md:items-center md:justify-between">

          <p>
            © {new Date().getFullYear()} Busted Child. All rights reserved.
          </p>

          <div className="flex gap-5">
            <a
              href="/privacy"
              className="transition hover:text-white"
            >
              Privacy
            </a>

            <a
              href="/terms"
              className="transition hover:text-white"
            >
              Terms
            </a>
          </div>

          <a
            href="#"
            className="flex items-center gap-1 transition hover:text-white"
          >
            BACK TO TOP
            <ArrowUpRight size={13} />
          </a>

        </div>
      </div>
    </footer>
  );
}