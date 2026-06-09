"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X, Phone } from "lucide-react";
import { scrollToSection } from "@/lib/utils";

const navItems = [
  { label: "Home", href: "hero" },
  { label: "About", href: "about" },
  { label: "Projects", href: "projects" },
  { label: "Gallery", href: "gallery" },
  { label: "Testimonials", href: "testimonials" },
  { label: "Contact", href: "contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleNavClick = (id: string) => {
    setMobileOpen(false);
    scrollToSection(id);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-4 md:px-8 lg:px-16",
          scrolled
            ? "bg-secondary/80 backdrop-blur-xl py-3 shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
            : "bg-gradient-to-b from-black/40 to-transparent py-4"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          {/* Premium Logo Container */}
          <button
            onClick={() => handleNavClick("hero")}
            className="logo-container flex items-center cursor-pointer group"
            aria-label="Vaagdevi Infra Projects - Home"
          >
            {/* Gold accent dot */}
            <span className="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-accent opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="absolute -bottom-1 -right-1 w-2 h-2 rounded-full bg-accent opacity-60 group-hover:opacity-100 transition-opacity duration-300" />

            <Image
              src="/images/logo.png"
              alt="Vaagdevi Infra Projects"
              width={180}
              height={120}
              className="h-14 md:h-20 w-auto object-contain logo-glow"
              priority
            />
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="relative text-sm font-medium tracking-wide text-white/85 hover:text-accent transition-colors duration-300 group cursor-pointer"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          {/* CTA - Desktop */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:+919700925393"
              className="flex items-center gap-2 text-white/70 hover:text-accent transition-colors duration-300 text-sm"
            >
              <Phone size={16} />
              <span>+91 97009 25393</span>
            </a>
            <button
              onClick={() => handleNavClick("contact")}
              className="gold-gradient text-white text-sm font-semibold px-6 py-2.5 rounded-full shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              Book Site Visit
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden text-white p-2 cursor-pointer"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] md:hidden"
          >
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-xl"
              onClick={() => setMobileOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-full w-4/5 max-w-sm bg-secondary/95 backdrop-blur-xl border-l border-accent/10 shadow-2xl"
            >
              <div className="flex flex-col h-full px-8 py-10">
                <div className="flex justify-end mb-8">
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="text-white/80 hover:text-accent transition-colors cursor-pointer"
                    aria-label="Close menu"
                  >
                    <X size={28} />
                  </button>
                </div>

                {/* Mobile Logo */}
                <div className="mb-8 flex justify-center">
                  <div className="logo-container inline-flex">
                    <Image
                      src="/images/logo.png"
                      alt="Vaagdevi Infra Projects"
                      width={150}
                      height={100}
                      className="h-14 w-auto object-contain"
                    />
                  </div>
                </div>

                {/* Nav Links */}
                <div className="flex flex-col gap-2">
                  {navItems.map((item, i) => (
                    <motion.button
                      key={item.href}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08, duration: 0.3 }}
                      onClick={() => handleNavClick(item.href)}
                      className="text-left text-xl font-medium text-white/70 hover:text-accent transition-colors duration-300 py-3 border-b border-white/5 cursor-pointer"
                    >
                      {item.label}
                    </motion.button>
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-auto pt-8">
                  <button
                    onClick={() => handleNavClick("contact")}
                    className="w-full gold-gradient text-white font-semibold py-3.5 rounded-full shadow-lg shadow-accent/20 text-center cursor-pointer"
                  >
                    Book Site Visit
                  </button>
                  <a
                    href="tel:+919700925393"
                    className="flex items-center justify-center gap-2 text-white/50 hover:text-accent transition-colors mt-4 text-sm"
                  >
                    <Phone size={14} />
                    +91 97009 25393
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
