export interface Voter {
  voterId: string;
  password: string;
  name: string;
  age: number;
  dob: string;
  gender: string;
  address: string;
  constituency: string;
  state: string;
  pollingBooth: string;
  electionType: string;
  aadhaar: string;
  phone: string;
  voted: boolean;
  eligible: boolean;
}

export const dummyVoters: Voter[] = [
  {
    voterId: "ABC1234567",
    password: "voter@123",
    name: "Aarav Sharma",
    age: 24,
    dob: "2001-04-12",
    gender: "Male",
    address: "B-204, Sector 18, Noida, UP",
    constituency: "Gautam Buddha Nagar",
    state: "Uttar Pradesh",
    pollingBooth: "Booth #142, Govt. Polytechnic",
    electionType: "General Elections 2026",
    aadhaar: "1234 5678 9012",
    phone: "9876543210",
    voted: false,
    eligible: true,
  },
  {
    voterId: "XYZ9876543",
    password: "voter@123",
    name: "Priya Verma",
    age: 29,
    dob: "1996-09-03",
    gender: "Female",
    address: "Flat 7B, Marine Drive, Mumbai, MH",
    constituency: "Mumbai South",
    state: "Maharashtra",
    pollingBooth: "Booth #056, St. Xavier's College",
    electionType: "General Elections 2026",
    aadhaar: "9876 5432 1098",
    phone: "9123456780",
    voted: false,
    eligible: true,
  },
];

export const candidates = [
  { id: "c1", name: "Rohan Iyer", party: "National Progress Party", symbol: "🌅", profile: "Public policy advocate, 12 yrs in civic service." },
  { id: "c2", name: "Meera Krishnan", party: "United Democratic Front", symbol: "🌾", profile: "Former municipal commissioner, education reformer." },
  { id: "c3", name: "Vikram Singh", party: "People's Alliance", symbol: "⚖️", profile: "Lawyer & constitutional rights advocate." },
  { id: "c4", name: "Aisha Khan", party: "Independent", symbol: "🌿", profile: "Climate scientist & community organiser." },
  { id: "NOTA", name: "None of the Above", party: "NOTA", symbol: "❌", profile: "Reject all candidates." },
];

const SESSION_KEY = "srvs_session";
const VOTERS_KEY = "srvs_voters";

export function getVoters(): Voter[] {
  if (typeof window === "undefined") return dummyVoters;
  const raw = localStorage.getItem(VOTERS_KEY);
  if (!raw) {
    localStorage.setItem(VOTERS_KEY, JSON.stringify(dummyVoters));
    return dummyVoters;
  }
  try { return JSON.parse(raw); } catch { return dummyVoters; }
}

export function saveVoters(v: Voter[]) {
  localStorage.setItem(VOTERS_KEY, JSON.stringify(v));
}

export function setSession(voterId: string, verified = false) {
  localStorage.setItem(SESSION_KEY, JSON.stringify({ voterId, verified }));
}

export function getSession(): { voterId: string; verified: boolean } | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

export function markVoted(voterId: string) {
  const v = getVoters();
  const updated = v.map(x => x.voterId === voterId ? { ...x, voted: true } : x);
  saveVoters(updated);
}

export function maskAadhaar(a: string) {
  return a.replace(/\d(?=\d{4})/g, "X");
}
export function maskPhone(p: string) {
  return p.replace(/\d(?=\d{2})/g, "X");
}

export async function generateHash(input: string): Promise<string> {
  if (typeof window !== "undefined" && window.crypto?.subtle) {
    const enc = new TextEncoder().encode(input + Date.now());
    const buf = await window.crypto.subtle.digest("SHA-256", enc);
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
  }
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}
