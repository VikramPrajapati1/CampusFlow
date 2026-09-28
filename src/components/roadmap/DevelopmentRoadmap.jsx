import { useState } from "react";
import { roadmapPhases } from "../../data/defaultData";
import { useApp } from "../../context/AppContext";
import {
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Layers,
} from "lucide-react";

export default function DevelopmentRoadmap() {
  const { setCurrentTab } = useApp();
  const [selectedPhase, setSelectedPhase] = useState(null);

  const phaseActions = {
    1: () => setCurrentTab("dashboard"),
    2: () => setCurrentTab("tasks"),
    3: () => setCurrentTab("timetable"),
    4: () => setCurrentTab("study"),
    5: () => setCurrentTab("profile"),
    6: () => setCurrentTab("profile"),
    7: () => setCurrentTab("tasks"),
    8: () => setCurrentTab("dashboard"),
  };

  return (
    <div className="space-y-6">
      {/* Top Banner mirroring the user's image */}
      <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 h-48 w-48 rounded-full bg-violet-600/10 blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Development overview
              </h2>
              <span className="rounded-full bg-blue-500/20 px-3 py-0.5 text-xs font-semibold text-blue-400 border border-blue-500/30">
                8 phases
              </span>
            </div>
            <p className="mt-2 text-sm text-slate-400 max-w-2xl leading-relaxed">
              Hum frontend se shuru karenge, phir data management, backend, security aur deployment tak jayenge.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-2 text-xs font-semibold text-emerald-400">
              <CheckCircle2 size={15} /> All 8 Phases Implemented
            </span>
          </div>
        </div>

        {/* 8 Phases List */}
        <div className="mt-6 space-y-4">
          {roadmapPhases.map((phase) => {
            const isExpanded = selectedPhase === phase.step;
            return (
              <div
                key={phase.step}
                className="group rounded-2xl border border-slate-800/90 bg-slate-900/60 p-5 transition-all hover:border-slate-700 hover:bg-slate-900"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="flex items-start gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-sm font-bold text-slate-200 border border-slate-700">
                      {phase.step}
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-2.5">
                        <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-violet-300 transition-colors">
                          {phase.title}
                        </h3>
                        <span className="rounded-full bg-emerald-950/70 border border-emerald-500/40 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-400">
                          {phase.badgeText}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-slate-400">
                        {phase.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                    <button
                      onClick={() => setSelectedPhase(isExpanded ? null : phase.step)}
                      className="rounded-xl border border-slate-700 bg-slate-800/60 px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-800 transition-colors"
                    >
                      {isExpanded ? "Hide Details" : "View Deliverables"}
                    </button>
                    <button
                      onClick={phaseActions[phase.step]}
                      className="flex items-center gap-1.5 rounded-xl bg-violet-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-violet-700 transition-colors"
                    >
                      <span>Open</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>

                {/* Expandable Deliverables */}
                {isExpanded && (
                  <div className="mt-4 border-t border-slate-800 pt-4 pl-12">
                    <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                      Completed Deliverables & Features:
                    </h5>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {phase.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                          <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Tech Architecture Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-3 mb-2">
            <div className="rounded-xl bg-violet-100 p-2 text-violet-700 dark:bg-violet-950 dark:text-violet-300">
              <Layers size={18} />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              Frontend Stack
            </h4>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            React 19, Vite 8, Tailwind CSS v4, Lucide React icons, and Recharts interactive charting engine.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-3 mb-2">
            <div className="rounded-xl bg-blue-100 p-2 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
              <Cpu size={18} />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              Data & Storage
            </h4>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Offline-first architecture with LocalStorage serialization, automated schema seeding, and JSON backup export/import.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-3 mb-2">
            <div className="rounded-xl bg-emerald-100 p-2 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
              <ShieldCheck size={18} />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              Security & Audio
            </h4>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Input sanitization, accessible modal focus, toast alerts, and synthesized Web Audio chime notifications.
          </p>
        </div>
      </div>
    </div>
  );
}
