import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { useEffect, useState } from "react";
import { CheckCircle2, Download, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/success")({
  head: () => ({ meta: [{ title: "Vote Recorded — SRVS" }] }),
  component: Success,
});

function Success() {
  const [hash, setHash] = useState("");
  useEffect(() => {
    setHash(sessionStorage.getItem("srvs_receipt") || "");
  }, []);

  const download = () => {
    const content = `SECURE REMOTE VOTING SYSTEM
=============================
Anonymous Vote Receipt

Receipt Hash:
${hash}

Timestamp: ${new Date().toISOString()}
Status: Recorded & Encrypted

This receipt does NOT reveal your candidate selection.
Use the hash to verify your ballot was counted in the public audit log.
`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `vote-receipt-${hash.slice(0, 10)}.txt`; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <PageShell>
      <section className="max-w-2xl mx-auto px-4 sm:px-6 py-16 text-center">
        <div className="mx-auto h-20 w-20 rounded-full bg-india-green/15 text-india-green flex items-center justify-center mb-5 animate-pulse-ring">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Your vote has been securely recorded</h1>
        <p className="text-muted-foreground">Thank you for participating in the democratic process.</p>

        <div className="gov-card p-6 mt-8 text-left">
          <div className="flex items-center gap-2 text-sm font-semibold mb-3"><ShieldCheck className="h-4 w-4 text-primary" /> Anonymous Receipt</div>
          <div className="text-xs text-muted-foreground mb-1">Receipt / Hash ID</div>
          <code className="block text-xs sm:text-sm break-all bg-surface border border-border rounded-md p-3 font-mono">{hash || "—"}</code>
          <p className="text-xs text-muted-foreground mt-3">
            This receipt confirms your ballot was recorded but does not reveal your candidate choice. Anonymity is preserved end-to-end.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button onClick={download} className="inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-5 py-2.5 font-semibold hover:bg-primary-glow">
            <Download className="h-4 w-4" /> Download Receipt
          </button>
          <Link to="/dashboard" className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-5 py-2.5 font-semibold hover:bg-accent">
            Back to Dashboard
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
