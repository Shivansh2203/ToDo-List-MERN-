import React, { useState, useEffect } from "react";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const Content = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  // fetch tasks from backend
  useEffect(() => {
    fetch(`${API_URL}/tasks`)
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!task.trim()) return;

    try {
      const res = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: task })
      });
      const data = await res.json();
      setTasks([...tasks, data]);
      setTask("");
    } catch (err) {
      console.error(err);
    }
  };

  const toggleDone = async (i, id) => {
    try {
      const updated = { ...tasks[i], done: !tasks[i].done };
      await fetch(`${API_URL}/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated)
      });
      const copy = [...tasks];
      copy[i] = updated;
      setTasks(copy);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await fetch(`${API_URL}/tasks/${id}`, { method: "DELETE" });
      setTasks(tasks.filter(t => t._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center m-2 p-4">
      {/* Glow style */}
      <style>
        {`
          @keyframes glow {
            0%, 100% { opacity: 0.5; filter: brightness(0.85); }
            50% { opacity: 1; filter: brightness(1.4); }
          }
          .glow {
            animation: glow 5s ease-in-out infinite;
          }
        `}
      </style>

      <h3 className="text-3xl md:text-4xl text-gray-400 font-semibold italic drop-shadow-md mb-6">
        “Tasks  
        <span className="text-yellow-400 glow ml-1">Made</span>
        Easy”
      </h3>

      {/* input form */}
      <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-md">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 p-3 rounded-lg bg-black text-white placeholder-gray-400 border-2 border-purple-600 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none"
        />
        <button
          type="submit"
          className="bg-purple-900 text-gray-300 px-4 py-3 rounded-lg hover:bg-pink-500 transition-colors"
        >
          Add
        </button>
      </form>

      {/* task list */}
      <ul className="mt-6 w-full max-w-md">
        {tasks.map((t, i) => (
          <li
            key={t._id}
            className="flex justify-between items-center bg-gray-800 text-gray-300 px-4 py-2 rounded-lg mb-2 shadow-md"
          >
            <span
              onClick={() => toggleDone(i, t._id)}
              className={`flex-1 cursor-pointer flex items-center gap-2 ${t.done ? "line-through text-gray-500" : ""}`}
            >
              {t.done && (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              )}
              {t.text}
            </span>

            <button
              onClick={() => deleteTask(t._id)}
              className="ml-2 text-green-400 hover:text-red-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Content;
