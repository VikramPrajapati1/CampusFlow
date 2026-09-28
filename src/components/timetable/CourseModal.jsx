import { useState } from "react";
import Modal from "../Modal";
import { useApp } from "../../context/AppContext";

export default function CourseModal({ isOpen, onClose }) {
  const { addCourse, showToast } = useApp();

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [instructor, setInstructor] = useState("");
  const [credits, setCredits] = useState(3);
  const [room, setRoom] = useState("Room 201");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !code.trim()) {
      showToast("Error", "Course name and code are required", "warning");
      return;
    }

    addCourse({
      name: name.trim(),
      code: code.trim().toUpperCase(),
      instructor: instructor.trim() || "Course Faculty",
      credits: Number(credits) || 3,
      room: room.trim() || "Lecture Hall",
    });

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Enroll New Course"
      subtitle="Phase 3: Course Curriculum & Syllabus Tracking"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Course Title <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Artificial Intelligence"
            className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-white"
            required
            autoFocus
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Course Code <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="e.g. CS-607"
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Credit Hours
            </label>
            <input
              type="number"
              min={1}
              max={6}
              value={credits}
              onChange={(e) => setCredits(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Faculty Instructor
            </label>
            <input
              type="text"
              value={instructor}
              onChange={(e) => setInstructor(e.target.value)}
              placeholder="e.g. Dr. Ramesh Kumar"
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Default Classroom / Lab
            </label>
            <input
              type="text"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              placeholder="e.g. Room 201"
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
            className="rounded-xl bg-violet-600 px-5 py-2 text-xs font-semibold text-white shadow-md hover:bg-violet-700"
          >
            Enroll Course
          </button>
        </div>
      </form>
    </Modal>
  );
}
