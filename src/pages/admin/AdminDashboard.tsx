import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { events } from "../../data/events";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
  ideas: 0,
  projects: 0,
  messages: 0,
  events: 0,
});

const [loading, setLoading] = useState(true);
const [recentIdeas, setRecentIdeas] = useState<any[]>([]);

useEffect(() => {
  loadDashboardStats();
}, []);

async function loadDashboardStats() {
  setLoading(true);

  const [
    ideasResult,
    projectsResult,
    messagesResult,
  ] = await Promise.all([
    supabase.from("ideas").select("*", { count: "exact", head: true }),
    supabase.from("projects").select("*", { count: "exact", head: true }),
    supabase.from("contact_messages").select("*", { count: "exact", head: true }),
  ]);

  setStats({
    ideas: ideasResult.count ?? 0,
    projects: projectsResult.count ?? 0,
    messages: messagesResult.count ?? 0,
    events: events.length,
  });
  const { data } = await supabase
  .from("ideas")
  .select("*")
  .order("created_at", { ascending: false })
  .limit(5);

setRecentIdeas(data ?? []);

  setLoading(false);
}

  return (
  <div className="space-y-8">

    {/* Welcome */}
    <div>
      <h1 className="text-4xl font-bold text-white">
        Dashboard
      </h1>

      <p className="mt-2 text-gray-400">
        Welcome back 👋 Manage FusionX from one place.
      </p>
    </div>

    {/* Stats */}
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

      <div className="rounded-2xl border border-white/10 bg-[#101827] p-6">
        <p className="text-gray-400 text-sm">Ideas</p>
        <h2 className="mt-2 text-4xl font-bold text-cyan-400">{loading ? "..." : stats.ideas}</h2>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#101827] p-6">
        <p className="text-gray-400 text-sm">Projects</p>
        <h2 className="mt-2 text-4xl font-bold text-cyan-400">{loading ? "..." : stats.projects}</h2>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#101827] p-6">
        <p className="text-gray-400 text-sm">Events</p>
        <h2 className="mt-2 text-4xl font-bold text-cyan-400">{loading ? "..." : stats.events}</h2>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#101827] p-6">
        <p className="text-gray-400 text-sm">Messages</p>
        <h2 className="mt-2 text-4xl font-bold text-cyan-400">{loading ? "..." : stats.messages}</h2>
      </div>

    </div>

    {/* Quick Actions */}
    <div className="rounded-2xl border border-white/10 bg-[#101827] p-6">

      <h2 className="text-2xl font-bold">
        Quick Actions
      </h2>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        <button
          onClick={() => navigate("/dashboard/projects")}
          className="rounded-xl bg-cyan-500 py-3 font-semibold text-black hover:bg-cyan-400 transition"
        >
          + Add Project
        </button>

        <button
          onClick={() => navigate("/dashboard/events")}
          className="rounded-xl bg-cyan-500 py-3 font-semibold text-black hover:bg-cyan-400 transition"
        >
          + Add Event
        </button>

        <button
          onClick={() => navigate("/dashboard/ideas")}
          className="rounded-xl border border-cyan-500 text-cyan-400 py-3 hover:bg-cyan-500 hover:text-black transition"
        >
          View Ideas
        </button>

        <button
          onClick={() => navigate("/dashboard/contact")}
          className="rounded-xl border border-cyan-500 text-cyan-400 py-3 hover:bg-cyan-500 hover:text-black transition"
        >
          View Messages
        </button>

      </div>

    </div>

    {/* Recent Activity */}
    <div className="rounded-2xl border border-white/10 bg-[#101827] p-6">

      <h2 className="text-2xl font-bold">
  Recent Ideas
</h2>

<div className="mt-6 space-y-4">
  {recentIdeas.length === 0 ? (
    <p className="text-gray-400">
      No ideas submitted yet.
    </p>
  ) : (
    recentIdeas.map((idea) => (
      <div
        key={idea.id}
        className="rounded-xl border border-white/10 bg-[#0b1220] p-4"
      >
        <h3 className="font-semibold text-white">
          {idea.idea_title}
        </h3>

        <p className="mt-1 text-sm text-gray-400">
          {idea.name}
        </p>
      </div>
    ))
  )}
</div>

    </div>

  </div>
);
}