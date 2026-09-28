import { useState } from "react";
import Modal from "../Modal";
import { useApp } from "../../context/AppContext";

export default function ClassModal({ isOpen, onClose }) {
  const { addClass, courses, showToast } = useApp();

  const [subject, setSubject] = useState(courses[0]?.name || "Machine Learning");
  const [day, setDay] = useState("Monday");
  const [time, setTime] = useState("09:30 AM - 11:00 AM");
  const [room, setRoom] = useState("Room 204");
  const [instructor, setInstructor] = useState("Dr. Ananya Sharma");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subject.trim()) {
      showToast("Error", "Subject is required", "warning");
      return;
    }

    addClass({
      subject,
      day,
      time,
      room,
      instructor,
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Class to Timetable"
      subtitle="Phase 3: Class Schedule & Timetable Planning"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Subject / Course
          </label>
          <select
            value={subject}
            onChange={(e) => {
              setSubject(e.target.value);
              const found = courses.find((c) => c.name === e.target.value);
              if (found) {
                setInstructor(found.instructor);
                setRoom(found.room);
              }
            }}
            className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none bg-white dark:border-slate-800 dark:bg-slate-800 dark:text-white"
          >
            {courses.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name} ({c.code})
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Day of Week
            </label>
            <select
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none bg-white dark:border-slate-800 dark:bg-slate-800 dark:text-white"
            >
              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Time Slot
            </label>
            <input
              type="text"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="e.g. 09:30 AM - 11:00 AM"
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-white"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Room / Lab
            </label>
            <input
              type="text"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              placeholder="e.g. Room 204 or Lab 3"
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Instructor / Professor
            </label>
            <input
              type="text"
              value={instructor}
              onChange={(e) => setInstructor(e.target.value)}
              placeholder="e.g. Dr. Ananya Sharma"
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-white"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-xl bg-violet-600 px-5 py-2 text-xs font-semibold text-white shadow-md hover:bg-violet-700 transition-colors"
          >
            Add to Timetable
          </button>
        </div>
      </form>
    </Modal>
  );
}
