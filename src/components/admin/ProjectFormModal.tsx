import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { supabase } from "../../lib/supabase";

import type { Project } from "../../lib/supabase";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;

  project?: Project | null;
};

export default function ProjectFormModal({
  open,
  onClose,
  onSuccess,
  project,
}: Props) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    tech_stack: "",
    github_url: "",
    demo_url: "",
    image_url: "",
    status: "Planning",
    featured: false,
    team_members: "",
  });

  useEffect(() => {
  if (project) {
    setForm({
      title: project.title,
      description: project.description,
      category: project.category,
      tech_stack: project.tech_stack,
      github_url: project.github_url || "",
      demo_url: project.demo_url || "",
      image_url: project.image_url || "",
      status: project.status,
      featured: project.featured,
      team_members: project.team_members || "",
    });
  } else {
    setForm({
      title: "",
      description: "",
      category: "",
      tech_stack: "",
      github_url: "",
      demo_url: "",
      image_url: "",
      status: "Planning",
      featured: false,
      team_members: "",
    });
  }
}, [project, open]);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value, type } = e.target;

    setForm({
      ...form,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    });
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);

    const query = project
  ? supabase
      .from("projects")
      .update({
        title: form.title,
        description: form.description,
        category: form.category,
        tech_stack: form.tech_stack,
        github_url: form.github_url || null,
        demo_url: form.demo_url || null,
        image_url: form.image_url || null,
        status: form.status,
        featured: form.featured,
        team_members: form.team_members || null,
      })
      .eq("id", project.id)

  : supabase
      .from("projects")
      .insert([
        {
          title: form.title,
          description: form.description,
          category: form.category,
          tech_stack: form.tech_stack,
          github_url: form.github_url || null,
          demo_url: form.demo_url || null,
          image_url: form.image_url || null,
          status: form.status,
          featured: form.featured,
          team_members: form.team_members || null,
        },
      ]);

const { error } = await query;

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert(
  project
    ? "Project updated successfully!"
    : "Project added successfully!"
);

    setForm({
      title: "",
      description: "",
      category: "",
      tech_stack: "",
      github_url: "",
      demo_url: "",
      image_url: "",
      status: "Planning",
      featured: false,
      team_members: "",
    });

    onSuccess();
    onClose();
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">

      <div className="w-full max-w-3xl rounded-2xl bg-[#0b1220] border border-white/10">

        <div className="flex items-center justify-between border-b border-white/10 p-6">

          <h2 className="text-2xl font-bold text-white">
  {project ? "Edit Project" : "Add New Project"}
</h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X size={22} />
          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-5"
        >

          <div className="grid md:grid-cols-2 gap-5">

            <div>
              <label className="block mb-2 text-sm text-gray-300">
                Project Title
              </label>

              <input
                required
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full rounded-lg bg-[#111827] border border-white/10 px-4 py-3 text-white"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm text-gray-300">
                Category
              </label>

              <select
                required
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full rounded-lg bg-[#111827] border border-white/10 px-4 py-3 text-white"
              >
                <option value="">Select Category</option>
                <option>AI/ML</option>
                <option>Web Development</option>
                <option>Mobile App</option>
                <option>IoT</option>
                <option>Cybersecurity</option>
                <option>Cloud Computing</option>
                <option>Blockchain</option>
                <option>Open Source</option>
                <option>Other</option>
              </select>
            </div>
                      </div>

          <div>
            <label className="block mb-2 text-sm text-gray-300">
              Description
            </label>

            <textarea
              required
              rows={4}
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full rounded-lg bg-[#111827] border border-white/10 px-4 py-3 text-white resize-none"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-300">
              Tech Stack
            </label>

            <input
              required
              name="tech_stack"
              value={form.tech_stack}
              onChange={handleChange}
              placeholder="React, Node.js, MongoDB..."
              className="w-full rounded-lg bg-[#111827] border border-white/10 px-4 py-3 text-white"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-5">

            <div>
              <label className="block mb-2 text-sm text-gray-300">
                GitHub URL
              </label>

              <input
                type="url"
                name="github_url"
                value={form.github_url}
                onChange={handleChange}
                placeholder="https://github.com/..."
                className="w-full rounded-lg bg-[#111827] border border-white/10 px-4 py-3 text-white"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm text-gray-300">
                Demo URL
              </label>

              <input
                type="url"
                name="demo_url"
                value={form.demo_url}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full rounded-lg bg-[#111827] border border-white/10 px-4 py-3 text-white"
              />
            </div>

          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-300">
              Image URL
            </label>

            <input
              type="url"
              name="image_url"
              value={form.image_url}
              onChange={handleChange}
              placeholder="https://example.com/project-image.png"
              className="w-full rounded-lg bg-[#111827] border border-white/10 px-4 py-3 text-white"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-5">

            <div>
              <label className="block mb-2 text-sm text-gray-300">
                Status
              </label>

              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full rounded-lg bg-[#111827] border border-white/10 px-4 py-3 text-white"
              >
                <option>Planning</option>
                <option>Ongoing</option>
                <option>Completed</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 text-sm text-gray-300">
                Team Members
              </label>

              <input
                name="team_members"
                value={form.team_members}
                onChange={handleChange}
                placeholder="Aryan, Rahul, Priya"
                className="w-full rounded-lg bg-[#111827] border border-white/10 px-4 py-3 text-white"
              />
            </div>

          </div>

          <div className="flex items-center gap-3">

            <input
              id="featured"
              type="checkbox"
              name="featured"
              checked={form.featured}
              onChange={handleChange}
              className="h-5 w-5"
            />

            <label
              htmlFor="featured"
              className="text-gray-300"
            >
              Featured Project
            </label>

          </div>

          <div className="flex justify-end gap-3 pt-2">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg border border-white/10 text-gray-300 hover:bg-white/5 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white font-semibold transition disabled:opacity-50"
            >
              {loading
  ? "Saving..."
  : project
  ? "Update Project"
  : "Save Project"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}