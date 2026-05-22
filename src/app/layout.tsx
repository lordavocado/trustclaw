import "~/styles/globals.css";

import { type Metadata, type Viewport } from "next";
import { Hanken_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { TRPCReactProvider } from "~/clients/trpc";

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bennybooks | AI Accounting Companion",
  description:
    "Your always-on AI accountant and financial advisor for small businesses. Benny handles your bookkeeping, compliance, and financial insights.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export const viewport: Viewport = {
  themeColor: "#fbf8fd",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${hankenGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} bg-background`}
    >
      <body className="min-h-screen font-sans antialiased">
        <TRPCReactProvider>
          {children}
          <Toaster />
          <div id="dialog-portal" />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
