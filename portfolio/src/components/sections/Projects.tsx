"use client";

import React, { useState, useEffect } from "react";
import Tilt from "react-parallax-tilt";
import { motion, AnimatePresence } from "framer-motion";
import {
  getProjects,
  createProject,
  deleteProject,
  Project,
} from "../../lib/api";
import { useDevMode } from "@/context/DevModeContext";

const Projects = () => {
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [allTags, setAllTags] = useState<string[]>(["All"]);
  const [activeTag, setActiveTag] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  // form state
  const [titleInput, setTitleInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");

  const { isDev, credentials } = useDevMode();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setAllProjects(data);
        setFilteredProjects(data);
        const tags = [
          "All",
          ...new Set(data.flatMap((p) => p.techStack ?? [])),
        ];
        setAllTags(tags);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleFilter = (tag: string) => {
    setActiveTag(tag);
    if (tag === "All") {
      setFilteredProjects(allProjects);
    } else {
      setFilteredProjects(
        allProjects.filter((p) => (p.techStack ?? p.tags ?? []).includes(tag))
      );
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleInput) return;
    try {
      const newProj = await createProject(
        {
          title: titleInput,
          description: descriptionInput,
        },
        credentials
      );
      setAllProjects((prev) => [...prev, newProj]);
      setFilteredProjects((prev) => [...prev, newProj]);
      setTitleInput("");
      setDescriptionInput("");
    } catch (err) {
      console.error(err);
      alert("Failed to create project");
    }
  };

  const handleDelete = async (id?: number) => {
    if (!id) return;
    if (!window.confirm("Delete this project?")) return;
    try {
      await deleteProject(id, credentials);
      setAllProjects((prev) => prev.filter((p) => p.id !== id));
      setFilteredProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete project");
    }
  };

  return (
    <section
      id="projects"
      className="relative z-20 py-20 bg-gray-100 dark:bg-gray-800"
    >
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 dark:text-white">
          My Projects
        </h2>

        {!isLoading && allProjects.length > 0 && (
          <div className="flex justify-center flex-wrap gap-4 mb-12">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleFilter(tag)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                  activeTag === tag
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-blue-400 hover:text-white"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {isDev && (
          <form
            onSubmit={handleCreate}
            className="max-w-xl mx-auto mb-10 bg-white dark:bg-gray-900 p-6 rounded-lg shadow"
          >
            <h3 className="text-lg font-semibold mb-4 dark:text-white">
              Add Project
            </h3>
            <input
              type="text"
              placeholder="Title"
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
              className="w-full mb-2 p-2 rounded border focus:outline-none"
            />
            <textarea
              placeholder="Description"
              value={descriptionInput}
              onChange={(e) => setDescriptionInput(e.target.value)}
              className="w-full mb-2 p-2 rounded border focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Create
            </button>
          </form>
        )}

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {isLoading ? (
              <p className="text-center col-span-full dark:text-white">
                Loading projects...
              </p>
            ) : filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  <Tilt
                    tiltMaxAngleX={10}
                    tiltMaxAngleY={10}
                    perspective={1000}
                    className="h-full"
                  >
                    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden h-full">
                      {/* Placeholder image if project.image is not available */}
                      <img
                        src={
                          (project.images && project.images[0]) ||
                          "/placeholder.svg"
                        }
                        alt={project.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2 dark:text-white">
                          {project.title}
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {(project.techStack ?? project.tags ?? []).map(
                            (tag, i) => (
                              <span
                                key={i}
                                className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-full text-sm"
                              >
                                {tag}
                              </span>
                            )
                          )}
                        </div>
                        {isDev && (
                          <button
                            onClick={() => handleDelete(project.id)}
                            className="mt-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </div>
                  </Tilt>
                </motion.div>
              ))
            ) : (
              <p className="text-center col-span-full dark:text-white">
                No projects found.
              </p>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
