export const saveAuth = (data) => {
  localStorage.setItem("patientipr_auth", JSON.stringify(data));
};

export const getAuth = () => {
  try {
    return JSON.parse(localStorage.getItem("patientipr_auth"));
  } catch {
    return null;
  }
};

export const clearAuth = () => {
  localStorage.removeItem("patientipr_auth");
};
