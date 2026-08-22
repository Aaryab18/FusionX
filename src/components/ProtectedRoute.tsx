import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function checkAdmin() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) {
        setLoading(false);
        return;
      }

      // Check the user's role from profiles
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .single();

      console.log("Admin check:", {
        user: session.user.email,
        role: profile?.role,
        error,
      });

      if (profile?.role === "admin") {
        setIsAdmin(true);
      }

      setLoading(false);
    }

    checkAdmin();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050a14] flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/student-auth" replace />;
  }

  return children;
}