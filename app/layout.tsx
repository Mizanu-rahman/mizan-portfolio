import type { Metadata } from "next";
import { jetbrainsMono, syne } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mizanur Rahman | Portfolio",
  description: "Full-Stack .NET Developer — Chattogram, Bangladesh",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${jetbrainsMono.variable} ${syne.variable} antialiased overflow-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
