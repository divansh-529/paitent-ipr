import React from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { logout, username, role } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto rounded-[28px] bg-white border border-slate-200 shadow-sm p-8">
        <h1 className="text-2xl font-extrabold text-slate-900">
          {role?.toUpperCase()} Dashboard
        </h1>
        <p className="mt-2 text-slate-600">Welcome, {username}</p>

        <button
          onClick={handleLogout}
          className="mt-6 px-5 py-3 rounded-2xl bg-blue-600 text-white font-bold shadow hover:opacity-95 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
