import React, { createContext, useState } from "react";
import { userType } from "../types";

export const UserContext = createContext<{
  user: userType | null;
  loginContext: (user: userType | any) => void;
  logoutContext: () => void;
}>({
  user: null,
  loginContext: () => {},
  logoutContext: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<userType | null>(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const loginContext = (user: userType): void => {
    setUser(user);
  };

  const logoutContext = (): void => {
    setUser(null);
    localStorage.removeItem("user"); 
  };

  // Value object to be passed to consumers of this context
  const value = {
    user,
    setUser,
    loginContext,
    logoutContext,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
