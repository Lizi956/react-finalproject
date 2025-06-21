import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

const TOKEN_KEY = "token";
const USER_KEY = "user";

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem(USER_KEY)));
  const register = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.find((u) => u.email === email)) {
      throw new Error("User already exists");
    }
    users.push({ email, password });
    localStorage.setItem("users", JSON.stringify(users));
  };
  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const found = users.find(
      (u) => u.email === email && u.password === password
    );
    if (!found) {
      throw new Error("Invalid credentials");
    }
    const fakeToken = "fake-jwt-token-" + Date.now();
    setToken(fakeToken);
    setUser({ email });
    localStorage.setItem(TOKEN_KEY, fakeToken);
    localStorage.setItem(USER_KEY, JSON.stringify({ email }));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  };

  useEffect(() => {
    const savedToken = localStorage.getItem(TOKEN_KEY);
    const savedUser = JSON.parse(localStorage.getItem(USER_KEY));
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(savedUser);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
