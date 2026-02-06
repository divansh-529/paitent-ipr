import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";

/* ===================== DATA ===================== */

const SERVICES = [
  { key: "patent", title: "Patent", desc: "Protect inventions & processes", icon: "💡", base: 6600 },
  { key: "trademark", title: "Trademark", desc: "Brand, logo & slogan", icon: "🛡️", base: 4500 },
  { key: "copyright", title: "Copyright", desc: "Creative work protection", icon: "📄", base: 500 },
  { key: "design", title: "Design", desc: "Product & industrial design", icon: "✏️", base: 5000 },
];

/* ===================== MAIN ===================== */

export default function UserDashboard() {
  const { auth, logout } = useAuth();
  const user = auth?.user || { name: "User", email: "user@email.com" };

  const [tab, setTab] = useState("dashboard");
  const [step, setStep] = useState(1);
  const [service, setService] = useState(null);
  const [files, setFiles] = useState([]);

  /* -------- File handlers -------- */
  const addFiles = (newFiles) => {
    setFiles((prev) => [...prev, ...newFiles]);
  };

  return (
    <div className="min-h-screen bg-[#F4F7FF] flex flex-col lg:flex-row">

      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside className="hidden lg:flex w-[280px] bg-gradient-to-b from-blue-600 to-indigo-700 text-white p-6 flex-col">
        <div className="flex items-center gap-3 mb-10">
          <div className="h-12 w-12 rounded-2xl bg-white text-blue-700 flex items-center justify-center font-extrabold">
            {user.name[0]}
          </div>
          <div>
            <p className="font-bold">{user.name}</p>
            <p className="text-xs text-white/70">{user.email}</p>
          </div>
        </div>

        {["dashboard", "portfolio", "estimator", "settings"].map((t) => (
          <SidebarBtn key={t} tab={t} active={tab} setTab={setTab} />
        ))}

        <button
          onClick={logout}
          className="mt-auto bg-white text-blue-700 py-3 rounded-xl font-extrabold"
        >
          Logout
        </button>
      </aside>

      {/* ================= CONTENT ================= */}
      <main className="flex-1 p-4 sm:p-6 lg:p-10 pb-24 lg:pb-10">

        <AnimatePresence mode="wait">

          {/* DASHBOARD */}
          {tab === "dashboard" && (
            <motion.div
              key="dash"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h1 className="text-3xl font-extrabold">
                Welcome back, {user.name} 👋
              </h1>
              <p className="text-slate-500 mt-2">
                Track and manage your IP filings
              </p>

              {/* CTA */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="mt-8 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white flex flex-col sm:flex-row justify-between gap-6"
              >
                <div>
                  <h2 className="text-2xl font-extrabold">Start New Filing</h2>
                  <p className="text-white/80 mt-1">
                    Submit your request in minutes
                  </p>
                </div>
                <button
                  onClick={() => {
                    setTab("estimator");
                    setService(null);
                  }}
                  className="bg-white text-blue-700 px-8 py-4 rounded-xl font-extrabold"
                >
                  Start →
                </button>
              </motion.div>

              {/* SERVICES */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
                {SERVICES.map((s) => (
                  <div key={s.key} className="bg-white rounded-3xl p-6 shadow">
                    <div className="text-2xl">{s.icon}</div>
                    <h3 className="mt-3 font-extrabold">{s.title}</h3>
                    <p className="text-sm text-slate-500">{s.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ================= COST ESTIMATOR ================= */}
          {tab === "estimator" && (
            <motion.div
              key="est"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
            >
              {!service ? (
                <>
                  <h2 className="text-2xl font-extrabold mb-6">
                    Cost Estimator
                  </h2>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {SERVICES.map((s) => (
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        key={s.key}
                        onClick={() => setService(s)}
                        className="bg-white rounded-3xl p-6 shadow text-left"
                      >
                        <div className="text-2xl">{s.icon}</div>
                        <h3 className="mt-3 font-extrabold">{s.title}</h3>
                        <p className="text-sm text-slate-500">{s.desc}</p>
                      </motion.button>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setService(null)}
                    className="text-sm text-blue-600 mb-4"
                  >
                    ← Back
                  </button>

                  <div className="bg-white rounded-3xl p-6 shadow">
                    <h3 className="text-xl font-extrabold mb-4">
                      {service.title} Estimate
                    </h3>

                    <div className="space-y-3">
                      <Row label="Government Fee" value={`₹${service.base}`} />
                      <Row label="Professional Fee" value="₹5,000" />
                    </div>
                  </div>

                  {/* Sticky total */}
                  <div className="fixed lg:static bottom-16 left-0 right-0 bg-white border-t p-4 mt-6">
                    <div className="flex justify-between items-center max-w-3xl mx-auto">
                      <div>
                        <p className="text-xs text-slate-500">
                          Total Estimated Cost
                        </p>
                        <p className="text-xl font-extrabold">
                          ₹{service.base + 5000}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setTab("filing");
                          setStep(1);
                        }}
                        className="bg-blue-600 text-white px-6 py-3 rounded-xl font-extrabold"
                      >
                        Start Filing
                      </button>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          )}

          {/* ================= FILING ================= */}
          {tab === "filing" && (
            <motion.div
              key="filing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* Stepper */}
              <div className="flex gap-2 mb-6">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className={`h-2 flex-1 rounded-full ${
                      step >= s ? "bg-blue-600" : "bg-slate-200"
                    }`}
                  />
                ))}
              </div>

              {/* STEP 1 */}
              {step === 1 && (
                <>
                  <h2 className="text-xl font-extrabold mb-4">
                    Project Details
                  </h2>
                  <input
                    className="w-full border rounded-xl p-3 mb-3"
                    placeholder="Project Title"
                  />
                  <textarea
                    className="w-full border rounded-xl p-3"
                    placeholder="Brief Summary"
                  />
                  <button
                    onClick={() => setStep(2)}
                    className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-xl"
                  >
                    Next →
                  </button>
                </>
              )}

              {/* STEP 2 – FILE UPLOAD */}
              {step === 2 && (
                <>
                  <h2 className="text-xl font-extrabold mb-4">
                    Upload Files
                  </h2>

                  <div
                    onDrop={(e) => {
                      e.preventDefault();
                      addFiles([...e.dataTransfer.files]);
                    }}
                    onDragOver={(e) => e.preventDefault()}
                    className="border-2 border-dashed rounded-2xl p-8 text-center bg-slate-50"
                  >
                    <input
                      type="file"
                      multiple
                      hidden
                      id="fileUpload"
                      onChange={(e) => addFiles([...e.target.files])}
                    />
                    <label htmlFor="fileUpload" className="cursor-pointer">
                      <p className="font-extrabold">Upload files</p>
                      <p className="text-sm text-slate-500">
                        Click or drag & drop
                      </p>
                    </label>
                  </div>

                  {/* FILE PREVIEW */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {files.map((f, i) => (
                      <span
                        key={i}
                        className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs"
                      >
                        📎 {f.name}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button onClick={() => setStep(1)}>Back</button>
                    <button
                      onClick={() => setStep(3)}
                      className="bg-blue-600 text-white px-6 py-3 rounded-xl"
                    >
                      Next →
                    </button>
                  </div>
                </>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <>
                  <h2 className="text-xl font-extrabold mb-4">
                    Review & Submit
                  </h2>
                  <p className="text-slate-500 mb-6">
                    Your request will be reviewed by our team.
                  </p>
                  <button
                    onClick={() => setTab("dashboard")}
                    className="bg-green-600 text-white px-6 py-3 rounded-xl font-extrabold"
                  >
                    Submit for Review
                  </button>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* ================= MOBILE NAV ================= */}
      <MobileNav tab={tab} setTab={setTab} />
    </div>
  );
}

/* ================= COMPONENTS ================= */

function SidebarBtn({ tab, active, setTab }) {
  return (
    <button
      onClick={() => setTab(tab)}
      className={`mb-2 px-4 py-3 rounded-xl font-bold text-left ${
        active === tab ? "bg-white text-blue-700" : "hover:bg-white/10"
      }`}
    >
      {tab.charAt(0).toUpperCase() + tab.slice(1)}
    </button>
  );
}

function MobileNav({ tab, setTab }) {
  const items = [
    ["dashboard", "🏠"],
    ["portfolio", "📁"],
    ["estimator", "💰"],
    ["settings", "⚙️"],
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-2 lg:hidden">
      {items.map(([t, icon]) => (
        <button
          key={t}
          onClick={() => setTab(t)}
          className={`text-xl ${
            tab === t ? "text-blue-600" : "text-slate-400"
          }`}
        >
          {icon}
        </button>
      ))}
    </nav>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between bg-slate-50 p-4 rounded-xl">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="font-extrabold">{value}</span>
    </div>
  );
}
