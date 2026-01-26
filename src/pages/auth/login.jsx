import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext.jsx";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const credentialMap = useMemo(
    () => ({
      user: { password: "user", role: "user" },
      agent: { password: "agent", role: "agent" },
      admin: { password: "admin", role: "admin" },
    }),
    []
  );

  const isFormValid = form.username.trim().length > 0 && form.password.length > 0;
  const handleChange = (e) => {
    setErrorMsg("");
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    if (!isFormValid) return;
    try {
      setLoading(true);
      const username = form.username.trim().toLowerCase();
      const password = form.password;
      const record = credentialMap[username];
      if (!record || record.password !== password) {
        setErrorMsg("Username or password is incorrect");
        setLoading(false);
        return;
      }
      login({
        token: "dummy-token",
        role: record.role,
        username,
      });
      if (record.role === "admin") navigate("/admin/dashboard");
      if (record.role === "agent") navigate("/agent/dashboard");
      if (record.role === "user") navigate("/user/dashboard");
    } catch (err) {
      setErrorMsg("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* LEFT SIDE (Blue Panel) */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden lg:flex rounded-[28px] bg-gradient-to-br from-blue-600 via-blue-600 to-blue-700 text-white p-10 shadow-[0_20px_60px_rgba(37,99,235,0.25)] relative overflow-hidden"
          >
            <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/15 blur-3xl" />
            <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-white/15 blur-3xl" />

            <div className="relative w-full flex flex-col justify-center">
              <h2 className="text-4xl font-extrabold tracking-tight">
                PatientIPR
              </h2>
              <p className="mt-3 text-white/85 text-sm leading-relaxed max-w-md">
                Secure login to access your dashboard and track your requests.
              </p>
              <div className="mt-8 space-y-4 max-w-md">
                {[
                  "Agent Assistance",
                  "Secure & Guided Workflow",
                  "Live Status Tracking",
                ].map((t, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
                    className="rounded-2xl border border-white/15 bg-white/10 px-5 py-4 flex items-center gap-3"
                  >
                    <div className="h-10 w-10 rounded-2xl bg-white/15 flex items-center justify-center font-extrabold">
                      ✓
                    </div>
                    <div className="font-bold">{t}</div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-10 text-white/80 text-sm">
                © {new Date().getFullYear()} PatientIPR
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE (Form) */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-[28px] border border-slate-200 bg-white shadow-sm p-6 sm:p-10"
          >
            {/* Top row */}
            <div className="flex items-center justify-between">
              <Link
                to="/"
                className="text-blue-700 font-extrabold text-sm hover:underline"
              >
                ← Home
              </Link>

              <div className="px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 font-bold text-xs">
                Secure Access
              </div>
            </div>
            <h1 className="mt-6 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Welcome Back 👋
            </h1>
            <p className="mt-2 text-slate-600 text-sm sm:text-base">
              Login using your credentials to access the dashboard.
            </p>
            {/* Error message (no layout shift) */}
            <div className="mt-6 min-h-[64px]">
              <AnimatePresence>
                {errorMsg ? (
                  <motion.div
                    key="login-error"
                    initial={{ opacity: 0, y: -10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.98 }}
                    transition={{ duration: 0.25 }}
                    className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-red-700 font-bold"
                  >
                    {errorMsg}
                  </motion.div>
                ) : (
                  <motion.div
                    key="login-error-empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="opacity-0 select-none"
                  >
                
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <form onSubmit={handleSubmit} className="mt-2 space-y-5">
              {/* Username */}
              <div>
                <label className="block text-sm font-extrabold text-slate-900">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="Enter username"
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-100 transition"
                />
              </div>
              {/* Password */}
              <div>
                <label className="block text-sm font-extrabold text-slate-900">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-100 transition"
                />
              </div>

              <div className="flex items-center justify-end">
                <Link
                  to="/forgot-password"
                  className="text-blue-700 font-extrabold text-sm hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={!isFormValid || loading}
                className={[
                  "w-full rounded-2xl py-4 font-extrabold text-white shadow transition",
                  !isFormValid || loading
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:opacity-95",
                ].join(" ")}
              >
                {loading ? "Logging in..." : "Login"}
              </button>

              <p className="text-center text-slate-600 text-sm">
                New here?{" "}
                <Link
                  to="/signup"
                  className="text-blue-700 font-extrabold hover:underline"
                >
                  Create account
                </Link>
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
