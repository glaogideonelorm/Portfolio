"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Edit } from "lucide-react";
import { Project } from "@/lib/api";

interface ProjectCardProps {
  project: Project;
  onEdit?: () => void;
}

export default function ProjectCard({ project, onEdit }: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 hover:bg-gray-800/70 transition-all duration-300 border border-gray-700/50 hover:border-gray-600/50 group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
          {project.title}
        </h3>
        {onEdit && (
          <button
            onClick={onEdit}
            className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all duration-300"
            title="Edit Project"
          >
            <Edit size={16} />
          </button>
        )}
      </div>

      {/* Description */}
      <p className="text-gray-300 mb-6 line-clamp-3">{project.description}</p>

      {/* Tech Stack */}
      {project.techStack && project.techStack.length > 0 && (
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {project.techStack.slice(0, 4).map((tech, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="px-2 py-1 bg-gray-500/20 text-gray-300 text-xs rounded-full">
                +{project.techStack.length - 4} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Links */}
      <div className="flex gap-3">
        {project.githubUrl && (
          <motion.a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm"
          >
            <Github size={16} />
            Code
          </motion.a>
        )}
        {project.demoUrl && (
          <motion.a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-colors text-sm"
          >
            <ExternalLink size={16} />
            Demo
          </motion.a>
        )}
      </div>
    </motion.div>
  );
}
