"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "919700925393";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export default function WhatsAppButton() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1, ease: "easeOut" }}
      className="fixed bottom-6 right-6 z-40 group"
    >
      {/* Tooltip */}
      <div className="absolute right-16 bottom-1/2 translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="bg-secondary text-white text-xs font-medium px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg">
          Chat with us
          <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-secondary rotate-45" />
        </div>
      </div>

      {/* Button */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 rounded-full bg-accent text-white shadow-lg shadow-accent/30 hover:shadow-xl hover:shadow-accent/40 hover:scale-110 transition-all duration-300 animate-pulse-gold"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={26} />
      </a>
    </motion.div>
  );
}
