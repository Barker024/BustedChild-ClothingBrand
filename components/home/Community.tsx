"use client";

import { ArrowUpRight } from "lucide-react";
import { SiInstagram } from "react-icons/si";
import { motion } from "framer-motion";

const images = [
  "/images/BustedInsta1.jpeg",
  "/images/BustedInsta2.jpeg",
  "/images/BustedInsta3.jpeg",
  "/images/BustedInsta4.jpeg",
  "/images/BustedInsta5.jpeg",
];

export default function Community() {
  return (
    <section className="bg-[#F5F5F3] px-5 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#7AC943]">
              Community
            </p>

            <h2 className="text-4xl font-black tracking-tight md:text-5xl">
              BUSTED TO THE WORLD.
            </h2>
          </div>

          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm font-bold"
          >
            <SiInstagram size={18} />
            @Bustedchild_clothingza
            <ArrowUpRight size={16} />
          </a>
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-5 md:gap-4">
          {images.map((image, index) => (
            <motion.a
              href="#"
              key={`${image}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
              whileHover={{ y: -5 }}
              className={`group relative overflow-hidden rounded-[24px] bg-white ${
                index === 0 ? "md:col-span-1" : ""
              }`}
            >
              <div className="aspect-square">
                <img
                  src={image}
                  alt="Busted Child community"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />
              </div>

              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/35">
             <SiInstagram
  size={25}
  className="text-white opacity-0 transition group-hover:opacity-100"
/>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}