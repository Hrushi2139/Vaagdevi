"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const stats = [
  { value: 15, suffix: "+", label: "Years of Excellence" },
  { value: 1000, suffix: "+", label: "Happy Families" },
  { value: 50, suffix: "+", label: "Acres Developed" },
  { value: 25, suffix: "+", label: "Projects Delivered" },
];

const timeline = [
  { year: "2010", label: "Founded" },
  { year: "2013", label: "First Project" },
  { year: "2016", label: "Expansion" },
  { year: "2019", label: "Landmark Status" },
  { year: "2024", label: "Future Forward" },
];

function Counter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="text-center"
    >
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        className="gold-text text-4xl md:text-5xl font-display font-bold block leading-none"
      >
        <motion.span
          initial={{ opacity: 1 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          {Intl.NumberFormat("en-IN").format(value)}
          {suffix}
        </motion.span>
      </motion.span>
      <p className="text-charcoal/70 text-sm md:text-base mt-2 font-medium tracking-wide">
        {label}
      </p>
    </motion.div>
  );
}

export default function About() {
  return (
    <section id="about" className="py-24 px-4 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <motion.div
              initial={{ y: 0 }}
              whileInView={{ y: -20 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.2, ease: "easeOut", repeat: Infinity, repeatType: "reverse" }}
              className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/10 group"
            >
              {/* Gold border accent */}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-accent/40 z-10 pointer-events-none" />
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-accent/30 via-accent/10 to-accent/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Image placeholder */}
              <div className="relative aspect-[4/5] w-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <div className="absolute inset-0 bg-black/10" />
                <span className="gold-text text-5xl md:text-7xl font-display font-bold tracking-[0.2em] opacity-70 select-none">
                  ARCHITECTURE
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="space-y-8"
          >
            {/* Label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="gold-text text-sm md:text-base font-semibold tracking-[0.2em] uppercase">
                About Us
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl font-display text-secondary leading-tight"
            >
              Crafting Landmarks That Define{" "}
              <span className="gold-text">Generations</span>
            </motion.h2>

            {/* Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-charcoal/70 text-base md:text-lg leading-relaxed"
            >
              With decades of experience and an unwavering commitment to excellence,
              Vaagdevi Infra Projects has emerged as a premier real estate developer.
              We don&apos;t just build structures; we create destinations that inspire,
              communities that thrive, and investments that appreciate.
            </motion.p>

            {/* Stats Counters */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4"
            >
              {stats.map((stat) => (
                <Counter key={stat.label} {...stat} />
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-24 relative"
        >
          {/* Gold line */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-accent/20 via-accent to-accent/20 hidden md:block -translate-y-1/2" />

          <div className="flex overflow-x-auto md:grid md:grid-cols-5 gap-0 pb-4 md:pb-0 scrollbar-hide relative">
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                className="flex flex-col items-center text-center flex-shrink-0 w-32 md:w-auto px-2"
              >
                {/* Dot */}
                <div className="relative z-10">
                  <div className="w-4 h-4 rounded-full bg-accent shadow-lg shadow-accent/30 mb-4" />
                </div>

                {/* Year */}
                <span className="gold-text text-lg md:text-xl font-display font-bold">
                  {item.year}
                </span>

                {/* Label */}
                <p className="text-charcoal/60 text-xs md:text-sm font-medium mt-1 whitespace-nowrap">
                  {item.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
