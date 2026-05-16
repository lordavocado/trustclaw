import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { AnimateOnView } from "~/components/core/animate-on-view";

export function BottomCtaSection() {
  return (
    <section className="border-t border-border px-6 py-20 md:py-32">
      <AnimateOnView className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
        <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Stop doing your own books. Let Benny handle it.
        </h2>
        <p className="font-[family-name:var(--font-body)] text-base text-muted-foreground md:text-lg">
          Join thousands of small businesses who never worry about accounting again.
        </p>
        <Link
          href="/login"
          className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          Start Free Trial
          <ArrowRight className="h-4 w-4" />
        </Link>
      </AnimateOnView>
    </section>
  );
}
