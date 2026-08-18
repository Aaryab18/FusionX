import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { toast } from "sonner";

type ProfileData = {
  id: string;
  name: string;
  usn: string;
  department: string;
  email: string;
  avatar_url: string | null;
  bio: string | null;
  skills: string[] | null;
  created_at: string;
};

export default function Profile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      navigate("/login");
      return;
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) {
      console.error(error);
      toast.error("Unable to load profile.");
      setLoading(false);
      return;
    }

    setProfile(data);
    setLoading(false);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    toast.success("Logged out successfully.");
    navigate("/login");
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#08111f] flex items-center justify-center text-white">
        Loading profile...
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-[#08111f] flex items-center justify-center text-white">
        Profile not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#08111f] text-white px-4 py-28">
      <div className="mx-auto max-w-4xl">

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

          {/* Header */}
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">

            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 text-3xl font-bold text-black">
              {profile.name.charAt(0).toUpperCase()}
            </div>

            <div>
              <h1 className="text-3xl font-bold">
                {profile.name}
              </h1>

              <p className="mt-1 text-cyan-400">
                {profile.usn}
              </p>

              <p className="mt-1 text-gray-400">
                {profile.department}
              </p>
            </div>

          </div>

          {/* Details */}
          <div className="mt-10 grid gap-5 sm:grid-cols-2">

            <div className="rounded-2xl border border-white/10 bg-[#0b1220] p-5">
              <p className="text-sm text-gray-500">
                Email
              </p>

              <p className="mt-2 font-medium">
                {profile.email}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0b1220] p-5">
              <p className="text-sm text-gray-500">
                Department
              </p>

              <p className="mt-2 font-medium">
                {profile.department}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0b1220] p-5">
              <p className="text-sm text-gray-500">
                USN
              </p>

              <p className="mt-2 font-medium">
                {profile.usn}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0b1220] p-5">
              <p className="text-sm text-gray-500">
                Member Since
              </p>

              <p className="mt-2 font-medium">
                {new Date(profile.created_at).toLocaleDateString()}
              </p>
            </div>

          </div>

          {/* Future Stats */}
          <div className="mt-8 grid gap-5 sm:grid-cols-3">

            <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5 text-center">
              <p className="text-3xl font-bold text-cyan-400">
                0
              </p>

              <p className="mt-1 text-sm text-gray-400">
                Fusion Coins
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center">
              <p className="text-3xl font-bold">
                0
              </p>

              <p className="mt-1 text-sm text-gray-400">
                Milestones
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center">
              <p className="text-3xl font-bold">
                0
              </p>

              <p className="mt-1 text-sm text-gray-400">
                Projects
              </p>
            </div>

          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="mt-8 rounded-xl border border-red-500/30 px-6 py-3 text-red-400 transition hover:bg-red-500/10"
          >
            Logout
          </button>

        </div>

      </div>
    </div>
  );
}