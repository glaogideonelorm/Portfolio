"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { X, Plus, Save, Trash2 } from "lucide-react";
import {
  Project,
  createProject,
  updateProject,
  deleteProject,
} from "@/lib/api";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project?: Project | null;
  onProjectChange: () => void;
}

export default function ProjectModal({
  isOpen,
  onClose,
  project,
  onProjectChange,
}: ProjectModalProps) {
  const [formData, setFormData] = useState<Omit<Project, "id">>({
    title: "",
    description: "",
    techStack: [],
    githubUrl: "",
    demoUrl: "",
    images: [],
  });

  const [techStackInput, setTechStackInput] = useState("");
  const [imagesInput, setImagesInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isEditing = !!project?.id;

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || "",
        description: project.description || "",
        techStack: project.techStack || [],
        githubUrl: project.githubUrl || "",
        demoUrl: project.demoUrl || "",
        images: project.images || [],
      });
    } else {
      setFormData({
        title: "",
        description: "",
        techStack: [],
        githubUrl: "",
        demoUrl: "",
        images: [],
      });
    }
    setTechStackInput("");
    setImagesInput("");
    setError("");
  }, [project]);

  const handleInputChange = (
    field: keyof Omit<Project, "id">,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const addTechStack = () => {
    if (
      techStackInput.trim() &&
      !formData.techStack.includes(techStackInput.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        techStack: [...prev.techStack, techStackInput.trim()],
      }));
      setTechStackInput("");
    }
  };

  const removeTechStack = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      techStack: prev.techStack.filter((_, i) => i !== index),
    }));
  };

  const addImage = () => {
    if (imagesInput.trim() && !formData.images.includes(imagesInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, imagesInput.trim()],
      }));
      setImagesInput("");
    }
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.title.trim()) {
      setError("Title is required");
      return false;
    }
    if (!formData.description.trim()) {
      setError("Description is required");
      return false;
    }
    if (!formData.githubUrl.trim()) {
      setError("GitHub URL is required");
      return false;
    }
    if (!formData.demoUrl.trim()) {
      setError("Demo URL is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setError("");

    try {
      if (isEditing && project?.id) {
        const updatedProject = await updateProject(project.id, {
          ...formData,
          id: project.id,
        });
        if (updatedProject) {
          onProjectChange();
          onClose();
        } else {
          setError("Failed to update project");
        }
      } else {
        const newProject = await createProject(formData);
        if (newProject) {
          onProjectChange();
          onClose();
        } else {
          setError("Failed to create project");
        }
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!project?.id) return;

    if (!confirm("Are you sure you want to delete this project?")) return;

    setLoading(true);
    setError("");

    try {
      const success = await deleteProject(project.id);
      if (success) {
        onProjectChange();
        onClose();
      } else {
        console.error("Failed to delete project");
        setError("Failed to delete project");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while deleting the project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gray-900 border border-gray-700 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">
                {isEditing ? "Edit Project" : "Add New Project"}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Project Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter project title"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical"
                  placeholder="Describe your project..."
                  required
                />
              </div>

              {/* GitHub URL */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  GitHub URL *
                </label>
                <input
                  type="url"
                  value={formData.githubUrl}
                  onChange={(e) =>
                    handleInputChange("githubUrl", e.target.value)
                  }
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://github.com/username/repo"
                  required
                />
              </div>

              {/* Demo URL */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Demo URL *
                </label>
                <input
                  type="url"
                  value={formData.demoUrl}
                  onChange={(e) => handleInputChange("demoUrl", e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://demo.example.com"
                  required
                />
              </div>

              {/* Tech Stack */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Tech Stack
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={techStackInput}
                    onChange={(e) => setTechStackInput(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addTechStack())
                    }
                    className="flex-1 px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Add technology (e.g., React, Node.js)"
                  />
                  <button
                    type="button"
                    onClick={addTechStack}
                    className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    <Plus size={20} />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.techStack.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-500/20 text-blue-300 text-sm rounded-full flex items-center gap-2"
                    >
                      {tech}
                      <button
                        type="button"
                        onClick={() => removeTechStack(index)}
                        className="text-blue-300 hover:text-red-400"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Images */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Image URLs
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="url"
                    value={imagesInput}
                    onChange={(e) => setImagesInput(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addImage())
                    }
                    className="flex-1 px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Add image URL"
                  />
                  <button
                    type="button"
                    onClick={addImage}
                    className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    <Plus size={20} />
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.images.map((image, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-2 bg-gray-800 rounded-lg"
                    >
                      <span className="flex-1 text-sm text-gray-300 truncate">
                        {image}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="text-gray-400 hover:text-red-400"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white font-semibold rounded-lg transition-colors"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Save size={20} />
                  )}
                  {isEditing ? "Update Project" : "Create Project"}
                </button>

                {isEditing && (
                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={loading}
                    className="px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-red-600/50 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
                  >
                    <Trash2 size={20} />
                    Delete
                  </button>
                )}
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
