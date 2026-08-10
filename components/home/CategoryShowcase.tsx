"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const categories = [
  {
    title: "HOODIES",
    subtitle: "Shop Now",
    image: "/images/hoodie.jpeg",
  },
  {
    title: "T-SHIRTS",
    subtitle: "Shop Now",
    image: "/images/tshirts.jpg",
  },
  {
    title: "TRACKSUITS",
    subtitle: "Shop Now",
    image: "/images/tracksuit.jpeg",
  },
  {
    title: "ACCESSORIES",
    subtitle: "Shop Now",
    image: "/images/accessories.jpeg",
  },
];

export default function CategoryShowcase() {
  return (
    <section className="bg-[#F5F5F3] px-5 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-[#7AC943]">
              Shop by category
            </p>

            <h2 className="text-4xl font-black tracking-tight md:text-5xl">
              FIND YOUR FIT.
            </h2>
          </div>

          <a
            href="/shop"
            className="hidden items-center gap-2 text-sm font-semibold md:flex"
          >
            VIEW ALL
            <ArrowUpRight size={18} />
          </a>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {categories.map((category, index) => (
            <motion.a
              key={category.title}
              href={`/shop?category=${category.title.toLowerCase()}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              whileHover={{ y: -6 }}
              className="group relative min-h-[280px] overflow-hidden rounded-[28px] border border-black/5 bg-white p-5 shadow-[0_10px_35px_rgba(0,0,0,0.08)] transition-shadow duration-300 hover:shadow-[0_20px_45px_rgba(0,0,0,0.14)] md:min-h-[340px]"
            >
              {/* Image */}
              <div className="absolute inset-0 flex items-end justify-center">
                <img
                  src={category.image}
                  alt={category.title}
                  className="h-[75%] w-full object-contain transition duration-500 group-hover:scale-105"
                />
              </div>

              {/* Gradient */}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-white via-white/70 to-transparent" />

              {/* Text */}
              <div className="relative z-10">
                <h3 className="text-xl font-black md:text-2xl">
                  {category.title}
                </h3>

                <span className="mt-1 inline-flex items-center gap-1 text-sm font-medium">
                  {category.subtitle}
                  <ArrowUpRight
                    size={15}
                    className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </span>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Mobile View All */}
        <a
          href="/shop"
          className="mt-6 flex items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-6 py-3 text-sm font-semibold shadow-sm md:hidden"
        >
          VIEW ALL
          <ArrowUpRight size={17} />
        </a>
      </div>
    </section>
  );
}