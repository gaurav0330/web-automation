import { Outlet, NavLink } from "react-router-dom";
import { useState } from "react";
import { Home, ListTodo, Inbox, BarChart2, Folder, PlusCircle } from "lucide-react";
import CreateModal from "../components/CreateModal";

export default function MainLayout() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex">

      {showModal && <CreateModal onClose={() => setShowModal(false)} />}

      {/* SIDEBAR */}
      <aside className="w-64 h-screen bg-gray-900 text-gray-200 p-5 fixed space-y-6 overflow-y-auto">
        <h1 className="text-xl font-bold">Asana Clone</h1>

        <div className="space-y-4 mt-6">
          <NavLink to="/home" className="flex gap-3 hover:text-white">
            <Home size={20} /> Home
          </NavLink>

          <NavLink to="/tasks" className="flex gap-3 hover:text-white">
            <ListTodo size={20} /> My tasks
          </NavLink>

          <NavLink to="/projects" className="flex gap-3 hover:text-white">
            <Folder size={20} /> Projects
          </NavLink>
        </div>

      </aside>

      {/* TOP BAR */}
      <div className="fixed top-0 left-64 right-0 bg-white h-14 shadow flex items-center justify-between px-6 z-50">
        <input type="text" placeholder="Search" className="w-1/3 border p-2 rounded-lg" />

        <button
          onClick={() => setShowModal(true)}
          className="bg-purple-600 text-white px-4 py-2 rounded"
        >
          + Create
        </button>
      </div>

      {/* MAIN CONTENT */}
      <main className="ml-64 mt-16 p-8 bg-gray-100 min-h-screen w-full">
        <Outlet />
      </main>

    </div>
  );
}
