import { useApp } from "../context/AppContext";
import {
  LayoutDashboard,
  CheckCircle2,
  CalendarDays,
  Clock3,
  Settings,
  GraduationCap,
  Target,
  Sun,
  Moon,
  Milestone,
  Play,
  RefreshCw,
} from "lucide-react";

export default function Sidebar({ onOpenAuth }) {
  const {
    currentTab,
    setCurrentTab,
    theme,
    setSpecificTheme,
    taskStats,
    studyData,
    isSyncing,
  } = useApp();

  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      id: "tasks",
      label: "My Tasks",
      icon: CheckCircle2,
      badge: taskStats.pending > 0 ? taskStats.pending : null,
      badgeClass: "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300",
    },
    {
      id: "timetable",
      label: "Timetable & Courses",
      icon: CalendarDays,
    },
    {
      id: "study",
      label: "Study & Analytics",
      icon: Clock3,
    },
    {
      id: "roadmap",
      label: "Roadmap (8 Phases)",
      icon: Milestone,
      badge: "8/8 Done",
      badgeClass: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
    },
    {
      id: "profile",
      label: "Profile & Settings",
      icon: Settings,
    },
  ];

  const goalHours = studyData?.dailyGoalHours || 4;
  const studiedHours = studyData?.todayStudiedHours || 0;
  const goalProgress = Math.min(100, Math.round((studiedHours / goalHours) * 100));

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-slate-200 bg-white p-5 md:flex dark:border-slate-800 dark:bg-slate-950 transition-colors">
      {/* Brand Header */}
      <div className="mb-8 flex items-center justify-between">
        <div
          onClick={() => setCurrentTab("dashboard")}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-600 p-2.5 text-white shadow-lg shadow-violet-500/25 group-hover:scale-105 transition-transform">
            <GraduationCap size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
              CampusFlow
            </h1>
            <p className="text-xs text-slate-400">Student workspace</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-3 px-1">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Workspace
        </p>
        <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
          {isSyncing ? (
            <span className="flex items-center gap-1 text-violet-500">
              <RefreshCw size={11} className="animate-spin" /> Saving...
            </span>
          ) : (
            <span className="flex items-center gap-1 text-emerald-500">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> Offline-ready
            </span>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-1.5 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold transition-all ${
                isActive
                  ? "bg-violet-50 text-violet-700 shadow-sm dark:bg-violet-950/60 dark:text-violet-300"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900/60 dark:hover:text-slate-200"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon size={19} className={isActive ? "text-violet-600 dark:text-violet-400" : "text-slate-400"} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    item.badgeClass || "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Daily Goal Card */}
      <div className="mt-4 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-700 p-4 text-white shadow-lg shadow-violet-600/20">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target size={18} className="text-violet-200" />
            <span className="font-semibold text-sm">Daily Goal</span>
          </div>
          <button
            onClick={() => setCurrentTab("study")}
            className="rounded-lg bg-white/20 hover:bg-white/30 p-1 text-white transition-colors"
            title="Open Pomodoro Timer"
            aria-label="Start study session"
          >
            <Play size={13} fill="currentColor" />
          </button>
        </div>

        <p className="mb-3 text-xs text-violet-100 leading-relaxed">
          {goalProgress >= 100
            ? "Awesome! You hit your daily study goal today! 🎉"
            : "Keep learning and reach your daily study target."}
        </p>

        <div className="mb-2 h-2 overflow-hidden rounded-full bg-violet-400/40">
          <div
            className="h-full rounded-full bg-white transition-all duration-500"
            style={{ width: `${goalProgress}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-xs text-violet-100">
          <span>{studiedHours} of {goalHours} hrs</span>
          <span className="font-bold">{goalProgress}%</span>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="mt-4 flex flex-col gap-2.5 border-t border-slate-100 pt-4 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Theme
          </span>
          <div className="flex items-center rounded-xl bg-slate-100 p-1 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setSpecificTheme("light")}
              className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-bold transition-all ${
                theme === "light"
                  ? "bg-white text-amber-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-700 dark:text-slate-400"
              }`}
              title="Day Mode (Light)"
            >
              <Sun size={13} className={theme === "light" ? "text-amber-500 fill-amber-500/20" : ""} />
              <span>Day</span>
            </button>
            <button
              type="button"
              onClick={() => setSpecificTheme("dark")}
              className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-bold transition-all ${
                theme === "dark"
                  ? "bg-violet-600 text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-700 dark:text-slate-400"
              }`}
              title="Night Mode (Dark)"
            >
              <Moon size={13} className={theme === "dark" ? "fill-white/20" : ""} />
              <span>Night</span>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs pt-1">
          <button
            onClick={onOpenAuth}
            className="text-violet-600 hover:text-violet-700 dark:text-violet-400 font-semibold"
          >
            Auth / Sync
          </button>
          <span className="text-[11px] text-slate-400">CampusFlow v1.0</span>
        </div>
      </div>
    </aside>
  );
}
