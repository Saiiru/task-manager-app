import { signOut, useSession } from "next-auth/react";
import { notify } from "../Notifications/toast";

const Header = () => {
  const { data: session } = useSession();

  const handleSignOut = async () => {
    try {
      await signOut();
      notify.success("Signed out successfully");
    } catch (error) {
      notify.error("Failed to sign out");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-1 flex items-center justify-between">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-white">Task Manager</h1>
            </div>

            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {session?.user && (
                  <div className="flex items-center space-x-4">
                    <span className="text-white">{session.user.email}</span>
                    <button
                      onClick={handleSignOut}
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
