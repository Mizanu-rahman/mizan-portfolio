import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    // Basic validation
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

    const response = await fetch("https://formspree.io/f/mgorzlkn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        // Formspree checks Origin — must match whitelisted domain
        Origin: siteUrl,
        Referer: siteUrl,
      },
      body: JSON.stringify({
        name,
        email,
        message,
        _subject: `New message from ${name} — Mizan's Portfolio`,
        _replyto: email,
      }),
    });

    const data = await response.json().catch(() => ({}));

    if (response.ok) {
      return NextResponse.json({ success: true });
    } else {
      console.error("Formspree error:", response.status, JSON.stringify(data));
      return NextResponse.json(
        { error: data?.error ?? "Failed to send" },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("Contact route error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
