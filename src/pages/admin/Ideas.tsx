import IdeaFormModal from "../../components/admin/IdeaFormModal";
import IdeaViewModal from "../../components/admin/IdeaViewModal";
import { useEffect, useState } from "react";
import { supabase, Idea } from "../../lib/supabase";
import { Search, Trash2 } from "lucide-react";

export default function Ideas() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null);

  useEffect(() => {
    fetchIdeas();
  }, []);

  async function fetchIdeas() {
    setLoading(true);

    const { data, error } = await supabase
      .from("ideas")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
    }

    if (data) {
      setIdeas(data);
    }

    setLoading(false);
  }

  async function deleteIdea(id: string) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this idea?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("ideas")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    setIdeas((prev) => prev.filter((idea) => idea.id !== id));

    alert("Idea deleted successfully!");
  }

  async function updateStatus(
  id: string,
  status: string
) {
    const { error } = await supabase
      .from("ideas")
      .update({ status })
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    setIdeas((prev) =>
      prev.map((idea) =>
        idea.id === id ? { ...idea, status } : idea
      )
    );
  }

  const filtered = ideas.filter(
    (idea) =>
      idea.idea_title.toLowerCase().includes(search.toLowerCase()) ||
      idea.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

  <div>
    <h1 className="text-3xl font-bold text-white">
      Manage Ideas
    </h1>

    <p className="text-gray-400 mt-2">
      View all submitted ideas from students.
    </p>
  </div>


</div>

      <div className="relative max-w-md">
        <Search
          className="absolute left-3 top-3 text-gray-500"
          size={18}
        />

        <input
          type="text"
          placeholder="Search ideas..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0b1220] border border-white/10 text-white focus:outline-none focus:border-cyan-500"
        />
      </div>

      <div className="overflow-x-auto rounded-xl border border-white/10">

        <table className="w-full">

          <thead className="bg-[#0b1220]">

            <tr>

              <th className="text-left px-5 py-4">Name</th>

              <th className="text-left px-5 py-4">USN</th>

              <th className="text-left px-5 py-4">Idea</th>

              <th className="text-left px-5 py-4">Year</th>

              <th className="text-left px-5 py-4">Votes</th>

              <th className="text-left px-5 py-4">team</th>

              <th className="text-left px-5 py-4">Status</th>

              <th className="text-left px-5 py-4">Actions</th>

            </tr>

          </thead>

          <tbody>
                      {loading ? (
              <tr>
                <td
                  colSpan={7}
                  className="text-center py-8 text-gray-400"
                >
                  Loading ideas...
                </td>
              </tr>
            ) : filtered.length === 0 ? (
     <tr>
  <td
    colSpan={8}
    className="py-16 text-center text-gray-400"
  >
    No ideas found.
  </td>
</tr>
              
            ) : (
              filtered.map((idea) => (
                <tr
                  key={idea.id}
                  className="border-t border-white/10 hover:bg-white/5"
                >
                  <td className="px-5 py-4">
                    {idea.name}
                  </td>

                  <td className="px-5 py-4">
  {idea.usn}
</td>

                  <td className="px-5 py-4 font-medium">
                    {idea.idea_title}
                  </td>

                  <td className="px-5 py-4">
                    {idea.year}
                  </td>

                  <td className="px-5 py-4">
                    {idea.votes}
                  </td>

                  <td className="px-5 py-4">
  {idea.team ?? "Seeking Team"}
</td>


                  <td className="px-5 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        idea.status === "Approved"
  ? "bg-green-500/20 text-green-300"
  : idea.status === "Rejected"
  ? "bg-red-500/20 text-red-300"
  : "bg-yellow-500/20 text-yellow-300"
                      }`}
                    >
                      {idea.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">

                      <button
  onClick={() => {
    setSelectedIdea(idea);
    setViewOpen(true);
  }}
  className="p-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 transition"
  title="View"
>
  👁
</button>

<button
  onClick={() => {
    setSelectedIdea(idea);
    setOpenModal(true);
  }}
  className="p-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 transition"
  title="Edit"
>
  ✏️
</button>

<select
  value={idea.status}
  onChange={(e) => updateStatus(idea.id, e.target.value)}
  className="rounded-lg bg-[#111827] border border-white/10 px-3 py-2 text-sm text-white"
>
  <option value="Pending">Pending</option>
  <option value="Approved">Approved</option>
  <option value="Rejected">Rejected</option>
</select>
                      <button
                        onClick={() =>
                          deleteIdea(idea.id)
                        }
                        className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition"
                        title="Delete"
                      >
                        <Trash2
                          size={18}
                          className="text-red-400"
                        />
                      </button>

                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    <IdeaFormModal
  open={openModal}
  idea={selectedIdea}
  onClose={() => {
    setOpenModal(false);
    setSelectedIdea(null);
  }}
  onSuccess={fetchIdeas}
/>
<IdeaViewModal
  open={viewOpen}
  idea={selectedIdea}
  onClose={() => {
    setViewOpen(false);
    setSelectedIdea(null);
  }}
/>

</div>
);
}