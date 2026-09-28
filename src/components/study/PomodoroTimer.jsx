import { useState, useEffect, useRef } from "react";
import { useApp } from "../../context/AppContext";
import { Play, Pause, RotateCcw, BookOpen, Clock } from "lucide-react";

export default function PomodoroTimer() {
  const { courses, logStudySession, showToast } = useApp();

  const [mode, setMode] = useState("focus"); // 'focus' | 'shortBreak' | 'longBreak'
  const [selectedSubject, setSelectedSubject] = useState(courses[0]?.name || "Machine Learning");

  // Timer settings in minutes
  const modeTimes = {
    focus: 25,
    shortBreak: 5,
    longBreak: 15,
  };

  const [timeLeft, setTimeLeft] = useState(modeTimes.focus * 60);
  const [isRunning, setIsRunning] = useState(false);
  const totalSeconds = modeTimes[mode] * 60;

  const timerRef = useRef(null);

  // Mode change
  const handleModeChange = (newMode) => {
    setIsRunning(false);
    setMode(newMode);
    setTimeLeft(modeTimes[newMode] * 60);
  };

  // Timer interval
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsRunning(false);
            // Completed!
            if (mode === "focus") {
              logStudySession({
                subject: selectedSubject,
                durationMinutes: modeTimes.focus,
                type: "Pomodoro Focus",
              });
            } else {
              showToast("Break Ended! ☕", "Ready to jump back into your study focus?", "info");
            }
            return modeTimes[mode] * 60;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, mode, selectedSubject]);

  const toggleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(modeTimes[mode] * 60);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const progressPercent = Math.round(((totalSeconds - timeLeft) / totalSeconds) * 100);

  // Quick manual session logger
  const handleQuickLog = (mins) => {
    logStudySession({
      subject: selectedSubject,
      durationMinutes: mins,
      type: "Manual Session",
    });
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="rounded-xl bg-violet-100 p-2 text-violet-700 dark:bg-violet-950 dark:text-violet-300">
            <Clock size={18} />
          </div>
          <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">
            Focus Study Timer
          </h3>
        </div>

        {/* Mode Selector */}
        <div className="flex rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
          <button
            onClick={() => handleModeChange("focus")}
            className={`rounded-lg px-3 py-1 text-xs font-semibold transition-all ${
              mode === "focus"
                ? "bg-white text-violet-700 shadow-sm dark:bg-slate-700 dark:text-violet-300"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-400"
            }`}
          >
            Focus (25m)
          </button>
          <button
            onClick={() => handleModeChange("shortBreak")}
            className={`rounded-lg px-3 py-1 text-xs font-semibold transition-all ${
              mode === "shortBreak"
                ? "bg-white text-violet-700 shadow-sm dark:bg-slate-700 dark:text-violet-300"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-400"
            }`}
          >
            Break (5m)
          </button>
        </div>
      </div>

      {/* Main Timer Display */}
      <div className="my-6 flex flex-col items-center justify-center">
        <div className="relative flex h-52 w-52 items-center justify-center rounded-full border-4 border-slate-100 dark:border-slate-800">
          <div
            className="absolute inset-0 rounded-full border-4 border-violet-600 transition-all duration-1000"
            style={{
              clipPath: `polygon(50% 50%, -50% -50%, ${progressPercent * 2}% -50%, ${progressPercent * 2}% ${progressPercent * 2}%, -50% ${progressPercent * 2}%)`,
            }}
          />

          <div className="text-center z-10">
            <span className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white font-mono">
              {formatTime(timeLeft)}
            </span>
            <p className="mt-1 text-xs font-semibold text-violet-600 dark:text-violet-400 uppercase tracking-widest">
              {mode === "focus" ? "Studying Now" : "Rest Period"}
            </p>
          </div>
        </div>

        {/* Subject tag selector for logging */}
        <div className="mt-5 flex items-center gap-2 max-w-xs w-full">
          <BookOpen size={16} className="text-slate-400 shrink-0" />
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200"
          >
            {courses.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Timer Control Buttons */}
        <div className="mt-5 flex items-center gap-3">
          <button
            onClick={toggleStartPause}
            className={`flex items-center gap-2 rounded-2xl px-6 py-3 font-bold text-sm text-white shadow-lg transition-all hover:scale-105 ${
              isRunning
                ? "bg-amber-500 shadow-amber-500/25 hover:bg-amber-600"
                : "bg-violet-600 shadow-violet-600/30 hover:bg-violet-700"
            }`}
          >
            {isRunning ? (
              <>
                <Pause size={17} />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play size={17} fill="currentColor" />
                <span>Start Focus</span>
              </>
            )}
          </button>

          <button
            onClick={resetTimer}
            className="rounded-2xl border border-slate-200 p-3 text-slate-600 hover:bg-slate-100 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
            title="Reset timer"
            aria-label="Reset timer"
          >
            <RotateCcw size={18} />
          </button>
        </div>

        {/* Quick Log Buttons */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="text-slate-400 font-medium">Quick Log:</span>
          <button
            onClick={() => handleQuickLog(30)}
            className="rounded-xl border border-slate-200 px-2.5 py-1 text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            +30 min
          </button>
          <button
            onClick={() => handleQuickLog(60)}
            className="rounded-xl border border-slate-200 px-2.5 py-1 text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            +1 hr
          </button>
        </div>
      </div>
    </div>
  );
}
