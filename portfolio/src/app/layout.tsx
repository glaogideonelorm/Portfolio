import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { DevModeProvider } from "@/context/DevModeContext";
import { AnalyticsProvider } from "@/context/AnalyticsContext";
import { Analytics } from "@vercel/analytics/next";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Gideon Glago | Software Developer",
  description:
    "Portfolio website showcasing my work and skills as a software developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <DevModeProvider>
          <AnalyticsProvider>
            {children}
          </AnalyticsProvider>
        </DevModeProvider>
        <Analytics />
      </body>
    </html>
  );
}
