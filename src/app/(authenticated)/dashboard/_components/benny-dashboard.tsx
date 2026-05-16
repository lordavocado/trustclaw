"use client";

import { BennyChatSidebar } from "./benny-chat-sidebar";
import { FinancialDashboard } from "./financial-dashboard";
import { DashboardNavbar } from "./dashboard-top-nav";

export function BennyDashboard() {
  return (
    <div className="flex h-full w-full">
      {/* Left: Benny AI Chat Sidebar */}
      <BennyChatSidebar />

      {/* Right: Main Dashboard Content */}
      <div className="flex min-w-0 flex-1 flex-col overflow-y-auto">
        <DashboardNavbar />
        <FinancialDashboard />
      </div>
    </div>
  );
}
