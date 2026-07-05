import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function AdminDashboard() {
  const navigate = useNavigate();

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/admin");
  }

  return (
    <div className="min-h-screen bg-[#050a14] text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-cyan-400">
          FusionX Admin Dashboard
        </h1>

        <p className="mt-4 text-gray-400">
          Welcome Admin 👋
        </p>

        <button
          onClick={handleLogout}
          className="mt-8 px-6 py-3 bg-red-600 rounded-lg hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
}