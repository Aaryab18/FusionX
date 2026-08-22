import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { toast } from "sonner";

type LeaderboardStudent = {
  id: string;
  name: string;
  coins: number;
};

export default function Leaderboard() {
  const navigate = useNavigate();

  const [students, setStudents] = useState<LeaderboardStudent[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          navigate("/student-auth");
          return;
        }

        setCurrentUserId(user.id);

        // Get all students
        const { data: profiles, error: profileError } = await supabase
          .from("profiles")
          .select("id, name")
          .eq("role", "student");

        if (profileError) {
          console.error("Leaderboard profile error:", profileError);
          toast.error("Unable to load leaderboard.");
          return;
        }

        // Get all coin transactions
        const { data: coinData, error: coinError } = await supabase
          .from("coins")
          .select("student_id, amount");

        if (coinError) {
          console.error("Leaderboard coins error:", coinError);
          toast.error("Unable to load coin data.");
          return;
        }

        // Calculate total coins for each student
        const leaderboard = (profiles || []).map((profile) => {
          const totalCoins = (coinData || [])
            .filter((coin) => coin.student_id === profile.id)
            .reduce(
              (total, coin) => total + (coin.amount || 0),
              0
            );

          return {
            id: profile.id,
            name: profile.name || "Student",
            coins: totalCoins,
          };
        });

        // Highest coins first
        leaderboard.sort((a, b) => b.coins - a.coins);

        setStudents(leaderboard);
      } finally {
        setLoading(false);
      }
    }

    loadLeaderboard();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050a14] flex items-center justify-center text-white">
        Loading leaderboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050a14] px-4 py-8 text-white md:px-8">
      <div className="mx-auto max-w-4xl">

        <div className="mb-8">
          <button
            onClick={() => navigate("/student-dashboard")}
            className="mb-5 text-sm text-cyan-400 hover:text-cyan-300"
          >
            ← Back to Dashboard
          </button>

          <p className="text-sm text-gray-400">
            FusionX Community
          </p>

          <h1 className="mt-2 text-3xl font-bold md:text-4xl">
            🏆 Leaderboard
          </h1>

          <p className="mt-2 text-gray-400">
            See how students rank based on their Fusion Coins.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#101827]">

          <div className="grid grid-cols-12 border-b border-white/10 px-5 py-4 text-sm text-gray-400">
            <div className="col-span-2">
              Rank
            </div>

            <div className="col-span-7">
              Student
            </div>

            <div className="col-span-3 text-right">
              Coins
            </div>
          </div>

          {students.length === 0 ? (
            <div className="p-8 text-center text-gray-400">
              No students found.
            </div>
          ) : (
            students.map((student, index) => {
              const rank = index + 1;
              const isCurrentUser =
                student.id === currentUserId;

              return (
                <div
                  key={student.id}
                  className={`grid grid-cols-12 items-center border-b border-white/5 px-5 py-5 transition ${
                    isCurrentUser
                      ? "bg-cyan-500/10"
                      : "hover:bg-white/5"
                  }`}
                >
                  <div className="col-span-2 font-bold">
                    {rank === 1
                      ? "🥇"
                      : rank === 2
                      ? "🥈"
                      : rank === 3
                      ? "🥉"
                      : `#${rank}`}
                  </div>

                  <div className="col-span-7">
                    <p className="font-semibold">
                      {student.name}
                      {isCurrentUser && (
                        <span className="ml-2 text-xs text-cyan-400">
                          You
                        </span>
                      )}
                    </p>
                  </div>

                  <div className="col-span-3 text-right font-bold text-yellow-400">
                    🪙 {student.coins}
                  </div>
                </div>
              );
            })
          )}

        </div>

      </div>
    </div>
  );
}