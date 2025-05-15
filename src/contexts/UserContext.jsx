import { createContext, useState, useEffect } from "react";
import { verifyUser } from "../services/users.js";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [shelter, setShelter] = useState(null);

  const getUserFromToken = async () => {
    const userData = await verifyUser();
    setUser(userData.user);
    setShelter(userData.shelter);
  };

  useEffect(() => {
    getUserFromToken();
  }, []);

  const valueObject = { user, setUser, shelter, setShelter };

  return (
    <UserContext.Provider value={valueObject}>
      { children }
    </UserContext.Provider>
  );
}