import { useState, useEffect } from "react";
import Modal from "../Modal";
import { useApp } from "../../context/AppContext";

export default function TaskModal({ isOpen, onClose, taskToEdit = null }) {
  const { addTask, updateTask, courses, showToast } = useApp();

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("Machine Learning");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState(new Date().toISOString().split("T")[0]);
  const [time, setTime] = useState("12:00 PM");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title || "");
      setSubject(taskToEdit.subject || "Machine Learning");
      setPriority(taskToEdit.priority || "Medium");
      setDueDate(taskToEdit.dueDate || new Date().toISOString().split("T")[0]);
      setTime(taskToEdit.time || "12:00 PM");
      setNotes(taskToEdit.notes || "");
    } else {
      setTitle("");
      setSubject(courses.length > 0 ? courses[0].name : "General");
      setPriority("Medium");
      setDueDate(new Date().toISOString().split("T")[0]);
      setTime("12:00 PM");
      setNotes("");
    }
  }, [taskToEdit, isOpen, courses]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      showToast("Validation Error", "Task title is required", "warning");
      return;
    }

    if (taskToEdit) {
      updateTask(taskToEdit.id, {
        title: title.trim(),
        subject,
        priority,
        dueDate,
        time,
        notes: notes.trim(),
      });
    } else {
      addTask({
        title: title.trim(),
        subject,
        priority,
        dueDate,
        time,
        notes: notes.trim(),
      });
    }

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={taskToEdit ? "Edit Task" : "Create New Task"}
      subtitle="Phase 2: Task Management & Dynamic Statistics"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Task Title <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Complete Machine Learning formula sheet"
            className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-slate-800 dark:bg-slate-800 dark:text-white"
            autoFocus
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Subject / Course
            </label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none bg-white dark:border-slate-800 dark:bg-slate-800 dark:text-white"
            >
              {courses.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
              <option value="General">General / Personal</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Priority
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none bg-white dark:border-slate-800 dark:bg-slate-800 dark:text-white"
            >
              <option value="High">🔴 High Priority</option>
              <option value="Medium">🟡 Medium Priority</option>
              <option value="Low">🟢 Low Priority</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Time
            </label>
            <input
              type="text"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="e.g. 10:00 AM"
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Notes / Description (Optional)
          </label>
          <textarea
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add formulas, reference links, or checklist items..."
            className="w-full rounded-xl border border-slate-200 p-3 text-sm outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-white"
          />
        </div>

        <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-xl bg-violet-600 px-5 py-2 text-xs font-semibold text-white shadow-md hover:bg-violet-700 transition-colors"
          >
            {taskToEdit ? "Update Task" : "Add Task"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
