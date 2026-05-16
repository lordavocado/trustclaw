"use client";

import { usePathname, useRouter } from "next/navigation";
import { Bell, Search, LogOut } from "lucide-react";
import Link from "next/link";
import { authClient } from "~/clients/auth/react";

const NAV_LINKS = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Compliance", href: "/dashboard/compliance" },
  { label: "Reports", href: "/dashboard/reports" },
];

export function DashboardNavbar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/login");
  };

  return (
    <nav className="sticky top-0 z-40 border-b border-border bg-background">
      <div className="flex items-center justify-between px-8 py-3">
        {/* Left: nav links */}
        <div className="flex gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-[family-name:var(--font-body)] text-sm transition-opacity ${
                  isActive
                    ? "border-b-2 border-[#a83900] font-semibold text-[#a83900]"
                    : "text-foreground opacity-70 hover:opacity-100"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Right: search + actions */}
        <div className="flex items-center gap-6">
          <div className="flex items-center rounded-lg border border-border bg-muted px-3 py-1.5">
            <Search className="mr-2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              className="h-5 w-40 border-none bg-transparent font-[family-name:var(--font-body)] text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="text-muted-foreground transition-colors hover:text-[#a83900]">
              <Bell className="h-5 w-5" />
            </button>
            <button
              onClick={() => void handleLogout()}
              className="text-muted-foreground transition-colors hover:text-[#a83900]"
              title="Logout"
            >
              <LogOut className="h-4 w-4" />
            </button>
            <div className="flex h-7 w-7 items-center justify-center rounded-full border border-border bg-primary text-[10px] font-semibold text-primary-foreground">
              D
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
