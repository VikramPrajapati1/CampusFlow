import { useEffect } from "react";
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
  X,
} from "lucide-react";

export default function MobileDrawer() {
  const {
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    currentTab,
    setCurrentTab,
    theme,
    setSpecificTheme,
    taskStats,
    studyData,
  } = useApp();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileMenuOpen, setIsMobileMenuOpen]);

  if (!isMobileMenuOpen) return null;

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    {
      id: "tasks",
      label: "My Tasks",
      icon: CheckCircle2,
      badge: taskStats.pending > 0 ? `${taskStats.pending} pending` : null,
    },
    { id: "timetable", label: "Timetable & Courses", icon: CalendarDays },
    { id: "study", label: "Study Planner & Analytics", icon: Clock3 },
    { id: "roadmap", label: "Development Roadmap", icon: Milestone, badge: "8 Phases" },
    { id: "profile", label: "Profile & Settings", icon: Settings },
  ];

  const handleNavClick = (tabId) => {
    setCurrentTab(tabId);
    setIsMobileMenuOpen(false);
  };

  const goalHours = studyData?.dailyGoalHours || 4;
  const studiedHours = studyData?.todayStudiedHours || 0;
  const goalProgress = Math.min(100, Math.round((studiedHours / goalHours) * 100));

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex md:hidden"
    >
      {/* Light dismiss backdrop */}
      <div
        onClick={() => setIsMobileMenuOpen(false)}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="relative flex w-4/5 max-w-xs flex-1 flex-col bg-white p-5 shadow-2xl dark:bg-slate-950 dark:text-slate-100 animate-in slide-in-from-left duration-300">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-600 p-2.5 text-white shadow-md">
              <GraduationCap size={22} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                CampusFlow
              </h2>
              <p className="text-xs text-slate-400">Student workspace</p>
            </div>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-900"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="space-y-1.5 flex-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold transition-colors ${
                  isActive
                    ? "bg-violet-50 text-violet-700 dark:bg-violet-950 dark:text-violet-300"
                    : "text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-900"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={19} className={isActive ? "text-violet-600" : "text-slate-400"} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="rounded-full bg-violet-100 px-2 py-0.5 text-[11px] font-medium text-violet-700 dark:bg-violet-950 dark:text-violet-300">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Daily Goal Mini Banner */}
        <div className="mt-4 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-700 p-4 text-white">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-semibold flex items-center gap-1.5">
              <Target size={15} /> Daily Goal
            </span>
            <span className="text-xs font-bold">{goalProgress}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-violet-400/40">
            <div className="h-full bg-white rounded-full" style={{ width: `${goalProgress}%` }} />
          </div>
          <p className="mt-1.5 text-[11px] text-violet-100">
            {studiedHours} / {goalHours} hrs studied today
          </p>
        </div>

        {/* Footer controls */}
        <div className="mt-4 border-t border-slate-100 pt-4 dark:border-slate-800 flex items-center justify-between">
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
          <span className="text-[11px] text-slate-400 font-medium">CampusFlow v1.0</span>
        </div>
      </div>
    </div>
  );
}
