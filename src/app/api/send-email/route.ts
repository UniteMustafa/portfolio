import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const OWNER_EMAIL = "unitemustafa@gmail.com";
const FROM_ADDRESS = "Mustafa Ali Portfolio <contact@drmustafa.me>";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action } = body;

    if (action === "notify") {
      // Someone submitted the contact form → notify owner
      const { firstName, lastName, email, phone, service, message } = body;

      await resend.emails.send({
        from: FROM_ADDRESS,
        to: OWNER_EMAIL,
        subject: `New Contact Message from ${firstName} ${lastName}`.trim(),
        replyTo: email,
        html: `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1a1a2e; border-radius: 12px; overflow: hidden;">
            <div style="background: linear-gradient(135deg, #00ff99, #00cc7a); padding: 24px 32px;">
              <h1 style="margin: 0; color: #1a1a2e; font-size: 20px;">📬 New Contact Message</h1>
            </div>
            <div style="padding: 32px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #9a9aaa; font-size: 13px; width: 100px;">Name</td>
                  <td style="padding: 8px 0; color: #ffffff; font-size: 14px;">${firstName} ${lastName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #9a9aaa; font-size: 13px;">Email</td>
                  <td style="padding: 8px 0; color: #00ff99; font-size: 14px;"><a href="mailto:${email}" style="color: #00ff99; text-decoration: none;">${email}</a></td>
                </tr>
                ${phone ? `<tr>
                  <td style="padding: 8px 0; color: #9a9aaa; font-size: 13px;">Phone</td>
                  <td style="padding: 8px 0; color: #ffffff; font-size: 14px;">${phone}</td>
                </tr>` : ""}
                ${service ? `<tr>
                  <td style="padding: 8px 0; color: #9a9aaa; font-size: 13px;">Service</td>
                  <td style="padding: 8px 0; color: #ffffff; font-size: 14px;">${service}</td>
                </tr>` : ""}
              </table>
              <div style="margin-top: 24px; padding: 20px; background: #14141a; border-radius: 8px; border-left: 3px solid #00ff99;">
                <p style="margin: 0 0 8px; color: #9a9aaa; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Message</p>
                <p style="margin: 0; color: #ffffff; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
              </div>
              <p style="margin-top: 24px; color: #9a9aaa; font-size: 12px;">You can reply directly to this email to respond to ${firstName}.</p>
            </div>
          </div>
        `,
      });

      return NextResponse.json({ success: true });
    }

    if (action === "reply") {
      // Owner replied from dashboard → send to original sender
      const { toEmail, toName, replyBody } = body;

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
              <p style="color: #9a9aaa; font-size: 13px; margin: 0 0 8px;">Hi ${toName},</p>
              <div style="padding: 20px; background: #14141a; border-radius: 8px; border-left: 3px solid #00ff99;">
                <p style="margin: 0; color: #ffffff; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${replyBody}</p>
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
