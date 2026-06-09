import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Taskform from "../components/Taskform";
import Taskcard from "../components/Taskcard";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // --- NEW STATES: Search and Filter ---
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (id) => {
    try {
      await api.patch(`/tasks/${id}/status`, { status: "completed" });
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await api.post("/auth/logout");
      navigate("/login");
    } catch (error) {
      console.log(error);
      setIsLoggingOut(false);
    }
  };

  // --- NEW: Calculate Statistics ---
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (task) => task.status === "completed",
  ).length;
  const pendingTasks = tasks.filter((task) => task.status === "pending").length;
  const inProgressTasks = tasks.filter(
    (task) => task.status === "in progress" || task.status === "inProgress",
  ).length;

  // --- NEW: Filter & Search Logic ---
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      filterStatus === "all" ||
      task.status.toLowerCase() === filterStatus.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="backdrop-blur-md bg-white/40 border border-white/50 p-6 rounded-2xl shadow-sm flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome, {user?.name || "Developer"}
          </h1>
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="px-4 py-2 bg-white/50 hover:bg-white/80 border border-white/60 text-gray-700 font-medium rounded-xl transition-all shadow-sm disabled:opacity-50"
          >
            {isLoggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>

        {/* --- NEW UI: Statistics Section --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="backdrop-blur-xl bg-white/60 border border-white/50 p-4 rounded-xl shadow-sm text-center">
            <p className="text-gray-500 text-sm font-semibold">Total Tasks</p>
            <p className="text-2xl font-bold text-gray-800">{totalTasks}</p>
          </div>
          <div className="backdrop-blur-xl bg-white/60 border border-white/50 p-4 rounded-xl shadow-sm text-center">
            <p className="text-gray-500 text-sm font-semibold">Completed</p>
            <p className="text-2xl font-bold text-green-600">
              {completedTasks}
            </p>
          </div>
          <div className="backdrop-blur-xl bg-white/60 border border-white/50 p-4 rounded-xl shadow-sm text-center">
            <p className="text-gray-500 text-sm font-semibold">In Progress</p>
            <p className="text-2xl font-bold text-blue-600">
              {inProgressTasks}
            </p>
          </div>
          <div className="backdrop-blur-xl bg-white/60 border border-white/50 p-4 rounded-xl shadow-sm text-center">
            <p className="text-gray-500 text-sm font-semibold">Pending</p>
            <p className="text-2xl font-bold text-orange-500">{pendingTasks}</p>
          </div>
        </div>

        {/* --- NEW UI: Search & Filter Controls --- */}
        <div className="backdrop-blur-md bg-white/40 border border-white/50 p-4 rounded-2xl shadow-sm flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search tasks by title or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-2 bg-white/50 border border-white/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-gray-500 shadow-sm"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="md:w-48 px-4 py-2 bg-white/50 border border-white/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm text-gray-700"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <Taskform
              onTaskAdded={fetchTasks}
              editingTask={editingTask}
              setEditingTask={setEditingTask}
            />
          </div>
          <div className="md:col-span-2">
            <Taskcard
              tasks={
                filteredTasks
              } /* <-- Passed filteredTasks instead of tasks */
              onDelete={deleteTask}
              onComplete={updateStatus}
              onEdit={setEditingTask}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
