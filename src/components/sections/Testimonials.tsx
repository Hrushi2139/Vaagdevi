"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Ravi Chandra",
    location: "Hyderabad",
    rating: 5,
    content:
      "Vaagdevi Infra delivered beyond our expectations. The quality of construction and attention to detail is remarkable. Our dream home is now a reality.",
    project: "Emerald Estates",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
  },
  {
    name: "Priya Sharma",
    location: "Secunderabad",
    rating: 5,
    content:
      "The entire journey from site selection to handover was seamless. Professional team, transparent dealings, and exceptional craftsmanship.",
    project: "Golden Heights",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
  },
  {
    name: "Anil Kumar",
    location: "Gachibowli",
    rating: 4.5,
    content:
      "Best investment decision we made. The property has appreciated significantly and the community living experience is wonderful.",
    project: "Silver Oak Residency",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
  },
  {
    name: "Sunita Reddy",
    location: "Jubilee Hills",
    rating: 5,
    content:
      "Vaagdevi's commercial project is top-notch. Premium amenities, prime location, and excellent project management. Highly recommended for investors.",
    project: "Platinum Towers",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
  },
  {
    name: "Venkatesh Rao",
    location: "Kompally",
    rating: 4.5,
    content:
      "Open plots from Vaagdevi are well-developed with proper infrastructure. Transparent pricing and great after-sales support.",
    project: "Green Valley Plots",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
  },
];

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating % 1 !== 0;

  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={cn(
            i < full
              ? "fill-accent text-accent"
              : i === full && half
                ? "fill-accent/50 text-accent"
                : "text-white/20"
          )}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const startAutoScroll = () => {
    stopAutoScroll();
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 4000);
  };

  const stopAutoScroll = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    if (!isPaused) startAutoScroll();
    else stopAutoScroll();
    return stopAutoScroll;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaused]);

  const goTo = (index: number) => {
    setCurrent(index);
    if (!isPaused) {
      stopAutoScroll();
      startAutoScroll();
    }
  };

  return (
    <section id="testimonials" className="py-24 px-4 bg-[#F8F6F0]">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="gold-text inline-block text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            Testimonials
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl text-secondary font-bold">
            What Our Clients Say
          </h2>
          <div className="mx-auto mt-4 h-1 w-20 gold-gradient rounded-full" />
        </motion.div>

        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -80 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="mx-auto max-w-3xl"
            >
              <div className="glass-dark rounded-2xl p-8 md:p-10 border-l-4 border-accent relative">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative h-14 w-14 rounded-full overflow-hidden ring-2 ring-accent/30 flex-shrink-0">
                    <Image
                      src={testimonials[current].image}
                      alt={testimonials[current].name}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-lg">
                      {testimonials[current].name}
                    </h4>
                    <p className="text-white/50 text-sm">
                      {testimonials[current].location}
                    </p>
                  </div>
                  <div className="ml-auto">
                    <StarRating rating={testimonials[current].rating} />
                  </div>
                </div>

                <p className="text-white/80 text-lg leading-relaxed italic mb-6">
                  &ldquo;{testimonials[current].content}&rdquo;
                </p>

                <div className="flex items-center gap-2 text-accent text-sm font-medium">
                  <span className="h-px w-6 gold-gradient" />
                  {testimonials[current].project}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={cn(
                "h-2 rounded-full transition-all duration-300 cursor-pointer",
                i === current
                  ? "w-8 gold-gradient"
                  : "w-2 bg-secondary/20 hover:bg-secondary/40"
              )}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
