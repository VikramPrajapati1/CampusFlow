# 🎓 CampusFlow — Smart Student Workspace & Academic Planner

> **Modern, all-in-one productivity workspace for students & universities.**
> Manage tasks, track lectures & timetable, log Pomodoro study sessions, monitor attendance & syllabus progress, and store data persistently.

---

## 📌 Development Overview — 8 Phases

| Phase | Milestone | Features & Deliverables | Status |
|:---:|:---|:---|:---:|
| **1** | **Project Setup & UI** | React 19, Vite 8, Tailwind CSS v4, accessible UI components, responsive layout & dark mode | ✅ Completed |
| **2** | **Dashboard & Task Management** | Add, edit, delete, filter, and complete tasks with automatic dynamic statistics | ✅ Completed |
| **3** | **Timetable & Courses** | Weekly class schedules, room numbers, course attendance, syllabus checklists & assignments | ✅ Completed |
| **4** | **Study Planner & Analytics** | Interactive Pomodoro focus timer, daily goals, streak counter, and Recharts analytics | ✅ Completed |
| **5** | **Profile & Settings** | Editable student profile (Roll No, CGPA, Branch), creator tribute, theme & preferences | ✅ Completed |
| **6** | **Backend & Database** | Offline-first LocalStorage database, session switching, and simulated REST API sync | ✅ Completed |
| **7** | **Testing & Security** | Form validation, accessible modal focus, toast alerts, error boundaries & responsive testing | ✅ Completed |
| **8** | **Deployment & Portfolio** | Production-optimized code splitting, JSON database export/import, and portfolio documentation | ✅ Completed |

---

## ✨ Key Features

### 1. 📋 Dynamic Task Board
- **Full CRUD operations**: Create new tasks, update details, delete with confirmation, and toggle completion.
- **Dynamic Stats Calculation**: Instant calculation of total tasks, completed, pending, urgent items, and overall velocity.
- **Multi-filter & Search**: Filter by status (*All, Pending, Completed*), priority (*High, Medium, Low*), or enrolled subject.

### 2. 🗓️ Timetable & Course Management
- **Day-by-Day Schedule**: Monday to Saturday view with room/lab locations and faculty names.
- **Academic Courses**: Attendance tracking with danger alerts (<75%), credit hours, and syllabus module checklists.
- **Assignment Submissions**: Submission status (*Submitted, In Progress, Pending*), deadlines, and weightage points.

### 3. ⏱️ Study Planner & Deep Analytics
- **Pomodoro Focus Timer**: 25m focus, 5m short break, 15m long break, or custom duration.
- **Audio Chimes**: Synthesized harmonic chimes generated via the native Web Audio API (zero audio file dependencies).
- **Interactive Recharts**:
  - Weekly study activity area chart with smooth gradient fills.
  - Subject-wise study hours breakdown bar chart.
- **Daily Target & Streaks**: Customizable daily goal (e.g. 4.0 hrs) with real-time percentage and streak tracker 🔥.

### 4. 🌙 Light & Dark Mode
- Built with Tailwind CSS v4 and system preference detection.
- Persistent mode in `localStorage` without flash of unstyled content (FOUC).

### 5. 💾 Offline-First Data Persistence & Backups
- Automatic synchronization across tasks, timetable, courses, and timer history.
- **Export Backup**: One-click download of the complete database as a `.json` file.
- **Import Backup**: Restore application state anytime from a JSON backup file.

---

## 🛠️ Tech Stack

- **Frontend Framework**: [React 19](https://react.dev/)
- **Bundler & Tooling**: [Vite 8](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts 3](https://recharts.org/)
- **Audio**: Web Audio API
- **Persistence**: LocalStorage with schema versioning and JSON serialization

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or pnpm

### Installation & Run

1. Clone or open the repository:
   ```bash
   cd campusflow
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

5. Preview production build:
   ```bash
   npm run preview
   ```

---

## 👨‍💻 Creator & Credits

- **Developer**: Vikram
- **Project**: CampusFlow
- **License**: MIT
