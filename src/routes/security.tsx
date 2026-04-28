import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { KeyRound, ScanFace, Activity, UserCheck, Lock, EyeOff, FileSearch, ShieldCheck, Database } from "lucide-react";

export const Route = createFileRoute("/security")({
  head: () => ({
    meta: [
      { title: "Security Features — Secure Remote Voting System" },
      { name: "description", content: "OTP, face recognition, liveness, end-to-end encryption, anonymous storage, tamper-proof audit trail." },
    ],
  }),
  component: Security,
});

const items = [
  { i: KeyRound, t: "OTP Authentication", d: "Time-limited one-time passwords sent to your registered mobile and email channels, validated server-side." },
  { i: ScanFace, t: "Face Recognition", d: "Live face capture is matched against the photograph on your Voter ID record using a secure model." },
  { i: Activity, t: "Liveness Detection", d: "Detects natural blinks and head motion to defeat photo, video and 3D-mask spoofing attempts." },
  { i: UserCheck, t: "One Person · One Vote", d: "Voting status is locked atomically once the ballot is accepted — duplicate votes are impossible." },
  { i: Lock, t: "End-to-End Encryption", d: "Ballots are encrypted on your device and remain encrypted in transit and at rest." },
  { i: EyeOff, t: "Anonymous Vote Storage", d: "Voter identity is never stored alongside the ballot — only an anonymised cryptographic token." },
  { i: Database, t: "Tamper-Proof Records", d: "A blockchain-inspired hash chain ensures any tampering with cast ballots is immediately detectable." },
  { i: FileSearch, t: "Audit Logs", d: "Every authentication attempt and ballot acceptance is logged for independent third-party audit." },
  { i: ShieldCheck, t: "Privacy Protection", d: "Aadhaar and phone are masked across the system. Access follows least-privilege role-based controls." },
];

function Security() {
  return (
    <PageShell>
      <section className="hero-bg text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="text-xs uppercase tracking-widest text-saffron font-semibold">Security Features</div>
          <h1 className="text-3xl md:text-5xl font-bold mt-2 max-w-3xl">A defence-in-depth approach to digital democracy</h1>
          <p className="mt-4 max-w-2xl text-white/85">Multiple independent layers of verification, encryption and auditability ensure that every ballot is genuine, secret and counted.</p>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map(({ i: Icon, t, d }) => (
          <div key={t} className="gov-card p-6 hover:-translate-y-1 transition-transform">
            <div className="h-11 w-11 rounded-md bg-primary/10 text-primary flex items-center justify-center mb-4"><Icon className="h-5 w-5" /></div>
            <div className="font-semibold mb-1">{t}</div>
            <p className="text-sm text-muted-foreground leading-relaxed">{d}</p>
          </div>
        ))}
      </section>
    </PageShell>
  );
}
