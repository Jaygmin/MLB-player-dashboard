import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MLB Player Dashboard",
  description:
    "description: Interactive dashboard for 2025 MLB player stats with filters, search, team colors, and highlight leaders.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
