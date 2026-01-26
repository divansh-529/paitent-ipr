import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Landing from "../pages/landing_before_login/landin.jsx"
import Login from "../pages/auth/login.jsx";
import Signup from "../pages/auth/signup.jsx";
import ForgotPassword from "../pages/auth/forgot.jsx";
import ResetPassword from "../pages/auth/reset-password.jsx";
import Unauthorized from "../pages/auth/unauthorized.jsx";

import UserDashboard from "../pages/user/dashboard.jsx";
import AdminDashboard from "../pages/admin/dashboard.jsx";
import AgentDashboard from "../pages/agent/dashboard.jsx";
import UserServices from "../pages/user/services.jsx";
import UserServiceDetails from "../pages/user/serviceDetails.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Landing />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Unauthorized */}
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/user/services" element={<UserServices />} />
<Route path="/user/services/:type" element={<UserServiceDetails />} />

        {/* Protected Dashboards */}
        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/agent/dashboard"
          element={
            <ProtectedRoute allowedRoles={["agent"]}>
              <AgentDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Default */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
