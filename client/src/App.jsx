import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const API = "http://localhost:5000/tasks";

  // GET TASKS
  const fetchTasks = async () => {
    const res = await axios.get(API);
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ADD TASK
  const addTask = async () => {
    if (!title.trim()) return;

    await axios.post(API, { title });
    setTitle("");
    fetchTasks();
  };

  // DELETE TASK
  const deleteTask = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchTasks();
  };

  // TOGGLE TASK
  const toggleTask = async (task) => {
    await axios.put(`${API}/${task.id}`, {
      completed: !task.completed,
    });
    fetchTasks();
  };

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        darkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div className="max-w-xl mx-auto px-4 py-10">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className={`text-3xl font-bold transition ${
              darkMode ? "text-white" : "text-gray-900"
            }`}>
              TaskFlow 
            </h1>

            <p className={`${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              Organize your tasks efficiently
            </p>
          </div>

          {/* DARK MODE TOGGLE */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-3 py-2 rounded-md bg-orange-500 text-white hover:bg-orange-600 transition-all duration-300"
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>

        {/* INPUT */}
        <div className="flex gap-2 mb-6">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a new task..."
            className={`flex-1 px-4 py-2 rounded-md border focus:outline-none focus:ring-2 transition-all duration-300 ${
              darkMode
                ? "bg-gray-800 text-white border-gray-700 focus:ring-orange-500"
                : "bg-white border-gray-300 focus:ring-orange-500"
            }`}
          />

          <button
            onClick={addTask}
            className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-md transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Add
          </button>
        </div>

        {/* TASK LIST */}
        <div className="space-y-3">
          {tasks.length === 0 ? (
            <div className={`text-center mt-10 ${
              darkMode ? "text-gray-500" : "text-gray-400"
            }`}>
              No tasks yet. Add your first task ✨
            </div>
          ) : (
            tasks.map((task, index) => (
              <div
                key={task.id}
                className={`p-4 rounded-md flex justify-between items-center shadow-sm border transition-all duration-300 animate-fadeIn ${
                  darkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-200"
                }`}
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                {/* TITLE */}
                <span
                  onClick={() => toggleTask(task)}
                  className={`flex-1 cursor-pointer transition-all duration-300 ${
                    task.completed
                      ? "line-through text-gray-400"
                      : darkMode
                      ? "text-white"
                      : "text-gray-800"
                  }`}
                >
                  {task.title}
                </span>

                {/* ACTIONS */}
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleTask(task)}
                    className="px-3 py-1 text-sm rounded-md bg-orange-100 text-orange-600 hover:bg-orange-200 transition-all duration-300 hover:scale-105"
                  >
                    Done
                  </button>

                  <button
                    onClick={() => deleteTask(task.id)}
                    className="px-3 py-1 text-sm rounded-md bg-red-100 text-red-600 hover:bg-red-200 transition-all duration-300 hover:scale-105"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* SIMPLE ANIMATION STYLE */}
      <style>
        {`
          .animate-fadeIn {
            opacity: 0;
            transform: translateY(10px);
            animation: fadeIn 0.3s ease forwards;
          }

          @keyframes fadeIn {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
}

export default App;