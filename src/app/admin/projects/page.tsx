"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { fetchProjects, createProject, updateProject, deleteProject } from "@/lib/api";
import {
  Plus,
  Edit,
  Trash2,
  X,
  MapPin,
  Loader2,
  Globe,
  Download,
  Map as MapIcon,
  Upload,
} from "lucide-react";

const UPLOAD_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api").replace("/api", "");

async function uploadFiles(files: File[]): Promise<string[]> {
  const token = localStorage.getItem("admin_token");
  const formData = new FormData();
  files.forEach((f) => formData.append("files", f));
  const opts: RequestInit = { method: "POST", body: formData };
  if (token) opts.headers = { Authorization: `Bearer ${token}` };
  const res = await fetch(`${UPLOAD_URL}/api/upload`, opts);
  const ct = res.headers.get("content-type") || "";
  if (!ct.includes("application/json")) {
    const text = await res.text();
    throw new Error(`Backend returned HTML instead of JSON (status ${res.status}). Is the backend server running at ${UPLOAD_URL}?`);
  }
  if (!res.ok) throw new Error(`Upload failed (${res.status})`);
  const json = await res.json();
  if (!json.success) throw new Error(json.error || "Upload failed");
  return json.data;
}

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
  amenities: [""],
  landmarks: [{ name: "", distance: "" }] as { name: string; distance: string }[],
  lat: "",
  lng: "",
  brochure: "",
  masterPlan: "",
};

export default function AdminProjects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState(defaultForm);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchProjects()
      .then((data) => setProjects(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const openAdd = () => {
    setForm(defaultForm);
    setEditingId(null);
    setShowModal(true);
  };

  const openEdit = (p: any) => {
    setForm({
      title: p.title,
      location: p.location,
      status: p.status,
      category: p.category,
      plotSize: p.plotSize || "",
      description: p.description || "",
      features: p.features?.length ? [...p.features, ""] : [""],
      images: p.images?.length ? [...p.images, ""] : [""],
      amenities: p.amenities?.length ? [...p.amenities, ""] : [""],
      landmarks: p.nearbyLandmarks?.length ? [...p.nearbyLandmarks, { name: "", distance: "" }] : [{ name: "", distance: "" }],
      lat: p.coordinates?.lat?.toString() || "",
      lng: p.coordinates?.lng?.toString() || "",
      brochure: p.brochure || "",
      masterPlan: p.masterPlan || "",
    });
    setEditingId(p._id);
    setShowModal(true);
  };

  const handleSave = async () => {
    const features = form.features.filter((f) => f.trim());
    const images = form.images.filter((i) => i.trim());
    const amenities = form.amenities.filter((a) => a.trim());
    const nearbyLandmarks = form.landmarks.filter((l) => l.name.trim() && l.distance.trim());
    const coordinates = form.lat && form.lng ? { lat: parseFloat(form.lat), lng: parseFloat(form.lng) } : undefined;
    if (!form.title.trim() || !form.location.trim()) return;

    setSaving(true);
    try {
      const payload = {
        title: form.title.trim(),
        slug: form.title.trim().toLowerCase().replace(/\s+/g, "-"),
        location: form.location.trim(),
        status: form.status,
        category: form.category,
        plotSize: form.plotSize.trim(),
        description: form.description.trim(),
        features,
        images,
        amenities,
        nearbyLandmarks,
        coordinates,
        brochure: form.brochure.trim() || undefined,
        masterPlan: form.masterPlan.trim() || undefined,
      };

      if (editingId) {
        const updated = await updateProject(editingId, payload);
        setProjects((prev) => prev.map((p) => (p._id === editingId ? updated : p)));
      } else {
        const created = await createProject(payload);
        setProjects((prev) => [created, ...prev]);
      }
      setShowModal(false);
    } catch (err) {
      console.error("Failed to save project", err);
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteProject(deleteId);
      setProjects((prev) => prev.filter((p) => p._id !== deleteId));
    } catch (err) {
      console.error("Failed to delete project", err);
    }
    setDeleteId(null);
  };

  const updateForm = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const updateArrayField = (field: "features" | "images" | "amenities", index: number, value: string) => {
    setForm((prev) => {
      const arr = [...prev[field]];
      arr[index] = value;
      return { ...prev, [field]: arr };
    });
  };

  const addArrayField = (field: "features" | "images" | "amenities") => {
    setForm((prev) => ({ ...prev, [field]: [...prev[field], ""] }));
  };

  const removeArrayField = (field: "features" | "images" | "amenities", index: number) => {
    setForm((prev) => {
      const arr = prev[field].filter((_, i) => i !== index);
      return { ...prev, [field]: arr.length ? arr : [""] };
    });
  };

  const updateLandmarkField = (index: number, key: "name" | "distance", value: string) => {
    setForm((prev) => {
      const arr = [...prev.landmarks];
      arr[index] = { ...arr[index], [key]: value };
      return { ...prev, landmarks: arr };
    });
  };

  const addLandmark = () => {
    setForm((prev) => ({ ...prev, landmarks: [...prev.landmarks, { name: "", distance: "" }] }));
  };

  const removeLandmark = (index: number) => {
    setForm((prev) => {
      const arr = prev.landmarks.filter((_, i) => i !== index);
      return { ...prev, landmarks: arr.length ? arr : [{ name: "", distance: "" }] };
    });
  };

  return (
    <div>
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
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 size={32} className="text-accent animate-spin" />
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-20 text-white/40">
              <p className="text-lg mb-2">No projects found</p>
              <p className="text-sm">Add your first project to get started.</p>
            </div>
          ) : (
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
                          key={project._id}
                          layout
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ delay: i * 0.03, duration: 0.3 }}
                          className="border-b border-accent/5 hover:bg-white/5 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <img
                              src={project.images?.[0] || ""}
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
                                onClick={() => openEdit(project)}
                                className="p-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors cursor-pointer"
                                title="Edit"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={() => setDeleteId(project._id)}
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
          )}
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
                  <label className="block text-white/70 text-sm font-medium mb-1.5">Images</label>
                  <div className="flex flex-wrap gap-3 mb-3">
                    {form.images.map((img, i) => (
                      img ? (
                        <div key={i} className="relative group w-24 h-24 rounded-lg overflow-hidden border border-accent/20">
                          <img src={img} alt="" className="w-full h-full object-cover" />
                          <button
                            onClick={() => removeArrayField("images", i)}
                            className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                          >
                            <X size={20} className="text-red-400" />
                          </button>
                        </div>
                      ) : null
                    ))}
                    <label className="w-24 h-24 rounded-lg border-2 border-dashed border-accent/30 flex items-center justify-center cursor-pointer hover:border-accent/60 transition-colors bg-white/5">
                      {uploading ? (
                        <Loader2 size={20} className="text-accent animate-spin" />
                      ) : (
                        <Upload size={20} className="text-accent/60" />
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        disabled={uploading}
                        onChange={async (e) => {
                          const files = Array.from(e.target.files || []);
                          if (!files.length) return;
                          setUploading(true);
                          try {
                            const urls = await uploadFiles(files);
                            setForm((prev) => ({
                              ...prev,
                              images: [...prev.images.filter(Boolean), ...urls, ""],
                            }));
                          } catch (err) {
                            console.error("Upload failed", err);
                          } finally {
                            setUploading(false);
                            e.target.value = "";
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-white/70 text-sm font-medium mb-1.5">Amenities</label>
                  {form.amenities.map((a, i) => (
                    <div key={i} className="flex gap-2 mb-2">
                      <input
                        value={a}
                        onChange={(e) => updateArrayField("amenities", i, e.target.value)}
                        className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all"
                        placeholder="Amenity name"
                      />
                      {form.amenities.length > 1 && (
                        <button
                          onClick={() => removeArrayField("amenities", i)}
                          className="text-red-400 hover:text-red-300 px-2 cursor-pointer"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={() => addArrayField("amenities")}
                    className="text-accent text-sm hover:underline cursor-pointer"
                  >
                    + Add Amenity
                  </button>
                </div>

                <div>
                  <label className="block text-white/70 text-sm font-medium mb-1.5">Nearby Landmarks</label>
                  {form.landmarks.map((lm, i) => (
                    <div key={i} className="flex gap-2 mb-2 items-start">
                      <input
                        value={lm.name}
                        onChange={(e) => updateLandmarkField(i, "name", e.target.value)}
                        className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all"
                        placeholder="Landmark name"
                      />
                      <input
                        value={lm.distance}
                        onChange={(e) => updateLandmarkField(i, "distance", e.target.value)}
                        className="w-24 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all"
                        placeholder="e.g. 2 km"
                      />
                      {form.landmarks.length > 1 && (
                        <button
                          onClick={() => removeLandmark(i)}
                          className="text-red-400 hover:text-red-300 px-2 pt-2 cursor-pointer"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={addLandmark}
                    className="text-accent text-sm hover:underline cursor-pointer"
                  >
                    + Add Landmark
                  </button>
                </div>

                <div>
                  <label className="block text-white/70 text-sm font-medium mb-1.5">Coordinates</label>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      value={form.lat}
                      onChange={(e) => updateForm("lat", e.target.value)}
                      type="number"
                      step="any"
                      className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all"
                      placeholder="Latitude"
                    />
                    <input
                      value={form.lng}
                      onChange={(e) => updateForm("lng", e.target.value)}
                      type="number"
                      step="any"
                      className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all"
                      placeholder="Longitude"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/70 text-sm font-medium mb-1.5">Brochure</label>
                    <div className="flex gap-2">
                      <input
                        value={form.brochure}
                        onChange={(e) => updateForm("brochure", e.target.value)}
                        className="flex-1 px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all"
                        placeholder="Paste URL or upload"
                      />
                      <label className="flex-shrink-0 px-3 py-2.5 rounded-lg bg-accent/20 text-accent hover:bg-accent/30 transition-colors cursor-pointer flex items-center gap-1.5 text-sm">
                        <Upload size={16} />
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          className="hidden"
                          onChange={async (e) => {
                            const f = e.target.files?.[0];
                            if (!f) return;
                            setUploading(true);
                            try {
                              const urls = await uploadFiles([f]);
                              updateForm("brochure", urls[0]);
                            } finally {
                              setUploading(false);
                              e.target.value = "";
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-white/70 text-sm font-medium mb-1.5">Master Plan</label>
                    <div className="flex gap-2">
                      <input
                        value={form.masterPlan}
                        onChange={(e) => updateForm("masterPlan", e.target.value)}
                        className="flex-1 px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all"
                        placeholder="Paste URL or upload"
                      />
                      <label className="flex-shrink-0 px-3 py-2.5 rounded-lg bg-accent/20 text-accent hover:bg-accent/30 transition-colors cursor-pointer flex items-center gap-1.5 text-sm">
                        <Upload size={16} />
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={async (e) => {
                            const f = e.target.files?.[0];
                            if (!f) return;
                            setUploading(true);
                            try {
                              const urls = await uploadFiles([f]);
                              updateForm("masterPlan", urls[0]);
                            } finally {
                              setUploading(false);
                              e.target.value = "";
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>
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
                  disabled={saving}
                  className="gold-gradient text-white text-sm font-semibold px-5 py-2.5 rounded-lg shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 transition-all duration-300 cursor-pointer disabled:opacity-70"
                >
                  {saving ? "Saving..." : editingId ? "Update" : "Save"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
