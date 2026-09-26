import type { Metadata } from "next";

import { env } from "@/lib/env";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: env.appUrl,
  title: "AttendSense",
  description: "Student attendance planning for SPCE.",
  applicationName: "AttendSense",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
