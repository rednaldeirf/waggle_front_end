// import { createContext, useState, useEffect } from "react";
import { verifyUser } from "../services/users.js";
 import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  const getUserFromToken = async () => {
    const userData = await verifyUser();
    setUser(userData);
  };

  useEffect(() => {
    getUserFromToken();
  }, []);

  const valueObject = { user, setUser };

  return (
    <UserContext.Provider value={valueObject}>
      { children }
    </UserContext.Provider>
  );
}