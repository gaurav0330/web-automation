import { useEffect, useState } from "react";
import { getTasks, createTask } from "../api/tasks";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    const data = await getTasks();
    setTasks(data);
  }

  async function addTask() {
    await createTask({
      name: "New Task",
      project_id: 1,
      description: "Generated from frontend",
      assignee_id: null,
    });

    loadTasks();
  }

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">My Tasks</h1>

        <button onClick={addTask} className="bg-blue-600 text-white px-4 py-2 rounded">
          + Add Task
        </button>
      </div>

      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        {tasks.map((t) => (
          <div key={t.id} className="border p-3 rounded flex justify-between">
            <div>
              <h2 className="font-semibold">{t.name}</h2>
              <p className="text-gray-500">{t.description}</p>
            </div>
            <span className="text-gray-500">{t.due_date || "No due date"}</span>
          </div>
        ))}

        {tasks.length === 0 && (
          <p className="text-gray-400 text-center">No tasks found.</p>
        )}
      </div>
    </div>
  );
}
