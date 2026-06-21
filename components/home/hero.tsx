"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-black">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 z-0 h-full w-full object-cover opacity-60"
      >
        <source src="/hero.webm" type="video/webm" />
      </video>

      {/* Overlays / Filter */}
      <div className="absolute inset-0 z-0 bg-black/40" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />

      {/* Maximalist Typography */}
      <div className="relative z-10 flex w-full flex-col items-center justify-center px-4 text-center pointer-events-none drop-shadow-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
          className="flex flex-col items-center"
        >
          <span className="font-heading text-xl sm:text-3xl font-bold uppercase tracking-[0.5em] text-[var(--neon-cyan)] mb-4 drop-shadow-[0_0_15px_rgba(0,255,255,0.5)]">
            We Are
          </span>
          <h1 className="font-heading text-[20vw] sm:text-[15vw] lg:text-[12vw] font-black uppercase leading-[0.85] tracking-tighter text-white drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
            FIFA{" "}
            <span
              className="text-transparent drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"
              style={{ WebkitTextStroke: "6px white" }}
            >
              26
            </span>
          </h1>
          <h2 className="font-heading mt-4 text-[6vw] sm:text-[5vw] lg:text-[4vw] font-bold uppercase leading-[0.9] tracking-tight text-white bg-black px-6 py-2 border-4 border-[var(--neon-pink)] transform -rotate-2 shadow-[8px_8px_0px_0px_var(--neon-purple)]">
            WORLD CUP
          </h2>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-8 sm:left-1/2 sm:-translate-x-1/2 z-20 text-white drop-shadow-lg">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-heading text-xs uppercase tracking-widest font-bold">
            Scroll
          </span>
          <ChevronDown className="size-8 text-[var(--neon-pink)]" />
        </motion.div>
      </div>
    </section>
  );
}
