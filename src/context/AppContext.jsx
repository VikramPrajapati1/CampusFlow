import { createContext, useContext, useState, useEffect } from "react";
import { storageService } from "../services/storageService";
import { soundService } from "../services/soundService";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [currentTab, setCurrentTab] = useState("dashboard");
  const [theme, setTheme] = useState("light");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSyncing, setIsSyncing] = useState(false);

  // Core Data States
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [courses, setCourses] = useState([]);
  const [classes, setClasses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [studyData, setStudyData] = useState(null);
  const [settings, setSettings] = useState({
    soundEnabled: true,
    defaultPomodoroMinutes: 25,
    dailyGoalHours: 4,
  });

  // Toasts
  const [toasts, setToasts] = useState([]);

  const showToast = (title, message, type = "info") => {
    const id = Date.now() + Math.random().toString(36).substring(2, 7);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      dismissToast(id);
    }, 4000);
  };

  const dismissToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Initialize and load from local storage
  useEffect(() => {
    const loaded = storageService.loadAll();
    setUser(loaded.user);
    setTasks(loaded.tasks);
    setCourses(loaded.courses);
    setClasses(loaded.classes);
    setAssignments(loaded.assignments);
    setStudyData(loaded.study);
    setTheme(loaded.theme || "light");
    setSettings(loaded.settings);

    // Apply dark class to root document element
    if (loaded.theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    soundService.setEnabled(loaded.settings?.soundEnabled ?? true);
    setDataLoaded(true);
  }, []);

  // Theme toggle
  const setSpecificTheme = (newTheme) => {
    setTheme(newTheme);
    storageService.saveTheme(newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    showToast(
      "Theme Updated",
      `Switched to ${newTheme === "dark" ? "Night Mode 🌙" : "Day Mode ☀️"}`,
      "info"
    );
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setSpecificTheme(newTheme);
  };

  // Trigger simulated backend synchronization
  const triggerSync = async () => {
    setIsSyncing(true);
    await storageService.simulateApiSync();
    setIsSyncing(false);
  };

  // Task Operations (Phase 2)
  const addTask = (taskData) => {
    const newTask = {
      id: "task-" + Date.now(),
      createdAt: new Date().toISOString(),
      done: false,
      priority: taskData.priority || "Medium",
      ...taskData,
    };
    const updated = [newTask, ...tasks];
    setTasks(updated);
    storageService.saveTasks(updated);
    triggerSync();
    showToast("Task Added", `"${taskData.title}" created successfully!`, "success");
  };

  const updateTask = (taskId, fields) => {
    const updated = tasks.map((t) => (t.id === taskId ? { ...t, ...fields } : t));
    setTasks(updated);
    storageService.saveTasks(updated);
    triggerSync();
    showToast("Task Updated", "Changes saved to database.", "info");
  };

  const deleteTask = (taskId) => {
    const taskToDelete = tasks.find((t) => t.id === taskId);
    const updated = tasks.filter((t) => t.id !== taskId);
    setTasks(updated);
    storageService.saveTasks(updated);
    triggerSync();
    showToast(
      "Task Deleted",
      taskToDelete ? `Deleted "${taskToDelete.title}"` : "Task removed.",
      "warning"
    );
  };

  const toggleTask = (taskId) => {
    let completedNow = false;
    const updated = tasks.map((t) => {
      if (t.id === taskId) {
        completedNow = !t.done;
        return { ...t, done: !t.done };
      }
      return t;
    });
    setTasks(updated);
    storageService.saveTasks(updated);

    if (completedNow) {
      soundService.playTaskSuccess();
      showToast("Great Job! 🎉", "Task marked as completed.", "success");
    }
    triggerSync();
  };

  // Timetable Operations (Phase 3)
  const addClass = (classItem) => {
    const newClass = {
      id: "class-" + Date.now(),
      color: "bg-violet-100 text-violet-700 dark:bg-violet-950/50 dark:text-violet-300",
      badgeColor: "bg-violet-600",
      ...classItem,
    };
    const updated = [...classes, newClass];
    setClasses(updated);
    storageService.saveClasses(updated);
    triggerSync();
    showToast("Class Scheduled", `${classItem.subject} added to timetable`, "success");
  };

  const deleteClass = (classId) => {
    const updated = classes.filter((c) => c.id !== classId);
    setClasses(updated);
    storageService.saveClasses(updated);
    triggerSync();
    showToast("Class Removed", "Class deleted from schedule", "warning");
  };

  // Course Operations (Phase 3)
  const addCourse = (courseData) => {
    const newCourse = {
      id: "course-" + Date.now(),
      color: "bg-violet-500",
      lightBg: "bg-violet-50 text-violet-700 border-violet-200",
      attendance: 100,
      syllabusProgress: 0,
      modules: [],
      ...courseData,
    };
    const updated = [...courses, newCourse];
    setCourses(updated);
    storageService.saveCourses(updated);
    triggerSync();
    showToast("Course Added", `${courseData.name} enrolled`, "success");
  };

  const toggleCourseModule = (courseId, moduleIndex) => {
    const updated = courses.map((c) => {
      if (c.id === courseId) {
        const newMods = [...c.modules];
        newMods[moduleIndex] = {
          ...newMods[moduleIndex],
          completed: !newMods[moduleIndex].completed,
        };
        const completedCount = newMods.filter((m) => m.completed).length;
        const progress = Math.round((completedCount / newMods.length) * 100);
        return { ...c, modules: newMods, syllabusProgress: progress };
      }
      return c;
    });
    setCourses(updated);
    storageService.saveCourses(updated);
    triggerSync();
  };

  // Study Planner & Timer Operations (Phase 4)
  const logStudySession = (session) => {
    if (!studyData) return;
    const addedHours = Number((session.durationMinutes / 60).toFixed(1));
    const newStudied = Number((studyData.todayStudiedHours + addedHours).toFixed(1));

    // Update today's entry in weeklyActivity
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const todayDay = days[new Date().getDay()];

    const updatedWeekly = studyData.weeklyActivity.map((w) =>
      w.day === todayDay ? { ...w, hours: Number((w.hours + addedHours).toFixed(1)) } : w
    );

    const newSession = {
      id: "s-" + Date.now(),
      date: "Just now",
      ...session,
    };

    const updatedStudy = {
      ...studyData,
      todayStudiedHours: newStudied,
      weeklyActivity: updatedWeekly,
      recentSessions: [newSession, ...studyData.recentSessions.slice(0, 9)],
    };

    setStudyData(updatedStudy);
    storageService.saveStudyData(updatedStudy);
    soundService.playTimerComplete();
    showToast(
      "Session Logged! ⏱️",
      `Added ${session.durationMinutes} mins of study for ${session.subject}`,
      "success"
    );
    triggerSync();
  };

  const updateDailyGoal = (hours) => {
    if (!studyData) return;
    const updated = {
      ...studyData,
      dailyGoalHours: Number(hours),
    };
    setStudyData(updated);
    storageService.saveStudyData(updated);
    showToast("Goal Updated", `Daily study goal set to ${hours} hours`, "info");
    triggerSync();
  };

  // User & Settings (Phase 5)
  const updateUserProfile = (updatedProfile) => {
    const updated = { ...user, ...updatedProfile };
    setUser(updated);
    storageService.saveUser(updated);
    triggerSync();
    showToast("Profile Updated", "Student details saved successfully.", "success");
  };

  const updateAppSettings = (newSettings) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    storageService.saveSettings(updated);
    if (newSettings.soundEnabled !== undefined) {
      soundService.setEnabled(newSettings.soundEnabled);
    }
    showToast("Preferences Saved", "Settings updated.", "info");
  };

  const resetAllData = () => {
    const reloaded = storageService.resetAll();
    setUser(reloaded.user);
    setTasks(reloaded.tasks);
    setCourses(reloaded.courses);
    setClasses(reloaded.classes);
    setAssignments(reloaded.assignments);
    setStudyData(reloaded.study);
    showToast("Reset Complete", "All data restored to factory defaults.", "info");
  };

  // Compute live statistics for Phase 2 & Dashboard
  const taskStats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.done).length,
    pending: tasks.filter((t) => !t.done).length,
    highPriority: tasks.filter((t) => !t.done && t.priority === "High").length,
    completionRate: tasks.length > 0 ? Math.round((tasks.filter((t) => t.done).length / tasks.length) * 100) : 0,
  };

  return (
    <AppContext.Provider
      value={{
        dataLoaded,
        currentTab,
        setCurrentTab,
        theme,
        toggleTheme,
        setSpecificTheme,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        searchQuery,
        setSearchQuery,
        isSyncing,
        user,
        updateUserProfile,
        tasks,
        taskStats,
        addTask,
        updateTask,
        deleteTask,
        toggleTask,
        courses,
        addCourse,
        toggleCourseModule,
        classes,
        addClass,
        deleteClass,
        assignments,
        studyData,
        logStudySession,
        updateDailyGoal,
        settings,
        updateAppSettings,
        resetAllData,
        toasts,
        showToast,
        dismissToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
