import { Sparkles, Terminal } from "lucide-react";

export default function CreatorDetails() {
  const techStack = [
    { name: "React 19", color: "bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-300" },
    { name: "Vite 8", color: "bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-300" },
    { name: "Tailwind CSS v4", color: "bg-teal-50 text-teal-600 dark:bg-teal-950/60 dark:text-teal-300" },
    { name: "Recharts", color: "bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-300" },
    { name: "Lucide React", color: "bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-300" },
    { name: "Web Audio API", color: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-300" },
  ];

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-600 p-3 text-white shadow-lg">
            <Terminal size={22} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">
                Creator & Developer Details
              </h3>
              <span className="rounded-full bg-violet-100 px-2 py-0.5 text-[10px] font-bold text-violet-700 dark:bg-violet-950 dark:text-violet-300">
                Phase 5 Delivered
              </span>
            </div>
            <p className="text-xs text-slate-400">
              CampusFlow Architect & Lead Engineer: Vikram
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-gradient-to-br from-slate-50 to-violet-50/30 p-5 dark:border-slate-800 dark:from-slate-800/40 dark:to-violet-950/20 mb-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>Vikram</span>
              <span className="text-xs font-normal text-slate-500">| Full-Stack Developer</span>
            </h4>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
              Engineered CampusFlow to empower university students with an intuitive, all-in-one workspace
              combining task boards, dynamic schedules, deep Pomodoro study analytics, and secure local data persistence.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="inline-flex items-center gap-1 rounded-xl bg-violet-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm">
              <Sparkles size={13} />
              <span>CampusFlow v1.0</span>
            </span>
          </div>
        </div>
      </div>

      {/* Tech Badges */}
      <div>
        <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
          Engineered With Modern Web Technologies:
        </h5>
        <div className="flex flex-wrap items-center gap-2">
          {techStack.map((tech) => (
            <span
              key={tech.name}
              className={`rounded-xl px-3 py-1 text-xs font-semibold ${tech.color}`}
            >
              {tech.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
