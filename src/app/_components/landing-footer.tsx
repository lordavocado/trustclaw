import Link from "next/link";

export function LandingFooter() {
  return (
    <footer className="border-t border-border px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-foreground">
            Bennybooks
          </span>
          <span className="text-xs text-muted-foreground">
            2024 Bennybooks AI. All rights reserved.
          </span>
        </div>
        <nav className="flex gap-6">
          <Link
            href="#"
            className="text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            Privacy
          </Link>
          <Link
            href="#"
            className="text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            Terms
          </Link>
          <Link
            href="#"
            className="text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            Security
          </Link>
          <Link
            href="#"
            className="text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}
