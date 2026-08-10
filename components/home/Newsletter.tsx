"use client";

import { ArrowRight } from "lucide-react";
import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim()) return;

    setSubmitted(true);
    setEmail("");
  }

  return (
    <section
      className="relative overflow-hidden px-5 py-24 text-white lg:px-8"
      style={{
        backgroundImage: "url('/images/newsletter.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/65" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl text-center">

        <p className="text-sm font-black uppercase tracking-[0.3em] text-[#7AC943]">
          Stay in the loop
        </p>

        <h2 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">
          DON'T MISS THE NEXT DROP.
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-white/70 md:text-base">
          Get first access to new drops, exclusive pieces and everything
          happening inside Busted Child.
        </p>

        {submitted ? (
          <div className="mx-auto mt-8 max-w-xl rounded-full bg-[#7AC943] px-6 py-4 text-sm font-bold text-black">
            YOU'RE ON THE LIST. 🔥
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email address"
              className="min-w-0 flex-1 rounded-full border border-white/20 bg-white/10 px-6 py-4 text-sm text-white outline-none backdrop-blur-md placeholder:text-white/50 focus:border-[#7AC943]"
            />

            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-full bg-[#7AC943] px-7 py-4 text-sm font-bold text-black transition hover:scale-105"
            >
              JOIN
              <ArrowRight size={17} />
            </button>
          </form>
        )}

        <p className="mt-5 text-[11px] text-white/40">
          No spam. Just Busted Child.
        </p>

      </div>
    </section>
  );
}