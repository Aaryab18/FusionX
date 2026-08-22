import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { toast } from "sonner";

export default function StudentAuth() {
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      if (isRegister) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name,
            },
          },
        });

        if (error) {
          toast.error(error.message);
          return;
        }

        if (data.user) {
          toast.success(
            "Account created successfully. Please check your email if confirmation is required."
          );
        }

        setIsRegister(false);
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          toast.error(error.message);
          return;
        }

        toast.success("Login successful!");

        navigate("/student-dashboard");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#050a14] flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#101827] p-8">

        <h1 className="text-center text-3xl font-bold text-cyan-400">
          FusionX
        </h1>

        <p className="mt-2 text-center text-gray-400">
          {isRegister
            ? "Create your student account"
            : "Login to your student account"}
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">

          {isRegister && (
            <div>
              <label className="mb-2 block text-sm text-gray-300">
                Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
                className="w-full rounded-lg border border-white/10 bg-[#0b1220] p-3 text-white outline-none focus:border-cyan-500"
              />
            </div>
          )}

          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student@example.com"
              required
              className="w-full rounded-lg border border-white/10 bg-[#0b1220] p-3 text-white outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 6 characters"
              required
              className="w-full rounded-lg border border-white/10 bg-[#0b1220] p-3 text-white outline-none focus:border-cyan-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
          >
            {loading
              ? "Please wait..."
              : isRegister
              ? "Create Student Account"
              : "Login"}
          </button>

        </form>

        <div className="mt-6 text-center">

          <button
            type="button"
            onClick={() => setIsRegister(!isRegister)}
            className="text-sm text-cyan-400 hover:text-cyan-300"
          >
            {isRegister
              ? "Already have an account? Login"
              : "Don't have an account? Create one"}
          </button>

        </div>

      </div>
    </div>
  );
}