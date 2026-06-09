"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import AdminSidebar from "@/components/shared/AdminSidebar";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import {
  Plus,
  Edit,
  Trash2,
  X,
  MapPin,
} from "lucide-react";

const initialProjects = [
  {
    id: "1",
    title: "Vaagdevi Heights",
    location: "Madhapur, Hyderabad",
    status: "Ongoing",
    category: "Residential",
    plotSize: "2.5 Acres",
    features: ["Gym", "Pool", "Garden", "Club House"],
    images: ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800"],
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
    images: ["https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800"],
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
    images: ["https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800"],
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
    images: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800"],
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
    images: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800"],
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
    images: ["https://images.unsplash.com/photo-1577415124269-fc1140a69e91?w=800"],
    description: "Upcoming retail and entertainment destination",
  },
];

const statusColors: Record<string, string> = {
  Ongoing: "bg-accent/20 text-accent border-accent/30",
  Completed: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  Upcoming: "bg-blue-500/20 text-blue-300 border-blue-500/30",
};

const statusOptions = ["Ongoing", "Completed", "Upcoming"];
const categoryOptions = ["Residential", "Commercial", "Open Plots"];

const defaultForm = {
  title: "",
  location: "",
  status: "Ongoing",
  category: "Residential",
  plotSize: "",
  description: "",
  features: [""],
  images: [""],
};

export default function AdminProjects() {
  const [projects, setProjects] = useState(initialProjects);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState(defaultForm);
  const { isAuthenticated, loading } = useAdminAuth();
  if (loading) return null;
  if (!isAuthenticated) return null;

  const openAdd = () => {
    setForm(defaultForm);
    setEditingId(null);
    setShowModal(true);
  };

  const openEdit = (id: string) => {
    const p = projects.find((x) => x.id === id);
    if (!p) return;
    setForm({
      title: p.title,
      location: p.location,
      status: p.status,
      category: p.category,
      plotSize: p.plotSize,
      description: p.description,
      features: [...p.features, ""],
      images: [...p.images, ""],
    });
    setEditingId(id);
    setShowModal(true);
  };

  const handleSave = () => {
    const features = form.features.filter((f) => f.trim());
    const images = form.images.filter((i) => i.trim());
    if (!form.title.trim() || !form.location.trim()) return;

    if (editingId) {
      setProjects((prev) =>
        prev.map((p) =>
          p.id === editingId ? { ...p, ...form, features, images } : p
        )
      );
    } else {
      setProjects((prev) => [
        ...prev,
        { ...form, features, images, id: String(Date.now()) },
      ]);
    }
    setShowModal(false);
  };

  const confirmDelete = () => {
    if (deleteId) {
      setProjects((prev) => prev.filter((p) => p.id !== deleteId));
      setDeleteId(null);
    }
  };

  const updateForm = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const updateArrayField = (field: "features" | "images", index: number, value: string) => {
    setForm((prev) => {
      const arr = [...prev[field]];
      arr[index] = value;
      return { ...prev, [field]: arr };
    });
  };

  const addArrayField = (field: "features" | "images") => {
    setForm((prev) => ({ ...prev, [field]: [...prev[field], ""] }));
  };

  const removeArrayField = (field: "features" | "images", index: number) => {
    setForm((prev) => {
      const arr = prev[field].filter((_, i) => i !== index);
      return { ...prev, [field]: arr.length ? arr : [""] };
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0a1a]">
      <AdminSidebar />

      <div className="md:ml-64 min-h-screen">
        {/* Header */}
        <div className="sticky top-0 z-30 bg-secondary/80 backdrop-blur-lg border-b border-accent/10 px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-white font-[family-name:var(--font-display)]">
            Projects
          </h1>
          <button
            onClick={openAdd}
            className="gold-gradient text-white text-sm font-semibold px-4 py-2.5 rounded-lg flex items-center gap-2 shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 transition-all duration-300 cursor-pointer"
          >
            <Plus size={18} />
            Add New Project
          </button>
        </div>

        {/* Projects Table */}
        <div className="p-6">
          <div className="bg-secondary/60 border border-accent/10 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-accent/5">
                    <th className="text-left px-6 py-4 text-white/40 font-medium">Image</th>
                    <th className="text-left px-6 py-4 text-white/40 font-medium">Title</th>
                    <th className="text-left px-6 py-4 text-white/40 font-medium">Location</th>
                    <th className="text-left px-6 py-4 text-white/40 font-medium">Status</th>
                    <th className="text-left px-6 py-4 text-white/40 font-medium">Category</th>
                    <th className="text-left px-6 py-4 text-white/40 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence mode="popLayout">
                    {projects.map((project, i) => (
                      <motion.tr
                        key={project.id}
                        layout
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: i * 0.03, duration: 0.3 }}
                        className="border-b border-accent/5 hover:bg-white/5 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <img
                            src={                    project.images[0]}
                            alt={project.title}
                            className="w-14 h-10 rounded-lg object-cover"
                          />
                        </td>
                        <td className="px-6 py-4 text-white font-medium">{project.title}</td>
                        <td className="px-6 py-4">
                          <span className="flex items-center gap-1.5 text-white/60">
                            <MapPin size={14} className="text-accent" />
                            {project.location}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={cn(
                            "inline-block px-3 py-1 rounded-full text-xs font-semibold border",
                            statusColors[project.status]
                          )}>
                            {project.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-white/50">{project.category}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => openEdit(project.id)}
                              className="p-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors cursor-pointer"
                              title="Edit"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => setDeleteId(project.id)}
                              className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors cursor-pointer"
                              title="Delete"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation */}
      <AnimatePresence>
        {deleteId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-secondary border border-accent/20 rounded-xl p-6 max-w-sm w-full shadow-2xl"
            >
              <h3 className="text-white font-semibold text-lg mb-2">Delete Project</h3>
              <p className="text-white/50 text-sm mb-6">
                Are you sure you want to delete this project? This action cannot be undone.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setDeleteId(null)}
                  className="px-4 py-2 rounded-lg text-white/60 hover:text-white border border-white/10 hover:bg-white/5 transition-all text-sm font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30 transition-all text-sm font-medium cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="bg-secondary border border-accent/20 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white font-[family-name:var(--font-display)]">
                  {editingId ? "Edit Project" : "Add New Project"}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-white/50 hover:text-white transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/70 text-sm font-medium mb-1.5">Title</label>
                    <input
                      value={form.title}
                      onChange={(e) => updateForm("title", e.target.value)}
                      className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all"
                      placeholder="Project title"
                    />
                  </div>
                  <div>
                    <label className="block text-white/70 text-sm font-medium mb-1.5">Location</label>
                    <input
                      value={form.location}
                      onChange={(e) => updateForm("location", e.target.value)}
                      className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all"
                      placeholder="City, State"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/70 text-sm font-medium mb-1.5">Status</label>
                    <select
                      value={form.status}
                      onChange={(e) => updateForm("status", e.target.value)}
                      className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all appearance-none cursor-pointer"
                    >
                      {statusOptions.map((s) => (
                        <option key={s} value={s} className="bg-secondary">{s}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-white/70 text-sm font-medium mb-1.5">Category</label>
                    <select
                      value={form.category}
                      onChange={(e) => updateForm("category", e.target.value)}
                      className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all appearance-none cursor-pointer"
                    >
                      {categoryOptions.map((c) => (
                        <option key={c} value={c} className="bg-secondary">{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-white/70 text-sm font-medium mb-1.5">Plot Size</label>
                  <input
                    value={form.plotSize}
                    onChange={(e) => updateForm("plotSize", e.target.value)}
                    className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all"
                    placeholder="e.g. 2.5 Acres"
                  />
                </div>

                <div>
                  <label className="block text-white/70 text-sm font-medium mb-1.5">Description</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => updateForm("description", e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all resize-none"
                    placeholder="Project description"
                  />
                </div>

                <div>
                  <label className="block text-white/70 text-sm font-medium mb-1.5">Features</label>
                  {form.features.map((f, i) => (
                    <div key={i} className="flex gap-2 mb-2">
                      <input
                        value={f}
                        onChange={(e) => updateArrayField("features", i, e.target.value)}
                        className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all"
                        placeholder="Feature name"
                      />
                      {form.features.length > 1 && (
                        <button
                          onClick={() => removeArrayField("features", i)}
                          className="text-red-400 hover:text-red-300 px-2 cursor-pointer"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={() => addArrayField("features")}
                    className="text-accent text-sm hover:underline cursor-pointer"
                  >
                    + Add Feature
                  </button>
                </div>

                <div>
                  <label className="block text-white/70 text-sm font-medium mb-1.5">Images (URLs)</label>
                  {form.images.map((img, i) => (
                    <div key={i} className="flex gap-2 mb-2">
                      <input
                        value={img}
                        onChange={(e) => updateArrayField("images", i, e.target.value)}
                        className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all"
                        placeholder="Image URL"
                      />
                      {form.images.length > 1 && (
                        <button
                          onClick={() => removeArrayField("images", i)}
                          className="text-red-400 hover:text-red-300 px-2 cursor-pointer"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={() => addArrayField("images")}
                    className="text-accent text-sm hover:underline cursor-pointer"
                  >
                    + Add Image
                  </button>
                </div>
              </div>

              <div className="flex gap-3 justify-end mt-8 pt-4 border-t border-accent/10">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 rounded-lg text-white/60 hover:text-white border border-white/10 hover:bg-white/5 transition-all text-sm font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="gold-gradient text-white text-sm font-semibold px-5 py-2.5 rounded-lg shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 transition-all duration-300 cursor-pointer"
                >
                  {editingId ? "Update" : "Save"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
