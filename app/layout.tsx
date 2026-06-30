import type { Metadata } from "next";
import { jetbrainsMono, syne } from "./fonts";
import "./globals.css";
import FaviconAnimator from "@/components/FaviconAnimator";

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
      <head></head>
      <body
        className={`${jetbrainsMono.variable} ${syne.variable} antialiased`}
      >
        <FaviconAnimator />
        {children}
      </body>
    </html>
  );
}
