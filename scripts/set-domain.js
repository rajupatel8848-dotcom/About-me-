'use strict';
// Usage: npm run set-domain -- https://your-domain.com
// Replaces the https://YOUR-DOMAIN placeholder in index.html, robots.txt and sitemap.xml.
const fs = require('fs'), path = require('path');
const d = (process.argv[2] || '').replace(/\/+$/, '');
if (!/^https?:\/\/[^\s/]+$/.test(d)) { console.error('Usage: npm run set-domain -- https://your-domain.com'); process.exit(1); }
['index.html', 'robots.txt', 'sitemap.xml'].forEach(f => {
  const p = path.join(__dirname, '..', f); if (!fs.existsSync(p)) return;
  const s = fs.readFileSync(p, 'utf8'), n = s.split('https://YOUR-DOMAIN').join(d);
  fs.writeFileSync(p, n); console.log(f + ': ' + (s.split('https://YOUR-DOMAIN').length - 1) + ' replaced');
});
