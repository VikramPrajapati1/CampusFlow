import { useApp } from "../../context/AppContext";
import {
  BookOpen,
  CheckCircle2,
  Clock3,
  Users,
  ArrowUpRight,
  Plus,
  GraduationCap,
  Milestone,
  Play,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function DashboardOverview({ onOpenNewTask }) {
  const {
    user,
    theme,
    tasks,
    taskStats,
    toggleTask,
    classes,
    courses,
    studyData,
    setCurrentTab,
  } = useApp();

  const activityData = studyData?.weeklyActivity || [
    { day: "Mon", hours: 2.5 },
    { day: "Tue", hours: 4 },
    { day: "Wed", hours: 3 },
    { day: "Thu", hours: 5 },
    { day: "Fri", hours: 3.5 },
    { day: "Sat", hours: 6 },
    { day: "Sun", hours: 4.5 },
  ];

  // Up to 4 tasks for today's quick checklist
  const todayTasks = tasks.slice(0, 4);

  // Next 3 classes
  const nextClasses = classes.slice(0, 3);

  // Formatted date
  const todayString = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date());

  return (
    <div className="space-y-7">
      {/* Welcome Banner */}
      <section className="relative flex flex-col justify-between gap-5 overflow-hidden rounded-3xl bg-gradient-to-r from-violet-700 via-indigo-600 to-purple-700 p-6 text-white shadow-xl shadow-violet-700/20 sm:flex-row sm:items-center sm:p-8">
        <div className="z-10">
          <p className="mb-2 text-xs sm:text-sm font-medium text-violet-200">
            {todayString}
          </p>
          <h2 className="mb-2 text-2xl sm:text-3xl font-extrabold tracking-tight">
            Make today count, {user?.name?.split(" ")[0] || "Vikram"}!
          </h2>
          <p className="max-w-md text-xs sm:text-sm text-violet-100/90 leading-relaxed">
            Organize your classes, manage your tasks and stay on top of your semester studies.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setCurrentTab("tasks")}
              className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-2.5 text-xs sm:text-sm font-bold text-violet-700 shadow-md hover:bg-violet-50 transition-all hover:scale-[1.02]"
            >
              <span>View My Tasks</span>
              <ArrowUpRight size={16} />
            </button>

            <button
              onClick={() => setCurrentTab("study")}
              className="inline-flex items-center gap-2 rounded-2xl bg-violet-800/60 border border-violet-400/40 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white hover:bg-violet-800 transition-colors"
            >
              <Play size={14} fill="currentColor" />
              <span>Start Focus Timer</span>
            </button>
          </div>
        </div>

        <div className="hidden text-violet-200/30 sm:block absolute right-4 bottom-0 pointer-events-none">
          <GraduationCap size={150} strokeWidth={0.8} />
        </div>
      </section>

      {/* 8-Phase Banner Shortcut */}
      <div
        onClick={() => setCurrentTab("roadmap")}
        className="cursor-pointer rounded-2xl border border-violet-200 bg-gradient-to-r from-violet-50/80 via-white to-indigo-50/80 p-4 transition-all hover:border-violet-300 hover:shadow-md dark:border-violet-900/60 dark:from-violet-950/30 dark:via-slate-900 dark:to-indigo-950/30"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-violet-600 p-2 text-white">
              <Milestone size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  CampusFlow 8-Phase Development Roadmap
                </h4>
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                  8 Phases Completed
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Frontend, Task Management, Timetable, Study Analytics, Profile, Backend, Testing & Deployment.
              </p>
            </div>
          </div>
          <span className="text-xs font-bold text-violet-600 dark:text-violet-400 flex items-center gap-1">
            <span>Explore Roadmap</span>
            <ArrowUpRight size={14} />
          </span>
        </div>
      </div>

      {/* Dynamic Statistics */}
      <section className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        {[
          {
            label: "Total Courses",
            value: courses.length > 0 ? String(courses.length).padStart(2, "0") : "06",
            note: "Active semester courses",
            icon: BookOpen,
            color: "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300",
            onClick: () => setCurrentTab("timetable"),
          },
          {
            label: "Tasks Completed",
            value: String(taskStats.completed).padStart(2, "0"),
            note: `Out of ${taskStats.total} tasks (${taskStats.completionRate}%)`,
            icon: CheckCircle2,
            color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
            onClick: () => setCurrentTab("tasks"),
          },
          {
            label: "Study Hours",
            value: `${studyData?.todayStudiedHours || 3.2}`,
            note: `Goal: ${studyData?.dailyGoalHours || 4} hrs today`,
            icon: Clock3,
            color: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
            onClick: () => setCurrentTab("study"),
          },
          {
            label: "Attendance",
            value: user?.stats?.attendance || "92%",
            note: "Semester overall score",
            icon: Users,
            color: "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300",
            onClick: () => setCurrentTab("timetable"),
          },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              onClick={item.onClick}
              className="cursor-pointer rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-violet-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {item.label}
                </span>
                <div className={`rounded-2xl p-2.5 ${item.color}`}>
                  <Icon size={18} />
                </div>
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                {item.value}
              </h3>
              <p className="mt-1 text-xs text-slate-400 dark:text-slate-500 truncate">
                {item.note}
              </p>
            </div>
          );
        })}
      </section>

      {/* Charts and Today's Checklist */}
      <section className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        {/* Study Activity Chart */}
        <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 xl:col-span-2">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Study Activity
              </h3>
              <p className="mt-0.5 text-xs text-slate-400">
                Weekly learning progress (Hours tracked)
              </p>
            </div>
            <button
              onClick={() => setCurrentTab("study")}
              className="text-xs font-semibold text-violet-600 hover:underline dark:text-violet-400"
            >
              View Analytics →
            </button>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="dashboardStudyGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke={theme === "dark" ? "#334155" : "#e2e8f0"}
                  opacity={0.6}
                />
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: theme === "dark" ? "#94a3b8" : "#64748b", fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: theme === "dark" ? "#94a3b8" : "#64748b", fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: theme === "dark" ? "#0f172a" : "#ffffff",
                    borderColor: theme === "dark" ? "#1e293b" : "#e2e8f0",
                    borderRadius: "14px",
                    color: theme === "dark" ? "#f8fafc" : "#0f172a",
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.15)",
                    fontSize: "12px",
                  }}
                  itemStyle={{ color: theme === "dark" ? "#a78bfa" : "#7c3aed" }}
                />
                <Area
                  type="monotone"
                  dataKey="hours"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  fill="url(#dashboardStudyGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Today's Checklist */}
        <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between">
          <div>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  Today's Tasks
                </h3>
                <p className="mt-0.5 text-xs text-slate-400">
                  {taskStats.completed}/{taskStats.total} tasks completed
                </p>
              </div>
              <button
                onClick={onOpenNewTask}
                className="rounded-xl bg-violet-50 p-2 text-violet-700 hover:bg-violet-100 dark:bg-violet-950 dark:text-violet-300 transition-colors"
                title="Quick Add Task"
                aria-label="Add new task"
              >
                <Plus size={18} />
              </button>
            </div>

            <div className="space-y-3.5">
              {todayTasks.length === 0 ? (
                <p className="py-8 text-center text-xs text-slate-400">
                  No tasks created yet. Click "+" to add one!
                </p>
              ) : (
                todayTasks.map((task) => (
                  <div key={task.id} className="flex items-start gap-3 group">
                    <button
                      type="button"
                      onClick={() => toggleTask(task.id)}
                      className="mt-0.5 shrink-0 text-slate-400 hover:text-violet-600 transition-colors"
                      aria-label="Toggle task completion"
                    >
                      <CheckCircle2
                        size={19}
                        className={
                          task.done
                            ? "text-emerald-500 fill-emerald-500/10"
                            : "text-slate-300 dark:text-slate-700"
                        }
                      />
                    </button>
                    <div className="min-w-0 flex-1">
                      <p
                        className={`text-xs sm:text-sm font-medium transition-all ${
                          task.done
                            ? "text-slate-400 line-through dark:text-slate-500"
                            : "text-slate-700 dark:text-slate-200"
                        }`}
                      >
                        {task.title}
                      </p>
                      <div className="mt-0.5 flex items-center gap-2 text-[11px]">
                        <span className="text-slate-400">{task.subject}</span>
                        {task.time && (
                          <span className="text-violet-600 dark:text-violet-400 font-semibold">
                            • {task.time}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <button
            onClick={() => setCurrentTab("tasks")}
            className="mt-6 block w-full rounded-2xl border border-slate-200 py-2.5 text-center text-xs font-bold text-violet-700 hover:bg-violet-50 dark:border-slate-800 dark:text-violet-300 dark:hover:bg-slate-800 transition-colors"
          >
            Manage All Tasks ({taskStats.total}) →
          </button>
        </div>
      </section>

      {/* Upcoming Classes Section */}
      <section className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Upcoming Classes & Labs
            </h3>
            <p className="mt-0.5 text-xs text-slate-400">
              Your weekly lecture schedule & classroom locations
            </p>
          </div>
          <button
            onClick={() => setCurrentTab("timetable")}
            className="text-xs font-bold text-violet-600 hover:underline dark:text-violet-400"
          >
            View Full Timetable →
          </button>
        </div>

        <div className="space-y-3">
          {nextClasses.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-3 rounded-2xl border border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800 dark:bg-slate-800/40"
            >
              <div className="flex items-center gap-3">
                <div className={`rounded-2xl p-3 shrink-0 ${item.color}`}>
                  <BookOpen size={20} />
                </div>
                <div>
                  <p className="font-bold text-sm text-slate-900 dark:text-white">
                    {item.subject}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-400">
                    {item.room} • {item.instructor}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-xl self-start sm:self-auto">
                <Clock3 size={14} className="text-violet-600 dark:text-violet-400" />
                <span>{item.time}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
