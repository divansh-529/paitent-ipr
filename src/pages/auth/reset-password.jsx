import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { resetPassword } from "../../services/auth";

export default function ResetPassword() {
  const navigate = useNavigate();
  const { token } = useParams(); // future proof token from URL

  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const [ui, setUi] = useState({
    message: "",
    type: "", // "success" | "error"
    show: false,
  });

  const isValid =
    form.password.trim().length > 0 && form.confirmPassword.trim().length > 0;

  const showMessage = ({ type, message }) => {
    setUi({ type, message, show: true });

    setTimeout(() => {
      setUi((prev) => ({ ...prev, show: false }));
    }, 2600);
  };

  const handleChange = (e) => {
    setUi({ message: "", type: "", show: false });
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      showMessage({ type: "error", message: "Invalid or missing reset token." });
      return;
    }

    if (!isValid) {
      showMessage({ type: "error", message: "Please fill all fields." });
      return;
    }

    if (form.password.length < 6) {
      showMessage({
        type: "error",
        message: "Password must be at least 6 characters.",
      });
      return;
    }

    if (form.password !== form.confirmPassword) {
      showMessage({ type: "error", message: "Passwords do not match." });
      return;
    }

    try {
      setLoading(true);

      const res = await resetPassword({
        token,
        newPassword: form.password,
      });

      if (!res?.success) {
        showMessage({
          type: "error",
          message: res?.message || "Reset failed. Try again.",
        });
        return;
      }

      showMessage({
        type: "success",
        message: "Password reset successful ✅ Redirecting to login...",
      });

      setForm({ password: "", confirmPassword: "" });

      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 1300);
    } catch (err) {
      showMessage({
        type: "error",
        message: err?.message || "Something went wrong. Try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white flex items-center justify-center px-4 py-10"
    >
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 rounded-[28px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.10)] border border-blue-100 bg-white">
        {/* LEFT SIDE (Premium Blue Panel) */}
        <div className="relative hidden lg:flex flex-col justify-center px-12 py-14 bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700">
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-28 -right-28 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-white/90 text-sm font-medium tracking-wide"
            >
              Reset Password
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.05 }}
              className="mt-3 text-4xl font-extrabold text-white leading-tight"
            >
              PatientIPR
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.12 }}
              className="mt-3 text-white/80 text-base leading-relaxed max-w-md"
            >
              Create a new secure password for your account.
            </motion.p>

            <div className="mt-10 space-y-4 max-w-md">
              {["Strong password", "Secure access", "Safe workflow"].map(
                (item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.18 + idx * 0.12, duration: 0.45 }}
                    className="flex items-center gap-4 rounded-2xl bg-white/10 border border-white/15 px-5 py-4 backdrop-blur-md"
                  >
                    <div className="h-11 w-11 rounded-xl bg-white/15 flex items-center justify-center text-white font-bold">
                      ✓
                    </div>
                    <div className="text-white font-semibold">{item}</div>
                  </motion.div>
                )
              )}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-10 text-white/70 text-sm"
            >
              © {new Date().getFullYear()} PatientIPR
            </motion.div>
          </div>
        </div>

        {/* RIGHT SIDE (Form) */}
        <div className="relative px-6 sm:px-10 py-10 sm:py-14">
          <div className="flex items-center justify-between">
            <Link
              to="/login"
              className="text-blue-600 font-semibold hover:text-blue-700 transition"
            >
              ← Back to Login
            </Link>

            <div className="px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-semibold">
              Reset Password
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-4xl font-extrabold text-slate-900">
              Set New Password 🔑
            </h2>
            <p className="mt-2 text-slate-500 text-base">
              Enter your new password and confirm it.
            </p>
          </div>

          {/* Message Box */}
          <div className="mt-6 min-h-[64px]">
            <AnimatePresence mode="wait">
              {ui.show && (
                <motion.div
                  key="msg"
                  initial={{ opacity: 0, y: -10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className={`w-full rounded-2xl border px-4 py-3 text-sm font-medium
                    ${
                      ui.type === "error"
                        ? "border-red-200 bg-red-50 text-red-700"
                        : "border-green-200 bg-green-50 text-green-700"
                    }`}
                >
                  {ui.message}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <form onSubmit={handleSubmit} className="mt-2 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-800">
                New Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter new password"
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-slate-900 placeholder:text-slate-400 outline-none
                focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-800">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm new password"
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-slate-900 placeholder:text-slate-400 outline-none
                focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
              />
            </div>

            <motion.button
              whileHover={loading || !isValid ? {} : { scale: 1.01 }}
              whileTap={loading || !isValid ? {} : { scale: 0.99 }}
              type="submit"
              disabled={loading || !isValid}
              className={`w-full rounded-2xl py-4 font-bold text-white text-lg shadow-lg transition
              ${
                loading || !isValid
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </motion.button>

            <p className="text-center text-slate-500 text-sm">
              Go back to{" "}
              <Link
                to="/login"
                className="text-blue-600 font-bold hover:text-blue-700 transition"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
