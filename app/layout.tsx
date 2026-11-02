import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Book Heaven — Your personal literary sanctuary",
  description: "Keep the stories. Remember the magic. A private reading library.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
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
