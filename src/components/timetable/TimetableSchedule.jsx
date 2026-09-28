import { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Clock3, MapPin, User, Trash2, Plus, Calendar } from "lucide-react";

export default function TimetableSchedule({ onOpenAddClass }) {
  const { classes, deleteClass } = useApp();
  const [selectedDay, setSelectedDay] = useState("Monday");

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "All Days"];

  const filteredClasses = classes.filter((c) => {
    if (selectedDay === "All Days") return true;
    return c.day === selectedDay;
  });

  return (
    <div className="space-y-5">
      {/* Day Selector Bar */}
      <div className="flex items-center justify-between gap-3 overflow-x-auto pb-1 scrollbar-none">
        <div className="flex items-center gap-1.5 rounded-2xl bg-slate-100 p-1.5 dark:bg-slate-800">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition-all ${
                selectedDay === day
                  ? "bg-white text-violet-700 shadow-sm dark:bg-slate-700 dark:text-violet-300"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-400"
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        <button
          onClick={onOpenAddClass}
          className="inline-flex items-center gap-1.5 rounded-xl bg-violet-600 px-3.5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-violet-700 shrink-0"
        >
          <Plus size={15} />
          <span>Add Class</span>
        </button>
      </div>

      {/* Classes list */}
      <div className="space-y-3">
        {filteredClasses.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center dark:border-slate-800 dark:bg-slate-900">
            <Calendar size={32} className="mx-auto text-slate-300 mb-2" />
            <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">
              No classes scheduled for {selectedDay}
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Enjoy your self-study time or schedule an extra lecture.
            </p>
            <button
              onClick={onOpenAddClass}
              className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-violet-600 hover:underline dark:text-violet-400"
            >
              <Plus size={14} /> Schedule a lecture
            </button>
          </div>
        ) : (
          filteredClasses.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4.5 shadow-sm hover:border-violet-300 transition-all dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex items-center gap-3.5">
                <div className={`rounded-2xl p-3 shrink-0 ${item.color || "bg-violet-100 text-violet-700"}`}>
                  <Calendar size={22} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                      {item.subject}
                    </h4>
                    {selectedDay === "All Days" && (
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                        {item.day}
                      </span>
                    )}
                  </div>

                  <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <MapPin size={13} className="text-slate-400" />
                      {item.room}
                    </span>
                    {item.instructor && (
                      <span className="flex items-center gap-1">
                        <User size={13} className="text-slate-400" />
                        {item.instructor}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/50 px-3 py-1.5 rounded-xl">
                  <Clock3 size={14} />
                  <span>{item.time}</span>
                </div>

                <button
                  onClick={() => deleteClass(item.id)}
                  className="rounded-xl p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/40 transition-colors"
                  title="Remove from schedule"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
