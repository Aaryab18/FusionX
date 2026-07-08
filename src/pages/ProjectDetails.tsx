import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../lib/supabase";
import type { Project } from "../lib/supabase";

export default function ProjectDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProject();
  }, [slug]);

  async function fetchProject() {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("slug", slug)
      .single();

    if (!error) {
      setProject(data as Project);
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#08111f] text-white">
        Loading...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#08111f] text-white">
        Project not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#08111f] text-white pt-28 pb-16">
      <div className="mx-auto max-w-6xl px-6">

        <button
          onClick={() => navigate("/projects")}
          className="mb-8 rounded-lg border border-white/10 px-4 py-2 hover:bg-white/5"
        >
          ← Back to Projects
        </button>

        {project.image_url && (
          <img
            src={project.image_url}
            alt={project.title}
            className="h-[420px] w-full rounded-2xl object-cover"
          />
        )}

        <div className="mt-8 flex flex-wrap items-center gap-3">

          <span className="rounded-full bg-cyan-500/20 px-4 py-2 text-cyan-300">
            {project.category}
          </span>

          <span className="rounded-full bg-blue-500/20 px-4 py-2 text-blue-300">
            {project.status}
          </span>

          {project.featured && (
            <span className="rounded-full bg-yellow-400 px-4 py-2 font-semibold text-black">
              ⭐ Featured
            </span>
          )}

        </div>

        <h1 className="mt-6 text-5xl font-bold">
          {project.title}
        </h1>

        <p className="mt-6 text-lg leading-8 text-gray-300">
          {project.description}
        </p>

        <h2 className="mt-12 text-2xl font-bold">
          Tech Stack
        </h2>

        <div className="mt-4 flex flex-wrap gap-3">
          {project.tech_stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-white/10 px-4 py-2"
            >
              {tech}
            </span>
          ))}
        </div>

        <h2 className="mt-12 text-2xl font-bold">
          Team
        </h2>

        <p className="mt-4 text-gray-300">
          {project.team_members || "Not specified"}
        </p>

      </div>
    </div>
  );
}