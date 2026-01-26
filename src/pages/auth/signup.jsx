import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const emailOk = useMemo(() => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());
  }, [form.email]);

  const passwordOk = useMemo(() => form.password.trim().length >= 6, [form.password]);

  const matchOk = useMemo(() => {
    return form.password.trim() === form.confirmPassword.trim();
  }, [form.password, form.confirmPassword]);

  const canSubmit = useMemo(() => {
    return (
      form.fullName.trim().length >= 2 &&
      emailOk &&
      passwordOk &&
      matchOk &&
      !loading
    );
  }, [form.fullName, emailOk, passwordOk, matchOk, loading]);

  const handleChange = (e) => {
    setError("");
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!canSubmit) {
      if (!form.fullName.trim()) return setError("Please enter your full name.");
      if (!emailOk) return setError("Please enter a valid email address.");
      if (!passwordOk) return setError("Password must be at least 6 characters.");
      if (!matchOk) return setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      // ✅ Future-proof backend payload (mapping)
      const payload = {
        fullName: form.fullName.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
      };

      // TODO: Backend integration
      // await authService.signup(payload)

      await new Promise((r) => setTimeout(r, 650));

      navigate("/login");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:flex rounded-[28px] bg-gradient-to-br from-blue-600 via-blue-600 to-blue-700 text-white p-12 shadow-[0_20px_60px_rgba(37,99,235,0.25)] relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.18),transparent_55%),radial-gradient(circle_at_90%_70%,rgba(255,255,255,0.14),transparent_50%)]" />

          <div className="relative w-full flex flex-col justify-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex mx-auto items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 text-sm font-bold"
            >
              <span className="h-2 w-2 rounded-full bg-white" />
              Create your account
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.55 }}
              className="mt-6 text-4xl font-extrabold leading-tight"
            >
              Start tracking your requests from one dashboard
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.26, duration: 0.55 }}
              className="mt-4 text-white/85 leading-relaxed text-lg max-w-lg mx-auto"
            >
              Submit your request, receive assistance, and check status updates
              easily.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.34, duration: 0.55 }}
              className="mt-10 space-y-4 max-w-md mx-auto"
            >
              {[
                "Submit request with basic details",
                "Receive updates in dashboard",
                "Track progress anytime",
              ].map((t, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-center gap-3 rounded-2xl bg-white/10 border border-white/15 px-5 py-4 text-left"
                >
                  <div className="h-9 w-9 rounded-2xl bg-white/15 flex items-center justify-center font-extrabold">
                    ✓
                  </div>
                  <div className="text-white/90 font-semibold">{t}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* RIGHT SIDE FORM */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="rounded-[28px] border border-slate-200 bg-white shadow-sm p-7 sm:p-10"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Sign Up
              </h1>
              <p className="mt-2 text-slate-600 text-sm">
                Create an account to continue.
              </p>

              {/* HOME LINK */}
              <div className="mt-3">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 font-extrabold text-blue-700 hover:underline text-sm"
                >
                  ← Home
                </Link>
              </div>
            </div>

            <motion.div
              whileHover={{ rotate: 2, scale: 1.03 }}
              transition={{ duration: 0.25 }}
              className="h-11 w-11 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-extrabold shadow"
            >
              P
            </motion.div>
          </div>

          <form onSubmit={handleSubmit} className="mt-7 space-y-4">
            {/* Full Name */}
            <div>
              <label className="text-sm font-bold text-slate-700">
                Full Name
              </label>
              <input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                autoComplete="name"
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-800 outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-100 transition"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-bold text-slate-700">Email</label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                type="email"
                autoComplete="email"
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-800 outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-100 transition"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-bold text-slate-700">
                Password
              </label>
              <input
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Create password"
                type="password"
                autoComplete="new-password"
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-800 outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-100 transition"
              />
              <p className="mt-2 text-xs text-slate-500">
                Use at least 6 characters.
              </p>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-sm font-bold text-slate-700">
                Confirm Password
              </label>
              <input
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                type="password"
                autoComplete="new-password"
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-800 outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-100 transition"
              />
            </div>

            {/* Error */}
            <AnimatePresence>
              {error ? (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 font-semibold"
                >
                  {error}
                </motion.div>
              ) : null}
            </AnimatePresence>

            {/* Submit */}
            <motion.button
              whileHover={canSubmit ? { scale: 1.01 } : {}}
              whileTap={canSubmit ? { scale: 0.99 } : {}}
              disabled={!canSubmit}
              className={`w-full rounded-2xl px-5 py-3.5 font-extrabold shadow transition ${
                canSubmit
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-slate-200 text-slate-500 cursor-not-allowed"
              }`}
            >
              {loading ? "Creating account..." : "Create Account"}
            </motion.button>

            <div className="text-center text-sm text-slate-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-extrabold text-blue-700 hover:underline"
              >
                Login
              </Link>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
