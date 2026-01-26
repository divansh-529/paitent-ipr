import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

const STORAGE_KEY = "patientipr_auth";

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(null); 
  // auth = { token, role, username }

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setAuth(JSON.parse(saved));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  const login = (payload) => {
    // payload = { token, role, username }
    setAuth(payload);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const value = useMemo(
    () => ({
      auth,
      isLoggedIn: !!auth?.token,
      role: auth?.role || null,
      username: auth?.username || null,
      login,
      logout,
    }),
    [auth]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
