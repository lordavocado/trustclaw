import { ArrowRight, Bot } from "lucide-react";
import Link from "next/link";
import { AnimateOnView } from "~/components/core/animate-on-view";

export function HeroSection() {
  return (
    <section className="relative px-6 pb-20 pt-32 md:pb-32 md:pt-40">
      <div className="mx-auto max-w-6xl">
        {/* Announcement pill */}
        <AnimateOnView className="mb-8 flex justify-center" delay={0}>
          <div className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-success" />
            <span className="text-xs text-muted-foreground">
              Benny AI is now in public beta
            </span>
            <ArrowRight className="h-3 w-3 text-muted-foreground" />
          </div>
        </AnimateOnView>

        {/* Headline */}
        <AnimateOnView delay={0.1}>
          <h1 className="mx-auto max-w-4xl text-balance text-center text-4xl font-bold leading-tight tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Your AI Accountant That Never Sleeps
          </h1>
        </AnimateOnView>

        {/* Subheadline */}
        <AnimateOnView delay={0.2}>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-center font-[family-name:var(--font-body)] text-base leading-relaxed text-muted-foreground md:text-lg">
            Bennybooks is the always-on AI bookkeeper for small businesses.
            Benny monitors your emails, captures receipts, reconciles
            transactions, and keeps your books in perfect shape -- so you
            never think about accounting again.
          </p>
        </AnimateOnView>

        {/* CTA */}
        <AnimateOnView
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
          delay={0.3}
        >
          <Link
            href="/login"
            className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Start Free Trial
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="#how-it-works"
            className="inline-flex h-12 items-center gap-2 rounded-full border border-border bg-card px-8 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            See How It Works
          </Link>
        </AnimateOnView>

        {/* Dashboard Preview Card */}
        <AnimateOnView
          className="mt-16 md:mt-24"
          delay={0.4}
          duration={0.7}
        >
          <div className="mx-auto max-w-4xl overflow-hidden rounded-xl border border-border bg-card shadow-lg">
            {/* Mini toolbar */}
            <div className="flex items-center gap-2 border-b border-border px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-border" />
              <span className="h-2.5 w-2.5 rounded-full bg-border" />
              <span className="h-2.5 w-2.5 rounded-full bg-border" />
              <span className="ml-4 text-[10px] text-muted-foreground">
                app.bennybooks.ai
              </span>
            </div>

            {/* Two-panel mockup */}
            <div className="flex">
              {/* Chat panel */}
              <div className="hidden w-[280px] shrink-0 border-r border-border bg-card p-5 md:block">
                <div className="mb-4 flex items-center gap-2 rounded-lg bg-primary p-2.5">
                  <Bot className="h-4 w-4 text-[#88deeb]" />
                  <span className="text-xs font-semibold text-primary-foreground">
                    Benny AI
                  </span>
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-success" />
                </div>

                {/* Chat bubbles */}
                <div className="flex flex-col gap-3">
                  <div className="rounded-lg rounded-tl-none border border-border bg-muted p-3">
                    <p className="text-[11px] leading-relaxed text-foreground">
                      {"Good morning! I've reconciled 12 transactions from Stripe overnight. Revenue is up 8% this week."}
                    </p>
                  </div>
                  <div className="self-end rounded-lg rounded-tr-none bg-primary p-3">
                    <p className="text-[11px] leading-relaxed text-primary-foreground">
                      Show me the breakdown
                    </p>
                  </div>
                  <div className="rounded-lg rounded-tl-none border border-border bg-muted p-3">
                    <p className="text-[11px] leading-relaxed text-foreground">
                      {"Here's your top 3 revenue sources..."}
                    </p>
                    <div className="mt-2 flex flex-col gap-1">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-muted-foreground">SaaS Plans</span>
                        <span className="font-mono font-medium text-success">+$8,400</span>
                      </div>
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-muted-foreground">Consulting</span>
                        <span className="font-mono font-medium text-success">+$3,200</span>
                      </div>
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-muted-foreground">API Usage</span>
                        <span className="font-mono font-medium text-success">+$1,800</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dashboard panel */}
              <div className="flex-1 p-5">
                <p className="mb-4 text-xs font-semibold text-foreground">
                  Financial Health Overview
                </p>
                <div className="mb-4 grid grid-cols-3 gap-3">
                  <div className="rounded-lg border border-border p-3">
                    <span className="block font-mono text-[8px] uppercase tracking-widest text-muted-foreground">
                      Cash Balance
                    </span>
                    <span className="mt-1 block text-lg font-semibold text-foreground">
                      $432k
                    </span>
                    <span className="text-[9px] text-success">Stable</span>
                  </div>
                  <div className="rounded-lg border border-border p-3">
                    <span className="block font-mono text-[8px] uppercase tracking-widest text-muted-foreground">
                      Net Margin
                    </span>
                    <span className="mt-1 block text-lg font-semibold text-foreground">
                      34.5%
                    </span>
                    <span className="text-[9px] text-success">+2.1%</span>
                  </div>
                  <div className="rounded-lg border border-border p-3">
                    <span className="block font-mono text-[8px] uppercase tracking-widest text-muted-foreground">
                      Compliance
                    </span>
                    <span className="mt-1 block text-lg font-semibold text-foreground">
                      98%
                    </span>
                    <span className="text-[9px] text-[#a83900]">1 Alert</span>
                  </div>
                </div>
                {/* Activity rows */}
                <div className="rounded-lg border border-border">
                  <div className="border-b border-border px-3 py-2">
                    <span className="text-[10px] font-semibold text-foreground">Recent Activity</span>
                  </div>
                  {[
                    { label: "Stripe Payout #9021", amount: "+$4,200", positive: true },
                    { label: "AWS Cloud Services", amount: "-$1,150", positive: false },
                    { label: "Monthly Office Rent", amount: "-$6,500", positive: false },
                  ].map((row) => (
                    <div
                      key={row.label}
                      className="flex items-center justify-between border-b border-border px-3 py-2 last:border-b-0"
                    >
                      <span className="text-[10px] text-foreground">{row.label}</span>
                      <span
                        className={`font-mono text-[10px] font-medium ${
                          row.positive ? "text-success" : "text-[#a83900]"
                        }`}
                      >
                        {row.amount}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </AnimateOnView>
      </div>
    </section>
  );
}
