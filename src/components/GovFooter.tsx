export function GovFooter() {
  return (
    <footer className="mt-16 border-t border-border bg-surface">
      <div className="tricolor-bar" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid gap-8 md:grid-cols-3 text-sm">
        <div>
          <div className="font-display font-bold text-primary text-base mb-2">Secure Remote Voting System</div>
          <p className="text-muted-foreground leading-relaxed">
            A government-style prototype enabling verified remote voting for migrants, students, workers, and overseas citizens.
          </p>
        </div>
        <div>
          <div className="font-semibold mb-2">Quick Links</div>
          <ul className="space-y-1 text-muted-foreground">
            <li>About the System</li>
            <li>Election Commission Guidelines</li>
            <li>Privacy & Data Protection</li>
            <li>Accessibility Statement</li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-2">Helpline</div>
          <p className="text-muted-foreground">Toll-free: 1800-XXX-XXXX</p>
          <p className="text-muted-foreground">support@srvs.gov.in</p>
        </div>
      </div>
      <div className="border-t border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 text-xs text-muted-foreground text-center">
          ⚠ This is a prototype for academic demonstration. Real election implementation requires approval from the Election Commission and strong legal/security validation.
        </div>
      </div>
    </footer>
  );
}
