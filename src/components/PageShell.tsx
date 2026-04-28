import { GovHeader } from "./GovHeader";
import { GovFooter } from "./GovFooter";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <GovHeader />
      <main className="flex-1">{children}</main>
      <GovFooter />
    </div>
  );
}
