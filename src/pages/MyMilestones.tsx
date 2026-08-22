import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { toast } from "sonner";

interface Milestone {
  id: string;
  title: string;
  description: string | null;
  coins_reward: number;
  status: "pending" | "approved" | "rejected";
  proof_url: string | null;
  created_at: string;
}



export default function Milestones() {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [proofUrl, setProofUrl] = useState("");
const [submitting, setSubmitting] = useState(false);

  async function loadMilestones() {
    try {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        toast.error("Please login first.");
        return;
      }

      const { data, error } = await supabase
        .from("milestones")
        .select(
          "id, title, description, coins_reward, status, proof_url, created_at"
        )
        .eq("student_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Milestone fetch error:", error);
        toast.error("Failed to load milestones.");
        return;
      }

      setMilestones(data || []);
    } finally {
      setLoading(false);
    }
  }
  async function handleSubmitMilestone(e: React.FormEvent) {
  e.preventDefault();

  if (!title.trim()) {
    toast.error("Please enter a milestone title.");
    return;
  }

  if (!description.trim()) {
    toast.error("Please enter a description.");
    return;
  }

  setSubmitting(true);

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      toast.error("Please login first.");
      return;
    }

    const { error } = await supabase
      .from("milestones")
      .insert({
        student_id: user.id,
        title: title.trim(),
        description: description.trim(),
        proof_url: proofUrl.trim() || null,
        status: "pending",
      });

    if (error) {
      console.error("Milestone submission error:", error);
      toast.error(error.message);
      return;
    }

    toast.success("Milestone submitted successfully!");

    setTitle("");
    setDescription("");
    setProofUrl("");
    setShowForm(false);

    await loadMilestones();
  } finally {
    setSubmitting(false);
  }
}

  useEffect(() => {
    loadMilestones();
  }, []);

  return (
    <div className="min-h-screen bg-[#080d16] p-6 text-white md:p-10">
      <div className="mx-auto max-w-5xl">

        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
  <div>
    <h1 className="text-3xl font-bold">
      My Milestones
    </h1>

    <p className="mt-2 text-gray-400">
      Track your achievements and earn Fusion Coins.
    </p>
  </div>

  <button
    onClick={() => setShowForm(!showForm)}
    className="rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 font-semibold text-white transition hover:opacity-90"
  >
    {showForm ? "Cancel" : "+ Submit Milestone"}
  </button>
</div>

{showForm && (
  <div className="mb-8 rounded-2xl border border-white/10 bg-[#101827] p-6">
    <h2 className="text-xl font-semibold text-white">
      Submit a Milestone
    </h2>

    <p className="mt-2 text-sm text-gray-400">
      Submit your achievement for admin review.
    </p>

    <form
      onSubmit={handleSubmitMilestone}
      className="mt-6 space-y-5"
    >
      <div>
        <label className="mb-2 block text-sm text-gray-300">
          Milestone Title
        </label>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Example: Completed a workshop"
          className="w-full rounded-lg border border-white/10 bg-[#0b1220] p-3 text-white outline-none focus:border-cyan-500"
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-gray-300">
          Description
        </label>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe what you achieved..."
          rows={4}
          className="w-full rounded-lg border border-white/10 bg-[#0b1220] p-3 text-white outline-none focus:border-cyan-500"
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-gray-300">
          Proof URL
        </label>

        <input
          type="url"
          value={proofUrl}
          onChange={(e) => setProofUrl(e.target.value)}
          placeholder="https://..."
          className="w-full rounded-lg border border-white/10 bg-[#0b1220] p-3 text-white outline-none focus:border-cyan-500"
        />

        <p className="mt-1 text-xs text-gray-500">
          Add a link to certificates, GitHub, documents, etc.
        </p>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
      >
        {submitting ? "Submitting..." : "Submit for Review"}
      </button>
    </form>
  </div>
)}

        {loading ? (
          <div className="text-gray-400">
            Loading milestones...
          </div>
        ) : milestones.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-[#101827] p-8 text-center">
            <p className="text-gray-400">
              No milestones yet.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {milestones.map((milestone) => (
              <div
                key={milestone.id}
                className="rounded-2xl border border-white/10 bg-[#101827] p-6"
              >
                <div className="flex flex-col justify-between gap-4 md:flex-row">
                  <div>
                    <h2 className="text-xl font-semibold">
                      {milestone.title}
                    </h2>

                    {milestone.description && (
                      <p className="mt-2 text-gray-400">
                        {milestone.description}
                      </p>
                    )}
                  </div>

                  <div className="text-yellow-400 font-semibold">
                    +{milestone.coins_reward} 🪙
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <span
                    className={`rounded-full px-3 py-1 text-sm ${
                      milestone.status === "approved"
                        ? "bg-green-500/10 text-green-400"
                        : milestone.status === "rejected"
                        ? "bg-red-500/10 text-red-400"
                        : "bg-yellow-500/10 text-yellow-400"
                    }`}
                  >
                    {milestone.status}
                  </span>

                  <span className="text-xs text-gray-500">
                    {new Date(milestone.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}