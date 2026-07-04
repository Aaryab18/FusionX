import { useEffect, useState } from "react";
import { Filter, Users, ThumbsUp } from "lucide-react";
import { supabase } from "../lib/supabase";

type Status = "Ongoing" | "Completed";

type Project = {
  id: string;
  name: string;
  year: string;
  idea_title: string;
  description: string;
  skills_required: string;
  votes: number;
  status: Status;
  team: string;
  created_at: string;
};

const statusConfig = {
  Ongoing: {
    bg: "bg-blue-500/10",
    text: "text-blue-400",
    dot: "bg-blue-400",
  },
  Completed: {
    bg: "bg-green-500/10",
    text: "text-green-400",
    dot: "bg-green-400",
  },
};

const filters: ("All" | Status)[] = [
  "All",
  "Ongoing",
  "Completed",
];

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [active, setActive] = useState<"All" | Status>("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    const { data, error } = await supabase
      .from("ideas")
      .select("*")
      .in("status", ["Ongoing", "Completed"])
      .order("votes", { ascending: false });

    if (!error && data) {
      setProjects(data as Project[]);
    }

    setLoading(false);
  }

  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) => p.status === active);

  return (
    <div className="min-h-screen bg-[#050a14] text-white pt-16">

      {/* Header */}

      <section className="relative py-24 overflow-hidden">

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-blue-600/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          <span className="text-cyan-400 text-sm font-semibold uppercase tracking-widest block mb-4">
            FusionX Projects
          </span>

          <h1 className="text-5xl sm:text-6xl font-black mb-6">
            Building
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              {" "}Ideas into Reality
            </span>
          </h1>

          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            These are the projects currently being developed or successfully
            completed by the FusionX community.
          </p>

        </div>

      </section>

      {/* Filters */}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">

        <div className="flex items-center gap-2 flex-wrap">

          <Filter size={16} className="text-gray-500 mr-2" />

          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActive(filter)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                active === filter
                  ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white"
                  : "bg-white/5 text-gray-400 hover:bg-white/10"
              }`}
            >
              {filter}
            </button>
          ))}

        </div>

      </div>

      {/* Projects */}

      <section className="pb-24">

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {loading ? (

            <p className="text-center text-gray-400">
              Loading projects...
            </p>

          ) : filtered.length === 0 ? (

            <p className="text-center text-gray-500">
              No projects available.
            </p>

          ) : (

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">              {filtered.map((project) => {
                const sc = statusConfig[project.status];

                return (
                  <div
                    key={project.id}
                    className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/40 hover:-translate-y-1 transition-all duration-300"
                  >
                    <img
                      src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=600"
                      alt={project.idea_title}
                      className="w-full h-48 object-cover"
                    />

                    <div className="p-6">

                      <div className="flex items-center justify-between mb-4">

                        <span
                          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${sc.bg} ${sc.text}`}
                        >
                          <span
                            className={`w-2 h-2 rounded-full ${sc.dot}`}
                          />
                          {project.status}
                        </span>

                        <div className="flex items-center gap-1 text-gray-400 text-sm">
                          <ThumbsUp size={15} />
                          {project.votes}
                        </div>

                      </div>

                      <h2 className="text-xl font-bold text-white mb-3">
                        {project.idea_title}
                      </h2>

                      <p className="text-gray-400 text-sm leading-relaxed mb-5">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-5">
                        {project.skills_required
                          ?.split(",")
                          .map((skill) => (
                            <span
                              key={skill}
                              className="px-2 py-1 rounded-md bg-blue-500/10 text-blue-300 text-xs border border-blue-500/20"
                            >
                              {skill.trim()}
                            </span>
                          ))}
                      </div>

                      <div className="border-t border-white/10 pt-4 space-y-2 text-sm">

                        <div className="flex justify-between">
                          <span className="text-gray-500">
                            Submitted By
                          </span>

                          <span className="text-white">
                            {project.name}
                          </span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-gray-500">
                            Year
                          </span>

                          <span className="text-white">
                            {project.year}
                          </span>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-gray-500 flex items-center gap-1">
                            <Users size={15} />
                            Team
                          </span>

                          <span className="text-cyan-400 font-medium">
                            {project.team}
                          </span>
                        </div>

                      </div>

                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}