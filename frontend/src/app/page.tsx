"use client";
import ProtectedRoute from "@/components/ProtectedRoute";
import Tasks from "@/components/Tasks";
import { useGlobalState } from "@/context/globalProvider"; // Usando alias @/

const Home = () => {
  const { tasks } = useGlobalState();

  return (
    <ProtectedRoute>
      <Tasks title="All Tasks" tasks={tasks} />
    </ProtectedRoute>
  );
};

export default Home;
