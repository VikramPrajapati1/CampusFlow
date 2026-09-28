import { useState, useRef, useEffect } from "react";
import { useApp } from "../context/AppContext";
import {
  Menu,
  Search,
  Bell,
  Sun,
  Moon,
  Plus,
  ChevronDown,
  User,
  CheckCircle2,
  Calendar,
  Sparkles,
  Milestone,
} from "lucide-react";

export default function Navbar({ onOpenNewTask, onOpenAuth }) {
  const {
    user,
    theme,
    setSpecificTheme,
    setIsMobileMenuOpen,
    searchQuery,
    setSearchQuery,
    currentTab,
    setCurrentTab,
    taskStats,
    tasks,
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  // Close popovers on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const titles = {
    dashboard: "Student Dashboard",
    tasks: "Task Management",
    timetable: "Class Schedule & Courses",
    study: "Study Planner & Analytics",
    roadmap: "Development Roadmap",
    profile: "Profile & Preferences",
  };

  const highPriorityTasks = tasks.filter((t) => !t.done && t.priority === "High");

  return (
    <header className="mb-8 flex items-center justify-between gap-4">
      {/* Mobile Drawer Trigger & Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="rounded-2xl border border-slate-200 bg-white p-2.5 text-slate-700 shadow-sm hover:bg-slate-50 md:hidden dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
          aria-label="Open navigation menu"
        >
          <Menu size={20} />
        </button>

        <div>
          <div className="flex items-center gap-2">
            <p className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              {titles[currentTab] || "Student Workspace"}
            </p>
            {taskStats.pending > 0 && (
              <span className="hidden sm:inline-flex items-center rounded-full bg-violet-100 px-2 py-0.5 text-[11px] font-semibold text-violet-700 dark:bg-violet-950 dark:text-violet-300">
                {taskStats.pending} pending tasks
              </span>
            )}
          </div>
          <h2 className="text-xl font-bold sm:text-2xl text-slate-900 dark:text-white">
            Welcome back, {user?.name || "Vikram"}!
          </h2>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Quick Add Task Button */}
        <button
          onClick={onOpenNewTask}
          className="hidden sm:inline-flex items-center gap-2 rounded-2xl bg-violet-600 px-3.5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-violet-500/25 hover:bg-violet-700 transition-all hover:scale-[1.02]"
        >
          <Plus size={16} />
          <span>Add Task</span>
        </button>

        {/* Global Search Bar */}
        <div className="hidden lg:flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3.5 py-2 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <Search size={16} className="text-slate-400" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tasks, classes..."
            className="w-36 lg:w-52 bg-transparent text-sm text-slate-800 placeholder-slate-400 outline-none dark:text-slate-200"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              ✕
            </button>
          )}
        </div>

        {/* Day / Night Segmented Switch */}
        <div className="flex items-center rounded-2xl border border-slate-200 bg-slate-100/90 p-1 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
          <button
            type="button"
            onClick={() => setSpecificTheme("light")}
            className={`flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs font-bold transition-all ${
              theme === "light"
                ? "bg-white text-amber-600 shadow-sm"
                : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
            }`}
            title="Day Mode (Light)"
            aria-label="Switch to Day Mode"
          >
            <Sun size={15} className={theme === "light" ? "text-amber-500 fill-amber-500/20" : ""} />
            <span className="hidden sm:inline">Day</span>
          </button>
          <button
            type="button"
            onClick={() => setSpecificTheme("dark")}
            className={`flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs font-bold transition-all ${
              theme === "dark"
                ? "bg-violet-600 text-white shadow-sm"
                : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
            }`}
            title="Night Mode (Dark)"
            aria-label="Switch to Night Mode"
          >
            <Moon size={15} className={theme === "dark" ? "fill-white/20" : ""} />
            <span className="hidden sm:inline">Night</span>
          </button>
        </div>

        {/* Roadmap Quick Link */}
        <button
          onClick={() => setCurrentTab("roadmap")}
          className="hidden md:flex items-center gap-1.5 rounded-2xl border border-violet-200 bg-violet-50/70 px-3 py-2 text-xs font-semibold text-violet-700 hover:bg-violet-100 dark:border-violet-900 dark:bg-violet-950/40 dark:text-violet-300 transition-colors"
          title="View 8-Phase Development Roadmap"
        >
          <Milestone size={14} />
          <span>Roadmap</span>
        </button>

        {/* Notifications Popover */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative rounded-2xl border border-slate-200 bg-white p-2.5 text-slate-600 shadow-sm hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 transition-colors"
            aria-label="Notifications"
          >
            <Bell size={18} />
            {highPriorityTasks.length > 0 && (
              <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900 animate-pulse" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 rounded-3xl border border-slate-200 bg-white p-4 shadow-2xl dark:border-slate-800 dark:bg-slate-900 z-50 animate-in fade-in zoom-in-95">
              <div className="mb-3 flex items-center justify-between border-b border-slate-100 pb-2 dark:border-slate-800">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                  Notifications
                </h4>
                <span className="text-xs font-semibold text-violet-600 dark:text-violet-400">
                  {highPriorityTasks.length} Urgent
                </span>
              </div>

              <div className="space-y-2.5 max-h-64 overflow-y-auto">
                {highPriorityTasks.length === 0 ? (
                  <div className="py-6 text-center text-xs text-slate-400">
                    <CheckCircle2 size={24} className="mx-auto mb-1 text-emerald-500" />
                    All high-priority tasks are completed!
                  </div>
                ) : (
                  highPriorityTasks.map((t) => (
                    <div
                      key={t.id}
                      onClick={() => {
                        setCurrentTab("tasks");
                        setShowNotifications(false);
                      }}
                      className="cursor-pointer rounded-2xl border border-rose-100 bg-rose-50/50 p-2.5 hover:bg-rose-50 dark:border-rose-950 dark:bg-rose-950/20"
                    >
                      <p className="text-xs font-semibold text-rose-900 dark:text-rose-200 line-clamp-1">
                        {t.title}
                      </p>
                      <p className="mt-0.5 text-[11px] text-rose-600 dark:text-rose-400">
                        Due: {t.time} • {t.subject}
                      </p>
                    </div>
                  ))
                )}

                <div
                  onClick={() => {
                    setCurrentTab("roadmap");
                    setShowNotifications(false);
                  }}
                  className="cursor-pointer rounded-2xl border border-violet-100 bg-violet-50/50 p-2.5 hover:bg-violet-50 dark:border-violet-950 dark:bg-violet-950/30"
                >
                  <p className="text-xs font-semibold text-violet-900 dark:text-violet-200 flex items-center gap-1.5">
                    <Sparkles size={13} className="text-violet-600" />
                    CampusFlow 8 Phases Live
                  </p>
                  <p className="mt-0.5 text-[11px] text-violet-600 dark:text-violet-400">
                    All 8 development roadmap modules are ready.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Button / Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white p-1.5 pr-2.5 shadow-sm hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 transition-colors"
            aria-label="User menu"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 font-bold text-white text-xs shadow-sm">
              {user?.name ? user.name.charAt(0).toUpperCase() : "V"}
            </div>
            <span className="hidden sm:inline text-xs font-semibold text-slate-800 dark:text-slate-200">
              {user?.name?.split(" ")[0] || "Vikram"}
            </span>
            <ChevronDown size={14} className="text-slate-400" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-3 w-56 rounded-3xl border border-slate-200 bg-white p-2 shadow-2xl dark:border-slate-800 dark:bg-slate-900 z-50 animate-in fade-in zoom-in-95">
              <div className="p-3 border-b border-slate-100 dark:border-slate-800">
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  {user?.name || "Vikram"}
                </p>
                <p className="text-xs text-slate-400 truncate">
                  {user?.email || "vikram@campusflow.edu"}
                </p>
                <span className="mt-1.5 inline-block text-[10px] font-semibold rounded-full bg-violet-100 text-violet-700 px-2 py-0.5 dark:bg-violet-950 dark:text-violet-300">
                  {user?.role || "Student Admin"}
                </span>
              </div>

              <div className="py-1">
                <button
                  onClick={() => {
                    setCurrentTab("profile");
                    setShowProfileMenu(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
                >
                  <User size={14} /> Profile & Settings
                </button>
                <button
                  onClick={() => {
                    setCurrentTab("timetable");
                    setShowProfileMenu(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
                >
                  <Calendar size={14} /> My Courses & Schedule
                </button>
                <button
                  onClick={() => {
                    onOpenAuth();
                    setShowProfileMenu(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-violet-600 hover:bg-violet-50 dark:text-violet-400 dark:hover:bg-violet-950/40 transition-colors"
                >
                  <Sparkles size={14} /> Switch / Sync Account
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
