// app/layout.tsx
import "./globals.css";
import Navbar from "./components/Navbar"; // Ensure this path is correct
import type { ReactNode } from "react";

export const metadata = {
  title: "My Portfolio",
  description: "Notion‑style portfolio website",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        
        {children}
      </body>
    </html>
  );
}
