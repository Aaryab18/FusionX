import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Github, ExternalLink, Star } from "lucide-react";
import { supabase } from "../lib/supabase";
import type { Project } from "../lib/supabase";

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .in("status", ["Ongoing", "Completed"])
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false });

    if (!error && data) {
      setProjects(data as Project[]);
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#08111f] text-white">
        Loading projects...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#08111f] text-white pt-28 pb-20">

      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center mb-16">

          <h1 className="text-5xl font-bold">
            FusionX Projects
          </h1>

          <p className="mt-5 text-lg text-gray-400 max-w-3xl mx-auto">
            Explore innovative projects developed by FusionX members.
          </p>

        </div>

        {projects.length === 0 ? (

          <div className="text-center py-24 text-gray-400">
            No projects available.
          </div>

        ) : (

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

            {projects.map((project) => (

              <div
                key={project.id}
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:-translate-y-1 hover:border-cyan-500/40"
              >

                {project.image_url && (

                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="h-56 w-full object-cover"
                  />

                )}

                <div className="p-6">

                  <div className="flex items-center gap-2 mb-3">

                    <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-xs text-cyan-300">
                      {project.category}
                    </span>

                    <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs text-blue-300">
                      {project.status}
                    </span>

                    {project.featured && (

                      <span className="rounded-full bg-yellow-500/20 px-3 py-1 text-xs text-yellow-300 flex items-center gap-1">

                        <Star size={12} />

                        Featured

                      </span>

                    )}

                  </div>

                  <h2 className="text-2xl font-bold">
                    {project.title}
                  </h2>

                  <p className="mt-3 text-gray-400 line-clamp-3">
                    {project.short_description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">

                    {project.tech_stack.map((tech) => (

                      <span
                        key={tech}
                        className="rounded-full bg-white/10 px-3 py-1 text-sm"
                      >
                        {tech}
                      </span>

                    ))}

                  </div>

                  <div className="mt-6 flex gap-3">

                    <Link
                      to={`/projects/${project.slug}`}
                      className="flex-1 rounded-xl border border-cyan-500 py-3 text-center font-semibold text-cyan-400 hover:bg-cyan-500 hover:text-black transition"
                    >
                      View Details
                    </Link>

                    {project.github_url && (

                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-xl bg-white/10 p-3 hover:bg-white/20"
                      >
                        <Github size={20} />
                      </a>

                    )}

                    {project.demo_url && (

                      <a
                        href={project.demo_url}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-xl bg-cyan-500 p-3 text-black hover:bg-cyan-400"
                      >
                        <ExternalLink size={20} />
                      </a>

                    )}

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}