import { ErrorBoundary } from "~/components/core/error-boundary";
import { TooltipProvider } from "~/components/ui/tooltip";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TooltipProvider>
      <div className="flex h-screen overflow-hidden bg-background">
        <ErrorBoundary>{children}</ErrorBoundary>
      </div>
    </TooltipProvider>
  );
}
