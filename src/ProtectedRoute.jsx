import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "./supabase";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    async function checkUser() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setAuthenticated(!!session);
      setLoading(false);
    }

    checkUser();
  }, []);

  if (loading) {
    return <div>Checking Login...</div>;
  }

  return authenticated
    ? children
    : <Navigate to="/admin/login" replace />;
}
