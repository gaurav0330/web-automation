export default function Projects() {
  const projects = [
    { id: 1, name: "Cross-functional Project", color: "bg-red-500" },
    { id: 2, name: "Marketing Sprint", color: "bg-blue-500" },
    { id: 3, name: "Engineering Tasks", color: "bg-green-500" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Projects</h1>

      <div className="grid grid-cols-2 gap-6">
        {projects.map((p) => (
          <div key={p.id} className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
            <div className={`w-10 h-10 rounded-full ${p.color}`}></div>
            <h2 className="text-xl font-semibold">{p.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
