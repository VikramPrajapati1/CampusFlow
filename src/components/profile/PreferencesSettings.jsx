import { useApp } from "../../context/AppContext";
import { Sun, Moon, Volume2, VolumeX, Sliders } from "lucide-react";

export default function PreferencesSettings() {
  const { theme, setSpecificTheme, settings, updateAppSettings } = useApp();

  const handleSoundToggle = (enabled) => {
    updateAppSettings({ soundEnabled: enabled });
  };

  const handlePomodoroChange = (mins) => {
    updateAppSettings({ defaultPomodoroMinutes: Number(mins) });
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center gap-3 mb-6">
        <div className="rounded-2xl bg-amber-100 p-2.5 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
          <Sliders size={20} />
        </div>
        <div>
          <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">
            App Preferences & Theme
          </h3>
          <p className="text-xs text-slate-400">
            Customize appearance, audio chimes, and study defaults
          </p>
        </div>
      </div>

      <div className="space-y-5">
        {/* Theme selection */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-slate-100 p-4 dark:border-slate-800">
          <div>
            <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              Color Theme
            </h4>
            <p className="text-xs text-slate-400">
              Toggle between clean slate Light and high-contrast Dark mode
            </p>
          </div>

          <div className="flex rounded-xl bg-slate-100 p-1 dark:bg-slate-800 self-start sm:self-auto border border-slate-200/60 dark:border-slate-700">
            <button
              type="button"
              onClick={() => setSpecificTheme("light")}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                theme === "light"
                  ? "bg-white text-amber-600 shadow-sm"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-400"
              }`}
            >
              <Sun size={14} className={theme === "light" ? "text-amber-500 fill-amber-500/20" : ""} />
              <span>Day (Light)</span>
            </button>
            <button
              type="button"
              onClick={() => setSpecificTheme("dark")}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                theme === "dark"
                  ? "bg-violet-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-400"
              }`}
            >
              <Moon size={14} className={theme === "dark" ? "fill-white/20" : ""} />
              <span>Night (Dark)</span>
            </button>
          </div>
        </div>

        {/* Audio sound effects */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-slate-100 p-4 dark:border-slate-800">
          <div>
            <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              Audio Chimes (Web Audio API)
            </h4>
            <p className="text-xs text-slate-400">
              Play a gentle harmonic chime on Pomodoro completion & task checkmarks
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleSoundToggle(!settings.soundEnabled)}
              className={`flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                settings.soundEnabled
                  ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                  : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
              }`}
            >
              {settings.soundEnabled ? (
                <>
                  <Volume2 size={15} /> Sound Active
                </>
              ) : (
                <>
                  <VolumeX size={15} /> Muted
                </>
              )}
            </button>
          </div>
        </div>

        {/* Default Pomodoro Duration */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-slate-100 p-4 dark:border-slate-800">
          <div>
            <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              Default Pomodoro Focus Period
            </h4>
            <p className="text-xs text-slate-400">
              Select your preferred baseline study interval
            </p>
          </div>

          <select
            value={settings.defaultPomodoroMinutes || 25}
            onChange={(e) => handlePomodoroChange(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200"
          >
            <option value={20}>20 minutes</option>
            <option value={25}>25 minutes (Standard)</option>
            <option value={30}>30 minutes</option>
            <option value={45}>45 minutes (Deep Focus)</option>
            <option value={50}>50 minutes (University Block)</option>
          </select>
        </div>
      </div>
    </div>
  );
}
