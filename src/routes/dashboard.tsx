import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { useEffect, useState } from "react";
import { getSession, getVoters, maskAadhaar, maskPhone, clearSession, type Voter } from "@/lib/voterData";
import { User, MapPin, CalendarDays, Vote, ShieldCheck, LogOut, BadgeCheck, Ban } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Voter Dashboard — SRVS" }] }),
  component: Dashboard,
});

function Dashboard() {
  const navigate = useNavigate();
  const [voter, setVoter] = useState<Voter | null>(null);

  useEffect(() => {
    const s = getSession();
    if (!s || !s.verified) { navigate({ to: "/login" }); return; }
    const v = getVoters().find(x => x.voterId === s.voterId) || null;
    setVoter(v);
  }, [navigate]);

  if (!voter) return null;

  const fields: { label: string; value: string; icon?: any }[] = [
    { label: "Full Name", value: voter.name, icon: User },
    { label: "Voter ID", value: voter.voterId },
    { label: "Age", value: String(voter.age) },
    { label: "Date of Birth", value: voter.dob, icon: CalendarDays },
    { label: "Gender", value: voter.gender },
    { label: "Aadhaar (masked)", value: maskAadhaar(voter.aadhaar) },
    { label: "Phone (masked)", value: maskPhone(voter.phone) },
    { label: "Registered Address", value: voter.address, icon: MapPin },
    { label: "Constituency", value: voter.constituency },
    { label: "State", value: voter.state },
    { label: "Polling Booth", value: voter.pollingBooth },
    { label: "Election Type", value: voter.electionType },
  ];

  return (
    <PageShell>
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
          <div>
            <div className="text-xs uppercase tracking-widest text-primary-glow font-semibold">Voter Dashboard</div>
            <h1 className="text-2xl md:text-3xl font-bold mt-1">Welcome, {voter.name.split(" ")[0]}</h1>
            <p className="text-muted-foreground text-sm mt-1">Review your details and proceed to vote.</p>
          </div>
          <button onClick={() => { clearSession(); navigate({ to: "/" }); }} className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm hover:bg-accent">
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {/* Voter status */}
          <div className="md:col-span-1 space-y-4">
            <div className="gov-card p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-14 w-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                  {voter.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <div className="font-semibold">{voter.name}</div>
                  <div className="text-xs text-muted-foreground font-mono">{voter.voterId}</div>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Eligibility</span>
                  <span className={`inline-flex items-center gap-1 font-semibold ${voter.eligible ? "text-india-green" : "text-destructive"}`}>
                    <BadgeCheck className="h-4 w-4" /> {voter.eligible ? "Eligible" : "Not Eligible"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Voting Status</span>
                  <span className={`inline-flex items-center gap-1 font-semibold ${voter.voted ? "text-india-green" : "text-warning"}`}>
                    {voter.voted ? <BadgeCheck className="h-4 w-4" /> : <Ban className="h-4 w-4" />}
                    {voter.voted ? "Voted" : "Not Voted"}
                  </span>
                </div>
              </div>
              {voter.voted ? (
                <button disabled className="mt-5 w-full rounded-md bg-muted text-muted-foreground py-2.5 font-semibold cursor-not-allowed">
                  You have already cast your vote.
                </button>
              ) : (
                <Link to="/vote" className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-md bg-primary text-primary-foreground py-2.5 font-semibold hover:bg-primary-glow">
                  <Vote className="h-4 w-4" /> Proceed to Vote
                </Link>
              )}
            </div>

            <div className="gov-card p-5 bg-accent/40">
              <div className="flex items-center gap-2 text-sm font-semibold mb-1"><ShieldCheck className="h-4 w-4 text-primary" /> Secure Session</div>
              <p className="text-xs text-muted-foreground">Your session is encrypted. Sensitive identifiers are masked.</p>
            </div>
          </div>

          {/* Details */}
          <div className="md:col-span-2 gov-card p-5 sm:p-6">
            <h2 className="font-bold text-lg mb-4">Voter Information</h2>
            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-4">
              {fields.map(f => (
                <div key={f.label} className="border-b border-border/60 pb-2">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground mb-0.5">{f.label}</div>
                  <div className="text-sm font-medium">{f.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
