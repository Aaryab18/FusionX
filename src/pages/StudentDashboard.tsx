import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { toast } from "sonner";

export default function StudentDashboard() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStudent() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        navigate("/student-auth");
        return;
      }

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("name, role")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Profile error:", error);
        toast.error("Unable to load your profile.");
        setLoading(false);
        return;
      }

      if (profile.role !== "student") {
        toast.error("Access denied.");
        navigate("/student-auth");
        return;
      }

      setName(profile.name || "Student");
      setLoading(false);
    }

    loadStudent();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050a14] flex items-center justify-center text-white">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050a14] px-4 py-8 text-white md:px-8">
      <div className="mx-auto max-w-6xl">

        <div className="mb-8">
          <p className="text-sm text-gray-400">
            Student Dashboard
          </p>

          <h1 className="mt-2 text-3xl font-bold md:text-4xl">
            Welcome back,{" "}
            <span className="text-cyan-400">
              {name}
            </span>{" "}
            👋
          </h1>

          <p className="mt-2 text-gray-400">
            Track your milestones, achievements and Fusion Coins.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">

          <div className="rounded-2xl border border-white/10 bg-[#101827] p-6">
            <p className="text-sm text-gray-400">
              Fusion Coins
            </p>

            <h2 className="mt-3 text-4xl font-bold text-yellow-400">
              🪙 0
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Earn coins by completing milestones.
            </p>
          </div>

          <div
            onClick={() => navigate("/milestones")}
            className="cursor-pointer rounded-2xl border border-white/10 bg-[#101827] p-6 transition hover:scale-[1.02] hover:border-cyan-500/40"
          >
            <p className="text-sm text-gray-400">
              My Milestones
            </p>

            <h2 className="mt-3 text-4xl font-bold text-cyan-400">
              →
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              View and submit your milestones.
            </p>
          </div>

          <div className="cursor-pointer rounded-2xl border border-white/10 bg-[#101827] p-6 transition hover:scale-[1.02] hover:border-purple-500/40">
            <p className="text-sm text-gray-400">
              Leaderboard
            </p>

            <h2 className="mt-3 text-4xl font-bold text-purple-400">
              🏆
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              See your FusionX ranking.
            </p>
          </div>

        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-[#101827] p-6">

          <h2 className="text-xl font-semibold">
            Quick Actions
          </h2>

          <div className="mt-5 flex flex-wrap gap-4">

            <button
              onClick={() => navigate("/milestones")}
              className="rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 font-semibold transition hover:opacity-90"
            >
              View My Milestones
            </button>

            <button
              onClick={() => navigate("/profile")}
              className="rounded-lg border border-white/10 px-5 py-3 font-semibold transition hover:border-cyan-500/40"
            >
              My Profile
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}