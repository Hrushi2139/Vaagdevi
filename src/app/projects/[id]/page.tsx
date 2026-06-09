"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Building, Download, Phone, Mail, Check, Star, Ruler, Home, Shield, Wifi, TreePine, Dumbbell, Waves, Tent, SquareParking, ChefHat, Monitor, Theater, Baby, Car, Wine, Globe, ShoppingBag } from "lucide-react";
import Navbar from "@/components/shared/Navbar";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import Footer from "@/components/sections/Footer";
import { cn } from "@/lib/utils";

const projects = [
  {
    id: "1",
    title: "Vaagdevi Heights",
    slug: "vaagdevi-heights",
    location: "Madhapur, Hyderabad",
    status: "Ongoing",
    category: "Residential",
    plotSize: "2.5 Acres",
    features: ["Gym", "Swimming Pool", "Landscaped Garden", "Club House", "Security"],
    description: "Vaagdevi Heights redefines luxury living with its premium residential towers. Nestled in the heart of Madhapur, this project offers unparalleled views, world-class amenities, and meticulous craftsmanship. Each residence is designed to provide the perfect blend of comfort and sophistication.",
    images: ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800", "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800"],
    amenities: ["Rooftop Infinity Pool", "State-of-the-art Gym", "Tennis Court", "Children's Play Area", "Jogging Track", "Club House", "24/7 Security", "Power Backup"],
    nearbyLandmarks: [
      { name: "Hitech City", distance: "2 km" },
      { name: "Inorbit Mall", distance: "3 km" },
      { name: "Shilparamam", distance: "1.5 km" },
      { name: "IIIT Hyderabad", distance: "4 km" }
    ],
    coordinates: { lat: 17.4454, lng: 78.3746 },
    brochure: "/brochures/vaagdevi-heights.pdf",
    masterPlan: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800"
  },
  {
    id: "2",
    title: "Gold Crest Towers",
    location: "Gachibowli, Hyderabad",
    status: "Completed",
    category: "Residential",
    plotSize: "3 Acres",
    features: ["Spa", "Tennis Court", "Sky Lounge", "Mini Theatre"],
    description: "Gold Crest Towers stands as a landmark of luxury in Gachibowli. This completed project showcases exceptional architecture, premium finishes, and breathtaking panoramic views of the Hyderabad skyline.",
    images: ["https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800", "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800"],
    amenities: ["Sky Lounge", "Infinity Pool", "Spa & Wellness", "Tennis Court", "Mini Theatre", "Yoga Studio"],
    nearbyLandmarks: [
      { name: "Gachibowli Stadium", distance: "1 km" },
      { name: "DLF Cyber City", distance: "3 km" },
      { name: "Shilpa Kala Vedika", distance: "2 km" }
    ],
    coordinates: { lat: 17.4299, lng: 78.3224 },
    brochure: "/brochures/gold-crest.pdf",
    masterPlan: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800"
  },
  {
    id: "3",
    title: "Vaagdevi Tech Park",
    location: "Hitech City, Hyderabad",
    status: "Ongoing",
    category: "Commercial",
    plotSize: "5 Acres",
    features: ["LEED Certified", "Smart Building", "Convention Center"],
    description: "A-grade commercial spaces designed for global enterprises. Vaagdevi Tech Park offers state-of-the-art infrastructure, smart building technology, and a prime location in Hyderabad's tech hub.",
    images: ["https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800", "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800"],
    amenities: ["LEED Platinum Certification", "Smart Building Systems", "Convention Center", "Food Court", "24/7 Operations"],
    nearbyLandmarks: [
      { name: "Hitex Exhibition Center", distance: "1 km" },
      { name: "Mindspace", distance: "2 km" },
      { name: "Hyderabad Airport", distance: "30 km" }
    ],
    coordinates: { lat: 17.4433, lng: 78.3766 },
    brochure: "/brochures/tech-park.pdf",
    masterPlan: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800"
  },
  {
    id: "4",
    title: "Green Valley Plots",
    location: "Shamshabad, Hyderabad",
    status: "Ongoing",
    category: "Open Plots",
    plotSize: "15 Acres",
    features: ["Park", "Lake View", "Gated Community"],
    description: "Serene open plots surrounded by breathtaking natural beauty. Green Valley offers a unique opportunity to build your dream home in a tranquil, gated community with stunning lake views.",
    images: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800", "https://images.unsplash.com/photo-1600607687645-c9b4c4f7b3e3?w=800"],
    amenities: ["Landscaped Parks", "Lake Front", "Gated Entry", "Underground Power", "Wide Roads"],
    nearbyLandmarks: [
      { name: "Rajiv Gandhi Airport", distance: "5 km" },
      { name: "Shamshabad Railway Station", distance: "3 km" }
    ],
    coordinates: { lat: 17.2543, lng: 78.3912 },
    brochure: "/brochures/green-valley.pdf",
    masterPlan: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800"
  },
  {
    id: "5",
    title: "Royal Residency",
    location: "Banjara Hills, Hyderabad",
    status: "Completed",
    category: "Residential",
    plotSize: "1.8 Acres",
    features: ["Rooftop Pool", "Private Elevator", "Concierge"],
    description: "Exclusive boutique residences in the most prestigious address in Hyderabad. Royal Residency offers unparalleled privacy, luxury, and personalized concierge services.",
    images: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800", "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800"],
    amenities: ["Rooftop Infinity Pool", "Private Elevators", "Concierge Service", "Wine Cellar", "Private Terrace"],
    nearbyLandmarks: [
      { name: "Banjara Hills Road No 10", distance: "0.5 km" },
      { name: "GVK One Mall", distance: "2 km" },
      { name: "Jubilee Hills", distance: "3 km" }
    ],
    coordinates: { lat: 17.4156, lng: 78.4347 },
    brochure: "/brochures/royal-residency.pdf",
    masterPlan: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800"
  },
  {
    id: "6",
    title: "Vaagdevi Galleria",
    location: "Kompally, Hyderabad",
    status: "Upcoming",
    category: "Commercial",
    plotSize: "4 Acres",
    features: ["Retail", "Food Court", "Multiplex"],
    description: "Upcoming retail and entertainment destination in the rapidly growing Kompally area. Vaagdevi Galleria promises a world-class shopping and entertainment experience.",
    images: ["https://images.unsplash.com/photo-1577415124269-fc1140a69e91?w=800", "https://images.unsplash.com/photo-1600607687645-c9b4c4f7b3e3?w=800"],
    amenities: ["Retail Spaces", "Food Court", "Multiplex", "Ample Parking", "Kids Zone"],
    nearbyLandmarks: [
      { name: "Kompally Junction", distance: "1 km" },
      { name: "Kandlakoya", distance: "3 km" }
    ],
    coordinates: { lat: 17.5383, lng: 78.4867 },
    brochure: "/brochures/galleria.pdf",
    masterPlan: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800"
  }
];

const statusColors: Record<string, string> = {
  Ongoing: "bg-gradient-to-r from-[#D4A24C] to-[#e0b86a] text-white",
  Completed: "bg-gradient-to-r from-emerald-500 to-emerald-400 text-white",
  Upcoming: "bg-gradient-to-r from-blue-500 to-blue-400 text-white",
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

function AmenityIcon({ label }: { label: string }) {
  const iconMap: Record<string, React.ReactNode> = {
    "Rooftop Infinity Pool": <Waves size={24} />,
    "Infinity Pool": <Waves size={24} />,
    "State-of-the-art Gym": <Dumbbell size={24} />,
    "Tennis Court": <Tent size={24} />,
    "Children's Play Area": <Baby size={24} />,
    "Jogging Track": <Ruler size={24} />,
    "Club House": <Home size={24} />,
    "24/7 Security": <Shield size={24} />,
    "Power Backup": <Wifi size={24} />,
    "Sky Lounge": <Building size={24} />,
    "Spa & Wellness": <Star size={24} />,
    "Mini Theatre": <Theater size={24} />,
    "Yoga Studio": <Star size={24} />,
    "LEED Platinum Certification": <Globe size={24} />,
    "Smart Building Systems": <Monitor size={24} />,
    "Convention Center": <Building size={24} />,
    "Food Court": <ChefHat size={24} />,
    "24/7 Operations": <Monitor size={24} />,
    "Landscaped Parks": <TreePine size={24} />,
    "Lake Front": <Waves size={24} />,
    "Gated Entry": <Home size={24} />,
    "Underground Power": <Wifi size={24} />,
    "Wide Roads": <Car size={24} />,
    "Private Elevators": <Building size={24} />,
    "Concierge Service": <Star size={24} />,
    "Wine Cellar": <Wine size={24} />,
    "Private Terrace": <Home size={24} />,
    "Retail Spaces": <ShoppingBag size={24} />,
    "Multiplex": <Theater size={24} />,
    "Ample Parking": <SquareParking size={24} />,
    "Kids Zone": <Baby size={24} />,
    "Spa": <Star size={24} />,
    "Pool": <Waves size={24} />,
    "Garden": <TreePine size={24} />,
  };
  return <>{iconMap[label] ?? <Star size={24} />}</>;
}

function AmenityCard({ label }: { label: string }) {
  return (
    <motion.div
      variants={fadeInUp}
      className="flex items-center gap-3 bg-white rounded-xl px-5 py-4 shadow-md border border-[#D4A24C]/10 hover:border-[#D4A24C]/30 hover:shadow-lg transition-all duration-300 group"
    >
      <div className="text-[#D4A24C] group-hover:scale-110 transition-transform duration-300">
        <AmenityIcon label={label} />
      </div>
      <span className="text-sm font-medium text-[#1a1a2e]">{label}</span>
    </motion.div>
  );
}

function FeatureChip({ label }: { label: string }) {
  return (
    <span className="px-4 py-1.5 bg-[#F8F6F0] rounded-full text-xs font-semibold text-[#1a1a2e] border border-[#D4A24C]/20">
      {label}
    </span>
  );
}

export default function ProjectDetail() {
  const params = useParams();
  const project = projects.find((p) => p.id === params.id);

  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F6F0]">
        <div className="text-center">
          <h2 className="text-3xl font-display playfair text-[#1a1a2e] mb-4">Project Not Found</h2>
          <p className="text-gray-500 mb-8">The project you are looking for does not exist.</p>
          <Link href="/" className="gold-gradient text-white font-semibold px-8 py-3 rounded-full inline-block">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const relatedProjects = projects.filter(
    (p) => p.category === project.category && p.id !== project.id
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setForm({ name: "", phone: "", email: "", message: "" });
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-[#F8F6F0]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img
            src={project.images[0]}
            alt={project.title}
            className="h-full w-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 hero-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#081C3A]/80 via-[#081C3A]/30 to-transparent" />

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="absolute top-24 left-4 md:left-8 lg:left-16 z-20"
        >
          <Link
            href="/"
            className="flex items-center gap-2 text-white/80 hover:text-[#D4A24C] transition-colors duration-300 group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
        </motion.div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 z-10 px-4 md:px-8 lg:px-16 pb-16 md:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mx-auto max-w-7xl"
          >
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className={cn("inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wide", statusColors[project.status])}>
                {project.status}
              </span>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-white/10 backdrop-blur-sm text-white border border-white/20">
                {project.category}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-display playfair text-white font-bold mb-3 text-shadow">
              {project.title}
            </h1>
            <div className="flex items-center gap-2 text-white/70">
              <MapPin size={18} className="text-[#D4A24C]" />
              <span className="text-base md:text-lg">{project.location}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16 md:py-20 px-4 md:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-10"
          >
            {/* Description */}
            <motion.div variants={fadeInUp} className="lg:col-span-2">
              <span className="gold-text inline-block text-sm font-semibold tracking-[0.25em] uppercase mb-3">Overview</span>
              <h2 className="text-3xl md:text-4xl font-display playfair text-[#1a1a2e] mb-6">About the Project</h2>
              <p className="text-gray-600 text-lg leading-relaxed">{project.description}</p>

              {/* Features Chips */}
              <div className="flex flex-wrap gap-2 mt-8">
                {project.features.map((feature) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3 }}
                  >
                    <FeatureChip label={feature} />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Quick Info Panel */}
            <motion.div variants={fadeInUp} className="bg-white rounded-2xl p-8 shadow-lg border border-[#D4A24C]/10 h-fit">
              <h3 className="text-lg font-display playfair text-[#1a1a2e] font-bold mb-6">Quick Details</h3>
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#D4A24C]/10 flex items-center justify-center text-[#D4A24C]">
                    <Ruler size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Plot Size</p>
                    <p className="text-sm font-semibold text-[#1a1a2e]">{project.plotSize}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#D4A24C]/10 flex items-center justify-center text-[#D4A24C]">
                    <Building size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Category</p>
                    <p className="text-sm font-semibold text-[#1a1a2e]">{project.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#D4A24C]/10 flex items-center justify-center text-[#D4A24C]">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Location</p>
                    <p className="text-sm font-semibold text-[#1a1a2e]">{project.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#D4A24C]/10 flex items-center justify-center text-[#D4A24C]">
                    <Check size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Status</p>
                    <p className="text-sm font-semibold text-[#1a1a2e]">{project.status}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="py-16 md:py-20 px-4 md:px-8 lg:px-16 bg-white">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <span className="gold-text inline-block text-sm font-semibold tracking-[0.25em] uppercase mb-3">Amenities</span>
            <h2 className="text-3xl md:text-4xl font-display playfair text-[#1a1a2e] mb-4">World-Class Amenities</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Every detail crafted for an elevated lifestyle</p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {project.amenities.map((amenity) => (
              <AmenityCard key={amenity} label={amenity} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Master Plan Section */}
      <section className="py-16 md:py-20 px-4 md:px-8 lg:px-16 bg-[#F8F6F0]">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <span className="gold-text inline-block text-sm font-semibold tracking-[0.25em] uppercase mb-3">Planning</span>
            <h2 className="text-3xl md:text-4xl font-display playfair text-[#1a1a2e] mb-4">Master Plan</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Thoughtfully designed spaces for harmonious living</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#D4A24C]/10 group"
          >
            <img
              src={project.masterPlan}
              alt={`${project.title} Master Plan`}
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
          </motion.div>
        </div>
      </section>

      {/* Location & Nearby Landmarks */}
      <section className="py-16 md:py-20 px-4 md:px-8 lg:px-16 bg-white">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <span className="gold-text inline-block text-sm font-semibold tracking-[0.25em] uppercase mb-3">Location</span>
            <h2 className="text-3xl md:text-4xl font-display playfair text-[#1a1a2e] mb-4">Prime Location</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Strategically situated in the heart of the city</p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="max-w-3xl mx-auto"
          >
            {/* Map Placeholder */}
            <motion.div
              variants={fadeInUp}
              className="rounded-2xl overflow-hidden mb-10 h-64 bg-[#081C3A] relative shadow-lg"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin size={48} className="text-[#D4A24C] mx-auto mb-2" />
                  <p className="text-white/60 text-sm">{project.location}</p>
                  <p className="text-white/40 text-xs mt-1">{project.coordinates.lat}, {project.coordinates.lng}</p>
                </div>
              </div>
            </motion.div>

            {/* Nearby Landmarks */}
            <motion.div variants={fadeInUp}>
              <h3 className="text-xl font-display playfair text-[#1a1a2e] font-bold mb-6 flex items-center gap-2">
                <MapPin size={20} className="text-[#D4A24C]" />
                Nearby Landmarks
              </h3>
              <div className="space-y-3">
                {project.nearbyLandmarks.map((landmark, i) => (
                  <motion.div
                    key={landmark.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    className="flex items-center justify-between py-3 px-5 rounded-xl bg-[#F8F6F0] hover:bg-[#F0EDE5] transition-colors duration-300"
                  >
                    <span className="text-sm font-medium text-[#1a1a2e]">{landmark.name}</span>
                    <span className="text-xs font-semibold text-[#D4A24C] bg-[#D4A24C]/10 px-3 py-1 rounded-full">{landmark.distance}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Brochure Download */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-[#081C3A]">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="gold-text inline-block text-sm font-semibold tracking-[0.25em] uppercase mb-3">Resources</span>
            <h2 className="text-3xl md:text-4xl font-display playfair text-white mb-4">Download Brochure</h2>
            <p className="text-white/50 max-w-xl mx-auto mb-10">
              Get detailed information about {project.title} including floor plans, pricing, and more.
            </p>
            <motion.a
              href={project.brochure}
              download
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="gold-gradient text-white font-semibold px-8 py-4 rounded-full inline-flex items-center gap-3 shadow-lg shadow-[#D4A24C]/30 hover:shadow-xl hover:shadow-[#D4A24C]/40 transition-all duration-300"
            >
              <Download size={20} />
              Download Brochure
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Enquiry Form */}
      <section className="py-16 md:py-20 px-4 md:px-8 lg:px-16 bg-white">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="gold-text inline-block text-sm font-semibold tracking-[0.25em] uppercase mb-3">Enquiry</span>
            <h2 className="text-3xl md:text-4xl font-display playfair text-[#1a1a2e] mb-4">Interested in this project?</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Fill out the form and our team will get back to you shortly</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-[#F8F6F0] rounded-2xl p-8 md:p-10 shadow-lg border border-[#D4A24C]/10"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                  <Check size={32} className="text-emerald-500" />
                </div>
                <h3 className="text-2xl font-display playfair text-[#1a1a2e] mb-2">Thank You!</h3>
                <p className="text-gray-500 mb-6">We have received your enquiry. Our team will contact you soon.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="gold-gradient text-white font-semibold px-6 py-2.5 rounded-full"
                >
                  Submit Another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-[#1a1a2e] mb-1.5">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Your full name"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-[#1a1a2e] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D4A24C]/40 focus:border-[#D4A24C] transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1a1a2e] mb-1.5">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    placeholder="Your phone number"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-[#1a1a2e] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D4A24C]/40 focus:border-[#D4A24C] transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1a1a2e] mb-1.5">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="Your email address"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-[#1a1a2e] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D4A24C]/40 focus:border-[#D4A24C] transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1a1a2e] mb-1.5">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder={`I am interested in ${project.title}...`}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-[#1a1a2e] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D4A24C]/40 focus:border-[#D4A24C] transition-all duration-300 resize-none"
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full gold-gradient text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-[#D4A24C]/30 hover:shadow-xl hover:shadow-[#D4A24C]/40 transition-all duration-300 disabled:opacity-70"
                >
                  {loading ? "Sending..." : "Submit Enquiry"}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-16 md:py-20 px-4 md:px-8 lg:px-16 bg-[#F8F6F0]">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="text-center mb-14"
            >
              <span className="gold-text inline-block text-sm font-semibold tracking-[0.25em] uppercase mb-3">More Projects</span>
              <h2 className="text-3xl md:text-4xl font-display playfair text-[#1a1a2e] mb-4">Related {project.category} Projects</h2>
              <p className="text-gray-500 max-w-xl mx-auto">Explore more of our premium offerings</p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {relatedProjects.slice(0, 3).map((rp) => {
                const rpData = projects.find((p) => p.id === rp.id)!;
                return (
                  <motion.div
                    key={rp.id}
                    variants={fadeInUp}
                    whileHover={{ y: -10 }}
                    className="group relative overflow-hidden rounded-2xl h-[360px] cursor-pointer"
                  >
                    <Link href={`/projects/${rp.id}`} className="block h-full">
                      <motion.div
                        className="absolute inset-0"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                      >
                        <img
                          src={rpData.images[0]}
                          alt={rp.title}
                          className="h-full w-full object-cover"
                        />
                      </motion.div>
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e]/95 via-[#1a1a2e]/40 to-transparent z-10" />
                      <div className="absolute bottom-0 left-0 right-0 z-20 p-6">
                        <span className={cn("inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wide mb-3", statusColors[rp.status])}>
                          {rp.status}
                        </span>
                        <h3 className="text-xl font-display playfair text-white font-bold mb-1.5">{rp.title}</h3>
                        <div className="flex items-center gap-1.5 text-white/70 text-sm">
                          <MapPin size={14} className="text-[#D4A24C]" />
                          {rp.location}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>
      )}

      {/* Book Site Visit CTA */}
      <section className="py-16 md:py-20 px-4 md:px-8 lg:px-16 bg-[#081C3A] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-[#D4A24C] blur-3xl" />
          <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-[#D4A24C] blur-3xl" />
        </div>
        <div className="mx-auto max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="gold-text inline-block text-sm font-semibold tracking-[0.25em] uppercase mb-3">Visit Us</span>
            <h2 className="text-3xl md:text-5xl font-display playfair text-white mb-4">
              Book a Site Visit
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto mb-10 text-lg">
              Experience {project.title} firsthand. Schedule a guided tour and explore the property with our experts.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.a
                href="tel:+919700970097"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="gold-gradient text-white font-semibold px-8 py-4 rounded-full inline-flex items-center gap-3 shadow-lg shadow-[#D4A24C]/30 hover:shadow-xl hover:shadow-[#D4A24C]/40 transition-all duration-300"
              >
                <Phone size={20} />
                Call +91 97009 70097
              </motion.a>
              <motion.a
                href="mailto:info@vaagdeviinfra.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-white font-semibold px-8 py-4 rounded-full inline-flex items-center gap-3 border-2 border-white/20 hover:border-[#D4A24C] hover:text-[#D4A24C] transition-all duration-300"
              >
                <Mail size={20} />
                Email Us
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
