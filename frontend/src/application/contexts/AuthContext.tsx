'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthInput } from '@/domain/entities/User';
import { GraphQLUserRepository } from '@/infrastructure/repositories/GraphQLUserRepository';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (input: AuthInput) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const authRepository = new GraphQLUserRepository();

  useEffect(() => {
    const initAuth = async () => {
      const token = Cookies.get('auth-token');
      if (token) {
        try {
          const user = await authRepository.getCurrentUser();
          setUser(user);
        } catch {
          Cookies.remove('auth-token');
          router.push('/signin');
        }
      } else {
        router.push('/signin');
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const signIn = async (input: AuthInput) => {
    try {
      const { token, user } = await authRepository.login(input);
      Cookies.set('auth-token', token, {
        expires: 7,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });
      setUser(user);
      router.push('/');
    } catch (error) {
      throw new Error('Authentication failed');
    }
  };

  const signOut = () => {
    Cookies.remove('auth-token');
    setUser(null);
    router.push('/signin');
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};