"use client";

import { trpc } from "~/clients/trpc";
import { BennyChatSidebar } from "./benny-chat-sidebar";
import { FinancialDashboard } from "./financial-dashboard";
import { DashboardNavbar } from "./dashboard-top-nav";
import { OnboardingClient } from "./onboarding/onboarding-client";

export function BennyDashboard() {
  const { data: status, isLoading } = trpc.trustclaw.getStatus.useQuery();

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-muted border-t-primary" />
          <p className="text-sm text-muted-foreground">Loading Bennybooks...</p>
        </div>
      </div>
    );
  }

  // Show onboarding if no instance exists
  if (!status?.hasInstance) {
    return (
      <OnboardingClient
        hasExistingInstance={false}
        hasOnboardingState={status?.hasOnboardingState ?? false}
      />
    );
  }

  return <BennyDashboardContent />;
}

function BennyDashboardContent() {
  const { data: historyData } = trpc.trustclaw.getHistory.useQuery();
  const { data: streamData } = trpc.trustclaw.getStreamingMessage.useQuery();

  const initialMessages = historyData?.messages ?? [];
  const streamId = streamData?.streamId ?? null;

  return (
    <div className="flex h-full w-full">
      {/* Left: Benny AI Chat Sidebar */}
      <BennyChatSidebar
        initialMessages={initialMessages}
        streamId={streamId}
      />

      {/* Right: Main Dashboard Content */}
      <div className="flex min-w-0 flex-1 flex-col overflow-y-auto">
        <DashboardNavbar />
        <FinancialDashboard />
      </div>
    </div>
  );
}
