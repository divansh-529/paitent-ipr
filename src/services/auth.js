
const delay = (ms = 600) => new Promise((res) => setTimeout(res, ms));

const normalizeRole = (role) => {
  if (!role) return null;
  const r = String(role).toLowerCase().trim();

  if (r === "user" || r === "client") return "user";
  if (r === "admin" || r === "superadmin") return "admin";
  if (r === "agent" || r === "staff") return "agent";

  return null;
};

const demoUsers = [
  { username: "user", password: "user", role: "user", name: "User" },
  { username: "admin", password: "admin", role: "admin", name: "Admin" },
  { username: "agent", password: "agent", role: "agent", name: "Agent" },
];

export async function loginUser({ identifier, password }) {

  await delay(500);

  const id = String(identifier || "").trim().toLowerCase();
  const pass = String(password || "").trim();

  const found = demoUsers.find(
    (u) => u.username.toLowerCase() === id && u.password === pass
  );

  if (!found) {
    return {
      success: false,
      message: "Username or password is incorrect.",
    };
  }

  return {
    success: true,
    message: "Login successful",
    token: `dummy_token_${found.role}`,
    user: {
      name: found.name,
      username: found.username,
      role: normalizeRole(found.role),
    },
  };
}

// ------------------------------------------------------
// SIGNUP
// ------------------------------------------------------
export async function signupUser({ fullName, email, username, password }) {
  // 🔥 Later replace with backend call:
  // return await api.post("/auth/signup", { fullName, email, username, password });

  await delay(650);

  const name = String(fullName || "").trim();
  const mail = String(email || "").trim().toLowerCase();
  const user = String(username || "").trim().toLowerCase();
  const pass = String(password || "").trim();

  if (!name || !mail || !user || !pass) {
    return {
      success: false,
      message: "All fields are required.",
    };
  }

  // basic email check
  if (!mail.includes("@")) {
    return {
      success: false,
      message: "Please enter a valid email.",
    };
  }

  // username already exists check (dummy)
  const already = demoUsers.find((u) => u.username.toLowerCase() === user);
  if (already) {
    return {
      success: false,
      message: "Username already exists. Try another one.",
    };
  }

  // Add user to dummy list (for current session only)
  demoUsers.push({
    username: user,
    password: pass,
    role: "user",
    name: name,
  });

  return {
    success: true,
    message: "Signup successful",
    token: `dummy_token_user`,
    user: {
      name: name,
      email: mail,
      username: user,
      role: "user",
    },
  };
}

// ------------------------------------------------------
// LOGOUT (future use)
// ------------------------------------------------------
export function logoutUser() {
  // Later backend: call logout endpoint if needed
  localStorage.removeItem("patientipr_token");
  return true;
}

// ------------------------------------------------------
// GET CURRENT USER (future use)
// ------------------------------------------------------
export function getToken() {
  return localStorage.getItem("patientipr_token");
}


export async function requestPasswordReset({ email }) {
  await new Promise((res) => setTimeout(res, 700));

  if (!email) {
    return { success: false, message: "Email is required." };
  }

  // ✅ Dummy DB emails (for now)
  const dbEmails = ["user@gmail.com", "admin@gmail.com", "agent@gmail.com"];

  if (!dbEmails.includes(email.toLowerCase().trim())) {
    return { success: false, message: "Email not found in database." };
  }

  return {
    success: true,
    message: "Reset link sent",
  };
}




export async function resetPassword({ token, newPassword }) {
  await new Promise((res) => setTimeout(res, 800));

  if (!token) {
    return { success: false, message: "Invalid reset token." };
  }

  if (!newPassword) {
    return { success: false, message: "Password is required." };
  }

  // demo success
  return {
    success: true,
    message: "Password reset successful",
  };
}

