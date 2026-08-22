import { useEffect, useState } from "react";
import { Check, X } from "lucide-react";
import { supabase } from "../../lib/supabase";
import { toast } from "sonner";

type Milestone = {
  id: string;
  student_id: string;
  title: string;
  description: string | null;
  coins_reward: number;
  status: "pending" | "approved" | "rejected";
  proof_url: string | null;
  created_at: string;
};

export default function Milestones() {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMilestones();
  }, []);

  async function fetchMilestones() {
    setLoading(true);

    const { data, error } = await supabase
      .from("milestones")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      toast.error("Failed to load milestones.");
    } else {
      setMilestones(data ?? []);
    }

    setLoading(false);
  }

  async function approveMilestone(milestone: Milestone) {
    if (milestone.status !== "pending") return;

    const confirmed = window.confirm(
      `Approve "${milestone.title}" and award ${milestone.coins_reward} Fusion Coins?`
    );

    if (!confirmed) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      toast.error("Admin session not found.");
      return;
    }

    // First approve the milestone
    const { error: milestoneError } = await supabase
      .from("milestones")
      .update({
        status: "approved",
        approved_by: user.id,
        approved_at: new Date().toISOString(),
      })
      .eq("id", milestone.id)
      .eq("status", "pending");

    if (milestoneError) {
      toast.error(milestoneError.message);
      return;
    }

    // Award Fusion Coins
    const { error: coinError } = await supabase.rpc(
      "award_fusion_coins",
      {
        p_student_id: milestone.student_id,
        p_coins: milestone.coins_reward,
        p_reason: milestone.title,
        p_milestone_id: milestone.id,
      }
    );

    if (coinError) {
  // Roll back approval if coin award failed
  await supabase
    .from("milestones")
    .update({
      status: "pending",
      approved_by: null,
      approved_at: null,
    })
    .eq("id", milestone.id);

  toast.error("Milestone approved but coins could not be awarded.");
  return;
}

    toast.success(
      `${milestone.coins_reward} Fusion Coins awarded successfully.`
    );

    setMilestones((prev) =>
      prev.map((item) =>
        item.id === milestone.id
          ? {
              ...item,
              status: "approved",
            }
          : item
      )
    );
  }

  async function rejectMilestone(milestone: Milestone) {
    if (milestone.status !== "pending") return;

    const confirmed = window.confirm(
      `Reject "${milestone.title}"?`
    );

    if (!confirmed) return;

    const { error } = await supabase
      .from("milestones")
      .update({
        status: "rejected",
      })
      .eq("id", milestone.id)
      .eq("status", "pending");

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Milestone rejected.");

    setMilestones((prev) =>
      prev.map((item) =>
        item.id === milestone.id
          ? {
              ...item,
              status: "rejected",
            }
          : item
      )
    );
  }

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center text-white">
        Loading milestones...
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold text-white">
          Milestones
        </h1>

        <p className="mt-2 text-gray-400">
          Review student achievements and award Fusion Coins.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0b1220]">

        <table className="w-full">

          <thead className="bg-white/5">
            <tr className="text-left text-gray-300">
              <th className="p-4">Student</th>
              <th>Milestone</th>
              <th>Coins</th>
              <th>Status</th>
              <th>Date</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>

            {milestones.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="py-12 text-center text-gray-400"
                >
                  No milestones submitted yet.
                </td>
              </tr>
            ) : (
              milestones.map((milestone) => (
                <tr
                  key={milestone.id}
                  className="border-t border-white/5"
                >

                  <td className="p-4 text-gray-300">
                    {milestone.student_id.slice(0, 8)}...
                  </td>

                  <td>
                    <p className="font-semibold text-white">
                      {milestone.title}
                    </p>

                    {milestone.description && (
                      <p className="mt-1 max-w-xs text-sm text-gray-500">
                        {milestone.description}
                      </p>
                    )}
                  </td>

                  <td className="font-semibold text-cyan-400">
                    +{milestone.coins_reward}
                  </td>

                  <td>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        milestone.status === "approved"
                          ? "bg-green-500/10 text-green-400"
                          : milestone.status === "rejected"
                          ? "bg-red-500/10 text-red-400"
                          : "bg-yellow-500/10 text-yellow-400"
                      }`}
                    >
                      {milestone.status}
                    </span>
                  </td>

                  <td className="text-sm text-gray-400">
                    {new Date(
                      milestone.created_at
                    ).toLocaleDateString()}
                  </td>

                  <td>
                    {milestone.status === "pending" && (
                      <div className="flex justify-center gap-2">

                        <button
                          onClick={() =>
                            approveMilestone(milestone)
                          }
                          className="rounded-lg bg-green-500/10 p-2 text-green-400 hover:bg-green-500/20"
                          title="Approve"
                        >
                          <Check size={18} />
                        </button>

                        <button
                          onClick={() =>
                            rejectMilestone(milestone)
                          }
                          className="rounded-lg bg-red-500/10 p-2 text-red-400 hover:bg-red-500/20"
                          title="Reject"
                        >
                          <X size={18} />
                        </button>

                      </div>
                    )}
                  </td>

                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}