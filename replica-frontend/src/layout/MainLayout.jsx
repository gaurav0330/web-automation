import { Outlet, NavLink } from "react-router-dom";
import { Home, ListTodo, Inbox, BarChart2, Folder, PlusCircle } from "lucide-react";

export default function MainLayout() {
  return (
    <div className="flex">
      
      {/* SIDEBAR */}
      <aside className="w-64 h-screen bg-gray-900 text-gray-200 p-5 fixed space-y-6 overflow-y-auto">
        <h1 className="text-xl font-bold mb-4">Asana Clone</h1>

        {/* MAIN LINKS */}
        <div className="space-y-4">
          <NavLink to="/home" className="flex items-center gap-3 hover:text-white">
            <Home size={20} /> Home
          </NavLink>

          <NavLink to="/tasks" className="flex items-center gap-3 hover:text-white">
            <ListTodo size={20} /> My tasks
          </NavLink>

          <NavLink to="/inbox" className="flex items-center gap-3 hover:text-white">
            <Inbox size={20} /> Inbox
          </NavLink>
        </div>

        <hr className="border-gray-700" />

        {/* INSIGHTS */}
        <div className="space-y-4">
          <h2 className="text-xs text-gray-500 uppercase">Insights</h2>

          <NavLink to="/reporting" className="flex items-center gap-3 hover:text-white">
            <BarChart2 size={20} /> Reporting
          </NavLink>

          <NavLink to="/goals" className="flex items-center gap-3 hover:text-white">
            <Folder size={20} /> Goals
          </NavLink>
        </div>

        <hr className="border-gray-700" />

        {/* PROJECTS */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs text-gray-500 uppercase">Projects</h2>
            <PlusCircle size={18} className="cursor-pointer hover:text-white" />
          </div>

          <NavLink to="/projects" className="flex items-center gap-3 hover:text-white">
            <Folder size={20} /> All Projects
          </NavLink>
        </div>
      </aside>

      {/* TOP BAR */}
      <div className="fixed top-0 left-64 right-0 bg-white h-14 shadow flex items-center px-6 justify-between z-50">
        
        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search"
          className="w-1/3 p-2 border rounded-lg"
        />

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg">
            + Create
          </button>

          <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center font-bold">
            GJ
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <main className="ml-64 mt-16 p-8 bg-gray-100 min-h-screen w-full">
        <Outlet />
      </main>
    </div>
  );
}
