export default function Tasks() {
  const tasks = [
    { id: 1, title: "Fix navbar", due: "Today", status: "In progress" },
    { id: 2, title: "Prepare report", due: "Tomorrow", status: "Not started" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">My Tasks</h1>

      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        {tasks.map(t => (
          <div key={t.id} className="flex justify-between border p-3 rounded items-center">
            <div>
              <h3 className="font-semibold">{t.title}</h3>
              <p className="text-sm text-gray-500">{t.status}</p>
            </div>

            <span className="text-sm text-gray-500">{t.due}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
