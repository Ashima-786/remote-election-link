import { Link } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";

export function GovHeader() {
  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur border-b border-border">
      <div className="tricolor-bar" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-md bg-primary text-primary-foreground flex items-center justify-center shadow-sm">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <div className="font-display font-bold text-sm sm:text-base text-primary">Secure Remote Voting System</div>
            <div className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider">Government of India · Prototype</div>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link to="/" className="text-foreground/80 hover:text-primary" activeOptions={{ exact: true }} activeProps={{ className: "text-primary" }}>Home</Link>
          <Link to="/security" className="text-foreground/80 hover:text-primary" activeProps={{ className: "text-primary" }}>Security</Link>
          <Link to="/contact" className="text-foreground/80 hover:text-primary" activeProps={{ className: "text-primary" }}>Help</Link>
          <Link to="/admin/login" className="text-foreground/80 hover:text-primary" activeProps={{ className: "text-primary" }}>Admin</Link>
          <Link to="/login" className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary-glow transition-colors">Voter Login</Link>
        </nav>
        <Link to="/login" className="md:hidden inline-flex items-center rounded-md bg-primary px-3 py-2 text-xs text-primary-foreground">Login</Link>
      </div>
    </header>
  );
}
