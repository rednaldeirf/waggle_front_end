import api from "./apiConfig";

// Register a new user
export const signUp = async (credentials) => {
  const resp = await api.post("/auth/sign-up/", credentials);
  localStorage.setItem("token", resp.data.access);
  return resp.data.user;
};

// Login
export const signIn = async (credentials) => {
  const resp = await api.post("/auth/sign-in/", credentials);
  localStorage.setItem("token", resp.data.access);
  return resp.data.user;
};

// Sign out
export const signOut = () => {
  localStorage.removeItem("token");
};

// Verify user (optional, for auto-login)
export const verifyUser = async () => {
  const token = localStorage.getItem("token");
  if (token) {
    const resp = await api.get("/auth/verify/");
    localStorage.setItem("token", resp.data.access);
    return resp.data.user;
  }
  return null;
};