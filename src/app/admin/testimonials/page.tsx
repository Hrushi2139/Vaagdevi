"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Trash2 } from "lucide-react";

const initialTestimonials = [
  { id: "1", name: "Rajesh Kumar", location: "Madhapur", rating: 5, content: "Exceptional quality and timely delivery. Vaagdevi Infra exceeded our expectations.", project: "Vaagdevi Heights" },
  { id: "2", name: "Priya Sharma", location: "Gachibowli", rating: 5, content: "The attention to detail in Gold Crest Towers is remarkable. Truly premium living.", project: "Gold Crest Towers" },
  { id: "3", name: "Amit Verma", location: "Shamshabad", rating: 4, content: "Great investment opportunity. The plot prices have already appreciated significantly.", project: "Green Valley Plots" },
];

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState(initialTestimonials);

  return (
    <div className="min-h-screen">
        <div className="sticky top-0 z-30 bg-secondary/80 backdrop-blur-lg border-b border-accent/10 px-6 py-4">
          <h1 className="text-xl font-semibold text-white font-[family-name:var(--font-display)]">Testimonials</h1>
        </div>
        <div className="p-6">
          <div className="grid gap-4">
            {testimonials.map((t) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-secondary/60 border border-accent/10 rounded-xl p-6"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-white font-semibold">{t.name}</h3>
                    <p className="text-white/50 text-sm">{t.location}</p>
                    <div className="flex gap-1 mt-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={14} className={i < t.rating ? "text-accent fill-accent" : "text-white/20"} />
                      ))}
                    </div>
                  </div>
                  <button className="text-red-400/50 hover:text-red-400 transition-colors cursor-pointer">
                    <Trash2 size={16} />
                  </button>
                </div>
                <p className="text-white/70 text-sm mt-3 italic">&ldquo;{t.content}&rdquo;</p>
                <p className="text-accent/60 text-xs mt-2">Project: {t.project}</p>
              </motion.div>
            ))}
          </div>
        </div>
    </div>
  );
}
