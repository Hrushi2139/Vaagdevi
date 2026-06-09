"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { scrollToSection } from "@/lib/utils";

const headlineWords = ["Building", "Tomorrow's", "Landmarks"] as const;

const statCards = [
  { number: "1000+", label: "Happy Customers" },
  { number: "50+", label: "Acres Developed" },
  { number: "Multiple", label: "Landmark Projects" },
  { number: "Years of", label: "Trust" },
] as const;

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 60, rotateX: -90 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.9, ease: [0.6, 0.05, 0.2, 0.95] },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const statContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 1.2 },
  },
};

const statRevealVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function Hero() {
  const particles = useMemo(
    () =>
      Array.from({ length: 25 }, (_, i) => ({
        left: `${((i * 17 + 3) % 100)}%`,
        top: `${((i * 13 + 7) % 100)}%`,
        size: 1.5 + (i % 3) * 0.5,
        delay: (i % 4) * 0.8,
        duration: 3 + (i % 5),
      })),
    [],
  );

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-secondary">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2070')",
          }}
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span className="text-white/[0.06] text-base tracking-[0.4em] uppercase font-medium">
            Cinematic Drone Footage
          </span>
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <style>{`
          @keyframes particle-float {
            0%, 100% { transform: translateY(0) translateX(0); opacity: 0.2; }
            25% { transform: translateY(-25px) translateX(12px); opacity: 0.5; }
            50% { transform: translateY(-12px) translateX(-8px); opacity: 0.3; }
            75% { transform: translateY(-35px) translateX(18px); opacity: 0.6; }
          }
        `}</style>
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/20"
            style={{
              left: p.left,
              top: p.top,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animation: `particle-float ${p.duration}s ease-in-out infinite`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-16 pt-32 pb-48">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="flex flex-col items-center text-center"
        >
          {/* Headline - word by word stagger */}
          <h1 className="sr-only">Building Tomorrow&apos;s Landmarks</h1>
          <motion.div
            className="font-display text-6xl sm:text-7xl md:text-8xl font-bold leading-[1.1] mb-6 flex flex-wrap justify-center"
            aria-hidden
            style={{ columnGap: "0.18em" }}
          >
            {headlineWords.map((word, i) => (
              <motion.span
                key={i}
                variants={wordVariants}
                className="gold-text"
              >
                {word}
              </motion.span>
            ))}
          </motion.div>

          {/* Subheadline */}
          <motion.p
            variants={fadeUpVariants}
            className="text-white/80 max-w-2xl text-lg md:text-xl leading-relaxed mb-12"
          >
            Creating premium residential, commercial and investment destinations
            designed for growth and prosperity.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={fadeUpVariants}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6"
          >
            <button
              onClick={() => scrollToSection("projects")}
              className="gold-gradient text-white font-semibold px-8 py-4 rounded-full shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              Explore Projects
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="border border-white/30 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:bg-accent hover:border-accent hover:shadow-lg hover:shadow-accent/20 cursor-pointer"
            >
              Book Site Visit
            </button>
          </motion.div>
        </motion.div>

        {/* Floating Statistics Cards */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={statContainerVariants}
          className="hidden lg:flex justify-center gap-6 mt-20"
        >
          {statCards.map((stat, i) => (
            <motion.div
              key={stat.number}
              variants={statRevealVariants}
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.2,
                }}
                className="glass rounded-xl px-6 py-5 min-w-[160px] border-l-2 border-accent shadow-xl shadow-black/20"
              >
                <div className="gold-text text-2xl font-bold font-display mb-1">
                  {stat.number}
                </div>
                <div className="text-white/70 text-sm font-medium">
                  {stat.label}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => scrollToSection("about")}
      >
        <span className="text-white/40 text-[10px] tracking-[0.25em] uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ChevronDown className="text-accent" size={18} />
        </motion.div>
      </motion.div>
    </section>
  );
}
