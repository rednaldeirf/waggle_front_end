import api from "./apiConfig";

export const signIn = async (credentials) => {
  try {
    const resp = await api.post("/shelters/login/", credentials);
    localStorage.setItem("token", resp.data.access);
    return resp.data.user;
  } catch (error) {
    throw error;
  }
}; 