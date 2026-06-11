"use client";

import { motion } from "framer-motion";

const stats = [
  { value: 15, suffix: "+", label: "Years of Excellence" },
  { value: 1000, suffix: "+", label: "Happy Families" },
  { value: 50, suffix: "+", label: "Acres Developed" },
  { value: 25, suffix: "+", label: "Projects Delivered" },
];

const process = [
  { number: "01", title: "Explore", description: "Browse our premium layouts and investment opportunities." },
  { number: "02", title: "Site Visit", description: "Visit the project location with our dedicated experts." },
  { number: "03", title: "Choose & Book", description: "Select your preferred plot and confirm with a booking amount." },
  { number: "04", title: "Documentation", description: "Transparent agreements and legal verification process." },
  { number: "05", title: "Registration & Possession", description: "Complete registration and receive possession without hassle." },
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
                <span className="gold-text text-2xl md:text-4xl font-display font-bold tracking-[0.08em] opacity-70 select-none text-center px-2">
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

        {/* Process Flow */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-24"
        >
          {/* Section header */}
          <div className="text-center mb-14">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              className="gold-text text-sm md:text-base font-semibold tracking-[0.2em] uppercase"
            >
              Our Process
            </motion.span>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-4xl font-display text-secondary mt-3"
            >
              How It <span className="gold-text">Works</span>
            </motion.h3>
          </div>

          {/* Flow steps */}
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute top-[60px] left-[10%] right-[10%] h-px bg-gradient-to-r from-accent/20 via-accent to-accent/20 hidden lg:block" />

            <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-4 relative">
              {process.map((step, i) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: 0.1 * i }}
                  className="flex flex-col items-center text-center relative"
                >
                  {/* Number circle */}
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center shadow-lg shadow-accent/30 mb-5">
                      <span className="text-white text-lg font-display font-bold">
                        {step.number}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h4 className="gold-text text-lg font-display font-bold mb-2">
                    {step.title}
                  </h4>

                  {/* Description */}
                  <p className="text-charcoal/60 text-sm leading-relaxed max-w-[220px]">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
