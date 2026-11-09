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
const MIN_FILL_MS = 3000;
/** Tags show up on every email in the Resend dashboard, so sites and kinds can be filtered. */
const SITE_TAG = { name: 'site', value: 'vila-scala' };

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });

const clean = (value: unknown, max: number) =>
  typeof value === 'string' ? value.replace(/\r/g, '').trim().slice(0, max) : '';

/*
 * Thank-you email to the visitor. Deliberately fixed text: it never repeats
 * the name or message they typed, so the form cannot be used to send
 * arbitrary content to arbitrary addresses from vila-scala.cz.
 */
const THANK_YOU = {
  cs: {
    subject: 'Děkujeme za zprávu — Vila SCALA',
    heading: 'Děkujeme za vaši zprávu',
    body: [
      'Dobrý den,',
      'děkujeme, že jste nás kontaktovali. Vaši zprávu jsme v pořádku přijali a ozveme se vám co nejdříve, obvykle do jednoho pracovního dne.',
      'Pokud budete chtít cokoli doplnit, stačí odpovědět na tento e-mail.',
    ],
    signoff: 'S pozdravem',
    team: 'tým Vila SCALA',
  },
  en: {
    subject: 'Thank you for your message — Vila SCALA',
    heading: 'Thank you for your message',
    body: [
      'Hello,',
      'thank you for getting in touch. We have received your message and will get back to you as soon as possible, usually within one working day.',
      'If you would like to add anything, simply reply to this email.',
    ],
    signoff: 'Kind regards',
    team: 'the Vila SCALA team',
  },
} as const;

const thankYouEmail = (locale: 'cs' | 'en') => {
  const t = THANK_YOU[locale];
  const text = [t.heading, '', ...t.body.flatMap((p) => [p, '']), t.signoff, t.team, '', 'Vila SCALA', 'Veslařská 1039/144, 637 00 Brno-Jundrov', '+420 601 221 551 · https://www.vila-scala.cz'].join('\n');
  const html = `<!doctype html><html lang="${locale}"><body style="margin:0;background:#f4f1ec;font-family:system-ui,-apple-system,'Segoe UI',sans-serif;color:#14110f;line-height:1.6">
<div style="max-width:560px;margin:0 auto;padding:32px 20px">
<div style="background:#fffdfa;border:1px solid #d9d2c6;padding:32px">
<p style="margin:0 0 24px;font-family:Georgia,'Times New Roman',serif;font-size:22px;letter-spacing:.02em">Vila SCALA</p>
<h1 style="margin:0 0 16px;font-family:Georgia,'Times New Roman',serif;font-size:26px;font-weight:600">${t.heading}</h1>
${t.body.map((p) => `<p style="margin:0 0 14px;font-size:16px">${p}</p>`).join('')}
<p style="margin:24px 0 0;font-size:16px">${t.signoff}<br><strong>${t.team}</strong></p>
</div>
<p style="margin:20px 0 0;font-size:13px;color:#5c544c;text-align:center">Vila SCALA · Veslařská 1039/144, 637 00 Brno-Jundrov<br><a href="tel:+420601221551" style="color:#5c544c">+420 601 221 551</a> · <a href="https://www.vila-scala.cz" style="color:#5c544c">www.vila-scala.cz</a></p>
</div></body></html>`;
  return { subject: t.subject, text, html };
};

const sendEmail = (apiKey: string, payload: Record<string, unknown>) =>
  fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { authorization: `Bearer ${apiKey}`, 'content-type': 'application/json' },
    body: JSON.stringify(payload),
  });

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

  /*
   * Bot traps. Both answer with a fake success and send nothing (no enquiry,
   * no thank-you), so a bot learns nothing from the response.
   * 1. Honeypot: the hidden `website` field is never seen or filled by people.
   * 2. Timing: nobody fills name, email and a message in under 3 seconds.
   */
  const elapsed = Number(input.elapsed);
  if (clean(input.website, 200) || (Number.isFinite(elapsed) && elapsed < MIN_FILL_MS)) {
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

  const from = env.CONTACT_FROM || DEFAULT_FROM;
  const to = env.CONTACT_TO || DEFAULT_TO;

  const res = await sendEmail(env.RESEND_API_KEY, {
    from,
    to: [to],
    reply_to: `${name} <${email}>`,
    subject: `${subject} — ${name}`,
    text,
    html,
    tags: [SITE_TAG, { name: 'type', value: 'enquiry' }],
  });

  if (!res.ok) {
    console.error('Resend error', res.status, await res.text().catch(() => ''));
    return json({ ok: false, error: 'send_failed' }, 502);
  }

  // The enquiry is in; a failed thank-you must not turn that into an error.
  const thanks = thankYouEmail(locale);
  const thanksRes = await sendEmail(env.RESEND_API_KEY, {
    from,
    to: [email],
    reply_to: to,
    subject: thanks.subject,
    text: thanks.text,
    html: thanks.html,
    tags: [SITE_TAG, { name: 'type', value: 'confirmation' }],
  }).catch((err: unknown) => {
    console.error('Thank-you send failed', err);
    return null;
  });
  if (thanksRes && !thanksRes.ok) {
    console.error('Thank-you Resend error', thanksRes.status, await thanksRes.text().catch(() => ''));
  }

  return json({ ok: true, confirmation: !!thanksRes?.ok });
};

export const onRequest = async (): Promise<Response> =>
  new Response('Method Not Allowed', { status: 405, headers: { allow: 'POST' } });
