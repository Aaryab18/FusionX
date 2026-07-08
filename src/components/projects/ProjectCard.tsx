import Badge from "../ui/Badge";
import StatusBadge from "../ui/StatusBadge";
import Button from "../ui/Button";
import { Link } from "react-router-dom";
import {Users} from "lucide-react";
import type { Project } from "../../lib/supabase";

type Props = {
  project: Project;
};

export default function ProjectCard({ project }: Props) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-white/10 bg-[#101827] hover:border-cyan-500/40 hover:-translate-y-2 transition-all duration-300">

      {project.image_url ? (
  <div className="relative">
    <img
      src={project.image_url}
      alt={project.title}
      className="h-52 w-full rounded-xl object-cover"
    />

    {project.featured && (
      <div className="absolute left-3 top-3 rounded-full bg-yellow-400 px-3 py-1 text-xs font-bold text-black">
        ⭐ FEATURED
      </div>
    )}
  </div>
) : (
  <div className="flex h-52 w-full items-center justify-center rounded-xl bg-slate-800 text-gray-400">
    No Image
  </div>
)}

      <div className="p-5">

        <div className="flex items-center justify-between mb-4">
  <Badge>
  {project.category}
</Badge>

  <StatusBadge status={project.status} />
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

        <div className="mt-6">
  <Link to={`/project/${project.slug}`}>
  <Button fullWidth>
    View Details →
  </Button>
</Link>
</div>

      </div>

    </div>
  );
}