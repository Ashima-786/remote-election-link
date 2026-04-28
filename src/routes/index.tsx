import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { ShieldCheck, Fingerprint, KeyRound, Lock, UserCheck, Globe2, ArrowRight, CheckCircle2, AlertTriangle, Vote } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Secure Remote Voting System — Vote Securely from Anywhere" },
      { name: "description", content: "Government-approved remote voting platform for migrants, students, workers, and overseas citizens with verified identity." },
      { property: "og:title", content: "Secure Remote Voting System" },
      { property: "og:description", content: "Vote securely from anywhere with verified identity." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <PageShell>
      {/* Hero */}
      <section className="hero-bg ashoka-stripes text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-28 relative">
          <div className="max-w-3xl animate-fade-up">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-3 py-1 text-xs font-medium mb-6">
              <span className="h-2 w-2 rounded-full bg-saffron" />
              Election Commission · Secure Pilot Programme
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight">
              Secure Remote <span className="text-saffron">Voting</span> System
            </h1>
            <p className="mt-5 text-lg md:text-xl text-white/85 max-w-2xl">
              Vote securely from anywhere with verified identity. Designed for migrants, students, workers and overseas citizens of India.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/login" className="inline-flex items-center gap-2 rounded-md bg-white text-primary px-6 py-3 font-semibold shadow-elevated hover:bg-white/95">
                <Vote className="h-4 w-4" /> Login as Voter
              </Link>
              <Link to="/admin/login" className="inline-flex items-center gap-2 rounded-md border border-white/30 bg-white/10 px-6 py-3 font-semibold text-white hover:bg-white/20">
                <ShieldCheck className="h-4 w-4" /> Admin Login
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-6 text-sm text-white/80">
              <div className="flex items-center gap-2"><Lock className="h-4 w-4 text-saffron" /> End-to-end encrypted</div>
              <div className="flex items-center gap-2"><Fingerprint className="h-4 w-4 text-saffron" /> Biometric verified</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-saffron" /> One person · one vote</div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem / Solution */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 grid md:grid-cols-2 gap-6">
        <div className="gov-card p-8">
          <div className="inline-flex items-center gap-2 text-destructive font-semibold mb-3">
            <AlertTriangle className="h-5 w-5" /> The Problem
          </div>
          <h2 className="text-2xl font-bold mb-3">Millions cannot vote from where they live</h2>
          <p className="text-muted-foreground leading-relaxed">
            Migrant workers, students studying in other states, employees on duty, and overseas Indian citizens routinely miss elections because physical presence at a home-constituency booth is required. Voter turnout suffers and democratic representation weakens.
          </p>
        </div>
        <div className="gov-card p-8 border-l-4 border-l-india-green">
          <div className="inline-flex items-center gap-2 text-india-green font-semibold mb-3">
            <CheckCircle2 className="h-5 w-5" /> Our Solution
          </div>
          <h2 className="text-2xl font-bold mb-3">A verified, encrypted remote ballot</h2>
          <p className="text-muted-foreground leading-relaxed">
            A multi-layered verification pipeline — OTP, face match, liveness check — paired with end-to-end encryption and anonymised vote storage. Votes are tamper-evident and never linked to voter identity.
          </p>
        </div>
      </section>

      {/* Key features */}
      <section className="bg-surface border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="text-center mb-12">
            <div className="text-xs uppercase tracking-widest text-primary-glow font-semibold">Key Features</div>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">Built on trust, secured by design</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: ShieldCheck, t: "Government-Grade Security", d: "Hardened authentication and audit trails reviewed by election officers." },
              { icon: Fingerprint, t: "Face Verification", d: "Live face match against your registered Voter ID photograph." },
              { icon: KeyRound, t: "OTP Authentication", d: "Time-limited OTP delivered to your registered mobile and email." },
              { icon: Lock, t: "Encrypted Voting", d: "Each ballot is encrypted on-device before transmission." },
              { icon: UserCheck, t: "One Person · One Vote", d: "System enforces single ballot per voter, validated server-side." },
              { icon: Globe2, t: "Vote From Anywhere", d: "Works from any device, in any state, or from overseas." },
            ].map(({ icon: Icon, t, d }) => (
              <div key={t} className="gov-card p-6 hover:-translate-y-1 transition-transform">
                <div className="h-11 w-11 rounded-md bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="font-semibold mb-1">{t}</div>
                <p className="text-sm text-muted-foreground leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-12">
          <div className="text-xs uppercase tracking-widest text-primary-glow font-semibold">How It Works</div>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">Cast your vote in four simple steps</h2>
        </div>
        <div className="grid md:grid-cols-4 gap-5">
          {[
            { n: "01", t: "Login", d: "Enter your Voter ID and password." },
            { n: "02", t: "Verify", d: "OTP, face match and liveness check." },
            { n: "03", t: "Vote", d: "Review candidates and select securely." },
            { n: "04", t: "Receipt", d: "Receive an anonymous tamper-proof hash." },
          ].map(s => (
            <div key={s.n} className="gov-card p-6 relative overflow-hidden">
              <div className="absolute -top-4 -right-2 text-7xl font-display font-bold text-primary/5">{s.n}</div>
              <div className="text-saffron font-mono text-sm mb-2">STEP {s.n}</div>
              <div className="font-semibold text-lg mb-1">{s.t}</div>
              <p className="text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link to="/login" className="inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-6 py-3 font-semibold hover:bg-primary-glow">
            Begin Voting <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
