import { X, Github, ExternalLink, Star } from "lucide-react";
import type { Project } from "../../lib/supabase";

type Props = {
  open: boolean;
  project: Project | null;
  onClose: () => void;
};

export default function ProjectViewModal({
  open,
  project,
  onClose,
}: Props) {
  if (!open || !project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-4xl rounded-2xl border border-white/10 bg-[#0b1220] overflow-hidden">

        <div className="flex items-center justify-between border-b border-white/10 p-6">
          <h2 className="text-2xl font-bold text-white">
            Project Details
          </h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X size={22} />
          </button>
        </div>

        <div className="p-6 space-y-6">

          {project.image_url && (
            <img
              src={project.image_url}
              alt={project.title}
              className="h-64 w-full rounded-xl object-cover"
            />
          )}

          <div>

            <div className="flex items-center gap-3">

              <h1 className="text-3xl font-bold text-white">
                {project.title}
              </h1>

              {project.featured && (
                <span className="rounded-full bg-yellow-500/20 px-3 py-1 text-yellow-300 flex items-center gap-1">
                  <Star size={14} />
                  Featured
                </span>
              )}

            </div>

            <p className="mt-3 text-gray-400">
              {project.short_description}
            </p>

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <p className="text-gray-500 mb-1">Category</p>
              <p className="text-white">{project.category}</p>
            </div>

            <div>
              <p className="text-gray-500 mb-1">Status</p>
              <p className="text-white">{project.status}</p>
            </div>

            <div>
              <p className="text-gray-500 mb-1">Tech Stack</p>

              <div className="flex flex-wrap gap-2 mt-2">
                {project.tech_stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-cyan-500/20 px-3 py-1 text-sm text-cyan-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

            </div>

            <div>
              <p className="text-gray-500 mb-1">Team Members</p>

              <p className="text-white">
                {project.team_members || "Not specified"}
              </p>

            </div>

          </div>

          <div>

            <h3 className="text-xl font-semibold text-white mb-3">
              Description
            </h3>

            <p className="leading-7 text-gray-300">
              {project.description}
            </p>

          </div>

          <div className="flex gap-4">

            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-lg bg-white/10 px-5 py-3 hover:bg-white/20 transition"
              >
                <Github size={18} />
                GitHub
              </a>
            )}

            {project.demo_url && (
              <a
                href={project.demo_url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-lg bg-cyan-500 px-5 py-3 text-black hover:bg-cyan-400 transition"
              >
                <ExternalLink size={18} />
                Live Demo
              </a>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}