import { SessionProvider } from "next-auth/react";
import TaskProvider from "@/application/contexts/TaskContext";
import AuthContextProvider from "@/application/contexts/AuthContext";
import "@/styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <AuthContextProvider>
        <TaskProvider>
          <Component {...pageProps} />
        </TaskProvider>
      </AuthContextProvider>
    </SessionProvider>
  );
}

export default MyApp;
