import { Check } from "lucide-react";
import Link from "next/link";
import { AnimateOnView } from "~/components/core/animate-on-view";

const PLANS = [
  {
    name: "Starter",
    price: "$29",
    period: "/mo",
    description: "For freelancers and solo entrepreneurs getting started.",
    features: [
      "1 connected bank account",
      "Email receipt scanning",
      "Monthly financial reports",
      "Chat with Benny (100 queries/mo)",
      "Basic tax deadline alerts",
    ],
    cta: "Start Free Trial",
    highlighted: false,
  },
  {
    name: "Business",
    price: "$79",
    period: "/mo",
    description: "For growing businesses that need full automation.",
    features: [
      "Unlimited bank accounts",
      "Unlimited receipt scanning",
      "Real-time financial dashboard",
      "Unlimited Benny queries",
      "Quarterly tax estimates",
      "Multi-user access",
      "Priority support",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For teams with advanced compliance and reporting needs.",
    features: [
      "Everything in Business",
      "Custom integrations",
      "Dedicated account manager",
      "Advanced compliance reports",
      "SOC 2 audit support",
      "SLA guarantee",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

export function PricingSection() {
  return (
    <section
      id="pricing"
      className="border-t border-border px-6 py-20 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <AnimateOnView>
          <p className="text-center font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            Pricing
          </p>
        </AnimateOnView>
        <AnimateOnView delay={0.1}>
          <h2 className="mx-auto mt-4 max-w-xl text-balance text-center text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Simple, transparent pricing
          </h2>
        </AnimateOnView>
        <AnimateOnView delay={0.15}>
          <p className="mx-auto mt-3 max-w-lg text-center font-[family-name:var(--font-body)] text-sm text-muted-foreground">
            Start free for 14 days. No credit card required.
          </p>
        </AnimateOnView>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {PLANS.map((plan, i) => (
            <AnimateOnView key={plan.name} delay={0.1 + i * 0.1}>
              <div
                className={`flex h-full flex-col rounded-xl border p-8 ${
                  plan.highlighted
                    ? "border-primary bg-card shadow-md"
                    : "border-border bg-card"
                }`}
              >
                {plan.highlighted && (
                  <span className="mb-4 self-start rounded-full bg-primary px-3 py-0.5 text-[10px] font-semibold text-primary-foreground">
                    Most Popular
                  </span>
                )}
                <h3 className="text-lg font-semibold text-foreground">
                  {plan.name}
                </h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-foreground">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-sm text-muted-foreground">
                      {plan.period}
                    </span>
                  )}
                </div>
                <p className="mt-3 font-[family-name:var(--font-body)] text-sm text-muted-foreground">
                  {plan.description}
                </p>
                <ul className="mt-6 flex flex-1 flex-col gap-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                      <span className="text-sm text-foreground">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/login"
                  className={`mt-8 block rounded-full py-2.5 text-center text-sm font-medium transition-opacity hover:opacity-90 ${
                    plan.highlighted
                      ? "bg-primary text-primary-foreground"
                      : "border border-border bg-card text-foreground hover:bg-accent"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            </AnimateOnView>
          ))}
        </div>
      </div>
    </section>
  );
}
