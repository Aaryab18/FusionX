import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { toast } from "sonner";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    usn: "",
    department: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
  email: form.email.trim().toLowerCase(),
  password: form.password,
  options: {
    data: {
      name: form.name.trim(),
      usn: form.usn.trim().toUpperCase(),
      department: form.department,
    },
  },
});

      if (error) {
        toast.error(error.message);
        return;
      }

      if (!data.user) {
        toast.error("Registration failed. Please try again.");
        return;
      }

      toast.success(
  "Account created! Please verify your email and then log in."
);

navigate("/login");

      toast.success("Account created successfully!");

      navigate("/profile");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#08111f] flex items-center justify-center px-4 py-16 text-white">
      <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-white/5 p-8">

        <h1 className="text-3xl font-bold text-center text-cyan-400">
          Join FusionX
        </h1>

        <p className="mt-2 text-center text-gray-400">
          Create your FusionX student account
        </p>

        <form onSubmit={handleRegister} className="mt-8 space-y-5">

          <div>
            <label className="mb-2 block text-sm text-gray-400">
              Full Name
            </label>

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Your full name"
              className="w-full rounded-xl border border-white/10 bg-[#0b1220] px-4 py-3 text-white outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-400">
              USN
            </label>

            <input
              name="usn"
              value={form.usn}
              onChange={handleChange}
              required
              placeholder="1NM23CS001"
              className="w-full rounded-xl border border-white/10 bg-[#0b1220] px-4 py-3 text-white uppercase outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-400">
              Department
            </label>

            <select
              name="department"
              value={form.department}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-white/10 bg-[#0b1220] px-4 py-3 text-white outline-none focus:border-cyan-400"
            >
              <option value="">Select department</option>
              <option value="CSE">CSE</option>
              <option value="AIDS">AIDS</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-400">
              College Email
            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="you@college.edu"
              className="w-full rounded-xl border border-white/10 bg-[#0b1220] px-4 py-3 text-white outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-400">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              minLength={6}
              placeholder="Minimum 6 characters"
              className="w-full rounded-xl border border-white/10 bg-[#0b1220] px-4 py-3 text-white outline-none focus:border-cyan-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 py-3 font-bold transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-cyan-400 hover:text-cyan-300"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}