import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { useState } from "react";
import { ShieldCheck, Loader2 } from "lucide-react";

export const Route = createFileRoute("/admin/login")({
  head: () => ({ meta: [{ title: "Admin Login — SRVS" }] }),
  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    setTimeout(() => {
      if (u === "admin" && p === "admin@123") {
        sessionStorage.setItem("srvs_admin", "1");
        navigate({ to: "/admin/dashboard" });
      } else {
        setErr("Invalid credentials. Use admin / admin@123");
        setLoading(false);
      }
    }, 600);
  };

  return (
    <PageShell>
      <section className="max-w-md mx-auto px-4 sm:px-6 py-16">
        <div className="gov-card p-6 sm:p-8">
          <div className="tricolor-bar -mx-6 -mt-6 sm:-mx-8 sm:-mt-8 mb-6" />
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <h1 className="text-2xl font-bold">Election Officer Login</h1>
          </div>
          <p className="text-sm text-muted-foreground mb-6">Restricted access — authorised personnel only.</p>
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Officer ID</label>
              <input value={u} onChange={e => setU(e.target.value)} placeholder="admin"
                className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Password</label>
              <input type="password" value={p} onChange={e => setP(e.target.value)} placeholder="••••••••"
                className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            {err && <div className="text-sm rounded-md bg-destructive/10 text-destructive px-3 py-2">{err}</div>}
            <button disabled={loading} className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-primary text-primary-foreground py-2.5 font-semibold hover:bg-primary-glow disabled:opacity-60">
              {loading && <Loader2 className="h-4 w-4 animate-spin" />} Sign In
            </button>
            <div className="text-xs text-muted-foreground text-center">Demo: admin / admin@123</div>
          </form>
        </div>
      </section>
    </PageShell>
  );
}
