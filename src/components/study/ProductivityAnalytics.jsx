import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useApp } from "../../context/AppContext";
import { BarChart3, TrendingUp, History } from "lucide-react";

export default function ProductivityAnalytics() {
  const { studyData, theme } = useApp();

  const weeklyData = studyData?.weeklyActivity || [
    { day: "Mon", hours: 2.5 },
    { day: "Tue", hours: 4.0 },
    { day: "Wed", hours: 3.0 },
    { day: "Thu", hours: 5.0 },
    { day: "Fri", hours: 3.5 },
    { day: "Sat", hours: 6.0 },
    { day: "Sun", hours: 4.5 },
  ];

  const subjectData = studyData?.subjectBreakdown || [
    { subject: "Machine Learning", hours: 8.5 },
    { subject: "Java Programming", hours: 6.0 },
    { subject: "Operating System", hours: 5.5 },
    { subject: "Web Dev", hours: 7.0 },
    { subject: "Networks", hours: 4.5 },
  ];

  const recentSessions = studyData?.recentSessions || [];

  return (
    <div className="space-y-6">
      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Weekly Area Chart */}
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-2">
                <TrendingUp size={16} className="text-violet-600" />
                Weekly Study Progress (Hours)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Daily hours logged over the last 7 days
              </p>
            </div>
            <span className="rounded-lg bg-violet-50 px-2.5 py-1 text-xs font-semibold text-violet-700 dark:bg-violet-950 dark:text-violet-300">
              This Week
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7c3aed" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#7c3aed" stopOpacity={0.0} />
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
                  stroke="#7c3aed"
                  strokeWidth={3}
                  fill="url(#areaGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Subject Breakdown Bar Chart */}
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-2">
                <BarChart3 size={16} className="text-blue-600" />
                Subject-wise Distribution (Hours)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Cumulative study time invested per subject
              </p>
            </div>
            <span className="rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
              Semester
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subjectData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke={theme === "dark" ? "#334155" : "#e2e8f0"}
                  opacity={0.6}
                />
                <XAxis
                  dataKey="subject"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: theme === "dark" ? "#94a3b8" : "#64748b", fontSize: 11 }}
                  tickFormatter={(val) => val.split(" ")[0]}
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
                  itemStyle={{ color: theme === "dark" ? "#93c5fd" : "#3b82f6" }}
                />
                <Bar dataKey="hours" fill="#6366f1" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Study Sessions Table */}
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="rounded-xl bg-violet-100 p-2 text-violet-700 dark:bg-violet-950 dark:text-violet-300">
              <History size={16} />
            </div>
            <div>
              <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                Recent Study Activity Log
              </h4>
              <p className="text-xs text-slate-400">
                Logged Pomodoro and focused revision sessions
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2.5">
          {recentSessions.map((session) => (
            <div
              key={session.id}
              className="flex items-center justify-between rounded-2xl border border-slate-100 p-3 dark:border-slate-800 dark:bg-slate-800/40"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300 font-bold text-xs">
                  {session.durationMinutes}m
                </div>
                <div>
                  <h5 className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white">
                    {session.subject}
                  </h5>
                  <p className="text-[11px] text-slate-400">
                    {session.type || "Focus Session"} • {session.date}
                  </p>
                </div>
              </div>

              <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
                +{(session.durationMinutes / 60).toFixed(1)} hrs
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
