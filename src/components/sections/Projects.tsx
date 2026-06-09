"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { MapPin, ChevronRight } from "lucide-react";

const projects = [
  {
    id: "1",
    title: "Vaagdevi Heights",
    location: "Madhapur, Hyderabad",
    status: "Ongoing",
    category: "Residential",
    plotSize: "2.5 Acres",
    features: ["Gym", "Pool", "Garden", "Club House"],
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
    description: "Premium residential towers with world-class amenities",
  },
  {
    id: "2",
    title: "Gold Crest Towers",
    location: "Gachibowli, Hyderabad",
    status: "Completed",
    category: "Residential",
    plotSize: "3 Acres",
    features: ["Spa", "Tennis Court", "Sky Lounge", "Theatre"],
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800",
    description: "Luxury living redefined with panoramic city views",
  },
  {
    id: "3",
    title: "Vaagdevi Tech Park",
    location: "Hitech City, Hyderabad",
    status: "Ongoing",
    category: "Commercial",
    plotSize: "5 Acres",
    features: ["LEED Certified", "Smart Building", "Convention Center"],
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800",
    description: "A-grade commercial spaces for global enterprises",
  },
  {
    id: "4",
    title: "Green Valley Plots",
    location: "Shamshabad, Hyderabad",
    status: "Ongoing",
    category: "Open Plots",
    plotSize: "15 Acres",
    features: ["Park", "Lake View", "Gated Community"],
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800",
    description: "Serene open plots with breathtaking natural surroundings",
  },
  {
    id: "5",
    title: "Royal Residency",
    location: "Banjara Hills, Hyderabad",
    status: "Completed",
    category: "Residential",
    plotSize: "1.8 Acres",
    features: ["Rooftop Pool", "Private Elevator", "Concierge"],
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
    description: "Exclusive boutique residences in the heart of the city",
  },
  {
    id: "6",
    title: "Vaagdevi Galleria",
    location: "Kompally, Hyderabad",
    status: "Upcoming",
    category: "Commercial",
    plotSize: "4 Acres",
    features: ["Retail", "Food Court", "Multiplex", "Parking"],
    image: "https://images.unsplash.com/photo-1577415124269-fc1140a69e91?w=800",
    description: "Upcoming retail and entertainment destination",
  },
];

const categories = ["All", "Residential", "Commercial", "Open Plots", "Ongoing", "Completed"] as const;
type Category = (typeof categories)[number];

const statusColors: Record<string, string> = {
  Ongoing: "bg-gradient-to-r from-[#D4A24C] to-[#e0b86a] text-white",
  Completed: "bg-gradient-to-r from-emerald-500 to-emerald-400 text-white",
  Upcoming: "bg-gradient-to-r from-blue-500 to-blue-400 text-white",
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
};

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filteredProjects = useMemo(
    () =>
      activeCategory === "All"
        ? projects
        : projects.filter(
            (p) => p.category === activeCategory || p.status === activeCategory
          ),
    [activeCategory]
  );

  return (
    <section id="projects" className="py-24 px-4 bg-[#F8F6F0]">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-14"
        >
          <span className="gold-text inline-block text-sm font-semibold tracking-[0.25em] uppercase mb-4">
            Our Portfolio
          </span>
          <h2 className="text-4xl font-display playfair text-[#1a1a2e] mb-4">
            Signature Projects
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-lg">
            Discover our collection of premium residential and commercial
            destinations
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-14">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "relative px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 cursor-pointer",
                activeCategory === cat
                  ? "gold-gradient text-white shadow-lg shadow-[#D4A24C]/30"
                  : "bg-transparent text-[#1a1a2e] border-2 border-[#D4A24C]/30 hover:border-[#D4A24C] hover:text-[#D4A24C]"
              )}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Project Grid */}
        <motion.div
          key={activeCategory}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}
                whileHover={{ y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="group relative overflow-hidden rounded-2xl h-[420px] cursor-pointer"
              >
                <Link href={`/projects/${project.id}`} className="block h-full">
                  {/* Image with zoom on hover */}
                  <motion.div
                    className="absolute inset-0"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </motion.div>

                  {/* Gradient overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e]/95 via-[#1a1a2e]/40 to-transparent z-10" />
                  <motion.div
                    className="absolute inset-0 z-20 pointer-events-none"
                    whileHover={{ opacity: 1 }}
                    initial={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-[#D4A24C]/20 via-transparent to-transparent" />
                    <div className="absolute inset-0 border-2 border-transparent rounded-2xl group-hover:border-[#D4A24C]/60 group-hover:shadow-[0_0_40px_rgba(212,162,76,0.3)] transition-all duration-500" />
                  </motion.div>

                  {/* Card Content */}
                  <div className="absolute bottom-0 left-0 right-0 z-30 p-6">
                    {/* Status Badge */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15, duration: 0.4 }}
                      className="mb-3"
                    >
                      <span
                        className={cn(
                          "inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wide shadow-lg",
                          statusColors[project.status]
                        )}
                      >
                        {project.status}
                      </span>
                    </motion.div>

                    {/* Title */}
                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                      className="text-xl font-display playfair text-white font-bold mb-1.5"
                    >
                      {project.title}
                    </motion.h3>

                    {/* Location */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25, duration: 0.4 }}
                      className="flex items-center gap-1.5 text-white/70 text-sm mb-3"
                    >
                      <MapPin size={14} className="text-[#D4A24C]" />
                      {project.location}
                    </motion.div>

                    {/* Plot Size & Features - Visible on hover */}
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      whileHover={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.p className="text-[#D4A24C] text-sm font-semibold mb-2">
                        {project.plotSize}
                      </motion.p>
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {project.features.map((feature) => (
                          <span
                            key={feature}
                            className="px-2.5 py-0.5 bg-white/10 backdrop-blur-sm rounded-full text-[11px] font-medium text-white/80 border border-white/10"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                      <motion.div className="flex items-center gap-1 text-[#D4A24C] text-sm font-semibold">
                        <span>View Details</span>
                        <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </motion.div>
                    </motion.div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
