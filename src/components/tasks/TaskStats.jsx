import { useApp } from "../../context/AppContext";
import { CheckCircle2, Clock, AlertTriangle, Layers, TrendingUp } from "lucide-react";

export default function TaskStats() {
  const { taskStats } = useApp();

  return (
    <div className="space-y-4">
      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Tasks</span>
            <div className="rounded-xl bg-slate-100 p-2 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              <Layers size={17} />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white">
            {taskStats.total}
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">Assigned to semester</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Completed</span>
            <div className="rounded-xl bg-emerald-100 p-2 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-300">
              <CheckCircle2 size={17} />
            </div>
          </div>
          <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            {taskStats.completed}
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">{taskStats.completionRate}% completion rate</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Pending</span>
            <div className="rounded-xl bg-violet-100 p-2 text-violet-600 dark:bg-violet-950 dark:text-violet-300">
              <Clock size={17} />
            </div>
          </div>
          <div className="text-2xl font-bold text-violet-600 dark:text-violet-400">
            {taskStats.pending}
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">Needs completion</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Urgent</span>
            <div className="rounded-xl bg-rose-100 p-2 text-rose-600 dark:bg-rose-950 dark:text-rose-300">
              <AlertTriangle size={17} />
            </div>
          </div>
          <div className="text-2xl font-bold text-rose-600 dark:text-rose-400">
            {taskStats.highPriority}
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">High priority pending</p>
        </div>
      </div>

      {/* Dynamic Progress Bar */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <TrendingUp size={15} className="text-violet-600 dark:text-violet-400" />
            Overall Task Velocity
          </span>
          <span className="font-bold text-violet-600 dark:text-violet-400">
            {taskStats.completed} of {taskStats.total} done ({taskStats.completionRate}%)
          </span>
        </div>
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 transition-all duration-500"
            style={{ width: `${taskStats.completionRate}%` }}
          />
        </div>
      </div>
    </div>
  );
}
