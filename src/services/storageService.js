// CampusFlow Storage & Simulated Backend API Service

import {
  defaultUser,
  defaultTasks,
  defaultCourses,
  defaultClasses,
  defaultAssignments,
  defaultStudyData,
} from "../data/defaultData";

const STORAGE_KEYS = {
  USER: "campusflow_user_v1",
  TASKS: "campusflow_tasks_v1",
  COURSES: "campusflow_courses_v1",
  CLASSES: "campusflow_classes_v1",
  ASSIGNMENTS: "campusflow_assignments_v1",
  STUDY: "campusflow_study_v1",
  THEME: "campusflow_theme_v1",
  SETTINGS: "campusflow_settings_v1",
};

export const storageService = {
  // Safe getItem with fallback
  get(key, fallback) {
    if (typeof window === "undefined") return fallback;
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : fallback;
    } catch (err) {
      console.error(`Error reading ${key} from storage:`, err);
      return fallback;
    }
  },

  // Safe setItem
  set(key, value) {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error(`Error writing ${key} to storage:`, err);
    }
  },

  // Initialize data if first run
  init() {
    if (!localStorage.getItem(STORAGE_KEYS.TASKS)) {
      this.set(STORAGE_KEYS.TASKS, defaultTasks);
    }
    if (!localStorage.getItem(STORAGE_KEYS.COURSES)) {
      this.set(STORAGE_KEYS.COURSES, defaultCourses);
    }
    if (!localStorage.getItem(STORAGE_KEYS.CLASSES)) {
      this.set(STORAGE_KEYS.CLASSES, defaultClasses);
    }
    if (!localStorage.getItem(STORAGE_KEYS.ASSIGNMENTS)) {
      this.set(STORAGE_KEYS.ASSIGNMENTS, defaultAssignments);
    }
    if (!localStorage.getItem(STORAGE_KEYS.STUDY)) {
      this.set(STORAGE_KEYS.STUDY, defaultStudyData);
    }
    if (!localStorage.getItem(STORAGE_KEYS.USER)) {
      this.set(STORAGE_KEYS.USER, defaultUser);
    }
  },

  loadAll() {
    this.init();
    return {
      user: this.get(STORAGE_KEYS.USER, defaultUser),
      tasks: this.get(STORAGE_KEYS.TASKS, defaultTasks),
      courses: this.get(STORAGE_KEYS.COURSES, defaultCourses),
      classes: this.get(STORAGE_KEYS.CLASSES, defaultClasses),
      assignments: this.get(STORAGE_KEYS.ASSIGNMENTS, defaultAssignments),
      study: this.get(STORAGE_KEYS.STUDY, defaultStudyData),
      theme: this.get(STORAGE_KEYS.THEME, "light"),
      settings: this.get(STORAGE_KEYS.SETTINGS, {
        soundEnabled: true,
        defaultPomodoroMinutes: 25,
        dailyGoalHours: 4,
      }),
    };
  },

  saveTasks(tasks) {
    this.set(STORAGE_KEYS.TASKS, tasks);
  },

  saveCourses(courses) {
    this.set(STORAGE_KEYS.COURSES, courses);
  },

  saveClasses(classes) {
    this.set(STORAGE_KEYS.CLASSES, classes);
  },

  saveAssignments(assignments) {
    this.set(STORAGE_KEYS.ASSIGNMENTS, assignments);
  },

  saveStudyData(study) {
    this.set(STORAGE_KEYS.STUDY, study);
  },

  saveUser(user) {
    this.set(STORAGE_KEYS.USER, user);
  },

  saveTheme(theme) {
    this.set(STORAGE_KEYS.THEME, theme);
  },

  saveSettings(settings) {
    this.set(STORAGE_KEYS.SETTINGS, settings);
  },

  resetAll() {
    this.set(STORAGE_KEYS.TASKS, defaultTasks);
    this.set(STORAGE_KEYS.COURSES, defaultCourses);
    this.set(STORAGE_KEYS.CLASSES, defaultClasses);
    this.set(STORAGE_KEYS.ASSIGNMENTS, defaultAssignments);
    this.set(STORAGE_KEYS.STUDY, defaultStudyData);
    this.set(STORAGE_KEYS.USER, defaultUser);
    return this.loadAll();
  },

  // Export full JSON database for Phase 8 / Portfolio
  exportBackup() {
    const data = {
      version: "1.0.0",
      exportDate: new Date().toISOString(),
      user: this.get(STORAGE_KEYS.USER, defaultUser),
      tasks: this.get(STORAGE_KEYS.TASKS, defaultTasks),
      courses: this.get(STORAGE_KEYS.COURSES, defaultCourses),
      classes: this.get(STORAGE_KEYS.CLASSES, defaultClasses),
      assignments: this.get(STORAGE_KEYS.ASSIGNMENTS, defaultAssignments),
      study: this.get(STORAGE_KEYS.STUDY, defaultStudyData),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `CampusFlow_Backup_${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  },

  // Import JSON backup
  importBackup(jsonString) {
    try {
      const data = JSON.parse(jsonString);
      if (data.tasks) this.set(STORAGE_KEYS.TASKS, data.tasks);
      if (data.courses) this.set(STORAGE_KEYS.COURSES, data.courses);
      if (data.classes) this.set(STORAGE_KEYS.CLASSES, data.classes);
      if (data.assignments) this.set(STORAGE_KEYS.ASSIGNMENTS, data.assignments);
      if (data.study) this.set(STORAGE_KEYS.STUDY, data.study);
      if (data.user) this.set(STORAGE_KEYS.USER, data.user);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  // Simulated REST API latency for realistic Phase 6 Backend state
  async simulateApiSync() {
    return new Promise((resolve) => setTimeout(resolve, 400));
  },
};
