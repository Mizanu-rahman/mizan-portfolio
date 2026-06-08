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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
        (function() {
          var favicon = document.createElement('link');
          favicon.rel = 'icon';
          favicon.type = 'image/svg+xml';
          document.head.appendChild(favicon);
          var toggle = true;
          setInterval(function() {
            favicon.href = toggle ? '/favicon-1.svg' : '/favicon-2.svg';
            toggle = !toggle;
          }, 1500);
        })();
      `,
          }}
        />
      </head>
      <body
        className={`${jetbrainsMono.variable} ${syne.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
