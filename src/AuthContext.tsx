import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
  token: string | null;
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("token");
  });

  const isLoggedIn = !!token;

  useEffect(() => {
    if (!token) return;

    const { exp }: any = jwtDecode(token);
    const expiryTime = exp * 1000;
    const now = Date.now();

    if (expiryTime <= now) {
      logout();
      return;
    }

    const timeout = setTimeout(() => {
      logout();
    }, expiryTime - now);

    return () => clearTimeout(timeout);
  }, [token]);

  const login = (receivedToken: string) => {
    setToken(receivedToken);
    localStorage.setItem("token", receivedToken);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ token, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
