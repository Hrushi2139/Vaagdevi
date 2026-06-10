"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Trash2, Plus } from "lucide-react";

const initialItems = [
  { id: "1", type: "image", title: "Luxury Mansion", url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80" },
  { id: "2", type: "image", title: "Grand Lobby", url: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=600&q=80" },
  { id: "3", type: "image", title: "Night View", url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80" },
];

export default function AdminGallery() {
  const [items, setItems] = useState(initialItems);

  return (
    <div className="min-h-screen">
        <div className="sticky top-0 z-30 bg-secondary/80 backdrop-blur-lg border-b border-accent/10 px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-white font-[family-name:var(--font-display)]">Gallery</h1>
          <button className="gold-gradient text-white text-sm font-semibold px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer">
            <Plus size={16} /> Add Image
          </button>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="group relative aspect-square rounded-xl overflow-hidden border border-accent/10"
              >
                <Image src={item.url} alt={item.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                  <button className="opacity-0 group-hover:opacity-100 text-red-400 bg-black/60 p-2 rounded-full transition-all duration-300 cursor-pointer">
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-white text-sm font-medium">{item.title}</p>
                  <p className="text-white/50 text-xs capitalize">{item.type}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
    </div>
  );
}
