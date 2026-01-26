import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Landing() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const fadeUp = useMemo(
    () => ({
      hidden: { opacity: 0, y: 18 },
      show: { opacity: 1, y: 0 },
    }),
    []
  );

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* NAVBAR (Sticky + Blur) */}
      <header
        className={[
          "sticky top-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/80 backdrop-blur-xl border-b border-slate-200 shadow-sm"
            : "bg-transparent",
        ].join(" ")}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="h-16 flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-extrabold shadow">
                P
              </div>
              <div className="font-extrabold tracking-tight text-slate-900">
                PatientIPR
              </div>
            </Link>

            {/* Right actions (max 2 CTA) */}
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-4 py-2 rounded-2xl border border-slate-200 text-slate-900 font-bold text-sm hover:border-blue-200 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 rounded-2xl bg-blue-600 text-white font-bold text-sm shadow hover:opacity-95 transition"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-28 -left-28 h-72 w-72 rounded-full bg-blue-100 blur-3xl opacity-70" />
          <div className="absolute -bottom-28 -right-28 h-72 w-72 rounded-full bg-blue-200 blur-3xl opacity-60" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-12 sm:pt-16 pb-14 sm:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            {/* Left */}
            <motion.div
              initial="hidden"
              animate="show"
              variants={fadeUp}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 font-extrabold text-xs sm:text-sm"
              >
                Request Tracking Portal
              </motion.div>

              <h1 className="mt-5 text-3xl sm:text-5xl font-extrabold leading-tight tracking-tight">
                Submit your request and{" "}
                <span className="text-blue-600">track every update</span>
              </h1>

              <p className="mt-4 text-slate-600 text-sm sm:text-lg max-w-xl leading-relaxed">
                Start with basic details, receive assistance when needed, and
                monitor progress anytime from your dashboard.
              </p>

              {/* Only ONE CTA area in hero */}
              <div className="mt-7 flex flex-col sm:flex-row gap-3 sm:items-center">
                <Link
                  to="/signup"
                  className="px-6 py-3 rounded-2xl bg-blue-600 text-white font-extrabold shadow hover:opacity-95 transition text-center"
                >
                  Create Account
                </Link>

                <Link
                  to="/login"
                  className="px-6 py-3 rounded-2xl border border-slate-200 text-slate-900 font-extrabold hover:border-blue-200 transition text-center"
                >
                  Login
                </Link>
              </div>

              {/* Compact cards (no useless space) */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl">
                {[
                  { title: "Submit", desc: "Basic details only" },
                  { title: "Track", desc: "Status updates anytime" },
                  { title: "Estimate", desc: "Expected cost preview" },
                ].map((c, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.45, delay: i * 0.06 }}
                    className="rounded-2xl border border-slate-200 bg-white shadow-sm p-4"
                  >
                    <div className="text-slate-900 font-extrabold text-sm">
                      {c.title}
                    </div>
                    <div className="mt-1 text-slate-600 text-xs sm:text-sm">
                      {c.desc}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right - Preview Card */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.10)] overflow-hidden">
                <div className="p-6 sm:p-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-slate-900 font-extrabold text-lg">
                        Your Dashboard
                      </div>
                      <div className="mt-1 text-slate-600 text-sm">
                        Requests • Updates • Timeline
                      </div>
                    </div>

                    <div className="h-10 w-10 rounded-2xl bg-blue-600 text-white font-extrabold flex items-center justify-center shadow">
                      ✓
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-1 gap-3">
                    {[
                      { name: "Patent Request", status: "In Review", pct: 70 },
                      { name: "Trademark Request", status: "Pending", pct: 35 },
                      { name: "Copyright Request", status: "Submitted", pct: 55 },
                    ].map((x, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: 12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.45, delay: idx * 0.08 }}
                        className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                      >
                        <div className="flex items-center justify-between">
                          <div className="font-extrabold text-slate-900 text-sm">
                            {x.name}
                          </div>
                          <div className="text-xs font-bold text-blue-700 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
                            {x.status}
                          </div>
                        </div>

                        <div className="mt-3 h-2 rounded-full bg-white border border-slate-200 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${x.pct}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.9, ease: "easeInOut" }}
                            className="h-full bg-blue-600 rounded-full"
                          />
                        </div>

                        <div className="mt-2 text-xs text-slate-600">
                          Progress: <span className="font-bold">{x.pct}%</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* bottom strip */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                  <div className="text-white font-extrabold text-sm">
                    Track progress anytime
                  </div>
                  <div className="text-white/80 text-xs mt-1">
                    Updates appear inside your dashboard.
                  </div>
                </div>
              </div>

              {/* Floating dot */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 h-10 w-10 rounded-full bg-blue-600 shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 2 - IP Services */}
      <section className="py-16 bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55 }}
            className="text-center"
          >
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
              IP services
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-lg max-w-2xl mx-auto">
              Choose the type of intellectual property you want to protect.
            </p>
          </motion.div>

          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              { title: "Patent", icon: "P" },
              { title: "Trademark", icon: "T" },
              { title: "Copyright", icon: "C" },
              { title: "Design", icon: "D" },
            ].map((x, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="rounded-[26px] bg-white border border-slate-200 shadow-sm p-5 sm:p-7"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 250, damping: 18 }}
                  className="mx-auto h-14 w-14 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center font-extrabold text-blue-700"
                >
                  {x.icon}
                </motion.div>

                <div className="mt-4 text-center font-extrabold text-slate-900">
                  {x.title}
                </div>

                <div className="mt-1 text-center text-xs sm:text-sm text-slate-600">
                  Start request in minutes
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 - How it works */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55 }}
            className="text-center"
          >
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
              How it works
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-lg max-w-2xl mx-auto">
              A simple workflow to submit and track your request.
            </p>
          </motion.div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Create a request",
                desc: "Enter basic details and submit your request.",
              },
              {
                title: "Get assistance",
                desc: "An agent contacts you by email for next steps.",
              },
              {
                title: "Track updates",
                desc: "View progress and updates in your dashboard.",
              },
            ].map((x, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-[26px] border border-slate-200 bg-white shadow-sm p-6 sm:p-8"
              >
                <div className="h-12 w-12 rounded-2xl bg-blue-600 text-white font-extrabold flex items-center justify-center shadow">
                  {i + 1}
                </div>
                <div className="mt-4 text-slate-900 font-extrabold text-lg">
                  {x.title}
                </div>
                <div className="mt-2 text-slate-600 text-sm leading-relaxed">
                  {x.desc}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 - Cost Estimator Preview */}
      <section className="py-16 bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55 }}
            >
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
                Cost estimation
              </h2>
              <p className="mt-3 text-slate-600 text-sm sm:text-lg max-w-xl">
                Get an expected cost breakdown before you proceed.
              </p>

              <div className="mt-6 space-y-3">
                {[
                  { k: "Government fee", v: "Varies by request type" },
                  { k: "Service charge", v: "Based on assistance required" },
                  { k: "Total estimate", v: "Shown before submission" },
                ].map((x, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.45, delay: i * 0.08 }}
                    className="rounded-2xl border border-slate-200 bg-white shadow-sm p-4 flex items-center justify-between"
                  >
                    <div className="font-extrabold text-slate-900 text-sm">
                      {x.k}
                    </div>
                    <div className="text-slate-600 text-xs sm:text-sm">
                      {x.v}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55 }}
              className="rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.10)] p-6 sm:p-8"
            >
              <div className="flex items-center justify-between">
                <div className="font-extrabold text-slate-900 text-lg">
                  Estimate Preview
                </div>
                <div className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 border border-blue-100 text-blue-700">
                  Example
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {[
                  { label: "Request Type", value: "Patent" },
                  { label: "Government Fee", value: "₹ —" },
                  { label: "Service Charge", value: "₹ —" },
                ].map((x, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="text-slate-600 text-sm">{x.label}</div>
                    <div className="text-slate-900 font-extrabold text-sm">
                      {x.value}
                    </div>
                  </div>
                ))}

                <div className="rounded-2xl bg-blue-600 text-white p-4 flex items-center justify-between shadow">
                  <div className="font-extrabold text-sm">Total</div>
                  <div className="font-extrabold text-sm">₹ —</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 5 - FAQ */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55 }}
            className="text-center"
          >
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
              Frequently asked questions
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-lg max-w-2xl mx-auto">
              Quick answers to help you understand the flow.
            </p>
          </motion.div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[
              {
                q: "What details do I need to submit a request?",
                a: "You only need to submit basic information at the start. An agent will contact you by email for further details if required.",
              },
              {
                q: "How can I track the status after applying?",
                a: "Once your request is created, you can view updates and progress inside your dashboard anytime.",
              },
              {
                q: "Will I get updates on email?",
                a: "Yes, agents can reach you through email for confirmations, missing details, and request updates.",
              },
              {
                q: "Can I apply for multiple IP types?",
                a: "Yes, you can submit separate requests for Patent, Trademark, Copyright, or Design based on your requirement.",
              },
              {
                q: "How does cost estimation work?",
                a: "The estimator shows an expected breakdown (government fee + service charge). Final values can vary based on request type and details.",
              },
              {
                q: "Is my data secure?",
                a: "Your request data is handled in a controlled workflow. You can track everything inside your account dashboard.",
              },
            ].map((item, i) => (
              <FaqItem key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA (Only second CTA area) */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6 }}
            className="rounded-[34px] overflow-hidden border border-blue-100 shadow-[0_20px_60px_rgba(37,99,235,0.20)]"
          >
            <div className="relative bg-gradient-to-r from-blue-600 via-blue-600 to-blue-700 px-6 sm:px-10 py-12 sm:py-14">
              <div className="absolute inset-0 opacity-30">
                <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-white/20 blur-3xl" />
                <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-white/20 blur-3xl" />
              </div>

              <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                <div>
                  <h3 className="text-white text-2xl sm:text-4xl font-extrabold">
                    Start protecting your ideas today
                  </h3>
                  <p className="mt-3 text-white/80 text-sm sm:text-lg max-w-2xl">
                    Create an account and begin your request journey.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/signup"
                    className="px-6 py-3 rounded-2xl bg-white text-blue-700 font-extrabold shadow hover:opacity-95 transition text-center"
                  >
                    Create Account
                  </Link>
                  <Link
                    to="/login"
                    className="px-6 py-3 rounded-2xl border border-white/30 text-white font-extrabold hover:bg-white/10 transition text-center"
                  >
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="text-slate-900 font-extrabold text-lg">
                PatientIPR
              </div>
              <p className="mt-2 text-slate-600 text-sm max-w-md">
                Submit your request, get assistance, and track progress from
                your dashboard.
              </p>
            </div>

           
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-500">
            <div>© {new Date().getFullYear()} PatientIPR. All rights reserved.</div>
            <div className="flex items-center gap-4">
              <span>Privacy</span>
              <span>Terms</span>
              <span>Support</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FaqItem({ item, index }) {
  const [open, setOpen] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: 0.05 + index * 0.06, duration: 0.5 }}
      className="rounded-[24px] border border-slate-200 bg-white shadow-sm overflow-hidden"
    >
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full px-6 py-5 flex items-center justify-between text-left"
      >
        <span className="text-slate-900 font-extrabold text-sm sm:text-base">
          {item.q}
        </span>

        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="h-10 w-10 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700 font-extrabold"
        >
          ↓
        </motion.span>
      </button>

      <motion.div
        initial={false}
        animate={{
          height: open ? "auto" : 0,
          opacity: open ? 1 : 0,
        }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="px-6"
      >
        <div className="pb-5 text-slate-600 text-sm leading-relaxed">
          {item.a}
        </div>
      </motion.div>
    </motion.div>
  );
}
