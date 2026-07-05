import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    async function checkUser() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setLoggedIn(!!session);
      setLoading(false);
    }

    checkUser();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050a14] flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  if (!loggedIn) {
    return <Navigate to="/admin" replace />;
  }

  return children;
}