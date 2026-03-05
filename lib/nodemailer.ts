import nodemailer from "nodemailer";
import type { Transporter, SendMailOptions } from "nodemailer";

// ── TYPES ─────────────────────────────────────────────────────────────────────

export interface InquiryEmailPayload {
  name: string;
  email: string;
  projectType: string;
  budget?: string;
  message: string;
}

interface EmailResult {
  success: boolean;
  error?: string;
}

// ── ENV GUIDE ─────────────────────────────────────────────────────────────────
// Add these to .env.local:
//
//   SMTP_HOST=smtp.gmail.com
//   SMTP_PORT=465
//   SMTP_SECURE=true                # true for port 465, false for 587
//   SMTP_USER=franktamalejr@gmail.com
//   SMTP_PASS=xxxx_xxxx_xxxx_xxxx   # Gmail → Account → Security → App Passwords
//   ADMIN_EMAIL=franktamalejr@gmail.com
//   SITE_URL=https://tamalefrank.dev

// ── TRANSPORTER ───────────────────────────────────────────────────────────────

function createTransporter(): Transporter {
  return nodemailer.createTransport({
    host:   process.env.SMTP_HOST   ?? "smtp.gmail.com",
    port:   Number(process.env.SMTP_PORT ?? 465),
    secure: process.env.SMTP_SECURE !== "false",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

// ── DESIGN TOKENS — match Contact component (zinc/amber palette) ───────────────

const C = {
  bg:     "#09090b",   // zinc-950
  card:   "#18181b",   // zinc-900
  border: "#27272a",   // zinc-800
  text:   "#f4f4f5",   // zinc-100
  muted:  "#71717a",   // zinc-500
  amber:  "#f59e0b",   // amber-500
} as const;

// ── SHARED HTML WRAPPER ───────────────────────────────────────────────────────

function wrapEmail(body: string, preheader: string): string {
  const siteUrl = process.env.SITE_URL ?? "https://tamalefrank.dev";
  const year    = new Date().getFullYear();

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0" />
  <title>Tamale Frank</title>
</head>
<body style="margin:0;padding:0;background:${C.bg};
  font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:${C.text};">

  <div style="display:none;max-height:0;overflow:hidden;font-size:1px;color:${C.bg};">
    ${preheader}&nbsp;
  </div>

  <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
    style="background:${C.bg};padding:40px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" role="presentation"
        style="max-width:600px;width:100%;">

        <!-- Logo -->
        <tr><td align="center" style="padding-bottom:28px;">
          <table cellpadding="0" cellspacing="0" role="presentation"><tr>
            <td style="width:38px;height:38px;border-radius:10px;
              background:rgba(245,158,11,0.12);border:1px solid rgba(245,158,11,0.3);
              text-align:center;vertical-align:middle;font-family:monospace;
              font-size:13px;font-weight:700;color:${C.amber};">TF</td>
            <td style="padding-left:12px;font-size:16px;font-weight:300;
              color:${C.text};letter-spacing:0.02em;">Tamale Frank</td>
          </tr></table>
        </td></tr>

        <!-- Card -->
        <tr><td style="background:${C.card};border:1px solid ${C.border};
          border-radius:16px;overflow:hidden;">

          <!-- Amber accent line -->
          <div style="height:1px;background:linear-gradient(90deg,transparent,${C.amber},transparent);opacity:0.4;"></div>

          <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
            style="padding:36px 40px 32px;">
            ${body}
          </table>
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding-top:24px;text-align:center;">
          <p style="margin:0;font-size:11px;color:${C.muted};
            font-family:monospace;letter-spacing:0.06em;">
            &copy; ${year} Tamale Frank &middot; Kampala, Uganda
          </p>
          <p style="margin:5px 0 0;font-size:11px;">
            <a href="${siteUrl}" style="color:${C.muted};text-decoration:none;">
              ${siteUrl.replace("https://", "")}
            </a>
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ── TEMPLATE 1 — CLIENT CONFIRMATION ─────────────────────────────────────────

function buildClientEmail(p: InquiryEmailPayload): string {
  const siteUrl = process.env.SITE_URL ?? "https://tamalefrank.dev";

  const detailRows: Array<[string, string]> = [
    ["Project Type", p.projectType],
    ...(p.budget ? [["Budget", p.budget] as [string, string]] : []),
  ];

  const steps: Array<[string, string]> = [
    ["01", "I carefully review your inquiry in detail"],
    ["02", "You'll hear back within 24 hours"],
    ["03", "We schedule a discovery call if it makes sense"],
  ];

  const body = `
    <!-- Greeting -->
    <tr><td style="padding-bottom:24px;">
      <p style="margin:0 0 8px;font-size:11px;font-family:monospace;
        color:${C.muted};text-transform:uppercase;letter-spacing:0.15em;">Message received</p>
      <h1 style="margin:0;font-size:26px;font-weight:300;color:${C.text};line-height:1.25;">
        Thanks, <strong style="font-weight:600;">${p.name}.</strong>
      </h1>
      <p style="margin:12px 0 0;font-size:14px;color:${C.muted};line-height:1.65;">
        Your message landed safely. I&rsquo;ll review it and get back to you
        within <strong style="color:${C.text};">24 hours</strong>.
      </p>
    </td></tr>

    <!-- Divider -->
    <tr><td style="padding-bottom:24px;">
      <div style="height:1px;background:${C.border};"></div>
    </td></tr>

    <!-- Inquiry summary -->
    <tr><td style="padding-bottom:24px;">
      <p style="margin:0 0 14px;font-size:11px;font-family:monospace;
        color:${C.muted};text-transform:uppercase;letter-spacing:0.15em;">Your inquiry</p>

      <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
        style="border:1px solid ${C.border};border-radius:12px;overflow:hidden;">
        ${detailRows
          .map(
            ([label, value], i) => `
        <tr style="background:${i % 2 === 0 ? C.bg : C.card};">
          <td style="width:120px;padding:11px 16px;font-size:11px;font-family:monospace;
            color:${C.amber};text-transform:uppercase;letter-spacing:0.1em;
            border-right:1px solid ${C.border};white-space:nowrap;">
            ${label}
          </td>
          <td style="padding:11px 16px;font-size:13px;color:${C.text};">${value}</td>
        </tr>`
          )
          .join("")}
        <tr style="background:${C.bg};">
          <td style="width:120px;padding:11px 16px;font-size:11px;font-family:monospace;
            color:${C.amber};text-transform:uppercase;letter-spacing:0.1em;
            border-right:1px solid ${C.border};vertical-align:top;">
            Message
          </td>
          <td style="padding:11px 16px;font-size:13px;color:${C.muted};line-height:1.65;">
            ${p.message}
          </td>
        </tr>
      </table>
    </td></tr>

    <!-- Divider -->
    <tr><td style="padding-bottom:24px;">
      <div style="height:1px;background:${C.border};"></div>
    </td></tr>

    <!-- What happens next -->
    <tr><td style="padding-bottom:28px;">
      <p style="margin:0 0 14px;font-size:11px;font-family:monospace;
        color:${C.muted};text-transform:uppercase;letter-spacing:0.15em;">What happens next</p>
      <table cellpadding="0" cellspacing="0" role="presentation">
        ${steps
          .map(
            ([num, text]) => `
        <tr>
          <td style="width:30px;vertical-align:top;padding-bottom:12px;">
            <span style="display:inline-block;width:22px;height:22px;border-radius:6px;
              background:rgba(245,158,11,0.1);border:1px solid rgba(245,158,11,0.25);
              text-align:center;line-height:22px;font-size:9px;font-family:monospace;
              font-weight:700;color:${C.amber};">${num}</span>
          </td>
          <td style="padding-bottom:12px;padding-left:10px;font-size:13px;
            color:${C.text};line-height:1.55;">${text}</td>
        </tr>`
          )
          .join("")}
      </table>
    </td></tr>

    <!-- CTA -->
    <tr><td align="center">
      <a href="${siteUrl}" style="display:inline-block;padding:13px 36px;
        background:${C.amber};color:#09090b;font-weight:600;font-size:14px;
        border-radius:10px;text-decoration:none;letter-spacing:0.01em;">
        View My Portfolio
      </a>
    </td></tr>
  `;

  return wrapEmail(body, `Got your message, ${p.name} — I'll respond within 24 hours.`);
}

// ── TEMPLATE 2 — ADMIN NOTIFICATION ──────────────────────────────────────────

function buildAdminEmail(p: InquiryEmailPayload): string {
  const submittedAt = new Date().toLocaleString("en-GB", {
    dateStyle: "full",
    timeStyle: "short",
  });

  type Row = [label: string, value: string, isLink?: boolean];
  const rows: Row[] = [
    ["Name",         p.name,        false],
    ["Email",        p.email,       true ],
    ["Project Type", p.projectType, false],
    ...(p.budget ? [["Budget", p.budget, false] as Row] : []),
    ["Submitted",    submittedAt,   false],
  ];

  const body = `
    <!-- Alert header -->
    <tr><td style="padding-bottom:20px;">
      <p style="margin:0 0 6px;font-size:11px;font-family:monospace;
        color:${C.amber};text-transform:uppercase;letter-spacing:0.15em;">New inquiry</p>
      <h1 style="margin:0;font-size:22px;font-weight:600;color:${C.text};line-height:1.3;">
        ${p.name} wants to work with you
      </h1>
      <p style="margin:6px 0 0;font-size:12px;color:${C.muted};">
        ${p.projectType}${p.budget ? ` &middot; ${p.budget}` : ""}
      </p>
    </td></tr>

    <!-- Divider -->
    <tr><td style="padding-bottom:20px;">
      <div style="height:1px;background:${C.border};"></div>
    </td></tr>

    <!-- Details table -->
    <tr><td style="padding-bottom:20px;">
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
        style="border:1px solid ${C.border};border-radius:12px;overflow:hidden;">
        ${rows
          .map(
            ([label, value, isLink], i) => `
        <tr style="background:${i % 2 === 0 ? C.bg : C.card};">
          <td style="width:120px;padding:11px 16px;font-size:11px;font-family:monospace;
            color:${C.amber};text-transform:uppercase;letter-spacing:0.1em;
            border-right:1px solid ${C.border};white-space:nowrap;vertical-align:top;">
            ${label}
          </td>
          <td style="padding:11px 16px;font-size:13px;color:${C.text};">
            ${isLink
              ? `<a href="mailto:${value}" style="color:${C.amber};text-decoration:none;">${value}</a>`
              : value}
          </td>
        </tr>`
          )
          .join("")}
      </table>
    </td></tr>

    <!-- Message -->
    <tr><td style="padding-bottom:28px;">
      <p style="margin:0 0 10px;font-size:11px;font-family:monospace;
        color:${C.muted};text-transform:uppercase;letter-spacing:0.15em;">Message</p>
      <div style="background:${C.bg};border:1px solid ${C.border};
        border-left:3px solid ${C.amber};border-radius:10px;
        padding:14px 18px;font-size:13px;color:${C.muted};line-height:1.7;">
        ${p.message}
      </div>
    </td></tr>

    <!-- Reply CTA -->
    <tr><td>
      <a href="mailto:${p.email}?subject=Re: Your project inquiry — Tamale Frank"
        style="display:inline-block;padding:13px 32px;background:${C.amber};
        color:#09090b;font-weight:600;font-size:14px;border-radius:10px;text-decoration:none;">
        Reply to ${p.name}
      </a>
    </td></tr>
  `;

  return wrapEmail(body, `New inquiry from ${p.name} — ${p.projectType}`);
}

// ── PUBLIC API ────────────────────────────────────────────────────────────────

/**
 * Fire both emails concurrently:
 *  1. Branded confirmation → the client
 *  2. Full-detail alert   → admin (ADMIN_EMAIL env var)
 *
 * Returns { success: true } or { success: false, error: string }.
 */
export async function sendInquiryEmails(
  payload: InquiryEmailPayload
): Promise<EmailResult> {
  const transporter = createTransporter();
  const from        = `"Tamale Frank" <${process.env.SMTP_USER}>`;
  const adminEmail  = process.env.ADMIN_EMAIL ?? process.env.SMTP_USER ?? "";

  const clientMail: SendMailOptions = {
    from,
    to:      payload.email,
    subject: `Got your message, ${payload.name} — I'll be in touch soon`,
    html:    buildClientEmail(payload),
    text: [
      `Hi ${payload.name},`,
      "",
      "Thanks for reaching out! I received your inquiry and will respond within 24 hours.",
      "",
      `Project: ${payload.projectType}`,
      payload.budget ? `Budget: ${payload.budget}` : "",
      "",
      payload.message,
      "",
      "— Tamale Frank",
      process.env.SITE_URL ?? "https://tamalefrank.dev",
    ]
      .filter(Boolean)
      .join("\n"),
  };

  const adminMail: SendMailOptions = {
    from,
    to:      adminEmail,
    replyTo: payload.email,
    subject: `New inquiry from ${payload.name} — ${payload.projectType}`,
    html:    buildAdminEmail(payload),
    text: [
      "New portfolio inquiry",
      "─".repeat(36),
      `Name:    ${payload.name}`,
      `Email:   ${payload.email}`,
      `Project: ${payload.projectType}`,
      payload.budget ? `Budget:  ${payload.budget}` : "",
      "",
      payload.message,
    ]
      .filter(Boolean)
      .join("\n"),
  };

  try {
    await Promise.all([
      transporter.sendMail(clientMail),
      transporter.sendMail(adminMail),
    ]);
    return { success: true };
  } catch (error) {
    console.error("[sendInquiryEmails] failed:", error);
    return { success: false, error: (error as Error).message };
  }
}