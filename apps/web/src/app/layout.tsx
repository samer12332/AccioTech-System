import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AccioTech Operating System",
  description: "Internal operating system for AccioTech.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
