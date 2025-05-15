import api from "./apiConfig";

// Register a new user
export const signUp = async (credentials) => {
  try {
    console.log("Attempting to sign up user...");
    const resp = await api.post("/auth/sign-up/", credentials);
    console.log("Sign up response:", resp.data);
    localStorage.setItem("token", resp.data.access);
    const {user, shelter} = resp.data;
    return {user, shelter};
  } catch (error) {
    console.error("Sign up error:", error.response?.data || error.message);
    throw error;
  }
};

// Login
export const signIn = async (credentials) => {
  try {
    console.log("Attempting to sign in user...");
    const resp = await api.post("/auth/sign-in/", credentials);
    console.log("Sign in response:", resp.data);
    localStorage.setItem("token", resp.data.access);
    const {user, shelter} = resp.data;
    return {user, shelter};
  } catch (error) {
    console.error("Sign in error:", error.response?.data || error.message);
    throw error;
  }
};

// Sign out
export const signOut = () => {
  console.log("Signing out user...");
  localStorage.removeItem("token");
};

// Verify user (optional, for auto-login)
export const verifyUser = async () => {
  try {
    const token = localStorage.getItem("token");
    console.log("Verifying user with token:", token ? "Token exists" : "No token found");
    
    if (!token) {
      console.log("No token found, returning null");
      return null;
    }

    console.log("Making verification request...");
    const resp = await api.get("/auth/verify/");
    console.log("Verification response:", resp.data);
    
    localStorage.setItem("token", resp.data.access);
    const {user, shelter} = resp.data;
    return {user, shelter};
  } catch (error) {
    console.error("Verification error:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    // Clear invalid token
    localStorage.removeItem("token");
    throw error;
  }
};

// Get user's pets
export const getUserPets = async () => {
  try {
    console.log("Fetching user's pets...");
    const resp = await api.get("/user/adoptions/");
    console.log("User pets response:", resp.data);
    return resp.data;
  } catch (error) {
    console.error("Error fetching user pets:", error.response?.data || error.message);
    throw error;
  }
};

