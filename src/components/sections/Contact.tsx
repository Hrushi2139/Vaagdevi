"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { fetchProjects } from "@/lib/api";

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Contact() {
  const [projects, setProjects] = useState<string[]>([]);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    project: "",
    message: "",
  });

  useEffect(() => {
    fetchProjects()
      .then((data) => setProjects(data.map((p: any) => p.title)))
      .catch(() => setProjects([]));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:5000/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          interestedProject: form.project,
          message: form.message,
          source: "Website",
        }),
      });
      setForm({ name: "", phone: "", email: "", project: "", message: "" });
    } catch (err) {
      console.error("Failed to submit enquiry", err);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 bg-gradient-to-b from-secondary to-primary text-white">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="gold-text inline-block text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            Contact
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold">
            Let&apos;s Build Your Dream
          </h2>
          <div className="mx-auto mt-4 h-1 w-20 gold-gradient rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left - Info */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="space-y-8"
          >
            <motion.div variants={fadeIn}>
              <h3 className="font-[family-name:var(--font-display)] text-3xl font-bold mb-2">
                Get in Touch
              </h3>
              <p className="text-white/60 leading-relaxed">
                Ready to find your perfect property? Reach out to us and let our
                experts guide you.
              </p>
            </motion.div>

            <motion.div variants={fadeIn} className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent flex-shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="font-medium text-white">Head Office</p>
                  <p className="text-white/60 text-sm">
                    8-7-91/17/1, 3rd Floor, Chippa Venkatesham Complex,
                    <br />
                    Hastinapuram South, Sagar Road,
                    <br />
                    Hyderabad TS - 500079
                    <br />
                    <span className="text-accent/70 text-xs">Landmark: Above Bata Showroom</span>
                  </p>
                </div>
              </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent flex-shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="font-medium text-white">Branch Office</p>
                    <p className="text-white/60 text-sm">
                      D.No. 12-42/B/3, Tilaknagar,
                      <br />
                      Kalwakurthy, Nagarkurnool,
                      <br />
                      Telangana - 509324
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent flex-shrink-0">
                    <Phone size={18} />
                  </div>
                <div>
                  <p className="font-medium text-white">Phone</p>
                  <p className="text-white/60 text-sm">+91 97009 25393</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent flex-shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="font-medium text-white">Email</p>
                  <p className="text-white/60 text-sm">info@vaagdeviinfra.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent flex-shrink-0">
                  <Clock size={18} />
                </div>
                <div>
                  <p className="font-medium text-white">Business Hours</p>
                  <p className="text-white/60 text-sm">
                    Mon - Sat: 9:00 AM - 7:00 PM
                    <br />
                    Sunday: 10:00 AM - 4:00 PM
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={fadeIn}
              className="relative h-px w-full gold-gradient opacity-50"
            />
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-accent transition-colors duration-300"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-accent transition-colors duration-300"
                />
              </div>

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-accent transition-colors duration-300"
              />

              <select
                name="project"
                value={form.project}
                onChange={handleChange}
                required
                className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors duration-300 appearance-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%23ffffff40' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10z'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 1rem center",
                }}
              >
                <option value="" className="text-secondary">
                  Interested Project
                </option>
                {projects.map((p) => (
                  <option key={p} value={p} className="text-secondary">
                    {p}
                  </option>
                ))}
              </select>

              <textarea
                name="message"
                placeholder="Your Message"
                value={form.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-accent transition-colors duration-300 resize-none"
              />

              <button
                type="submit"
                className="w-full gold-gradient text-white font-semibold py-3.5 rounded-lg shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
              >
                Send Enquiry
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
