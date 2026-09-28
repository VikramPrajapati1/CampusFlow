import { useState } from "react";
import { useApp } from "../../context/AppContext";
import { storageService } from "../../services/storageService";
import { Database, Download, Upload, RotateCcw, AlertCircle } from "lucide-react";

export default function DataManagement() {
  const { resetAllData, showToast } = useApp();
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  const handleExport = () => {
    storageService.exportBackup();
    showToast("Backup Exported", "CampusFlow database saved as JSON file", "success");
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === "string") {
        const result = storageService.importBackup(content);
        if (result.success) {
          showToast("Data Restored", "Reloading application with restored backup...", "success");
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          showToast("Import Error", result.error || "Invalid JSON file", "error");
        }
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center gap-3 mb-6">
        <div className="rounded-2xl bg-emerald-100 p-2.5 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
          <Database size={20} />
        </div>
        <div>
          <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">
            Backend Storage & Backup (Phase 6 & 8)
          </h3>
          <p className="text-xs text-slate-400">
            Export JSON backups, restore sessions, and manage offline-first database
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Export Card */}
        <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-5 dark:border-slate-800 dark:bg-slate-800/40 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Download size={16} className="text-violet-600 dark:text-violet-400" />
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Export Database
              </h4>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Download your tasks, schedule, enrolled courses, and study logs into an offline JSON backup.
            </p>
          </div>

          <button
            onClick={handleExport}
            className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-violet-700 transition-colors"
          >
            <Download size={14} />
            <span>Download .json Backup</span>
          </button>
        </div>

        {/* Import Card */}
        <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-5 dark:border-slate-800 dark:bg-slate-800/40 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Upload size={16} className="text-blue-600 dark:text-blue-400" />
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Restore from JSON
              </h4>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Upload a previously exported CampusFlow JSON file to restore your entire profile and workspace.
            </p>
          </div>

          <label className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 cursor-pointer transition-colors">
            <Upload size={14} />
            <span>Choose JSON File</span>
            <input
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Reset Confirmation */}
      <div className="mt-5 rounded-2xl border border-rose-100 bg-rose-50/40 p-4 dark:border-rose-950/40 dark:bg-rose-950/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <AlertCircle size={18} className="text-rose-500 shrink-0" />
          <div>
            <h5 className="text-xs font-bold text-rose-900 dark:text-rose-300">
              Restore Factory Demo Data
            </h5>
            <p className="text-[11px] text-rose-700/80 dark:text-rose-400">
              Reset tasks, courses, and timetable back to default curriculum data.
            </p>
          </div>
        </div>

        {isResetConfirmOpen ? (
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                resetAllData();
                setIsResetConfirmOpen(false);
              }}
              className="rounded-xl bg-rose-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-rose-700 shadow-sm"
            >
              Yes, Reset All
            </button>
            <button
              onClick={() => setIsResetConfirmOpen(false)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsResetConfirmOpen(true)}
            className="flex items-center gap-1.5 rounded-xl border border-rose-200 bg-white px-3 py-1.5 text-xs font-semibold text-rose-700 hover:bg-rose-50 dark:border-rose-900/60 dark:bg-slate-900 dark:text-rose-400 self-start sm:self-auto transition-colors"
          >
            <RotateCcw size={13} />
            <span>Reset Demo Data</span>
          </button>
        )}
      </div>
    </div>
  );
}
