import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:10000/api/auth/get-user", { withCredentials: true });
        setUser(response.data.user);
        setIsAdmin(response.data.user?.role === "admin");
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAdmin, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
