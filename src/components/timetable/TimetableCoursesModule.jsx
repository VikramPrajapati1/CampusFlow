import { useState } from "react";
import TimetableSchedule from "./TimetableSchedule";
import CoursesView from "./CoursesView";
import AssignmentTracker from "./AssignmentTracker";
import ClassModal from "./ClassModal";
import CourseModal from "./CourseModal";
import { CalendarDays, BookOpen, FileCheck } from "lucide-react";

export default function TimetableCoursesModule() {
  const [subTab, setSubTab] = useState("timetable"); // 'timetable' | 'courses' | 'assignments'
  const [isClassModalOpen, setIsClassModalOpen] = useState(false);
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header and SubTab bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Timetable & Academic Courses
            </h2>
            <span className="rounded-full bg-violet-100 px-2.5 py-0.5 text-xs font-semibold text-violet-700 dark:bg-violet-950 dark:text-violet-300">
              Phase 3 Active
            </span>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Class schedules, enrolled subjects, assignments aur syllabus progress tracker.
          </p>
        </div>

        {/* SubTab switcher */}
        <div className="flex rounded-2xl bg-slate-100 p-1 dark:bg-slate-800 self-start sm:self-auto">
          <button
            onClick={() => setSubTab("timetable")}
            className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all ${
              subTab === "timetable"
                ? "bg-white text-violet-700 shadow-sm dark:bg-slate-700 dark:text-violet-300"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-400"
            }`}
          >
            <CalendarDays size={15} />
            <span>Timetable</span>
          </button>

          <button
            onClick={() => setSubTab("courses")}
            className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all ${
              subTab === "courses"
                ? "bg-white text-violet-700 shadow-sm dark:bg-slate-700 dark:text-violet-300"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-400"
            }`}
          >
            <BookOpen size={15} />
            <span>Courses</span>
          </button>

          <button
            onClick={() => setSubTab("assignments")}
            className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all ${
              subTab === "assignments"
                ? "bg-white text-violet-700 shadow-sm dark:bg-slate-700 dark:text-violet-300"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-400"
            }`}
          >
            <FileCheck size={15} />
            <span>Assignments</span>
          </button>
        </div>
      </div>

      {/* Render selected view */}
      {subTab === "timetable" && (
        <TimetableSchedule onOpenAddClass={() => setIsClassModalOpen(true)} />
      )}

      {subTab === "courses" && (
        <CoursesView onOpenAddCourse={() => setIsCourseModalOpen(true)} />
      )}

      {subTab === "assignments" && <AssignmentTracker />}

      {/* Modals */}
      <ClassModal
        isOpen={isClassModalOpen}
        onClose={() => setIsClassModalOpen(false)}
      />

      <CourseModal
        isOpen={isCourseModalOpen}
        onClose={() => setIsCourseModalOpen(false)}
      />
    </div>
  );
}
