import { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaLightbulb,
  FaProjectDiagram,
  FaCalendarAlt,
  FaUsers,
  FaEnvelope,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { supabase } from "../lib/supabase";

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  async function logout() {
    await supabase.auth.signOut();
    navigate("/admin");
  }

  const menu = [
    { name: "Dashboard", path: "/dashboard", icon: <FaHome /> },
    { name: "Ideas", path: "/dashboard/ideas", icon: <FaLightbulb /> },
    { name: "Projects", path: "/dashboard/projects", icon: <FaProjectDiagram /> },
    { name: "Events", path: "/dashboard/events", icon: <FaCalendarAlt /> },
    { name: "Contact", path: "/dashboard/contact", icon: <FaEnvelope /> },
  ];

  return (
    <div className="flex min-h-screen bg-[#050a14] text-white">

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static top-0 left-0 z-50
          h-screen w-64
          bg-[#0b1220]
          border-r border-white/10
          p-6
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Mobile Close */}
        <div className="flex items-center justify-between mb-8 lg:block">
          <h1 className="text-2xl font-bold text-cyan-400">
            FusionX Admin
          </h1>

          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <FaTimes size={22} />
          </button>
        </div>

        <div className="space-y-2">
          {menu.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
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

      {/* Main */}
      <main className="flex-1 overflow-y-auto">

        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 z-30 flex items-center justify-between bg-[#0b1220] border-b border-white/10 p-4">
          <button onClick={() => setSidebarOpen(true)}>
            <FaBars size={22} />
          </button>

          <h2 className="font-bold text-cyan-400">
            FusionX Admin
          </h2>

          <div className="w-5" />
        </header>

        <div className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>

    </div>
  );
}