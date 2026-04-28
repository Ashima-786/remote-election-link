import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { useEffect, useState } from "react";
import { candidates, generateHash, getSession, getVoters, markVoted, type Voter } from "@/lib/voterData";
import { Lock, ShieldCheck, X } from "lucide-react";

export const Route = createFileRoute("/vote")({
  head: () => ({ meta: [{ title: "Cast Your Vote — SRVS" }] }),
  component: VotePage,
});

function VotePage() {
  const navigate = useNavigate();
  const [voter, setVoter] = useState<Voter | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [confirm, setConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const s = getSession();
    if (!s || !s.verified) { navigate({ to: "/login" }); return; }
    const v = getVoters().find(x => x.voterId === s.voterId);
    if (!v) { navigate({ to: "/login" }); return; }
    if (v.voted) { navigate({ to: "/dashboard" }); return; }
    setVoter(v);
  }, [navigate]);

  const submit = async () => {
    if (!voter || !selected) return;
    setSubmitting(true);
    const hash = await generateHash(voter.voterId + selected);
    markVoted(voter.voterId);
    sessionStorage.setItem("srvs_receipt", hash);
    setTimeout(() => navigate({ to: "/success" }), 900);
  };

  if (!voter) return null;
  const sel = candidates.find(c => c.id === selected);

  return (
    <PageShell>
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="gov-card p-5 sm:p-6 mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-xs uppercase tracking-widest text-primary-glow font-semibold">Official Ballot</div>
            <h1 className="text-xl md:text-2xl font-bold mt-1">{voter.electionType}</h1>
            <p className="text-sm text-muted-foreground">Constituency: <span className="font-medium text-foreground">{voter.constituency}</span> · {voter.state}</p>
          </div>
          <div className="inline-flex items-center gap-2 text-xs rounded-md bg-india-green/10 text-india-green px-3 py-1.5 font-semibold">
            <Lock className="h-3.5 w-3.5" /> Encrypted Session
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {candidates.map(c => {
            const active = selected === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setSelected(c.id)}
                className={`text-left gov-card p-5 transition-all hover:-translate-y-0.5 ${active ? "ring-2 ring-primary border-primary" : ""}`}
              >
                <div className="flex items-start gap-4">
                  <div className={`h-14 w-14 rounded-md flex items-center justify-center text-3xl ${c.id === "NOTA" ? "bg-muted" : "bg-saffron/15"}`}>
                    {c.symbol}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold">{c.name}</div>
                    <div className="text-xs text-primary-glow font-medium">{c.party}</div>
                    <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{c.profile}</p>
                  </div>
                </div>
                <div className={`mt-4 text-center rounded-md py-2 text-sm font-semibold transition-colors ${active ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}>
                  {active ? "Selected ✓" : "Select Candidate"}
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-8 flex justify-end">
          <button
            disabled={!selected}
            onClick={() => setConfirm(true)}
            className="rounded-md bg-india-green text-white px-6 py-3 font-semibold hover:opacity-90 disabled:opacity-50"
          >
            Submit Vote Securely
          </button>
        </div>
      </section>

      {confirm && sel && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-up">
          <div className="bg-card rounded-lg shadow-elevated max-w-md w-full overflow-hidden">
            <div className="tricolor-bar" />
            <div className="p-6">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  <h3 className="font-bold text-lg">Confirm Your Vote</h3>
                </div>
                <button onClick={() => setConfirm(false)} className="text-muted-foreground p-1"><X className="h-4 w-4" /></button>
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                Are you sure? Your vote <strong className="text-foreground">cannot be changed</strong> after submission.
              </p>
              <div className="mt-4 rounded-md border border-border bg-surface p-3 text-sm">
                <div className="text-xs text-muted-foreground">You are voting for</div>
                <div className="font-semibold">{sel.name}</div>
                <div className="text-xs text-primary-glow">{sel.party}</div>
              </div>
              <div className="mt-5 flex gap-2 justify-end">
                <button onClick={() => setConfirm(false)} className="rounded-md border border-border px-4 py-2 text-sm">Cancel</button>
                <button disabled={submitting} onClick={submit} className="rounded-md bg-india-green text-white px-4 py-2 text-sm font-semibold disabled:opacity-60">
                  {submitting ? "Encrypting & submitting..." : "Yes, Submit Vote"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </PageShell>
  );
}
