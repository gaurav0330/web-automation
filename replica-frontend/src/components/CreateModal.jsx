import { useState, useEffect } from "react";
import { createTask, getTasks } from "../api/tasks";
import { createProject, getProjects } from "../api/projects";

export default function CreateModal({ onClose }) {
  const [type, setType] = useState("task");
  const [name, setName] = useState("");
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    const list = await getProjects();
    setProjects(list);
  }

  async function handleCreate() {
    if (!name.trim()) return;

    let projectId = 1;

    // If no project exists → auto-create default project
    if (projects.length === 0) {
      const p = await createProject({
        name: "Default Project",
        color: "#ff0000",
        owner_id: 1,
      });
      projectId = p.id;
    } else {
      projectId = projects[0].id;
    }

    if (type === "task") {
      await createTask({
        name,
        project_id: projectId,
        description: "",
        assignee_id: null,
      });
    } else {
      await createProject({
        name,
        color: "#ff0000",
        owner_id: 1,
      });
    }

    onClose();
    window.location.reload();
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-96 space-y-4">
        <h2 className="text-xl font-bold">Create</h2>

        <select
          className="p-2 border w-full rounded"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="task">Task</option>
          <option value="project">Project</option>
        </select>

        <input
          className="p-2 border w-full rounded"
          placeholder={`Enter ${type} name...`}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2">Cancel</button>

          <button
            onClick={handleCreate}
            className="bg-purple-600 text-white px-4 py-2 rounded"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
