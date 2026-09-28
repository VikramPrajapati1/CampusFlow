import { useState } from "react";
import { CheckCircle2, Clock3, Calendar, Edit2, Trash2, FileText } from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function TaskCard({ task, onEdit }) {
  const { toggleTask, deleteTask } = useApp();
  const [showNotes, setShowNotes] = useState(false);

  const priorityStyles = {
    High: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-900/60",
    Medium: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-900/60",
    Low: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-900/60",
  };

  return (
    <div
      className={`group rounded-2xl border p-4 transition-all duration-200 ${
        task.done
          ? "border-slate-200 bg-slate-50/70 dark:border-slate-800/60 dark:bg-slate-900/40 opacity-80"
          : "border-slate-200 bg-white hover:border-violet-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-violet-700/60"
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <button
          type="button"
          onClick={() => toggleTask(task.id)}
          className="mt-0.5 shrink-0 rounded-lg p-0.5 text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
          aria-label={task.done ? "Mark as pending" : "Mark as completed"}
        >
          <CheckCircle2
            size={22}
            className={
              task.done
                ? "text-emerald-500 fill-emerald-500/10"
                : "text-slate-300 hover:text-violet-500 dark:text-slate-700"
            }
          />
        </button>

        {/* Task Details */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span
              className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold ${
                priorityStyles[task.priority] || priorityStyles.Medium
              }`}
            >
              {task.priority} Priority
            </span>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              {task.subject}
            </span>
          </div>

          <h4
            className={`text-sm font-semibold transition-all ${
              task.done
                ? "text-slate-400 line-through dark:text-slate-500"
                : "text-slate-800 dark:text-slate-100"
            }`}
          >
            {task.title}
          </h4>

          {/* Due Info */}
          <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
            {task.time && (
              <span className="flex items-center gap-1 text-violet-600 dark:text-violet-400 font-medium">
                <Clock3 size={13} /> {task.time}
              </span>
            )}
            {task.dueDate && (
              <span className="flex items-center gap-1">
                <Calendar size={13} /> {task.dueDate}
              </span>
            )}
            {task.notes && (
              <button
                type="button"
                onClick={() => setShowNotes(!showNotes)}
                className="flex items-center gap-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 underline"
              >
                <FileText size={12} /> {showNotes ? "Hide Notes" : "View Notes"}
              </button>
            )}
          </div>

          {/* Notes display */}
          {showNotes && task.notes && (
            <div className="mt-2.5 rounded-xl border border-slate-100 bg-slate-50 p-2.5 text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
              {task.notes}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1 shrink-0 opacity-80 sm:opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(task)}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            title="Edit task"
            aria-label="Edit task"
          >
            <Edit2 size={15} />
          </button>
          <button
            onClick={() => deleteTask(task.id)}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/40 dark:hover:text-rose-400"
            title="Delete task"
            aria-label="Delete task"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
