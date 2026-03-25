import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const OWNER_EMAIL = "unitemustafa@gmail.com";
const FROM_ADDRESS = "Mustafa Ali Portfolio <contact@drmustafa.me>";

// ── In-memory rate limiter (per IP, resets on server restart) ────────
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 3; // max 3 requests per minute per IP

const ipRequests = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = ipRequests.get(ip);

  if (!entry || now > entry.resetAt) {
    ipRequests.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return false;
  }

  if (entry.count >= MAX_REQUESTS) {
    return true;
  }

  entry.count++;
  return false;
}

// Clean up stale entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  ipRequests.forEach((entry, ip) => {
    if (now > entry.resetAt) ipRequests.delete(ip);
  });
}, 5 * 60 * 1000);

// ── Input sanitization ──────────────────────────────────────────────
function sanitize(str: string): string {
  return str
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .trim();
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action } = body;

    // Rate limit only public-facing actions (contact form)
    if (action === "notify") {
      const ip =
        req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        req.headers.get("x-real-ip") ||
        "unknown";

      if (isRateLimited(ip)) {
        return NextResponse.json(
          { error: "Too many requests. Please try again in a minute." },
          { status: 429 }
        );
      }

      const { firstName, lastName, email, phone, service, message } = body;

      // Basic server-side validation
      if (!firstName?.trim() || !email?.trim() || !message?.trim()) {
        return NextResponse.json(
          { error: "Missing required fields" },
          { status: 400 }
        );
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        return NextResponse.json(
          { error: "Invalid email address" },
          { status: 400 }
        );
      }

      // Sanitize all inputs before using in HTML
      const safeFirst = sanitize(firstName);
      const safeLast = sanitize(lastName || "");
      const safeEmail = sanitize(email);
      const safePhone = sanitize(phone || "");
      const safeService = sanitize(service || "");
      const safeMessage = sanitize(message);

      await resend.emails.send({
        from: FROM_ADDRESS,
        to: OWNER_EMAIL,
        subject: `New Contact Message from ${safeFirst} ${safeLast}`.trim(),
        replyTo: email.trim(),
        html: `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1a1a2e; border-radius: 12px; overflow: hidden;">
            <div style="background: linear-gradient(135deg, #00ff99, #00cc7a); padding: 24px 32px;">
              <h1 style="margin: 0; color: #1a1a2e; font-size: 20px;">📬 New Contact Message</h1>
            </div>
            <div style="padding: 32px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #9a9aaa; font-size: 13px; width: 100px;">Name</td>
                  <td style="padding: 8px 0; color: #ffffff; font-size: 14px;">${safeFirst} ${safeLast}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #9a9aaa; font-size: 13px;">Email</td>
                  <td style="padding: 8px 0; color: #00ff99; font-size: 14px;"><a href="mailto:${safeEmail}" style="color: #00ff99; text-decoration: none;">${safeEmail}</a></td>
                </tr>
                ${safePhone ? `<tr>
                  <td style="padding: 8px 0; color: #9a9aaa; font-size: 13px;">Phone</td>
                  <td style="padding: 8px 0; color: #ffffff; font-size: 14px;">${safePhone}</td>
                </tr>` : ""}
                ${safeService ? `<tr>
                  <td style="padding: 8px 0; color: #9a9aaa; font-size: 13px;">Service</td>
                  <td style="padding: 8px 0; color: #ffffff; font-size: 14px;">${safeService}</td>
                </tr>` : ""}
              </table>
              <div style="margin-top: 24px; padding: 20px; background: #14141a; border-radius: 8px; border-left: 3px solid #00ff99;">
                <p style="margin: 0 0 8px; color: #9a9aaa; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Message</p>
                <p style="margin: 0; color: #ffffff; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${safeMessage}</p>
              </div>
              <p style="margin-top: 24px; color: #9a9aaa; font-size: 12px;">You can reply directly to this email to respond to ${safeFirst}.</p>
            </div>
          </div>
        `,
      });

      return NextResponse.json({ success: true });
    }

    if (action === "reply") {
      // Owner replied from dashboard → send to original sender
      const { toEmail, toName, replyBody } = body;

      const safeName = sanitize(toName || "");
      const safeReply = sanitize(replyBody || "");

      await resend.emails.send({
        from: FROM_ADDRESS,
        to: toEmail,
        replyTo: OWNER_EMAIL,
        subject: `Reply from Mustafa Ali`,
        html: `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1a1a2e; border-radius: 12px; overflow: hidden;">
            <div style="background: linear-gradient(135deg, #00ff99, #00cc7a); padding: 24px 32px;">
              <h1 style="margin: 0; color: #1a1a2e; font-size: 20px;">💬 Reply from Mustafa Ali</h1>
            </div>
            <div style="padding: 32px;">
              <p style="color: #9a9aaa; font-size: 13px; margin: 0 0 8px;">Hi ${safeName},</p>
              <div style="padding: 20px; background: #14141a; border-radius: 8px; border-left: 3px solid #00ff99;">
                <p style="margin: 0; color: #ffffff; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${safeReply}</p>
              </div>
              <p style="margin-top: 24px; color: #9a9aaa; font-size: 12px;">You can reply directly to this email to continue the conversation.</p>
            </div>
          </div>
        `,
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
