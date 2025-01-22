"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Input from "@/components/Input"; // Importar o componente de input

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      router.push("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleRegisterRedirect = () => {
    router.push("/auth/register");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-700 via-gray-900 to-black">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Sign In
        </h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2">
            Email
          </label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 mb-2">
            Password
          </label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 w-full rounded hover:bg-blue-600 transition duration-200"
        >
          Login
        </button>
        <button
          type="button"
          onClick={handleRegisterRedirect}
          className="bg-gray-500 text-white p-2 w-full rounded hover:bg-gray-600 transition duration-200 mt-4"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default SignIn;
