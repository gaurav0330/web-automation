export default function Home() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-gray-500">Saturday, November 15</h2>
        <h1 className="text-4xl font-bold">Good evening, Gaurav</h1>
      </div>

      {/* MY TASKS BLOCK */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">My tasks</h2>

        {/* TABS */}
        <div className="flex gap-6 border-b pb-2 mb-4">
          <button className="font-bold border-b-2 border-black">Upcoming</button>
          <button className="text-gray-500">Overdue</button>
          <button className="text-gray-500">Completed</button>
        </div>

        {/* TASK LIST */}
        <ul className="space-y-4">
          <li className="flex justify-between py-3 border rounded px-3">
            <span>Draft project brief</span>
            <span className="text-sm text-gray-500">Today — Nov 18</span>
          </li>

          <li className="flex justify-between py-3 border rounded px-3">
            <span>Schedule kickoff meeting</span>
            <span className="text-sm text-gray-500">Nov 17 — 19</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
