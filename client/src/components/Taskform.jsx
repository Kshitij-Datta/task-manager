import { useState, useEffect } from "react";
import api from "../services/api";

const Taskform = ({ onTaskAdded, editingTask, setEditingTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [loading, setLoading] = useState(false);

  // Populate form when Edit is clicked on a task card
  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setStatus(editingTask.status);
    }
  }, [editingTask]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Submit clicked");
    setLoading(true);

    try {
      if (editingTask) {
        // Edit mode (PUT)
        await api.put(`/tasks/${editingTask._id}`, {
          title,
          description,
          status,
        });
        setEditingTask(null); // Clear edit mode
      } else {
        // Create mode (POST)
        await api.post("/tasks", {
          title,
          description,
          status,
        });
      }

      // Clear form
      setTitle("");
      setDescription("");
      setStatus("pending");

      if (onTaskAdded) onTaskAdded();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditingTask(null);
    setTitle("");
    setDescription("");
    setStatus("pending");
  };

  return (
    <div className="backdrop-blur-xl bg-white/60 border border-white/50 p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        {editingTask ? "Edit Task" : "New Task"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 bg-white/50 border border-white/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-gray-500 shadow-sm"
        />

        <textarea
          name="description"
          placeholder="Task Description"
          value={description}
          required
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 bg-white/50 border border-white/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-gray-500 shadow-sm resize-none h-24"
        />

        <select
          name="status"
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full px-4 py-2 bg-white/50 border border-white/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm text-gray-700"
        >
          <option value="pending">Pending</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-medium rounded-xl transition-all duration-200 shadow-md"
          >
            {loading ? "Saving..." : editingTask ? "Update Task" : "Add Task"}
          </button>

          {editingTask && (
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-xl transition-all"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Taskform;
