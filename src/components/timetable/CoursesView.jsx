import { useState } from "react";
import { useApp } from "../../context/AppContext";
import { User, MapPin, CheckCircle2, ChevronDown, ChevronUp, Plus } from "lucide-react";

export default function CoursesView({ onOpenAddCourse }) {
  const { courses, toggleCourseModule } = useApp();
  const [expandedCourseId, setExpandedCourseId] = useState(courses[0]?.id || null);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">
            Registered Courses ({courses.length})
          </h3>
          <p className="text-xs text-slate-400">
            Current semester curriculum, attendance records & syllabus progress
          </p>
        </div>

        <button
          onClick={onOpenAddCourse}
          className="inline-flex items-center gap-1.5 rounded-xl bg-violet-600 px-3.5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-violet-700 transition-colors"
        >
          <Plus size={15} />
          <span>Add Course</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {courses.map((course) => {
          const isExpanded = expandedCourseId === course.id;
          const isAttendanceGood = (course.attendance || 90) >= 85;

          return (
            <div
              key={course.id}
              className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between transition-all"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                      {course.code}
                    </span>
                    <h4 className="mt-1.5 text-base font-bold text-slate-900 dark:text-white">
                      {course.name}
                    </h4>
                  </div>
                  <div className="flex flex-col items-end">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                        isAttendanceGood
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300"
                          : "bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300"
                      }`}
                    >
                      {course.attendance || 90}% Attd.
                    </span>
                    <span className="mt-1 text-[11px] text-slate-400">
                      {course.credits} Credits
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400 mb-4">
                  <div className="flex items-center gap-2">
                    <User size={13} className="text-slate-400" />
                    <span>{course.instructor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={13} className="text-slate-400" />
                    <span>{course.room}</span>
                  </div>
                </div>

                {/* Syllabus Progress */}
                <div className="mb-3">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      Syllabus Completed
                    </span>
                    <span className="font-bold text-violet-600 dark:text-violet-400">
                      {course.syllabusProgress || 0}%
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <div
                      className="h-full rounded-full bg-violet-600 transition-all duration-300"
                      style={{ width: `${course.syllabusProgress || 0}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Modules Accordion */}
              {course.modules && course.modules.length > 0 && (
                <div className="mt-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => setExpandedCourseId(isExpanded ? null : course.id)}
                    className="flex w-full items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-violet-600 transition-colors"
                  >
                    <span>Modules ({course.modules.filter((m) => m.completed).length}/{course.modules.length} Done)</span>
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>

                  {isExpanded && (
                    <div className="mt-3 space-y-2">
                      {course.modules.map((mod, idx) => (
                        <div
                          key={idx}
                          onClick={() => toggleCourseModule(course.id, idx)}
                          className="flex items-center gap-2.5 rounded-xl p-2 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                        >
                          <CheckCircle2
                            size={16}
                            className={
                              mod.completed
                                ? "text-emerald-500 fill-emerald-500/10"
                                : "text-slate-300 dark:text-slate-700"
                            }
                          />
                          <span
                            className={`text-xs ${
                              mod.completed
                                ? "line-through text-slate-400 dark:text-slate-500"
                                : "text-slate-700 dark:text-slate-200"
                            }`}
                          >
                            {mod.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
