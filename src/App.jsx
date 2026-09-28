import { useState } from "react";
import { AppProvider, useApp } from "./context/AppContext";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import MobileDrawer from "./components/MobileDrawer";
import NotificationToast from "./components/NotificationToast";
import AuthModal from "./components/AuthModal";
import TaskModal from "./components/tasks/TaskModal";
import ErrorBoundary from "./components/ErrorBoundary";

// Views for the 8 Phases
import DashboardOverview from "./components/dashboard/DashboardOverview";
import TaskManager from "./components/tasks/TaskManager";
import TimetableCoursesModule from "./components/timetable/TimetableCoursesModule";
import StudyPlannerModule from "./components/study/StudyPlannerModule";
import ProfileModule from "./components/profile/ProfileModule";
import DevelopmentRoadmap from "./components/roadmap/DevelopmentRoadmap";

function AppContent() {
  const { currentTab, setCurrentTab } = useApp();
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 md:flex dark:bg-slate-950 dark:text-slate-100 transition-colors">
      {/* Desktop Sidebar */}
      <Sidebar onOpenAuth={() => setIsAuthModalOpen(true)} />

      {/* Mobile Drawer */}
      <MobileDrawer />

      {/* Main Content Viewport */}
      <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-9 flex flex-col justify-between">
        <div>
          {/* Header Navbar */}
          <Navbar
            onOpenNewTask={() => setIsTaskModalOpen(true)}
            onOpenAuth={() => setIsAuthModalOpen(true)}
          />

          {/* Dynamic Tab Router */}
          <div className="pb-10">
            {currentTab === "dashboard" && (
              <DashboardOverview onOpenNewTask={() => setIsTaskModalOpen(true)} />
            )}

            {currentTab === "tasks" && <TaskManager />}

            {currentTab === "timetable" && <TimetableCoursesModule />}

            {currentTab === "study" && <StudyPlannerModule />}

            {currentTab === "roadmap" && <DevelopmentRoadmap />}

            {currentTab === "profile" && <ProfileModule />}
          </div>
        </div>

        {/* Global Footer */}
        <footer className="mt-auto border-t border-slate-200/80 pt-6 pb-4 text-center text-xs text-slate-400 dark:border-slate-800/80 dark:text-slate-500">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p>
              © 2026 CampusFlow. Built for smarter student life. Engineered by <span className="font-semibold text-violet-600 dark:text-violet-400">Vikram</span>.
            </p>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setCurrentTab("roadmap")}
                className="hover:text-violet-600 dark:hover:text-violet-400 font-medium transition-colors"
              >
                Development Roadmap (8 Phases)
              </button>
              <button
                onClick={() => setCurrentTab("profile")}
                className="hover:text-violet-600 dark:hover:text-violet-400 font-medium transition-colors"
              >
                Settings & Backup
              </button>
            </div>
          </div>
        </footer>
      </main>

      {/* Modals & Overlay Services */}
      <NotificationToast />

      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </ErrorBoundary>
  );
}