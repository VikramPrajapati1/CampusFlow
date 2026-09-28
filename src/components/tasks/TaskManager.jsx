import { useState, useMemo } from "react";
import { useApp } from "../../context/AppContext";
import TaskCard from "./TaskCard";
import TaskStats from "./TaskStats";
import TaskModal from "./TaskModal";
import { Plus, Search, ListFilter, CheckCircle2 } from "lucide-react";

export default function TaskManager() {
  const { tasks, courses } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const [statusFilter, setStatusFilter] = useState("all"); // 'all' | 'pending' | 'completed'
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [search, setSearch] = useState("");

  const handleOpenAdd = () => {
    setTaskToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  // Filter tasks dynamically
  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      // Status
      if (statusFilter === "pending" && t.done) return false;
      if (statusFilter === "completed" && !t.done) return false;

      // Priority
      if (priorityFilter !== "all" && t.priority !== priorityFilter) return false;

      // Subject
      if (subjectFilter !== "all" && t.subject !== subjectFilter) return false;

      // Search
      if (search.trim()) {
        const query = search.toLowerCase();
        const matchesTitle = t.title.toLowerCase().includes(query);
        const matchesSubject = t.subject.toLowerCase().includes(query);
        const matchesNotes = t.notes?.toLowerCase().includes(query);
        if (!matchesTitle && !matchesSubject && !matchesNotes) return false;
      }

      return true;
    });
  }, [tasks, statusFilter, priorityFilter, subjectFilter, search]);

  return (
    <div className="space-y-6">
      {/* Top Banner & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Task Management
            </h2>
            <span className="rounded-full bg-violet-100 px-2.5 py-0.5 text-xs font-semibold text-violet-700 dark:bg-violet-950 dark:text-violet-300">
              Phase 2 Active
            </span>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Add, edit, delete, organize tasks aur track automatic progress stats in real time.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 rounded-2xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 hover:bg-violet-700 transition-all hover:scale-[1.02] shrink-0 self-start sm:self-auto"
        >
          <Plus size={18} />
          <span>Create Task</span>
        </button>
      </div>

      {/* Dynamic Statistics */}
      <TaskStats />

      {/* Search & Filter Toolbar */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 shadow-sm space-y-3">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Status Tabs */}
          <div className="flex rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
            {[
              { id: "all", label: "All Tasks" },
              { id: "pending", label: "Pending" },
              { id: "completed", label: "Completed" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
                  statusFilter === tab.id
                    ? "bg-white text-violet-700 shadow-sm dark:bg-slate-700 dark:text-violet-300"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-400"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="flex flex-1 max-w-md items-center gap-2 rounded-xl border border-slate-200 px-3 py-1.5 text-xs dark:border-slate-800 dark:bg-slate-800">
            <Search size={15} className="text-slate-400 shrink-0" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, subject or notes..."
              className="w-full bg-transparent outline-none text-slate-800 dark:text-slate-200"
            />
            {search && (
              <button onClick={() => setSearch("")} className="text-slate-400 hover:text-slate-600">
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Dropdown Filters */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
          <span className="text-slate-400 font-medium flex items-center gap-1">
            <ListFilter size={13} /> Filters:
          </span>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-slate-700 outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300"
          >
            <option value="all">All Priorities</option>
            <option value="High">🔴 High Priority</option>
            <option value="Medium">🟡 Medium Priority</option>
            <option value="Low">🟢 Low Priority</option>
          </select>

          <select
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-slate-700 outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300"
          >
            <option value="all">All Subjects</option>
            {courses.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>

          {(priorityFilter !== "all" || subjectFilter !== "all" || search) && (
            <button
              onClick={() => {
                setPriorityFilter("all");
                setSubjectFilter("all");
                setSearch("");
                setStatusFilter("all");
              }}
              className="ml-auto text-violet-600 hover:underline dark:text-violet-400 font-medium"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center dark:border-slate-800 dark:bg-slate-900">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-violet-600 dark:bg-violet-950 dark:text-violet-400">
              <CheckCircle2 size={28} />
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              No tasks found
            </h4>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              No tasks match your current filters or all checklist items have been completed.
            </p>
            <button
              onClick={handleOpenAdd}
              className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-violet-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-violet-700"
            >
              <Plus size={15} />
              <span>Create New Task</span>
            </button>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} onEdit={handleOpenEdit} />
          ))
        )}
      </div>

      {/* Task Modal for Add & Edit */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        taskToEdit={taskToEdit}
      />
    </div>
  );
}
