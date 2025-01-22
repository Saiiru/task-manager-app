"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { setCookie, destroyCookie, parseCookies } from "nookies";
import { useRouter } from "next/navigation";
import {
  login as loginService,
  register as registerService,
} from "@/services/authService";

interface AuthContextProps {
  token: string | null;
  user: any;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    lastName: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const cookies = parseCookies();
    if (cookies.token) {
      setToken(cookies.token);
      setUser({ token: cookies.token });
    }
  }, []);

  const login = async (email: string, password: string) => {
    const { token, user } = await loginService(email, password);
    setCookie(null, "token", token, {
      path: "/",
      secure: true,
    });
    setToken(token);
    setUser(user);
    router.push("/");
  };

  const register = async (
    name: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    const { token, user } = await registerService(
      name,
      lastName,
      email,
      password
    );
    setCookie(null, "token", token, {
      path: "/",
      secure: true,
    });
    setToken(token);
    setUser(user);
    router.push("/");
  };

  const logout = () => {
    destroyCookie(null, "token");
    setToken(null);
    setUser(null);
    router.push("/auth/login");
  };

  return (
    <AuthContext.Provider value={{ token, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
