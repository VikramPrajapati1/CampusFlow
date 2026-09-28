import ProfileSettings from "./ProfileSettings";
import CreatorDetails from "./CreatorDetails";
import PreferencesSettings from "./PreferencesSettings";
import DataManagement from "./DataManagement";

export default function ProfileModule() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Profile & System Settings
          </h2>
          <span className="rounded-full bg-violet-100 px-2.5 py-0.5 text-xs font-semibold text-violet-700 dark:bg-violet-950 dark:text-violet-300">
            Phase 5 Active
          </span>
        </div>
        <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Student profile, creator details, theme aur preferences.
        </p>
      </div>

      {/* Grid of Sections */}
      <div className="space-y-6">
        <ProfileSettings />
        <CreatorDetails />
        <PreferencesSettings />
        <DataManagement />
      </div>
    </div>
  );
}
