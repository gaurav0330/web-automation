import { useEffect, useState } from "react";
import { getTasks } from "../api/tasks";

export default function Home() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const data = await getTasks();
    setTasks(data);
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Good evening, Gaurav</h1>

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="font-bold text-xl mb-4">My tasks</h2>

        {tasks.length === 0 && (
          <p className="text-gray-500">You have no tasks yet.</p>
        )}

        {tasks.map(t => (
          <div key={t.id} className="border p-3 rounded mb-3">
            <strong>{t.name}</strong>
            <p className="text-gray-500">{t.description || "No description"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
