import React, { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import TaskDashboard from "@/presentation/components/TaskDashboard";
import TaskService from "@/domain/services/TaskService";
import TaskProvider from "@/application/contexts/TaskContext";
import { Task } from "@/domain/entities/Task";
import { parseCookies } from "nookies";
import { Toaster, toast } from "react-hot-toast";
import Header from "@/presentation/components/Header";

interface HomeProps {
  initialTasks: { edges: { node: Task }[]; pageInfo: any };
}

const Home: React.FC<HomeProps> = ({ initialTasks }) => {
  const [tasks, setTasks] = useState(
    initialTasks.edges.map((edge) => edge.node)
  );
  const [pageInfo, setPageInfo] = useState(initialTasks.pageInfo);
  const [tasksPerPage, setTasksPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchTasks(currentPage);
  }, [searchTerm, tasksPerPage, currentPage]);

  const handleUpdateTask = async (task: {
    id: string;
    isCompleted: boolean;
  }) => {
    try {
      await TaskService.updateTask(task);
      setTasks((prevTasks) =>
        prevTasks.map((t) =>
          t.id === task.id ? { ...t, isCompleted: task.isCompleted } : t
        )
      );
      toast.success("Task updated successfully");
    } catch (error) {
      toast.error("Error updating task");
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await TaskService.deleteTask(id);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      toast.success("Task deleted successfully");
    } catch (error) {
      toast.error("Error deleting task");
    }
  };

  const handlePageChange = (direction: "next" | "prev") => {
    const newPage = direction === "next" ? currentPage + 1 : currentPage - 1;
    setCurrentPage(newPage);
  };

  const handleTasksPerPageChange = (tasksPerPage: number) => {
    setTasksPerPage(tasksPerPage);
    setCurrentPage(1);
  };

  const fetchTasks = async (page = 1) => {
    try {
      const query = { page, limit: tasksPerPage };
      if (searchTerm) {
        query.search = searchTerm;
      }

      const { edges, pageInfo: newPageInfo } = await TaskService.getTasks(
        query
      );
      setTasks(edges.map((edge) => edge.node));
      setPageInfo(newPageInfo);
    } catch (error) {
      toast.error("Error fetching tasks");
    }
  };

  return (
    <>
      <Toaster />
      <TaskProvider initialTasks={initialTasks.edges.map((edge) => edge.node)}>
        <Header />
        <div className="container mx-auto p-4">
          <TaskDashboard
            tasks={tasks}
            handleUpdateTask={handleUpdateTask}
            handleDeleteTask={handleDeleteTask}
            pageInfo={pageInfo}
            onPageChange={handlePageChange}
            onTasksPerPageChange={handleTasksPerPageChange}
            setSearchTerm={setSearchTerm}
          />
        </div>
      </TaskProvider>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const cookies = parseCookies(context);
    const token = cookies.token;

    if (!token) {
      return {
        redirect: {
          destination: "/signin",
          permanent: false,
        },
      };
    }

    const session = await getServerSession(
      context.req,
      context.res,
      authOptions
    );

    if (!session) {
      return {
        redirect: {
          destination: "/signin",
          permanent: false,
        },
      };
    }

    const tasks = await TaskService.getTasks({ page: 1, limit: 10 });

    return {
      props: {
        initialTasks: tasks || { edges: [], pageInfo: {} },
      },
    };
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return {
      props: {
        initialTasks: { edges: [], pageInfo: {} },
      },
    };
  }
};

export default Home;
