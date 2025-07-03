import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import { DevModeProvider } from "@/context/DevModeContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gideon Glago - Software Developer",
  description:
    "The portfolio of Gideon Glago, a passionate software developer specializing in React and Django.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth">
      <body className={inter.className}>
        <DevModeProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </DevModeProvider>
      </body>
    </html>
  );
}
