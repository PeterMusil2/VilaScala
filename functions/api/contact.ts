/**
 * POST /api/contact — Cloudflare Pages Function.
 *
 * Takes the contact form as JSON and sends it to info@vila-scala.cz through
 * Resend. The visitor's address goes into Reply-To, so answering the email in
 * the mailbox replies straight to them.
 *
 * Environment (Pages → Settings → Variables and secrets):
 *   RESEND_API_KEY   secret, required — Resend API key (anewstyle.brno team)
 *   CONTACT_TO       optional, defaults to info@vila-scala.cz
 *   CONTACT_FROM     optional, defaults to "Vila SCALA <web@vila-scala.cz>"
 */

interface Env {
  RESEND_API_KEY?: string;
  CONTACT_TO?: string;
  CONTACT_FROM?: string;
}

interface Context {
  request: Request;
  env: Env;
}

const DEFAULT_TO = 'info@vila-scala.cz';
const DEFAULT_FROM = 'Vila SCALA <web@vila-scala.cz>';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });

const clean = (value: unknown, max: number) =>
  typeof value === 'string' ? value.replace(/\r/g, '').trim().slice(0, max) : '';

/** Single-line values only: stops header-style injection into the subject. */
const oneLine = (value: string) => value.replace(/[\n\t]+/g, ' ');

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

export const onRequestPost = async ({ request, env }: Context): Promise<Response> => {
  if (!env.RESEND_API_KEY) {
    return json({ ok: false, error: 'not_configured' }, 503);
  }

  let input: Record<string, unknown>;
  try {
    input = (await request.json()) as Record<string, unknown>;
  } catch {
    return json({ ok: false, error: 'bad_request' }, 400);
  }

  // Honeypot: real visitors never see or fill this field. Pretend success.
  if (clean(input.website, 200)) {
    return json({ ok: true });
  }

  const name = oneLine(clean(input.name, 120));
  const email = oneLine(clean(input.email, 200));
  const phone = oneLine(clean(input.phone, 40));
  const unit = oneLine(clean(input.unit, 80));
  const message = clean(input.message, 5000);
  const subject = oneLine(clean(input.subject, 150)) || 'Dotaz z webu Vila SCALA';
  const locale = input.locale === 'en' ? 'en' : 'cs';

  if (name.length < 2 || !EMAIL_RE.test(email) || message.length < 5) {
    return json({ ok: false, error: 'invalid' }, 422);
  }

  const rows: [string, string][] = [
    ['Jméno', name],
    ['E-mail', email],
    ...(phone ? ([['Telefon', phone]] as [string, string][]) : []),
    ...(unit ? ([['Byt', unit]] as [string, string][]) : []),
    ['Jazyk webu', locale.toUpperCase()],
  ];

  const text = [...rows.map(([k, v]) => `${k}: ${v}`), '', message].join('\n');
  const html = `<!doctype html><html><body style="font-family:system-ui,sans-serif;color:#1f1b17;line-height:1.5">
<h2 style="margin:0 0 16px;font-size:18px">Nová zpráva z kontaktního formuláře</h2>
<table style="border-collapse:collapse;margin-bottom:16px">${rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:4px 16px 4px 0;color:#6b625a">${escapeHtml(k)}</td><td style="padding:4px 0"><strong>${escapeHtml(v)}</strong></td></tr>`,
    )
    .join('')}</table>
<div style="white-space:pre-wrap;border-left:3px solid #b08d57;padding:8px 16px;background:#f7f3ee">${escapeHtml(message)}</div>
</body></html>`;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${env.RESEND_API_KEY}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      from: env.CONTACT_FROM || DEFAULT_FROM,
      to: [env.CONTACT_TO || DEFAULT_TO],
      reply_to: `${name} <${email}>`,
      subject: `${subject} — ${name}`,
      text,
      html,
    }),
  });

  if (!res.ok) {
    console.error('Resend error', res.status, await res.text().catch(() => ''));
    return json({ ok: false, error: 'send_failed' }, 502);
  }

  return json({ ok: true });
};

export const onRequest = async (): Promise<Response> =>
  new Response('Method Not Allowed', { status: 405, headers: { allow: 'POST' } });
