import { motion } from "framer-motion";

export default function Preloader() {
  return (
    <div className="fixed inset-0 z-[9999] bg-white flex items-center justify-center">
      <div className="flex flex-col items-center">
        {/* Animated Circle Loader */}
        <motion.div
          className="h-16 w-16 rounded-full border-4 border-blue-200 border-t-blue-600"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />

        {/* Brand */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-6 text-2xl font-extrabold text-blue-700"
        >
          PatientIPR
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-sm text-slate-500 mt-2"
        >
          Loading your dashboard...
        </motion.p>
      </div>
    </div>
  );
}
