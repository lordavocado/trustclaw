"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CHART_DATA = [
  { month: "Jan", forecast: 38000, actual: 36000 },
  { month: "Feb", forecast: 40000, actual: 42000 },
  { month: "Mar", forecast: 43000, actual: 41000 },
  { month: "Apr", forecast: 45000, actual: 48000 },
  { month: "May", forecast: 47000, actual: 46000 },
  { month: "Jun", forecast: 50000, actual: 52000 },
  { month: "Jul", forecast: 53000, actual: 55000 },
  { month: "Aug", forecast: 55000, actual: 54000 },
  { month: "Sep", forecast: 58000, actual: null },
  { month: "Oct", forecast: 60000, actual: null },
  { month: "Nov", forecast: 62000, actual: null },
  { month: "Dec", forecast: 64000, actual: null },
];

const RECENT_ACTIVITY = [
  {
    date: "Today",
    description: "Stripe Payout - Ref #9021",
    amount: "+$4,200.00",
    type: "income" as const,
  },
  {
    date: "Yesterday",
    description: "Amazon Web Services - Cloud",
    amount: "-$1,150.00",
    type: "expense" as const,
  },
  {
    date: "Yesterday",
    description: "Monthly Office Rent",
    amount: "-$6,500.00",
    type: "expense" as const,
  },
];

export function FinancialDashboard() {
  return (
    <main className="flex-1 p-8">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Financial Health Overview
        </h1>
        <p className="mt-1 font-[family-name:var(--font-body)] text-sm text-muted-foreground">
          {"Summary of activity synced with Benny's latest analysis."}
        </p>
      </header>

      {/* Metric Cards */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <MetricCard
          label="Cash Balance"
          value="$432,150"
          badge="Stable"
          badgeColor="text-[#44b48b]"
        />
        <MetricCard
          label="Net Margin"
          value="34.5%"
          badge="+2.1%"
          badgeColor="text-[#44b48b]"
        />
        <MetricCard
          label="Compliance Score"
          value="98%"
          badge="1 Alert"
          badgeColor="text-[#a83900]"
        />
      </div>

      {/* Recent Activity */}
      <div className="mb-8 overflow-hidden rounded-lg border border-border bg-card shadow-sm">
        <div className="flex items-center justify-between border-b border-border bg-muted/30 px-6 py-4">
          <h2 className="text-sm font-bold text-foreground">Recent Activity</h2>
          <button className="text-[10px] font-semibold text-[#a83900] hover:underline">
            View Ledger
          </button>
        </div>
        <table className="w-full text-left">
          <tbody className="divide-y divide-border">
            {RECENT_ACTIVITY.map((item, i) => (
              <tr
                key={i}
                className="transition-colors hover:bg-muted/30"
              >
                <td className="px-6 py-3 font-mono text-[10px] text-muted-foreground">
                  {item.date}
                </td>
                <td className="px-6 py-3 font-[family-name:var(--font-body)] text-sm font-medium text-foreground">
                  {item.description}
                </td>
                <td
                  className={`px-6 py-3 text-right font-mono text-[10px] ${
                    item.type === "income"
                      ? "text-[#44b48b]"
                      : "text-[#a83900]"
                  }`}
                >
                  {item.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Performance Analytics Chart */}
      <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-sm font-bold text-foreground">
            Performance Analytics
          </h2>
          <div className="flex gap-4">
            <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-[#7ea7e9]" />
              Forecast
            </span>
            <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-[#a83900]" />
              Actual
            </span>
          </div>
        </div>
        <div className="relative h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={CHART_DATA}
              margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient
                  id="forecastGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#7ea7e9" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#7ea7e9" stopOpacity={0} />
                </linearGradient>
                <linearGradient
                  id="actualGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#a83900" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#a83900" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e3e4e8"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 10, fill: "#7c7f88" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "#7c7f88" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v: number) => `$${v / 1000}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e3e4e8",
                  borderRadius: "8px",
                  fontSize: "12px",
                  boxShadow:
                    "0 1px 2px rgba(0,0,0,0.1), 0 0 0 1px rgba(17,26,74,0.05)",
                }}
                formatter={(value: number) => [
                  `$${(value / 1000).toFixed(1)}k`,
                ]}
              />
              <Area
                type="monotone"
                dataKey="forecast"
                stroke="#7ea7e9"
                strokeWidth={2}
                fill="url(#forecastGradient)"
                dot={false}
              />
              <Area
                type="monotone"
                dataKey="actual"
                stroke="#a83900"
                strokeWidth={2}
                fill="url(#actualGradient)"
                dot={false}
                connectNulls={false}
              />
            </AreaChart>
          </ResponsiveContainer>

          {/* AI Insight overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="rounded-full border border-border bg-background/90 px-4 py-2 shadow-sm">
              <span className="font-mono text-[10px] text-foreground">
                AI Insight: Projected 8.2% surplus for Q3
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-8 flex items-center justify-between border-t border-border py-4 opacity-70">
        <p className="text-[10px] text-muted-foreground">
          2024 Bennybooks AI. Priority Support Active.
        </p>
        <div className="flex gap-4">
          <a
            href="#"
            className="text-[10px] text-muted-foreground underline hover:text-[#a83900]"
          >
            Security
          </a>
          <a
            href="#"
            className="text-[10px] text-muted-foreground underline hover:text-[#a83900]"
          >
            Privacy
          </a>
        </div>
      </footer>
    </main>
  );
}

/* ---- Metric Card sub-component ---- */

function MetricCard({
  label,
  value,
  badge,
  badgeColor,
}: {
  label: string;
  value: string;
  badge: string;
  badgeColor: string;
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
      <span className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      <div className="flex items-end gap-2">
        <span className="text-2xl font-semibold text-foreground">{value}</span>
        <span className={`mb-1 text-[10px] font-medium ${badgeColor}`}>
          {badge}
        </span>
      </div>
    </div>
  );
}
