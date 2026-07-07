import { Github, ExternalLink, Users, Star } from "lucide-react";
import type { Project } from "../../lib/supabase";

type Props = {
  project: Project;
};

export default function ProjectCard({ project }: Props) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-white/10 bg-[#101827] hover:border-cyan-500/40 hover:-translate-y-2 transition-all duration-300">

      {project.image_url && (
        <img
          src={project.image_url}
          alt={project.title}
          className="h-52 w-full object-cover"
        />
      )}

      <div className="p-5">

        <div className="flex items-center justify-between mb-3">
          <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-xs text-cyan-300">
            {project.category}
          </span>

          {project.featured && (
            <Star size={18} className="text-yellow-400 fill-yellow-400" />
          )}
        </div>

        <h2 className="text-xl font-bold text-white">
          {project.title}
        </h2>

        <p className="mt-2 text-gray-400">
          {project.short_description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech_stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-white/5 px-3 py-1 text-xs"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-2 text-sm text-gray-400">
          <Users size={16} />
          {project.team_members || "No team specified"}
        </div>

        <div className="mt-5 flex gap-3">

          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-lg bg-gray-700 px-4 py-2 hover:bg-gray-600"
            >
              <Github size={16} />
              GitHub
            </a>
          )}

          {project.demo_url && (
            <a
              href={project.demo_url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 hover:bg-cyan-600"
            >
              <ExternalLink size={16} />
              Demo
            </a>
          )}

        </div>

      </div>

    </div>
  );
}