import { AnimateOnView } from "~/components/core/animate-on-view";

const STEPS = [
  {
    number: "1",
    title: "Connect Your Accounts",
    description:
      "Link your bank, Stripe, PayPal, or any payment provider. Benny uses secure OAuth -- your credentials are never stored.",
  },
  {
    number: "2",
    title: "Benny Goes to Work",
    description:
      "Benny monitors your email for receipts and invoices, categorizes every transaction, reconciles your books, and flags anything that needs attention.",
  },
  {
    number: "3",
    title: "You Stay in Control",
    description:
      "Ask Benny anything in plain english. Get instant reports, forecasts, and compliance checks. Approve actions or let Benny handle it autonomously.",
  },
];

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="border-t border-border px-6 py-20 md:py-32"
    >
      <div className="mx-auto max-w-4xl">
        <AnimateOnView>
          <p className="text-center font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            How It Works
          </p>
        </AnimateOnView>
        <AnimateOnView delay={0.1}>
          <h2 className="mx-auto mt-4 max-w-xl text-balance text-center text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Three steps. Zero accounting headaches.
          </h2>
        </AnimateOnView>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <AnimateOnView key={step.number} delay={0.1 + i * 0.1}>
              <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-8">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-lg font-bold text-primary-foreground">
                  {step.number}
                </span>
                <h3 className="text-lg font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="font-[family-name:var(--font-body)] text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </AnimateOnView>
          ))}
        </div>
      </div>
    </section>
  );
}
