import { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Target, Flame, Edit2, Check } from "lucide-react";

export default function DailyGoalTracker() {
  const { studyData, updateDailyGoal } = useApp();
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [goalInput, setGoalInput] = useState(studyData?.dailyGoalHours || 4);

  const goal = studyData?.dailyGoalHours || 4;
  const studied = studyData?.todayStudiedHours || 0;
  const streak = studyData?.currentStreak || 6;
  const percent = Math.min(100, Math.round((studied / goal) * 100));

  const totalWeekHours = studyData?.weeklyActivity?.reduce((acc, curr) => acc + curr.hours, 0).toFixed(1) || "28.5";

  const handleSaveGoal = () => {
    updateDailyGoal(goalInput);
    setIsEditingGoal(false);
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="rounded-xl bg-indigo-100 p-2 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
              <Target size={18} />
            </div>
            <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">
              Daily Target & Streak
            </h3>
          </div>

          <div className="flex items-center gap-1.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 px-3 py-1 text-xs font-bold text-amber-600 dark:text-amber-400">
            <Flame size={15} className="fill-amber-500" />
            <span>{streak} Days Streak!</span>
          </div>
        </div>

        {/* Progress Bar & Numbers */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
              Today's Achievement
            </span>
            <span className="text-xs font-bold text-violet-600 dark:text-violet-400">
              {percent}% of daily goal
            </span>
          </div>

          <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 transition-all duration-500"
              style={{ width: `${percent}%` }}
            />
          </div>

          <div className="mt-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="font-bold text-slate-800 dark:text-slate-200">
              {studied} hrs completed
            </span>
            <span>Target: {goal} hrs</span>
          </div>
        </div>

        {/* Goal Adjuster */}
        <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/50 mb-4">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              Target Setting:
            </span>
            {isEditingGoal ? (
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  step="0.5"
                  min="1"
                  max="12"
                  value={goalInput}
                  onChange={(e) => setGoalInput(e.target.value)}
                  className="w-16 rounded-lg border border-violet-300 px-2 py-0.5 text-xs text-center outline-none dark:bg-slate-700 dark:text-white"
                />
                <button
                  onClick={handleSaveGoal}
                  className="rounded-lg bg-emerald-600 p-1 text-white hover:bg-emerald-700"
                >
                  <Check size={12} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditingGoal(true)}
                className="flex items-center gap-1 text-violet-600 hover:underline dark:text-violet-400 font-semibold"
              >
                <span>{goal} hrs/day</span>
                <Edit2 size={12} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Week Summary Stats */}
      <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
        <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
          <p className="text-[11px] text-slate-400">Weekly Studied</p>
          <p className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
            {totalWeekHours} hrs
          </p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
          <p className="text-[11px] text-slate-400">Productivity Score</p>
          <p className="text-base font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
            94 / 100
          </p>
        </div>
      </div>
    </div>
  );
}
