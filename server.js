'use strict';
/** Local / self-hosted server: serves the site and the /api/contact endpoint. No dependencies.  Run: node server.js */
const http = require('http'), fs = require('fs'), path = require('path');
try { // tiny .env loader (so you don't need dotenv)
  fs.readFileSync(path.join(__dirname, '.env'), 'utf8').split(/\r?\n/).forEach(l => {
    const m = l.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/i);
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  });
} catch (e) { /* no .env file */ }
const contact = require('./api/contact.js');
const PORT = process.env.PORT || 3000, ROOT = __dirname;
const MIME = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.ico': 'image/x-icon', '.mp4': 'video/mp4', '.pdf': 'application/pdf', '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml', '.webmanifest': 'application/manifest+json' };
const HIDDEN = /^(\.|node_modules|api|scripts|server\.js|package(-lock)?\.json|vercel\.json|README\.md)/i;
http.createServer((req, res) => {
  const url = new URL(req.url, 'http://x'); let p = decodeURIComponent(url.pathname);
  res.setHeader('X-Content-Type-Options', 'nosniff'); res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  if (p === '/api/contact') {
    if (req.method !== 'POST') return contact(req, res);
    let size = 0; const chunks = [];
    req.on('data', c => { size += c.length; if (size > 20000) { req.destroy(); } else chunks.push(c); });
    req.on('end', () => { try { req.body = JSON.parse(Buffer.concat(chunks).toString('utf8')); } catch (e) { req.body = null; } contact(req, res); });
    return;
  }
  if (req.method !== 'GET' && req.method !== 'HEAD') { res.statusCode = 405; return res.end('Method not allowed'); }
  if (p.endsWith('/')) p += 'index.html';
  const file = path.normalize(path.join(ROOT, p));
  const rel = path.relative(ROOT, file);
  if (rel.startsWith('..') || path.isAbsolute(rel) || HIDDEN.test(rel.split(path.sep)[0])) { res.statusCode = 404; return fs.createReadStream(path.join(ROOT, '404.html')).on('error', () => res.end('Not found')).pipe(res); }
  fs.stat(file, (err, st) => {
    if (err || !st.isFile()) { res.statusCode = 404; return fs.createReadStream(path.join(ROOT, '404.html')).on('error', () => res.end('Not found')).pipe(res); }
    res.setHeader('Content-Type', MIME[path.extname(file).toLowerCase()] || 'application/octet-stream');
    res.setHeader('Cache-Control', /\.(html)$/.test(file) ? 'no-cache' : 'public, max-age=3600');
    fs.createReadStream(file).pipe(res);
  });
}).listen(PORT, () => console.log(`Portfolio running at http://localhost:${PORT}  (contact API: POST /api/contact${process.env.MAIL_DRY_RUN === '1' ? ', dry-run' : ''})`));
