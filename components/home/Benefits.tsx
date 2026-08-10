"use client";

import { Truck, ShieldCheck, CreditCard, RefreshCcw } from "lucide-react";
import { motion } from "framer-motion";

const benefits = [
  {
    icon: Truck,
    title: "FAST DELIVERY",
    description: "Get your Busted Child pieces delivered straight to your door.",
  },
  {
    icon: ShieldCheck,
    title: "QUALITY FIRST",
    description: "Premium pieces designed to be worn, lived in and remembered.",
  },
  {
    icon: CreditCard,
    title: "SECURE CHECKOUT",
    description: "Simple and secure payments when you're ready to check out.",
  },
  {
    icon: RefreshCcw,
    title: "EASY RETURNS",
    description: "Changed your mind? We've made the return process simple.",
  },
];

export default function Benefits() {
  return (
    <section className="border-y border-black/5 bg-white px-5 py-10 lg:px-8">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 lg:grid-cols-4">
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon;

          return (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="flex items-start gap-4"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#F5F5F3]">
                <Icon size={20} strokeWidth={1.7} />
              </div>

              <div>
                <h3 className="text-xs font-black tracking-wide md:text-sm">
                  {benefit.title}
                </h3>

                <p className="mt-1 text-xs leading-relaxed text-black/50">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}