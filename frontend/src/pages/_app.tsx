import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@/providers/ApolloProvider';
import { AuthProvider } from '@/application/contexts/AuthContext';
import ContextProvider from '@/application/providers/ContextProvider';
import { Header } from '@/presentation/components/_header/Header';
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from '@/presentation/components/ui/toaster';
import { Toaster as SnonnerToater } from '@/presentation/components/ui/sonner';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-screen bg-gray-900 text-white antialiased">
      <ApolloProvider>
        <AuthProvider>
          <ContextProvider>
            <NextTopLoader
              height={2}
              color="#27AE60"
              easing="cubic-bezier(0.53,0.21,0,1)"
            />
            <Header />
            <div className="container mx-auto h-[calc(100vh-4rem)] w-full py-2">
              <Component {...pageProps} />
            </div>
          </ContextProvider>
        </AuthProvider>
      </ApolloProvider>
      <Toaster />
      <SnonnerToater />
    </div>
  );
}

export default MyApp;
