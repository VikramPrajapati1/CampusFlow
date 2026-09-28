import { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Save } from "lucide-react";

export default function ProfileSettings() {
  const { user, updateUserProfile, showToast } = useApp();

  const [name, setName] = useState(user?.name || "Vikram");
  const [email, setEmail] = useState(user?.email || "vikram@campusflow.edu");
  const [rollNo, setRollNo] = useState(user?.rollNo || "CF-2026-904");
  const [course, setCourse] = useState(user?.course || "B.Tech Computer Science & Engineering");
  const [semester, setSemester] = useState(user?.semester || "6th Semester");
  const [college, setCollege] = useState(user?.college || "Institute of Technology & Engineering");
  const [bio, setBio] = useState(
    user?.bio || "Passionate developer & student building modern productivity tools for academia."
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserProfile({
      name,
      email,
      rollNo,
      course,
      semester,
      college,
      bio,
    });
    showToast("Profile Saved", "Student details updated across CampusFlow", "success");
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5 dark:border-slate-800">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-tr from-violet-600 to-indigo-600 font-extrabold text-white text-2xl shadow-xl shadow-violet-500/20">
            {name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {name}
            </h3>
            <p className="text-xs text-slate-400">
              {rollNo} • {course}
            </p>
            <span className="mt-1 inline-block rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
              Active Student Session
            </span>
          </div>
        </div>

        {/* Quick Academic Badges */}
        <div className="flex items-center gap-2">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-2.5 text-center dark:border-slate-800 dark:bg-slate-800/60 min-w-20">
            <span className="text-[10px] text-slate-400 font-semibold uppercase">CGPA</span>
            <p className="text-sm font-bold text-violet-600 dark:text-violet-400">
              {user?.stats?.cgpa || "9.2"}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-2.5 text-center dark:border-slate-800 dark:bg-slate-800/60 min-w-20">
            <span className="text-[10px] text-slate-400 font-semibold uppercase">Attd.</span>
            <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
              {user?.stats?.attendance || "92%"}
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Student Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-white"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Roll / Enrollment ID
            </label>
            <input
              type="text"
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Branch / Program
            </label>
            <input
              type="text"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Current Semester
            </label>
            <input
              type="text"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            College / University Name
          </label>
          <input
            type="text"
            value={college}
            onChange={(e) => setCollege(e.target.value)}
            className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Personal Bio & Goals
          </label>
          <textarea
            rows={2}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full rounded-xl border border-slate-200 p-3 text-sm outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-white"
          />
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="flex items-center gap-2 rounded-2xl bg-violet-600 px-5 py-2.5 text-xs font-semibold text-white shadow-md hover:bg-violet-700 transition-colors"
          >
            <Save size={15} />
            <span>Save Profile Changes</span>
          </button>
        </div>
      </form>
    </div>
  );
}
