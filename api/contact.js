'use strict';
/**
 * POST /api/contact  — receives the portfolio contact form and emails it to you.
 * Zero dependencies (uses Node 18+ fetch). Works as a Vercel serverless function
 * and, unchanged, behind the local server in server.js.
 *
 * Environment variables (see .env.example):
 *   RESEND_API_KEY   API key from https://resend.com (free plan is enough)
 *   CONTACT_TO       where messages are delivered (your inbox)
 *   CONTACT_FROM     optional, e.g. "Portfolio <hello@yourdomain.com>" (default: Resend sandbox sender)
 *   ALLOWED_ORIGIN   optional, comma separated origins allowed to call the API cross-site
 *   SEND_AUTOREPLY   "true" to also send the visitor a thank-you email (needs a verified domain in Resend)
 *   NOTIFY_WEBHOOK_URL optional Discord/Slack-style webhook that gets a short ping too
 *   MAIL_DRY_RUN     "1" to skip sending and just log (local testing)
 */
const TYPES = ['Website', 'Dashboard', 'AI / automation', 'Other'];
const LIMIT = 5, WINDOW_MS = 60 * 60 * 1000;          // 5 messages / hour / IP (best effort on serverless)
const hits = new Map();

const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const clean = (s, max) => String(s == null ? '' : s).replace(/\r/g, '').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim().slice(0, max);
const oneLine = (s, max) => clean(s, max).replace(/\s+/g, ' ');
const EMAIL = /^[^\s@<>()",;:]+@[^\s@<>()",;:]+\.[^\s@<>()",;:]{2,}$/;

function json(res, code, obj) {
  res.statusCode = code;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(obj));
}
function clientIp(req) {
  const xf = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim();
  return xf || (req.socket && req.socket.remoteAddress) || 'unknown';
}
function limited(ip) {
  const now = Date.now(), arr = (hits.get(ip) || []).filter(t => now - t < WINDOW_MS);
  if (arr.length >= LIMIT) { hits.set(ip, arr); return true; }
  arr.push(now); hits.set(ip, arr);
  if (hits.size > 5000) for (const [k, v] of hits) if (!v.some(t => now - t < WINDOW_MS)) hits.delete(k);
  return false;
}
async function readBody(req) {
  if (req.body === null) return null;                       // host already tried to parse it and failed
  if (req.body !== undefined && req.body !== '') {
    if (typeof req.body === 'string') { try { return JSON.parse(req.body); } catch (e) { return null; } }
    if (Buffer.isBuffer(req.body)) { try { return JSON.parse(req.body.toString('utf8')); } catch (e) { return null; } }
    return typeof req.body === 'object' ? req.body : null;
  }
  if (req.readableEnded) return null;                       // stream already consumed
  return await new Promise(resolve => {
    let size = 0; const chunks = [];
    req.on('data', c => { size += c.length; if (size > 20000) { resolve(null); req.destroy(); } else chunks.push(c); });
    req.on('end', () => { try { resolve(JSON.parse(Buffer.concat(chunks).toString('utf8'))); } catch (e) { resolve(null); } });
    req.on('error', () => resolve(null));
  });
}
function cors(req, res) {
  const allowed = String(process.env.ALLOWED_ORIGIN || '').split(',').map(s => s.trim()).filter(Boolean);
  const origin = req.headers.origin;
  if (origin && allowed.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }
}
function validate(b) {
  const name = oneLine(b.name, 80), email = oneLine(b.email, 254), message = clean(b.message, 3000);
  const type = TYPES.includes(b.type) ? b.type : 'Other';
  if (name.length < 2) return { error: 'Please enter your name.' };
  if (!EMAIL.test(email)) return { error: 'Please enter a valid email address.' };
  if (message.length < 10) return { error: 'Please write a few more words so I can help.' };
  return { value: { name, email, type, message } };
}
function render(v, meta) {
  const when = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' }) + ' IST';
  const text = `New portfolio enquiry\n\nName: ${v.name}\nEmail: ${v.email}\nProject type: ${v.type}\nReceived: ${when}\n\n${v.message}\n\n— sent from your portfolio contact form`;
  const row = (k, val) => `<tr><td style="padding:6px 14px 6px 0;color:#869196;font:700 11px Arial,sans-serif;letter-spacing:.12em;text-transform:uppercase;vertical-align:top">${k}</td><td style="padding:6px 0;color:#D8E4EC;font:15px Arial,sans-serif">${val}</td></tr>`;
  const html = `<div style="background:#0d1113;padding:28px 12px"><div style="max-width:560px;margin:auto;background:#14181A;border:1px solid #2b353a;border-radius:6px;overflow:hidden">
<div style="padding:20px 24px;background:#232B2F;border-bottom:3px solid #546369"><div style="font:italic 26px Georgia,serif;color:#F2F7FA">New enquiry</div><div style="font:12px Arial,sans-serif;color:#869196;margin-top:4px">${esc(when)}</div></div>
<div style="padding:22px 24px"><table style="border-collapse:collapse;width:100%">${row('Name', esc(v.name))}${row('Email', `<a href="mailto:${esc(v.email)}" style="color:#D8E4EC">${esc(v.email)}</a>`)}${row('Project', esc(v.type))}</table>
<div style="margin-top:16px;padding:16px;background:#0d1113;border-left:3px solid #546369;color:#D8E4EC;font:15px/1.6 Arial,sans-serif;white-space:pre-wrap">${esc(v.message)}</div>
<p style="margin:20px 0 0;font:12px Arial,sans-serif;color:#869196">Hit reply to answer ${esc(v.name)} directly.</p></div></div></div>`;
  return { subject: `Portfolio enquiry · ${v.type} · ${v.name}`, text, html };
}
async function resend(payload) {
  const r = await fetch(process.env.RESEND_API_URL || 'https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + process.env.RESEND_API_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!r.ok) throw new Error('Resend ' + r.status + ' ' + (await r.text()).slice(0, 300));
}
module.exports = async function handler(req, res) {
  cors(req, res);
  if (req.method === 'OPTIONS') { res.statusCode = 204; return res.end(); }
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST, OPTIONS'); return json(res, 405, { ok: false, error: 'Method not allowed.' }); }
  if (limited(clientIp(req))) return json(res, 429, { ok: false, error: 'Too many messages from this connection. Please try again in a while, or email me directly.' });
  const body = await readBody(req);
  if (!body || typeof body !== 'object') return json(res, 400, { ok: false, error: 'Invalid request.' });
  if (body.website) return json(res, 200, { ok: true });              // honeypot: bots fill this, humans never see it
  const v = validate(body);
  if (v.error) return json(res, 400, { ok: false, error: v.error });
  const mail = render(v.value);
  try {
    if (process.env.MAIL_DRY_RUN === '1') {
      console.log('[contact:dry-run]', JSON.stringify({ to: process.env.CONTACT_TO, subject: mail.subject, from: v.value.email }));
    } else {
      if (!process.env.RESEND_API_KEY || !process.env.CONTACT_TO) {
        console.error('[contact] RESEND_API_KEY / CONTACT_TO are not configured');
        return json(res, 500, { ok: false, error: 'The contact service is not configured yet.' });
      }
      const from = process.env.CONTACT_FROM || 'Portfolio <onboarding@resend.dev>';
      await resend({ from, to: [process.env.CONTACT_TO], reply_to: v.value.email, subject: mail.subject, html: mail.html, text: mail.text });
      if (process.env.SEND_AUTOREPLY === 'true') {
        await resend({ from, to: [v.value.email], reply_to: process.env.CONTACT_TO, subject: 'Thanks for reaching out — Aditya Patel',
          text: `Hi ${v.value.name},\n\nThanks for your message — I've received it and will get back to you within a day or two.\n\nWhat you sent:\n${v.value.message}\n\n— Aditya Patel`,
          html: `<div style="font:15px/1.6 Arial,sans-serif;color:#14181A"><p>Hi ${esc(v.value.name)},</p><p>Thanks for your message — I've received it and will get back to you within a day or two.</p><blockquote style="margin:16px 0;padding:10px 16px;border-left:3px solid #546369;color:#546369;white-space:pre-wrap">${esc(v.value.message)}</blockquote><p>— Aditya Patel</p></div>` }).catch(e => console.error('[contact] autoreply failed', e.message));
      }
    }
    if (process.env.NOTIFY_WEBHOOK_URL) {
      const line = `New portfolio enquiry from ${v.value.name} (${v.value.type})`;
      fetch(process.env.NOTIFY_WEBHOOK_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ content: line, text: line }) }).catch(() => {});
    }
    return json(res, 200, { ok: true });
  } catch (e) {
    console.error('[contact] send failed:', e.message);
    return json(res, 502, { ok: false, error: 'I could not send your message right now. Please try again, or email me directly.' });
  }
};
