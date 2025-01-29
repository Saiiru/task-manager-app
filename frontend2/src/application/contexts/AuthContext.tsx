"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useSession, signIn, signOut } from "next-auth/react";
import { AuthService } from "@/domain/services/AuthService";

const authService = new AuthService();

const AuthContext = createContext(null);
const AuthUpdateContext = createContext(null);

export const useAuthState = () => useContext(AuthContext);
export const useAuthUpdate = () => useContext(AuthUpdateContext);

export const AuthProvider = ({ children }) => {
  const { data: session } = useSession();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const login = async (email: string, password: string) => {
    setError(null);
    setLoading(true);
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError(result.error);
    }
    setLoading(false);
  };

  const register = async (
    email: string,
    password: string,
    name: string,
    lastName: string
  ) => {
    setError(null);
    setLoading(true);
    try {
      await authService.registerUser({
        email,
        password,
        name,
        lastName,
        avatar: "",
      });
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  const logout = async () => {
    await signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        error,
        loading,
        login,
        register,
        logout,
      }}
    >
      <AuthUpdateContext.Provider value={{}}>
        {children}
      </AuthUpdateContext.Provider>
    </AuthContext.Provider>
  );
};

const AuthContextProvider = ({ children }) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsReady(true);
    }, 250);
  }, []);

  if (!isReady) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <AuthProvider>
      <Toaster />
      {children}
    </AuthProvider>
  );
};

export default AuthContextProvider;
