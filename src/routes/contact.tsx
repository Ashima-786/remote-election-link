import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { useState } from "react";
import { Phone, Mail, ChevronDown, Send } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Help & Contact — Secure Remote Voting System" },
      { name: "description", content: "Report issues, view FAQs, and contact the SRVS helpline." },
    ],
  }),
  component: Contact,
});

const faqs = [
  { q: "Who can use this remote voting system?", a: "Migrant workers, students studying in another state, employees on duty, and overseas Indian citizens with a valid Voter ID." },
  { q: "Is my vote really secret?", a: "Yes. Your identity is verified separately from your ballot. The vote payload is encrypted and stored without any link to your Voter ID." },
  { q: "What if face verification fails?", a: "You may retry up to three times. After that, the system locks the session and you must contact the helpline for manual verification." },
  { q: "Can I change my vote later?", a: "No. Once submitted, a vote is final and cannot be modified or revoked, mirroring traditional ballot rules." },
  { q: "What happens if I lose my receipt?", a: "Your vote is still counted. The receipt is only for personal verification against the public audit log." },
];

function Contact() {
  const [open, setOpen] = useState<number | null>(0);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", issue: "", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", issue: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <PageShell>
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="text-center mb-10">
          <div className="text-xs uppercase tracking-widest text-primary-glow font-semibold">Help & Support</div>
          <h1 className="text-3xl md:text-4xl font-bold mt-2">We're here to help you vote</h1>
        </div>

        <div className="grid md:grid-cols-3 gap-5 mb-10">
          <div className="gov-card p-5"><Phone className="h-5 w-5 text-primary mb-2" /><div className="font-semibold">Helpline</div><div className="text-sm text-muted-foreground">1800-XXX-XXXX (toll-free)</div></div>
          <div className="gov-card p-5"><Mail className="h-5 w-5 text-primary mb-2" /><div className="font-semibold">Email</div><div className="text-sm text-muted-foreground">support@srvs.gov.in</div></div>
          <div className="gov-card p-5"><Send className="h-5 w-5 text-primary mb-2" /><div className="font-semibold">Hours</div><div className="text-sm text-muted-foreground">Mon–Sat · 08:00 – 22:00 IST</div></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="gov-card p-6">
            <h2 className="font-bold text-lg mb-4">Report an Issue</h2>
            <form onSubmit={submit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Full Name</label>
                  <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Email</label>
                  <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Issue Type</label>
                <select required value={form.issue} onChange={e => setForm({ ...form, issue: e.target.value })} className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                  <option value="">Select an issue</option>
                  <option>Login problem</option><option>OTP not received</option><option>Face verification failure</option><option>Voting error</option><option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Describe your issue</label>
                <textarea required rows={4} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
              </div>
              {sent && <div className="text-sm rounded-md bg-india-green/10 text-india-green px-3 py-2">Your report has been submitted. Reference ID: SRVS-{Date.now().toString().slice(-6)}</div>}
              <button className="inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-5 py-2.5 font-semibold hover:bg-primary-glow"><Send className="h-4 w-4" /> Submit Report</button>
            </form>
          </div>

          <div className="gov-card p-6">
            <h2 className="font-bold text-lg mb-4">Frequently Asked Questions</h2>
            <div className="divide-y divide-border">
              {faqs.map((f, i) => (
                <div key={i} className="py-3">
                  <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between text-left gap-3">
                    <span className="font-medium text-sm">{f.q}</span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${open === i ? "rotate-180" : ""}`} />
                  </button>
                  {open === i && <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.a}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
