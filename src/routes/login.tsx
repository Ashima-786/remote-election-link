import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { useState } from "react";
import { getVoters, setSession } from "@/lib/voterData";
import { ShieldCheck, Eye, EyeOff, Loader2, Info } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Voter Login — Secure Remote Voting System" },
      { name: "description", content: "Log in with your Voter ID to begin secure remote voting." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [voterId, setVoterId] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!voterId || !password) { setError("Please enter Voter ID and password."); return; }
    setLoading(true);
    setTimeout(() => {
      const v = getVoters().find(x => x.voterId.toLowerCase() === voterId.toLowerCase() && x.password === password);
      if (!v) { setError("Invalid credentials. Try ABC1234567 / voter@123"); setLoading(false); return; }
      setSession(v.voterId, false);
      navigate({ to: "/verify" });
    }, 700);
  };

  return (
    <PageShell>
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid md:grid-cols-2 gap-10 items-start">
        <div className="hidden md:block">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold mb-4">
            <ShieldCheck className="h-3.5 w-3.5" /> Secure Voter Portal
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Sign in to cast your vote</h1>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Use your government-issued Voter ID. After login you will complete OTP, face match, and liveness verification before voting.
          </p>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-3"><span className="text-india-green">✓</span> All sessions are encrypted</li>
            <li className="flex gap-3"><span className="text-india-green">✓</span> Three-factor verification</li>
            <li className="flex gap-3"><span className="text-india-green">✓</span> One vote per voter, enforced</li>
          </ul>
          <div className="mt-8 gov-card p-4 bg-accent/40">
            <div className="text-xs font-semibold mb-1 flex items-center gap-2"><Info className="h-3.5 w-3.5" /> Demo credentials</div>
            <code className="text-xs">ABC1234567 / voter@123</code>
          </div>
        </div>

        <div className="gov-card p-6 sm:p-8">
          <div className="tricolor-bar -mx-6 -mt-6 sm:-mx-8 sm:-mt-8 mb-6" />
          <h2 className="text-2xl font-bold mb-1">Voter Login</h2>
          <p className="text-sm text-muted-foreground mb-6">Enter your credentials to continue</p>
          <form onSubmit={handle} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Voter ID</label>
              <input
                value={voterId} onChange={e => setVoterId(e.target.value)}
                placeholder="e.g. ABC1234567"
                className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={show ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full rounded-md border border-input bg-background px-3 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <button type="button" onClick={() => setShow(s => !s)} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground p-1">
                  {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <div className="flex justify-end mt-1.5">
                <button type="button" className="text-xs text-primary-glow hover:underline">Forgot password?</button>
              </div>
            </div>
            {error && <div className="text-sm rounded-md bg-destructive/10 text-destructive px-3 py-2">{error}</div>}
            <button disabled={loading} type="submit" className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-primary text-primary-foreground py-2.5 font-semibold hover:bg-primary-glow disabled:opacity-60">
              {loading && <Loader2 className="h-4 w-4 animate-spin" />} Login Securely
            </button>
            <div className="text-center text-sm text-muted-foreground">
              New voter? <Link to="/login" className="text-primary-glow hover:underline">Register / Verify</Link>
            </div>
            <div className="rounded-md bg-warning/15 border border-warning/40 text-xs text-foreground px-3 py-2 font-medium">
              Note: This is a prototype system for academic demonstration.
            </div>
          </form>
        </div>
      </section>
    </PageShell>
  );
}
