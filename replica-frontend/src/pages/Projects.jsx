import { useEffect, useState } from "react";
import { getProjects } from "../api/projects";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    const data = await getProjects();
    setProjects(data);
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Projects</h1>

      <div className="grid grid-cols-2 gap-6">
        {projects.map((p) => (
          <div key={p.id} className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold">{p.name}</h2>
            <p className="text-gray-500">Owner ID: {p.owner_id}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
