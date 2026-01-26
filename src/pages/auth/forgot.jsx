import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const emailOk = useMemo(() => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  }, [email]);

  const canSubmit = useMemo(() => {
    return emailOk && !loading;
  }, [emailOk, loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!emailOk) return setError("Please enter a valid email address.");

    try {
      setLoading(true);

      // ✅ Future-proof backend payload
      const payload = { email: email.trim().toLowerCase() };

      // TODO: Backend integration
      // await authService.forgotPassword(payload)

      // Dummy check (for now)
      await new Promise((r) => setTimeout(r, 700));

      setSuccess("Reset link sent successfully. Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 1400);
    } catch (err) {
      setError("Email not found. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-[28px] border border-slate-200 bg-white shadow-sm p-7 sm:p-10"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Forgot Password
              </h1>
              <p className="mt-2 text-slate-600 text-sm">
                Enter your email and we will send you a reset link.
              </p>

              <div className="mt-3 flex gap-4 text-sm">
                <Link
                  to="/"
                  className="font-extrabold text-blue-700 hover:underline"
                >
                  ← Home
                </Link>
                <Link
                  to="/login"
                  className="font-extrabold text-blue-700 hover:underline"
                >
                  Back to Login
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
            <div>
              <label className="text-sm font-bold text-slate-700">Email</label>
              <input
                value={email}
                onChange={(e) => {
                  setError("");
                  setSuccess("");
                  setEmail(e.target.value);
                }}
                placeholder="Enter your email"
                type="email"
                autoComplete="email"
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-800 outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-100 transition"
              />
            </div>

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

            <AnimatePresence>
              {success ? (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700 font-semibold"
                >
                  {success}
                </motion.div>
              ) : null}
            </AnimatePresence>

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
              {loading ? "Sending link..." : "Send Reset Link"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
