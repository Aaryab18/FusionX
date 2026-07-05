import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaLightbulb,
  FaProjectDiagram,
  FaCalendarAlt,
  FaUsers,
  FaEnvelope,
  FaSignOutAlt,
} from "react-icons/fa";
import { supabase } from "../lib/supabase";

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  async function logout() {
    await supabase.auth.signOut();
    navigate("/admin");
  }

  const menu = [
    { name: "Dashboard", path: "/dashboard", icon: <FaHome /> },
    { name: "Ideas", path: "/dashboard/ideas", icon: <FaLightbulb /> },
    { name: "Projects", path: "/dashboard/projects", icon: <FaProjectDiagram /> },
    { name: "Events", path: "/dashboard/events", icon: <FaCalendarAlt /> },
    { name: "Join Requests", path: "/dashboard/join", icon: <FaUsers /> },
    { name: "Contact", path: "/dashboard/contact", icon: <FaEnvelope /> },
  ];

  return (
    <div className="flex min-h-screen bg-[#050a14] text-white">
      <aside className="w-64 bg-[#0b1220] border-r border-white/10 p-6">
        <h1 className="text-2xl font-bold text-cyan-400 mb-8">
          FusionX Admin
        </h1>

        <div className="space-y-2">
          {menu.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                location.pathname === item.path
                  ? "bg-cyan-500 text-black"
                  : "hover:bg-white/10 text-gray-300"
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </div>

        <button
          onClick={logout}
          className="mt-10 w-full flex items-center justify-center gap-2 bg-red-600 py-3 rounded-lg hover:bg-red-700"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}