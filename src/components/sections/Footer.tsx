"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, Phone, Mail, Globe, Camera, Video, Briefcase } from "lucide-react";
import { scrollToSection } from "@/lib/utils";
import { fetchProjects } from "@/lib/api";

const quickLinks = [
  { label: "Home", href: "hero" },
  { label: "About", href: "about" },
  { label: "Projects", href: "projects" },
  { label: "Gallery", href: "gallery" },
  { label: "Contact", href: "contact" },
];

const socialLinks = [
  { icon: Globe, href: "#", label: "Facebook" },
  { icon: Camera, href: "#", label: "Instagram" },
  { icon: Video, href: "#", label: "YouTube" },
  { icon: Briefcase, href: "#", label: "LinkedIn" },
];

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Footer() {
  const [ourProjects, setOurProjects] = useState<string[]>([]);

  useEffect(() => {
    fetchProjects()
      .then((data) => setOurProjects(data.map((p: any) => p.title)))
      .catch(() => setOurProjects([]));
  }, []);

  return (
    <footer className="bg-[#081528] text-white/80 py-16 px-4">
      <div className="mx-auto max-w-7xl">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12"
        >
          {/* Col 1 - Logo & Tagline */}
          <motion.div variants={fadeIn} className="space-y-5">
            <div>
              <Image
                src="/images/logo.png"
                alt="Vaagdevi Infra Projects"
                width={180}
                height={120}
                className="h-20 w-auto object-contain"
              />
            </div>
            <p className="text-sm text-white/50 leading-relaxed">
              Building tomorrow&apos;s landmarks with quality, integrity, and
              innovation. Premium real estate destinations across Hyderabad.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/50 hover:text-accent hover:border-accent transition-all duration-300"
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Col 2 - Quick Links */}
          <motion.div variants={fadeIn} className="space-y-5">
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-sm text-white/50 hover:text-accent transition-colors duration-300 cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Col 3 - Our Projects */}
          <motion.div variants={fadeIn} className="space-y-5">
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase">
              Our Projects
            </h4>
            {ourProjects.length > 0 ? (
              <ul className="space-y-3">
                {ourProjects.map((project) => (
                  <li key={project}>
                    <button
                      onClick={() => scrollToSection("projects")}
                      className="text-sm text-white/50 hover:text-accent transition-colors duration-300 cursor-pointer"
                    >
                      {project}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-white/30">No projects yet</p>
            )}
          </motion.div>

          {/* Col 4 - Contact Info */}
          <motion.div variants={fadeIn} className="space-y-5">
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase">
              Contact Info
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 text-accent flex-shrink-0" />
                <span className="text-sm text-white/50">
                  H.O: 8-7-91/17/1, 3rd Flr, Hastinapuram South, Hyderabad - 500079
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 text-accent flex-shrink-0" />
                <span className="text-sm text-white/50">
                  Br: D.No. 12-42/B/3, Tilaknagar, Kalwakurthy - 509324
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-accent flex-shrink-0" />
                <a
                  href="tel:+919700925393"
                  className="text-sm text-white/50 hover:text-accent transition-colors duration-300"
                >
                  +91 97009 25393
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-accent flex-shrink-0" />
                <a
                  href="mailto:info@vaagdeviinfra.com"
                  className="text-sm text-white/50 hover:text-accent transition-colors duration-300"
                >
                  info@vaagdeviinfra.com
                </a>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="h-px gold-gradient my-10 origin-left"
        />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>&copy; 2024 Vaagdevi Infra Projects. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <button className="hover:text-accent transition-colors duration-300 cursor-pointer">
              Privacy Policy
            </button>
            <button className="hover:text-accent transition-colors duration-300 cursor-pointer">
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
