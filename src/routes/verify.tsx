import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { useEffect, useRef, useState } from "react";
import { getSession, setSession } from "@/lib/voterData";
import { KeyRound, ScanFace, Activity, CheckCircle2, Loader2, Camera } from "lucide-react";

export const Route = createFileRoute("/verify")({
  head: () => ({
    meta: [{ title: "Multi-Step Verification — SRVS" }],
  }),
  component: Verify,
});

const steps = [
  { key: "otp", title: "OTP Verification", icon: KeyRound },
  { key: "face", title: "Face Verification", icon: ScanFace },
  { key: "live", title: "Liveness Check", icon: Activity },
  { key: "ok", title: "Eligibility Confirmed", icon: CheckCircle2 },
];

function Verify() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [otp, setOtp] = useState("");
  const [otpErr, setOtpErr] = useState("");
  const [scanning, setScanning] = useState(false);
  const [livenessProgress, setLivenessProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (!getSession()) navigate({ to: "/login" });
  }, [navigate]);

  useEffect(() => {
    return () => { streamRef.current?.getTracks().forEach(t => t.stop()); };
  }, []);

  const startCamera = async () => {
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: { width: 480, height: 360 } });
      streamRef.current = s;
      if (videoRef.current) videoRef.current.srcObject = s;
    } catch {
      // simulated
    }
  };

  const submitOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setOtpErr("");
    if (otp.length !== 6) { setOtpErr("Enter the 6-digit OTP. (Use 123456 for demo)"); return; }
    if (otp !== "123456") { setOtpErr("Invalid OTP. Demo OTP is 123456."); return; }
    setStep(1);
    setTimeout(startCamera, 200);
  };

  const runFace = () => {
    setScanning(true);
    setTimeout(() => { setScanning(false); setStep(2); runLiveness(); }, 2200);
  };

  const runLiveness = () => {
    setLivenessProgress(0);
    const i = setInterval(() => {
      setLivenessProgress(p => {
        if (p >= 100) { clearInterval(i); setStep(3); streamRef.current?.getTracks().forEach(t => t.stop()); return 100; }
        return p + 5;
      });
    }, 80);
  };

  const finish = () => {
    const s = getSession();
    if (s) setSession(s.voterId, true);
    navigate({ to: "/dashboard" });
  };

  return (
    <PageShell>
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">Multi-Step Verification</h1>
          <p className="text-muted-foreground mt-1 text-sm">Complete all steps to confirm your identity.</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between gap-2">
            {steps.map((s, i) => {
              const Icon = s.icon;
              const done = i < step, active = i === step;
              return (
                <div key={s.key} className="flex-1 flex flex-col items-center text-center">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                    done ? "bg-india-green border-india-green text-white" :
                    active ? "bg-primary border-primary text-primary-foreground animate-pulse-ring" :
                    "bg-muted border-border text-muted-foreground"
                  }`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className={`mt-2 text-[11px] font-medium ${active ? "text-primary" : "text-muted-foreground"}`}>{s.title}</div>
                </div>
              );
            })}
          </div>
          <div className="h-1.5 mt-3 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary transition-all" style={{ width: `${(step / (steps.length - 1)) * 100}%` }} />
          </div>
        </div>

        <div className="gov-card p-6 sm:p-8 animate-fade-up">
          {step === 0 && (
            <form onSubmit={submitOtp}>
              <h2 className="font-bold text-lg mb-1">Enter OTP</h2>
              <p className="text-sm text-muted-foreground mb-5">A 6-digit code has been sent to your registered mobile and email. <span className="text-primary font-medium">(Demo: 123456)</span></p>
              <input
                value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                inputMode="numeric"
                placeholder="• • • • • •"
                className="w-full text-center tracking-[0.6em] text-2xl font-mono rounded-md border border-input bg-background py-3 focus:outline-none focus:ring-2 focus:ring-ring"
              />
              {otpErr && <div className="mt-3 text-sm rounded-md bg-destructive/10 text-destructive px-3 py-2">{otpErr}</div>}
              <button className="mt-5 w-full rounded-md bg-primary text-primary-foreground py-2.5 font-semibold hover:bg-primary-glow">Verify OTP</button>
            </form>
          )}

          {step === 1 && (
            <div>
              <h2 className="font-bold text-lg mb-1">Face Verification</h2>
              <p className="text-sm text-muted-foreground mb-5">Position your face inside the frame. We'll match it against your registered Voter ID photograph.</p>
              <div className="relative mx-auto w-full max-w-sm aspect-[4/3] rounded-lg overflow-hidden bg-black/90 border-2 border-primary/30">
                <video ref={videoRef} autoPlay playsInline muted className="h-full w-full object-cover" />
                <div className="absolute inset-6 border-2 border-saffron/80 rounded-full" />
                {scanning && <div className="absolute inset-0 bg-primary/10 flex items-center justify-center text-white text-sm">
                  <Loader2 className="h-5 w-5 animate-spin mr-2" /> Matching face...
                </div>}
                {!streamRef.current && <div className="absolute inset-0 flex items-center justify-center text-white/70 text-xs"><Camera className="h-4 w-4 mr-2" /> Camera preview</div>}
              </div>
              <button disabled={scanning} onClick={runFace} className="mt-5 w-full rounded-md bg-primary text-primary-foreground py-2.5 font-semibold hover:bg-primary-glow disabled:opacity-60">
                {scanning ? "Scanning..." : "Capture & Verify"}
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="text-center">
              <h2 className="font-bold text-lg mb-1">Liveness Check</h2>
              <p className="text-sm text-muted-foreground mb-6">Please blink and turn your head slightly. Detecting natural movement...</p>
              <div className="mx-auto h-32 w-32 rounded-full bg-primary/10 flex items-center justify-center mb-4 animate-pulse-ring">
                <Activity className="h-12 w-12 text-primary" />
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden max-w-sm mx-auto">
                <div className="h-full bg-india-green transition-all" style={{ width: `${livenessProgress}%` }} />
              </div>
              <div className="text-xs text-muted-foreground mt-2">{livenessProgress}% complete</div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-4">
              <div className="mx-auto h-20 w-20 rounded-full bg-india-green/15 text-india-green flex items-center justify-center mb-4">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <h2 className="font-bold text-xl mb-1">Eligibility Confirmed</h2>
              <p className="text-sm text-muted-foreground mb-6">Your identity has been verified securely. You may now proceed to your dashboard.</p>
              <button onClick={finish} className="rounded-md bg-india-green text-white px-6 py-2.5 font-semibold hover:opacity-90">Continue to Dashboard</button>
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
}
