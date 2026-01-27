import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";

/* ================== DATA MAPS (BACKEND READY) ================== */

const services = [
  { id: 1, title: "Patent", desc: "File & track patent requests", icon: "💡" },
  { id: 2, title: "Trademark", desc: "Protect your brand identity", icon: "🛡️" },
  { id: 3, title: "Copyright", desc: "Secure creative work", icon: "📄" },
  { id: 4, title: "Design", desc: "Register your design", icon: "✏️" },
];

const recentApplications = []; // empty = no activity

const portfolio = []; // future backend

/* ================== MAIN COMPONENT ================== */

export default function UserDashboard() {
  const { auth, logout } = useAuth();
  const user = auth?.user || { name: "User", email: "Not available" };

  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EEF3FF] to-[#F9FBFF] p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">

        {/* ================= SIDEBAR ================= */}
        <aside className="bg-gradient-to-b from-blue-600 to-blue-700 text-white rounded-3xl p-5 shadow-xl sticky top-6 h-fit">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-12 w-12 rounded-2xl bg-white text-blue-700 font-extrabold flex items-center justify-center">
              {user.name[0]}
            </div>
            <div>
              <p className="font-bold">{user.name}</p>
              <p className="text-xs text-white/70">{user.email}</p>
            </div>
          </div>

          <SidebarButton label="Dashboard" active={activeTab} tab="dashboard" setTab={setActiveTab} />
          <SidebarButton label="My Requests" active={activeTab} tab="requests" setTab={setActiveTab} />
          <SidebarButton label="My Portfolio" active={activeTab} tab="portfolio" setTab={setActiveTab} />
          <SidebarButton label="Cost Estimator" active={activeTab} tab="estimator" setTab={setActiveTab} />
          <SidebarButton label="Settings" active={activeTab} tab="settings" setTab={setActiveTab} />

          <button
            onClick={logout}
            className="mt-8 w-full bg-white text-blue-700 font-extrabold py-3 rounded-2xl hover:scale-[1.02] transition"
          >
            Logout
          </button>
        </aside>

        {/* ================= CONTENT ================= */}
        <main className="bg-white rounded-3xl p-8 shadow-xl relative overflow-hidden">

          <AnimatePresence mode="wait">
            {activeTab === "dashboard" && <DashboardTab key="dashboard" user={user} />}
            {activeTab === "requests" && <RequestsTab key="requests" />}
            {activeTab === "portfolio" && <PortfolioTab key="portfolio" />}
            {activeTab === "estimator" && <EstimatorTab key="estimator" />}
            {activeTab === "settings" && <SettingsTab key="settings" />}
          </AnimatePresence>

        </main>
      </div>
    </div>
  );
}

/* ================= SIDEBAR BUTTON ================= */

function SidebarButton({ label, tab, active, setTab }) {
  return (
    <button
      onClick={() => setTab(tab)}
      className={`w-full mb-2 px-4 py-3 rounded-2xl text-left font-bold transition
        ${active === tab ? "bg-white text-blue-700 shadow" : "hover:bg-white/10"}`}
    >
      {label}
    </button>
  );
}

/* ================= TABS ================= */

function DashboardTab({ user }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.35 }}
    >
      <h1 className="text-3xl font-extrabold text-slate-900">
        Welcome back, {user.name} 👋
      </h1>
      <p className="text-slate-500 mt-2">
        Manage and track all your intellectual property requests from one place.
      </p>

      {/* SERVICES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mt-8">
        {services.map((s) => (
          <motion.div
            key={s.id}
            whileHover={{ y: -6 }}
            className="rounded-3xl p-6 bg-gradient-to-br from-blue-50 to-white border shadow-sm"
          >
            <div className="text-2xl">{s.icon}</div>
            <h3 className="mt-4 font-extrabold">{s.title}</h3>
            <p className="text-sm text-slate-500">{s.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* RECENT APPLICATIONS */}
      <div className="mt-10">
        <h2 className="text-xl font-extrabold mb-4">Recent Applications</h2>

        {recentApplications.length === 0 ? (
          <div className="rounded-2xl bg-slate-50 border p-6 text-slate-500">
            No recent activity yet.
          </div>
        ) : (
          recentApplications.map((a) => (
            <div key={a.id}>{a.title}</div>
          ))
        )}
      </div>
    </motion.div>
  );
}

function RequestsTab() {
  return <TabWrapper title="My Requests" text="All your submitted requests will appear here." />;
}

function PortfolioTab() {
  return <TabWrapper title="My Portfolio" text="Your approved and completed IP assets will be shown here." />;
}

function EstimatorTab() {
  return <TabWrapper title="Cost Estimator" text="Estimate filing costs before submitting your request." />;
}

function SettingsTab() {
  return <TabWrapper title="Settings" text="Manage your profile and preferences." />;
}

/* ================= COMMON TAB UI ================= */

function TabWrapper({ title, text }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className="text-2xl font-extrabold">{title}</h1>
      <p className="text-slate-500 mt-3">{text}</p>
    </motion.div>
  );
}
