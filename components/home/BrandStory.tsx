"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function BrandStory() {
  return (
    <section className="bg-[#111111] px-5 py-24 text-white lg:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="overflow-hidden rounded-[36px] border border-white/10 bg-white/5 p-3 shadow-2xl">
            <img
              src="/images/TC BC.jpeg"
              alt="Busted Child streetwear"
              className="h-[500px] w-full rounded-[28px] object-cover"
            />
          </div>

          {/* Floating Badge */}
          <div className="absolute -bottom-5 -right-3 rounded-3xl border border-white/10 bg-[#1B1B1B] px-6 py-5 shadow-xl backdrop-blur-xl md:-right-6">
            <p className="text-3xl font-black text-[#7AC943]">
              BUSTED CHILD
            </p>
            <p className="mt-1 text-xs uppercase tracking-widest text-white/50">
              Built Different
            </p>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#7AC943]">
            THE BUSTED CHILD MINDSET
          </p>

          <h2 className="text-4xl font-black leading-tight md:text-6xl">
            WE WERE NEVER
            <br />
            MADE TO FIT IN.
          </h2>

          <div className="mt-8 space-y-5 text-base leading-8 text-white/60">
            <p>
              Busted Child is more than clothing. It's a mindset built for
              people who choose their own lane.
            </p>

            <p>
              We create streetwear for the ones who don't follow the crowd,
              don't chase approval and don't need permission to be different.
            </p>

            <p>
              Every piece represents individuality, confidence and the
              freedom to become whoever you want to be.
            </p>
          </div>

          <a
            href="/about"
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-bold text-black transition hover:scale-105"
          >
            OUR STORY
            <ArrowRight size={18} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}