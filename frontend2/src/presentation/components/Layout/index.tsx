import React from "react";
import Header from "@/presentation/components/Header";
import { useSession } from "next-auth/react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <div className="flex">
        <main className="flex-2 p-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
