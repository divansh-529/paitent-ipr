import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function UserDashboard() {
  const navigate = useNavigate();
  const { auth, logout } = useAuth();

  // Backend-proof user
  const user = auth?.user || {};
  const userName = user?.name || "User";
  const userEmail = user?.email || "Not available";

  // Backend-proof services map
  const services = useMemo(
    () => [
      { key: "patent", title: "Patent", desc: "File & track patents", icon: "💡" },
      { key: "trademark", title: "Trademark", desc: "Protect your brand", icon: "🛡️" },
      { key: "copyright", title: "Copyright", desc: "Secure your work", icon: "📄" },
      { key: "design", title: "Design", desc: "Design registration", icon: "✏️" },
    ],
    []
  );

  const stats = useMemo(
    () => [
      { label: "Total Requests", value: 0 },
      { label: "In Review", value: 0 },
      { label: "Approved", value: 0 },
      { label: "Need Action", value: 0 },
    ],
    []
  );

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleViewAll = () => {
    navigate("/user/services");
  };

  return (
    <div className="min-h-screen bg-[#F6F9FF]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[290px_1fr] gap-6">
          {/* SIDEBAR */}
          <motion.aside
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35 }}
            className="bg-white border border-slate-200 rounded-3xl shadow-sm p-5 h-fit sticky top-6"
          >
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-extrabold">
                {userName?.[0]?.toUpperCase() || "U"}
              </div>

              <div className="min-w-0">
                <p className="font-extrabold text-slate-900 truncate">
                  {userName}
                </p>
                <p className="text-xs text-slate-500 truncate">{userEmail}</p>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <button
                onClick={() => navigate("/user/dashboard")}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold bg-blue-600 text-white shadow"
              >
                📊 <span className="text-sm">Dashboard</span>
              </button>

              <button
                onClick={() => navigate("/user/requests")}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold bg-slate-50 text-slate-700 hover:bg-slate-100 transition"
              >
                📌 <span className="text-sm">My Requests</span>
              </button>

              <button
                onClick={() => navigate("/user/estimator")}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold bg-slate-50 text-slate-700 hover:bg-slate-100 transition"
              >
                🧮 <span className="text-sm">Cost Estimator</span>
              </button>

              <button
                onClick={() => navigate("/user/settings")}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold bg-slate-50 text-slate-700 hover:bg-slate-100 transition"
              >
                ⚙️ <span className="text-sm">Settings</span>
              </button>
            </div>

            {/* LOGOUT WORKING */}
            <button
              onClick={handleLogout}
              className="mt-6 w-full px-4 py-3 rounded-2xl border border-slate-200 font-extrabold text-slate-700 hover:bg-slate-50 transition"
            >
              Logout
            </button>
          </motion.aside>

          {/* MAIN */}
          <main className="space-y-6">
            {/* HEADER */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div>
                <p className="text-sm text-slate-500 font-semibold">
                  Good Morning,
                </p>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  {userName} 👋
                </h1>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center bg-white border border-slate-200 rounded-2xl px-4 py-3 shadow-sm">
                  <span className="text-slate-400">🔎</span>
                  <input
                    className="ml-2 outline-none text-sm w-56"
                    placeholder="Search requests..."
                  />
                </div>

                <button className="h-11 w-11 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center hover:shadow-md transition">
                  🔔
                </button>
              </div>
            </motion.div>

            {/* STATS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((s, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm"
                >
                  <p className="text-xs text-slate-500 font-bold">{s.label}</p>
                  <p className="mt-2 text-2xl font-extrabold text-slate-900">
                    {s.value}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="rounded-[28px] overflow-hidden shadow-[0_18px_60px_rgba(37,99,235,0.18)]">
              <div className="relative bg-gradient-to-br from-blue-600 via-blue-600 to-blue-700 px-6 sm:px-10 py-8">
                <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/15 blur-3xl" />
                <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-white/15 blur-3xl" />

                <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div>
                    <h2 className="text-white text-xl sm:text-2xl font-extrabold">
                      Start New Application
                    </h2>
                    <p className="mt-2 text-white/85 text-sm sm:text-base max-w-xl">
                      Submit basic details now and track your request status anytime.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => navigate("/user/new-request")}
                      className="px-6 py-3 rounded-2xl bg-white text-blue-700 font-extrabold shadow hover:opacity-95 transition"
                    >
                      ➕ New Filing
                    </button>
                    <button
                      onClick={() => navigate("/user/estimator")}
                      className="px-6 py-3 rounded-2xl bg-white/15 border border-white/25 text-white font-extrabold hover:bg-white/20 transition"
                    >
                      🧮 Estimator
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* IP SERVICES */}
            <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-extrabold text-slate-900">
                  IP Services
                </h3>

                {/* VIEW ALL WORKING */}
                <button
                  onClick={handleViewAll}
                  className="text-blue-700 font-extrabold text-sm hover:underline"
                >
                  View All
                </button>
              </div>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {services.map((s) => (
                  <motion.button
                    key={s.key}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => navigate(`/user/services/${s.key}`)}
                    className="text-left rounded-3xl border border-slate-200 bg-slate-50 p-5 hover:bg-white hover:shadow-md transition"
                  >
                    <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center text-xl">
                      {s.icon}
                    </div>
                    <h4 className="mt-4 font-extrabold text-slate-900">
                      {s.title}
                    </h4>
                    <p className="mt-1 text-sm text-slate-500">{s.desc}</p>
                  </motion.button>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
