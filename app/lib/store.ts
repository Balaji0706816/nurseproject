// @/lib/store.ts
// (Updated: adds date-keyed check-ins + fixes a couple of type/return bugs)

export type AuthState = {
  isAuthed: boolean;
  user?: { name: string };
};

const AUTH_KEY = "aides_auth";

export function getAuth(): AuthState {
  if (typeof window === "undefined") return { isAuthed: false };
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) return { isAuthed: false };
    return JSON.parse(raw) as AuthState;
  } catch {
    return { isAuthed: false };
  }
}

export function setAuth(state: AuthState) {
  if (typeof window === "undefined") return;
  localStorage.setItem(AUTH_KEY, JSON.stringify(state));
}

export function clearAuth() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(AUTH_KEY);
}

/* ---------------- Check-in store ---------------- */

export type CheckInPayload = {
  distress: number; // 0-10
  mood: number; // 0-10 (0 unpleasant -> 10 pleasant)
  energy: number; // 0-10 (0 drained -> 10 energized)
  tags: string[];
  note: string;
  steadinessScore: number; // 0-100
  createdAt: string; // ISO timestamp
  dateISO?: string; // ✅ YYYY-MM-DD (local) – used for calendar-based check-ins
};

const CHECKIN_LAST_KEY = "aides_last_checkin";
const CHECKIN_HISTORY_KEY = "aides_checkin_history";

/** ✅ NEW: date-keyed storage map */
const CHECKIN_BY_DATE_KEY = "aides_checkins_by_date";

/** ✅ NEW: YYYY-MM-DD for "today" in local time */
export function todayISO() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

/** ✅ NEW: convert YYYY-MM-DD to a local Date (midnight) safely */
export function isoToLocalDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1);
}

/** ✅ NEW: save check-in for a specific date key */
export function saveCheckInForDate(dateISO: string, payload: CheckInPayload) {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(CHECKIN_BY_DATE_KEY);
    const map = raw ? (JSON.parse(raw) as Record<string, CheckInPayload>) : {};
    map[dateISO] = { ...payload, dateISO };
    localStorage.setItem(CHECKIN_BY_DATE_KEY, JSON.stringify(map));
  } catch {
    // ignore storage errors
  }
}

/** ✅ NEW: get check-in for a specific date key */
export function getCheckInForDate(dateISO: string): CheckInPayload | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CHECKIN_BY_DATE_KEY);
    if (!raw) return null;
    const map = JSON.parse(raw) as Record<string, CheckInPayload>;
    return map[dateISO] ?? null;
  } catch {
    return null;
  }
}

/** Save "last check-in" (used for the StudioPanel radar card) */
export function saveLastCheckIn(payload: CheckInPayload) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CHECKIN_LAST_KEY, JSON.stringify(payload));
}

/** Read "last check-in" */
export function getLastCheckIn(): CheckInPayload | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CHECKIN_LAST_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as CheckInPayload;
  } catch {
    return null;
  }
}

/** Clear last check-in */
export function clearLastCheckIn() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(CHECKIN_LAST_KEY);
}

/** Clear date-keyed map (optional helper) */
export function clearCheckInsByDate() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(CHECKIN_BY_DATE_KEY);
}

/* ---------------- Check-in history ---------------- */

export function getCheckInHistory(): CheckInPayload[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CHECKIN_HISTORY_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as CheckInPayload[];
  } catch {
    return [];
  }
}

export function addCheckInToHistory(payload: CheckInPayload) {
  if (typeof window === "undefined") return;
  const history = getCheckInHistory();
  const next = [payload, ...history].slice(0, 120); // keep last 120 entries max
  localStorage.setItem(CHECKIN_HISTORY_KEY, JSON.stringify(next));
}

export function clearCheckInHistory() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(CHECKIN_HISTORY_KEY);
}

/** (Optional) legacy helpers you had; kept but corrected */
export type CheckInPayloadHistory = {
  distress: number;
  mood: number;
  energy: number;
  tags: string[];
  note: string;
  steadinessScore: number;
  createdAt: string; // ISO
};

export function saveLastCheckInHistory(payload: CheckInPayloadHistory) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CHECKIN_LAST_KEY, JSON.stringify(payload));
}

export function getLastCheckInHistory(): CheckInPayloadHistory | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CHECKIN_LAST_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as CheckInPayloadHistory; // ✅ fixed type
  } catch {
    return null;
  }
}

export function clearLastCheckInHistory() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(CHECKIN_LAST_KEY);
}

/* ---------------- Weekly focus ---------------- */

export const WEEKLY_DOMAINS = ["Diet", "Sleep", "Exercise", "Medication", "Stress", "Community"] as const;

export type WeeklyDomain = (typeof WEEKLY_DOMAINS)[number];

function isoWeekNumber(date: Date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

export function getWeeklyFocus(date = new Date()): WeeklyDomain {
  const week = isoWeekNumber(date);
  const idx = week % WEEKLY_DOMAINS.length;
  return WEEKLY_DOMAINS[idx];
}
