import { useState } from "react";

const Taskcard = ({ tasks, onDelete, onComplete, onEdit }) => {
  const [loadingId, setLoadingId] = useState(null); // Tracks which specific card is loading

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700 border-green-200";
      case "in progress":
        return "bg-blue-100 text-blue-700 border-blue-200";
      default:
        return "bg-orange-100 text-orange-700 border-orange-200";
    }
  };

  const handleDelete = async (id) => {
    setLoadingId(id);
    await onDelete(id);
    setLoadingId(null);
  };

  const handleComplete = async (id) => {
    setLoadingId(id);
    await onComplete(id);
    setLoadingId(null);
  };

  return (
    <div className="backdrop-blur-xl bg-white/60 border border-white/50 p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">Your Tasks</h2>

      {!tasks || tasks.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          No tasks yet. Create one!
        </p>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="p-5 bg-white/80 rounded-xl border border-white shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-medium text-gray-800">
                  {task.title}
                </h3>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(task.status)}`}
                >
                  {task.status}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-4">{task.description}</p>

              {/* Action Buttons */}
              <div className="flex gap-2 justify-end">
                {task.status !== "completed" && (
                  <button
                    disabled={loadingId === task._id}
                    onClick={() => handleComplete(task._id)}
                    className="px-3 py-1.5 text-sm font-medium bg-green-50 text-green-600 border border-green-200 rounded-lg hover:bg-green-100 disabled:opacity-50 transition-colors"
                  >
                    Complete
                  </button>
                )}

                <button
                  disabled={loadingId === task._id}
                  onClick={() => onEdit(task)}
                  className="px-3 py-1.5 text-sm font-medium bg-blue-50 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-100 disabled:opacity-50 transition-colors"
                >
                  Edit
                </button>

                <button
                  disabled={loadingId === task._id}
                  onClick={() => handleDelete(task._id)}
                  className="px-3 py-1.5 text-sm font-medium bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 disabled:opacity-50 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Taskcard;
