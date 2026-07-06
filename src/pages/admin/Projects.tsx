import { useEffect, useMemo, useState } from "react";
import { Trash2 } from "lucide-react";
import { supabase, Project } from "../../lib/supabase";
import ProjectFormModal from "../../components/admin/ProjectFormModal";

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);

  async function fetchProjects() {
    setLoading(true);

    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setProjects(data as Project[]);
    }

    setLoading(false);
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  async function deleteProject(id: string) {
    const ok = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!ok) return;

    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    fetchProjects();
  }

  const filtered = useMemo(() => {
    return projects.filter((project) =>
      `${project.title}
       ${project.category}
       ${project.tech_stack}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [projects, search]);

  return (
    <div className="space-y-6">

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold text-white">
            Manage Projects
          </h1>

          <p className="text-gray-400 mt-2">
            Add and manage FusionX projects.
          </p>
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white font-semibold"
        >
          + Add Project
        </button>

      </div>

      <input
        type="text"
        placeholder="Search projects..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-xl bg-[#111827] border border-white/10 px-4 py-3 text-white"
      />

      <div className="overflow-x-auto rounded-xl border border-white/10">

        <table className="w-full">

          <thead className="bg-[#111827]">

            <tr className="text-left text-gray-300">

              <th className="px-5 py-4">
                Title
              </th>

              <th className="px-5 py-4">
                Category
              </th>

              <th className="px-5 py-4">
                Status
              </th>

              <th className="px-5 py-4">
                Featured
              </th>

              <th className="px-5 py-4">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>
                      {loading ? (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-8 text-gray-400"
                >
                  Loading projects...
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-8 text-gray-400"
                >
                  No projects found.
                </td>
              </tr>
            ) : (
              filtered.map((project) => (
                <tr
                  key={project.id}
                  className="border-t border-white/10 hover:bg-white/5"
                >
                  <td className="px-5 py-4">
                    <div className="font-medium text-white">
                      {project.title}
                    </div>

                    <div className="text-sm text-gray-400 mt-1 line-clamp-2">
                      {project.description}
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    {project.category}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        project.status === "Completed"
                          ? "bg-green-500/20 text-green-400"
                          : project.status === "Ongoing"
                          ? "bg-blue-500/20 text-blue-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {project.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    {project.featured ? (
                      <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-sm">
                        ⭐ Featured
                      </span>
                    ) : (
                      <span className="text-gray-500">
                        —
                      </span>
                    )}
                  </td>

                  <td className="px-5 py-4">
                    <button
                      onClick={() => deleteProject(project.id)}
                      className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition"
                      title="Delete Project"
                    >
                      <Trash2
                        size={18}
                        className="text-red-400"
                      />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>

        </table>

      </div>

      <ProjectFormModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={fetchProjects}
      />

    </div>
  );
}