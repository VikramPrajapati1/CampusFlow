import { useState } from "react";
import { useApp } from "../context/AppContext";
import Modal from "./Modal";
import {
  ShieldCheck,
  Lock,
  Mail,
  User,
} from "lucide-react";

export default function AuthModal({ isOpen, onClose }) {
  const { user, updateUserProfile, showToast } = useApp();
  const [activeTab, setActiveTab] = useState("session");
  const [name, setName] = useState(user?.name || "Vikram");
  const [email, setEmail] = useState(user?.email || "vikram@campusflow.edu");
  const [password, setPassword] = useState("••••••••");

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast("Validation Error", "Name cannot be blank", "warning");
      return;
    }
    updateUserProfile({ name, email });
    onClose();
  };

  const handleQuickSwitch = (roleName, userName, userEmail) => {
    updateUserProfile({
      name: userName,
      email: userEmail,
      role: roleName,
    });
    setName(userName);
    setEmail(userEmail);
    showToast("Session Switched", `Logged in as ${userName} (${roleName})`, "success");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Authentication & Database Sync"
      subtitle="Phase 6: User Authentication, Session State & Permanent Data Persistence"
    >
      <div className="space-y-5">
        {/* Tab Selection */}
        <div className="flex rounded-2xl bg-slate-100 p-1 dark:bg-slate-800">
          <button
            onClick={() => setActiveTab("session")}
            className={`flex-1 rounded-xl py-2 text-xs font-semibold transition-all ${
              activeTab === "session"
                ? "bg-white text-violet-700 shadow-sm dark:bg-slate-700 dark:text-violet-300"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-400"
            }`}
          >
            Active Session
          </button>
          <button
            onClick={() => setActiveTab("login")}
            className={`flex-1 rounded-xl py-2 text-xs font-semibold transition-all ${
              activeTab === "login"
                ? "bg-white text-violet-700 shadow-sm dark:bg-slate-700 dark:text-violet-300"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-400"
            }`}
          >
            Sign In / Register
          </button>
        </div>

        {activeTab === "session" ? (
          <div className="space-y-4">
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4 dark:border-emerald-950 dark:bg-emerald-950/30">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-emerald-500 p-2.5 text-white">
                  <ShieldCheck size={22} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Verified Student Session Active
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    All tasks, timetable, courses, and timer data are permanently stored in LocalStorage DB.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/50">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-600 font-bold text-white text-lg shadow-md">
                  {user?.name?.charAt(0) || "V"}
                </div>
                <div>
                  <h5 className="font-bold text-slate-900 dark:text-white">
                    {user?.name}
                  </h5>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {user?.email}
                  </p>
                  <span className="inline-block mt-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                    Role: {user?.role || "Student Admin"} • {user?.course}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">
                Quick Profile Switcher
              </p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickSwitch("Student Admin", "Vikram", "vikram@campusflow.edu")}
                  className="rounded-xl border border-violet-200 bg-violet-50/50 p-3 text-left hover:bg-violet-100/60 dark:border-violet-900 dark:bg-violet-950/40"
                >
                  <p className="text-xs font-bold text-violet-900 dark:text-violet-200">Vikram</p>
                  <p className="text-[11px] text-violet-600 dark:text-violet-400">Primary Student Admin</p>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickSwitch("Guest Student", "Priya Sharma", "priya@campusflow.edu")}
                  className="rounded-xl border border-slate-200 bg-white p-3 text-left hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-800"
                >
                  <p className="text-xs font-bold text-slate-900 dark:text-slate-100">Priya Sharma</p>
                  <p className="text-[11px] text-slate-500">Peer Student Account</p>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Full Name
              </label>
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3.5 py-2.5 dark:border-slate-800 dark:bg-slate-800">
                <User size={16} className="text-slate-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="flex-1 bg-transparent text-sm outline-none text-slate-800 dark:text-slate-100"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                College Email
              </label>
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3.5 py-2.5 dark:border-slate-800 dark:bg-slate-800">
                <Mail size={16} className="text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-transparent text-sm outline-none text-slate-800 dark:text-slate-100"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Password
              </label>
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3.5 py-2.5 dark:border-slate-800 dark:bg-slate-800">
                <Lock size={16} className="text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex-1 bg-transparent text-sm outline-none text-slate-800 dark:text-slate-100"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-xl bg-violet-600 px-5 py-2 text-xs font-semibold text-white shadow-md hover:bg-violet-700"
              >
                Save & Sign In
              </button>
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
}
