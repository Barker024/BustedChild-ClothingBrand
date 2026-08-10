"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#111111] text-white">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#7AC94322,transparent_40%)]" />

      <div className="relative mx-auto grid min-h-[88vh] max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2">

        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="mb-4 text-lg font-semibold uppercase tracking-[0.3em] text-[#7AC943]">
            THE BEST OUT OF NOTHING
          </p>

          <h1 className="mb-6 text-5xl font-black leading-none md:text-7xl">
            BUILT
            <br />
            DIFFERENT.
          </h1>

          <p className="mb-10 max-w-xl text-lg text-gray-300">
            Premium South African streetwear for people who refuse
            to blend in. Wear the mindset—not the trend.
          </p>

          <div className="flex flex-wrap gap-4">
            <button className="flex items-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-black transition hover:scale-105">
              Shop Now
              <ArrowRight size={18} />
            </button>

            <button className="rounded-full border border-white/30 px-8 py-4 font-semibold transition hover:border-[#7AC943] hover:text-[#7AC943]">
              View Collection
            </button>
          </div>
        </motion.div>

        {/* Right Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative flex justify-center"
        >
          {/* Glow */}
          <div className="absolute h-[420px] w-[420px] rounded-full bg-[#7AC943]/20 blur-3xl" />

          {/* Ceramic Card */}
          <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-2xl">
            <img
              src="/images/BustedHero.jpeg"
              alt="Busted Child "
              className="w-[500px] object-contain"
            />
          </div>

          {/* Floating Product Card */}
          <div className="absolute right-0 top-10 rounded-3xl border border-white/10 bg-black/60 px-6 py-5 backdrop-blur-xl">
            <p className="text-sm text-gray-400">Featured</p>
            <h3 className="mt-2 text-xl font-bold">
              UNIVERSITY HOODIE
            </h3>
            <p className="mt-1 text-[#7AC943] font-semibold">
              R650
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}