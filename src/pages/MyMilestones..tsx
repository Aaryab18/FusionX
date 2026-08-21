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

  useEffect(() => {
    loadMilestones();
  }, []);

  return (
    <div className="min-h-screen bg-[#080d16] p-6 text-white md:p-10">
      <div className="mx-auto max-w-5xl">

        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            My Milestones
          </h1>

          <p className="mt-2 text-gray-400">
            Track your achievements and earn Fusion Coins.
          </p>
        </div>

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