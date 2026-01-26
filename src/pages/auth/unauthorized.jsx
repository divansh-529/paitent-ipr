import React from "react";
import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-lg rounded-[28px] bg-white border border-slate-200 shadow-sm p-8 text-center">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Access Denied
        </h1>
        <p className="mt-3 text-slate-600 text-sm sm:text-base">
          You don’t have permission to access this page.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="px-5 py-3 rounded-2xl border border-slate-200 font-bold text-slate-900 hover:border-blue-200 transition"
          >
            Go Home
          </Link>

          <Link
            to="/login"
            className="px-5 py-3 rounded-2xl bg-blue-600 text-white font-bold shadow hover:opacity-95 transition"
          >
            Login Again
          </Link>
        </div>
      </div>
    </div>
  );
}
