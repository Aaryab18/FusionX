import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { supabase } from "../../lib/supabase";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  idea?: any;
};

export default function IdeaFormModal({
  open,
  onClose,
  onSuccess,
  idea,
}: Props) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    usn: "",
    team: "",
    year: "",
    idea_title: "",
    description: "",
    skills_required: "",
    status: "Pending",
    votes: 0,
  });
  useEffect(() => {
  if (idea) {
    setForm({
  name: idea.name,
  usn: idea.usn,
  team: idea.team,
  year: idea.year ?? "",
  idea_title: idea.idea_title,
  description: idea.description,
  skills_required: idea.skills_required,
  status: idea.status,
  votes: idea.votes,
});
  }
}, [idea]);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setForm({
      ...form,
      [e.target.name]:
        e.target.name === "votes"
          ? Number(e.target.value)
          : e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();

  let error;

  if (idea) {
    ({ error } = await supabase
      .from("ideas")
      .update({
  name: form.name,
  usn: form.usn,
  team: form.team,
  year: form.year,
  idea_title: form.idea_title,
  description: form.description,
  skills_required: form.skills_required,
  status: form.status,
  votes: form.votes,
})
      .eq("id", idea.id));
  } else {
    ({ error } = await supabase
      .from("ideas")
      .insert({
  name: form.name,
  usn: form.usn,
  team: form.team,
  year: form.year,
  idea_title: form.idea_title,
  description: form.description,
  skills_required: form.skills_required,
  status: "Pending",
  votes: 0,
}));
  }

  if (error) {
    alert(error.message);
    return;
  }

  onSuccess();

  setForm({
  name: "",
  usn: "",
  team: "",
  year: "",
  idea_title: "",
  description: "",
  skills_required: "",
  status: "Idea",
  votes: 0,
});

  onClose();
}
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">

      <div className="w-full max-w-2xl rounded-2xl bg-[#0b1220] border border-white/10">

        <div className="flex items-center justify-between border-b border-white/10 p-6">

          <h2 className="text-2xl font-bold text-white">
            {idea ? "Edit Idea" : "Add New Idea"}
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
                Name
              </label>
              

              <input
                required
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full rounded-lg bg-[#111827] border border-white/10 px-4 py-3 text-white"
              />
            </div>

            <div>
  <label className="block mb-2 text-sm text-gray-300">
    USN
  </label>

  <input
    required
    name="usn"
    value={form.usn}
    onChange={handleChange}
    placeholder="1MS22CS001"
    className="w-full rounded-lg bg-[#111827] border border-white/10 px-4 py-3 text-white"
  />
</div>

            <div>
              <label className="block mb-2 text-sm text-gray-300">
                Team
              </label>

              <input
                name="team"
                value={form.team}
                onChange={handleChange}
                className="w-full rounded-lg bg-[#111827] border border-white/10 px-4 py-3 text-white"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm text-gray-300">
                Year
              </label>

              <select
                required
                name="year"
                value={form.year}
                onChange={handleChange}
                className="w-full rounded-lg bg-[#111827] border border-white/10 px-4 py-3 text-white"
              >
                <option value="">Select</option>
                <option>1st Year</option>
                <option>2nd Year</option>
                <option>3rd Year</option>
                <option>4th Year</option>
              </select>
            </div>

                      </div>

          <div>
            <label className="block mb-2 text-sm text-gray-300">
              Idea Title
            </label>

            <input
              required
              name="idea_title"
              value={form.idea_title}
              onChange={handleChange}
              className="w-full rounded-lg bg-[#111827] border border-white/10 px-4 py-3 text-white"
            />
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
              Skills Required
            </label>

            <input
              required
              name="skills_required"
              value={form.skills_required}
              onChange={handleChange}
              placeholder="React, Node.js, Python..."
              className="w-full rounded-lg bg-[#111827] border border-white/10 px-4 py-3 text-white"
            />
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
              {loading ? "Saving..." : "Save Idea"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}