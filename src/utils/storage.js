/**
 * LocalStorage wrapper with defaults and backup export
 */

const STORAGE_KEYS = {
  SETTINGS: "bloom_pregnancy_settings_v1",
  KICKS: "bloom_pregnancy_kicks_v1",
  CONTRACTIONS: "bloom_pregnancy_contractions_v1",
  HOSPITAL_BAG: "bloom_pregnancy_hospital_bag_v1",
  APPOINTMENTS: "bloom_pregnancy_appointments_v1",
  SAVED_NAMES: "bloom_pregnancy_saved_names_v1",
  WEIGHT_LOGS: "bloom_pregnancy_weight_logs_v1",
};

// Default settings (simulating ~20 weeks by default so user immediately sees rich data)
const DEFAULT_SETTINGS = {
  momName: "Mama",
  partnerName: "",
  method: "lmp", // "lmp" | "ovulation" | "due_date" | "ultrasound"
  // Default LMP ~ 140 days ago (~20 weeks)
  lmpDate: new Date(Date.now() - 140 * 86400000).toISOString().split("T")[0],
  ovulationDate: new Date(Date.now() - 126 * 86400000).toISOString().split("T")[0],
  dueDate: new Date(Date.now() + 140 * 86400000).toISOString().split("T")[0],
  scanDate: new Date(Date.now() - 30 * 86400000).toISOString().split("T")[0],
  scanWeeks: 16,
  scanDays: 0,
  weightUnit: "kg", // "kg" | "lbs"
  heightCm: 165,
  prePregnancyWeight: 62,
  geminiApiKey: "",
};

export function getStoredSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch (e) {
    return DEFAULT_SETTINGS;
  }
}

export function saveStoredSettings(settings) {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (e) {
    console.error("Failed to save settings", e);
  }
}

export function getStoredHospitalBag(defaultItems) {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.HOSPITAL_BAG);
    if (!raw) return defaultItems;
    return JSON.parse(raw);
  } catch (e) {
    return defaultItems;
  }
}

export function saveStoredHospitalBag(items) {
  try {
    localStorage.setItem(STORAGE_KEYS.HOSPITAL_BAG, JSON.stringify(items));
  } catch (e) {
    console.error("Failed to save hospital bag", e);
  }
}

export function getStoredKickLogs() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.KICKS);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function saveStoredKickLogs(logs) {
  try {
    localStorage.setItem(STORAGE_KEYS.KICKS, JSON.stringify(logs));
  } catch (e) {
    console.error("Failed to save kick logs", e);
  }
}

export function getStoredContractions() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CONTRACTIONS);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function saveStoredContractions(logs) {
  try {
    localStorage.setItem(STORAGE_KEYS.CONTRACTIONS, JSON.stringify(logs));
  } catch (e) {
    console.error("Failed to save contractions", e);
  }
}

export function getStoredAppointments() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
    if (!raw) {
      return [
        {
          id: "apt-1",
          title: "Anatomy Ultrasound Scan (20 Weeks)",
          doctor: "Dr. Evelyn Vance (OB-GYN)",
          date: new Date(Date.now() + 3 * 86400000).toISOString().split("T")[0],
          time: "10:30 AM",
          location: "Maternal Health Clinic, Room 302",
          notes: "Fetal anatomy scan, check amniotic fluid index and placenta position. Ask about gender confirmation!",
          bp: "116/74",
        },
      ];
    }
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

export function saveStoredAppointments(apts) {
  try {
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(apts));
  } catch (e) {
    console.error("Failed to save appointments", e);
  }
}

export function getStoredSavedNames() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SAVED_NAMES);
    return raw ? JSON.parse(raw) : [1, 5, 14]; // default bookmarks
  } catch (e) {
    return [1, 5, 14];
  }
}

export function saveStoredSavedNames(ids) {
  try {
    localStorage.setItem(STORAGE_KEYS.SAVED_NAMES, JSON.stringify(ids));
  } catch (e) {
    console.error("Failed to save names", e);
  }
}

export function getStoredWeightLogs() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.WEIGHT_LOGS);
    if (!raw) {
      return [
        { week: 4, weight: 62.0, date: "2026-08-01" },
        { week: 8, weight: 62.5, date: "2026-08-29" },
        { week: 12, weight: 63.8, date: "2026-09-26" },
        { week: 16, weight: 65.2, date: "2026-10-24" },
        { week: 20, weight: 67.0, date: "2026-11-10" },
      ];
    }
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

export function saveStoredWeightLogs(logs) {
  try {
    localStorage.setItem(STORAGE_KEYS.WEIGHT_LOGS, JSON.stringify(logs));
  } catch (e) {
    console.error("Failed to save weight logs", e);
  }
}
