// import { createContext, useState, useEffect } from "react";
import { verifyUser } from "../services/users.js";
import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [shelter, setShelter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getUserFromToken = async () => {
    try {
      console.log("Verifying user token...");
      const token = localStorage.getItem("token");
      console.log("Token exists:", !!token);
      
      if (!token) {
        console.log("No token found, setting user and shelter to null");
        setUser(null);
        setShelter(null);
        setLoading(false);
        return;
      }

      const userData = await verifyUser();
      console.log("User verification response:", userData);
      
      if (userData) {
        setUser(userData.user);
        setShelter(userData.shelter);
        console.log("User context updated:", {
          user: userData.user,
          shelter: userData.shelter
        });
      } else {
        console.log("No user data found");
        setUser(null);
        setShelter(null);
      }
    } catch (err) {
      console.error("Error verifying user:", err);
      setError(err.message);
      setUser(null);
      setShelter(null);
      // Clear invalid token
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserFromToken();
  }, []);

  const valueObject = { 
    user, 
    setUser, 
    shelter, 
    setShelter,
    loading,
    error
  };

  if (loading) {
    return <div>Loading user data...</div>;
  }

  return (
    <UserContext.Provider value={valueObject}>
      {children}
    </UserContext.Provider>
  );
}