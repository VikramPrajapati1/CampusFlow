import { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Calendar, Plus, Award } from "lucide-react";
import Modal from "../Modal";

export default function AssignmentTracker() {
  const { assignments, courses, showToast } = useApp();
  const [localAssignments, setLocalAssignments] = useState(assignments);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [course, setCourse] = useState(courses[0]?.name || "Machine Learning");
  const [dueDate, setDueDate] = useState("2026-10-10");
  const [points, setPoints] = useState(20);

  const toggleStatus = (id) => {
    setLocalAssignments((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          const nextStatus =
            a.status === "Submitted"
              ? "Pending"
              : a.status === "Pending"
              ? "In Progress"
              : "Submitted";
          return { ...a, status: nextStatus };
        }
        return a;
      })
    );
    showToast("Assignment Updated", "Status changed", "info");
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newA = {
      id: "assign-" + Date.now(),
      title: title.trim(),
      course,
      dueDate,
      points: Number(points) || 10,
      status: "Pending",
    };

    setLocalAssignments([newA, ...localAssignments]);
    showToast("Assignment Added", title, "success");
    setTitle("");
    setIsModalOpen(false);
  };

  const statusStyles = {
    Submitted: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border-emerald-200",
    "In Progress": "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300 border-amber-200",
    Pending: "bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300 border-rose-200",
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">
            Semester Assignments & Projects
          </h3>
          <p className="text-xs text-slate-400">
            Keep track of submissions, homework, and lab reports
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-1.5 rounded-xl bg-violet-600 px-3.5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-violet-700 transition-colors"
        >
          <Plus size={15} />
          <span>New Assignment</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {localAssignments.map((a) => (
          <div
            key={a.id}
            className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  {a.course}
                </span>
                <span
                  className={`rounded-full border px-2.5 py-0.5 text-xs font-bold ${
                    statusStyles[a.status] || statusStyles.Pending
                  }`}
                >
                  {a.status}
                </span>
              </div>

              <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                {a.title}
              </h4>

              <div className="mt-3 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <Calendar size={13} /> Due: {a.dueDate}
                </span>
                <span className="flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300">
                  <Award size={13} className="text-violet-600" /> {a.points} Pts
                </span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={() => toggleStatus(a.id)}
                className="text-xs font-semibold text-violet-600 hover:text-violet-700 dark:text-violet-400"
              >
                Change Status: {a.status === "Submitted" ? "Mark Pending" : "Mark Next Step"} →
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Course Assignment"
        subtitle="Phase 3: Assignment & Submission Management"
      >
        <form onSubmit={handleAdd} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Assignment Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Design Pattern Implementation Project"
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-white"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Course
              </label>
              <select
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none bg-white dark:border-slate-800 dark:bg-slate-800 dark:text-white"
              >
                {courses.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Points / Weightage
              </label>
              <input
                type="number"
                value={points}
                onChange={(e) => setPoints(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Due Date
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none bg-white dark:border-slate-800 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-violet-600 px-5 py-2 text-xs font-semibold text-white shadow-md hover:bg-violet-700"
            >
              Save Assignment
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
