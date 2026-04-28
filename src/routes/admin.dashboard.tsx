import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { useEffect, useMemo, useState } from "react";
import { getVoters, type Voter } from "@/lib/voterData";
import { Users, Vote, Clock, TrendingUp, AlertTriangle, ScanFace, MapPin, FileSearch } from "lucide-react";

export const Route = createFileRoute("/admin/dashboard")({
  head: () => ({ meta: [{ title: "Admin Dashboard — SRVS" }] }),
  component: AdminDash,
});

const auditLogs = [
  { time: "2026-04-28 09:14:22", voter: "ABC1234567", verify: "Success", vote: "09:18:01", ip: "103.21.x.x · Chrome/Win" },
  { time: "2026-04-28 09:22:11", voter: "XYZ9876543", verify: "Success", vote: "—", ip: "157.40.x.x · Safari/iOS" },
  { time: "2026-04-28 09:31:48", voter: "PQR5550021", verify: "Failed (Face)", vote: "—", ip: "49.36.x.x · Edge/Win" },
  { time: "2026-04-28 09:40:02", voter: "LMN3344556", verify: "Success", vote: "09:43:25", ip: "182.74.x.x · Chrome/Android" },
];

function AdminDash() {
  const navigate = useNavigate();
  const [voters, setVoters] = useState<Voter[]>([]);

  useEffect(() => {
    if (sessionStorage.getItem("srvs_admin") !== "1") { navigate({ to: "/admin/login" }); return; }
    setVoters(getVoters());
  }, [navigate]);

  const stats = useMemo(() => {
    const total = voters.length + 1248; // simulated bulk
    const voted = voters.filter(v => v.voted).length + 842;
    const pending = total - voted;
    const turnout = total ? Math.round((voted / total) * 100) : 0;
    return { total, voted, pending, turnout };
  }, [voters]);

  const constituency = [
    { name: "Mumbai South", count: 312 }, { name: "Gautam Buddha Nagar", count: 268 },
    { name: "Bengaluru Central", count: 189 }, { name: "Chennai South", count: 154 },
  ];

  return (
    <PageShell>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
          <div>
            <div className="text-xs uppercase tracking-widest text-primary-glow font-semibold">Election Commission Console</div>
            <h1 className="text-2xl md:text-3xl font-bold mt-1">Admin Dashboard</h1>
          </div>
          <div className="text-sm text-muted-foreground">Live · {new Date().toLocaleString()}</div>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { i: Users, l: "Registered Voters", v: stats.total.toLocaleString(), c: "text-primary" },
            { i: Vote, l: "Votes Cast", v: stats.voted.toLocaleString(), c: "text-india-green" },
            { i: Clock, l: "Pending Voters", v: stats.pending.toLocaleString(), c: "text-warning" },
            { i: TrendingUp, l: "Turnout", v: `${stats.turnout}%`, c: "text-saffron" },
          ].map(({ i: Icon, l, v, c }) => (
            <div key={l} className="gov-card p-5">
              <div className={`h-9 w-9 rounded-md bg-muted flex items-center justify-center ${c} mb-3`}><Icon className="h-4 w-4" /></div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">{l}</div>
              <div className="text-2xl font-bold mt-0.5">{v}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-5 mb-6">
          {/* Constituency chart */}
          <div className="gov-card p-5 lg:col-span-2">
            <div className="flex items-center gap-2 mb-4"><MapPin className="h-4 w-4 text-primary" /><h2 className="font-bold">Constituency-wise Voting Count</h2></div>
            <div className="space-y-3">
              {constituency.map(c => {
                const max = Math.max(...constituency.map(x => x.count));
                return (
                  <div key={c.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium">{c.name}</span>
                      <span className="text-muted-foreground">{c.count}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: `${(c.count / max) * 100}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Threats */}
          <div className="gov-card p-5">
            <div className="flex items-center gap-2 mb-4"><AlertTriangle className="h-4 w-4 text-destructive" /><h2 className="font-bold">Security Alerts</h2></div>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between rounded-md bg-destructive/5 px-3 py-2.5 border border-destructive/20">
                <span>Suspicious login attempts</span><span className="font-bold text-destructive">17</span>
              </div>
              <div className="flex items-center justify-between rounded-md bg-warning/5 px-3 py-2.5 border border-warning/30">
                <span className="flex items-center gap-2"><ScanFace className="h-4 w-4" /> Failed face verifications</span><span className="font-bold text-warning">42</span>
              </div>
              <div className="flex items-center justify-between rounded-md bg-muted px-3 py-2.5">
                <span>Blocked IPs</span><span className="font-bold">9</span>
              </div>
            </div>
          </div>
        </div>

        {/* Voters table */}
        <div className="gov-card overflow-hidden mb-6">
          <div className="p-5 border-b border-border flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" /><h2 className="font-bold">Voter Register (status only — vote choices are anonymous)</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-surface text-xs uppercase tracking-wider text-muted-foreground">
                <tr><th className="text-left px-5 py-3">Voter ID</th><th className="text-left px-5 py-3">Name</th><th className="text-left px-5 py-3">Constituency</th><th className="text-left px-5 py-3">Eligibility</th><th className="text-left px-5 py-3">Status</th></tr>
              </thead>
              <tbody>
                {voters.map(v => (
                  <tr key={v.voterId} className="border-t border-border">
                    <td className="px-5 py-3 font-mono text-xs">{v.voterId}</td>
                    <td className="px-5 py-3">{v.name}</td>
                    <td className="px-5 py-3">{v.constituency}</td>
                    <td className="px-5 py-3"><span className="text-xs rounded-full bg-india-green/10 text-india-green px-2 py-0.5">Eligible</span></td>
                    <td className="px-5 py-3">
                      {v.voted
                        ? <span className="text-xs rounded-full bg-india-green/15 text-india-green px-2 py-0.5 font-semibold">Voted</span>
                        : <span className="text-xs rounded-full bg-warning/15 text-warning px-2 py-0.5 font-semibold">Not Voted</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Audit log */}
        <div className="gov-card overflow-hidden">
          <div className="p-5 border-b border-border flex items-center gap-2">
            <FileSearch className="h-4 w-4 text-primary" /><h2 className="font-bold">Audit Log</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-surface text-xs uppercase tracking-wider text-muted-foreground">
                <tr><th className="text-left px-5 py-3">Login Time</th><th className="text-left px-5 py-3">Voter</th><th className="text-left px-5 py-3">Verification</th><th className="text-left px-5 py-3">Vote Submitted</th><th className="text-left px-5 py-3">Device / IP</th></tr>
              </thead>
              <tbody>
                {auditLogs.map((l, i) => (
                  <tr key={i} className="border-t border-border">
                    <td className="px-5 py-3 font-mono text-xs">{l.time}</td>
                    <td className="px-5 py-3 font-mono text-xs">{l.voter}</td>
                    <td className="px-5 py-3">
                      <span className={`text-xs rounded-full px-2 py-0.5 font-semibold ${l.verify === "Success" ? "bg-india-green/15 text-india-green" : "bg-destructive/15 text-destructive"}`}>{l.verify}</span>
                    </td>
                    <td className="px-5 py-3 font-mono text-xs">{l.vote}</td>
                    <td className="px-5 py-3 text-xs text-muted-foreground">{l.ip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
