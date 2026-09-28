import PomodoroTimer from "./PomodoroTimer";
import DailyGoalTracker from "./DailyGoalTracker";
import ProductivityAnalytics from "./ProductivityAnalytics";

export default function StudyPlannerModule() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Study Planner & Analytics
          </h2>
          <span className="rounded-full bg-violet-100 px-2.5 py-0.5 text-xs font-semibold text-violet-700 dark:bg-violet-950 dark:text-violet-300">
            Phase 4 Active
          </span>
        </div>
        <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Study timer, daily goals, weekly interactive charts aur productivity tracking.
        </p>
      </div>

      {/* Top 2 Columns: Pomodoro Focus Timer & Daily Goal Tracker */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">
        <PomodoroTimer />
        <DailyGoalTracker />
      </div>

      {/* Analytics & Charts */}
      <ProductivityAnalytics />
    </div>
  );
}
