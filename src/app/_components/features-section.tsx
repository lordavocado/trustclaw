import {
  Mail,
  Receipt,
  BarChart3,
  Shield,
  Clock,
  Bot,
} from "lucide-react";
import { AnimateOnView } from "~/components/core/animate-on-view";

const FEATURES = [
  {
    icon: Mail,
    title: "Email Monitoring",
    description:
      "Benny connects to your inbox and automatically identifies invoices, receipts, and financial documents as they arrive.",
  },
  {
    icon: Receipt,
    title: "Receipt Capture",
    description:
      "Forward receipts or snap a photo. Benny extracts amounts, vendors, categories, and matches them to transactions.",
  },
  {
    icon: BarChart3,
    title: "Automated Bookkeeping",
    description:
      "Every transaction is categorized, reconciled, and logged. Your books are always up to date without lifting a finger.",
  },
  {
    icon: Shield,
    title: "Tax Compliance",
    description:
      "Benny tracks deadlines, estimates quarterly taxes, flags potential issues, and prepares reports for your CPA.",
  },
  {
    icon: Clock,
    title: "24/7 Monitoring",
    description:
      "Benny never sleeps. Overnight Stripe payouts, weekend expenses, late-night subscriptions -- all captured instantly.",
  },
  {
    icon: Bot,
    title: "Ask Anything",
    description:
      "Talk to Benny in plain english. Ask about burn rate, compare months, forecast revenue, or verify 1099s on the spot.",
  },
];

export function FeaturesSection() {
  return (
    <section
      id="features"
      className="border-t border-border px-6 py-20 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <AnimateOnView>
          <p className="text-center font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            What Benny Does
          </p>
        </AnimateOnView>
        <AnimateOnView delay={0.1}>
          <h2 className="mx-auto mt-4 max-w-2xl text-balance text-center text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            A full accounting team, distilled into one AI agent
          </h2>
        </AnimateOnView>

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, i) => (
            <AnimateOnView
              key={feature.title}
              delay={0.05 * i}
              className="bg-card"
            >
              <div className="flex flex-col gap-3 p-8">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                  <feature.icon className="h-5 w-5 text-foreground" />
                </div>
                <h3 className="text-base font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="font-[family-name:var(--font-body)] text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </AnimateOnView>
          ))}
        </div>
      </div>
    </section>
  );
}
