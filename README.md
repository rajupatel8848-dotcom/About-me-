# Aditya Patel — Creative Developer Portfolio

A static portfolio (HTML + CSS + vanilla JS, Three.js from a CDN) with a small serverless **contact API**
that emails every message to you. No build step, no npm dependencies.

---

## 1. Run it locally

    node server.js            # http://localhost:3000   (needs Node 18+)
    # or, to test the contact form without sending real email:
    npm run dev               # same, but messages are only logged (MAIL_DRY_RUN=1)

Open `index.html` directly if you only want to look at the front-end (the contact form then falls back to
opening the visitor's email app, because there is no server to talk to).

## 2. Deploy (recommended: Vercel, free)

1. Push this folder to a GitHub repo (the `.gitignore` already keeps secrets out).
2. On vercel.com → **Add New → Project** → import the repo → **Deploy**. (Framework preset: *Other*.)
   Vercel automatically turns `api/contact.js` into the endpoint `/api/contact`.
3. Make the contact form deliver mail — get a free key at **resend.com** (API Keys → Create), then in
   Vercel → *Project → Settings → Environment Variables* add:

| Name | Value |
|---|---|
| `RESEND_API_KEY` | your key (`re_...`) |
| `CONTACT_TO` | the inbox that should receive messages |

   Redeploy once. Test the form on the live site — the message arrives in your inbox with *Reply-To* set to the
   visitor, so you just hit reply.
   *Note:* until you verify your own domain in Resend, its sandbox sender can only deliver to the email you
   signed up with — so use that address for `CONTACT_TO`.
4. Optional variables (see `.env.example`): `CONTACT_FROM`, `SEND_AUTOREPLY=true` (thank-you email to the
   visitor, needs a verified domain), `NOTIFY_WEBHOOK_URL` (Discord/Slack ping), `ALLOWED_ORIGIN`.

Other hosts (Render, Railway, a VPS): run `node server.js` with the same environment variables — it serves
the site and the API together.

## 3. Set your real domain (SEO + link previews)

The share-card image, canonical URL, sitemap and `robots.txt` contain the placeholder `https://YOUR-DOMAIN`.
After you know your URL run:

    npm run set-domain -- https://your-domain.com

## 4. What the contact API does (`api/contact.js`)

Validates name / email / message, ignores bots (hidden honeypot field), limits each visitor to 5 messages per
hour, escapes everything it puts in the email, blocks header-injection, and returns clear errors to the form.
If the server can't be reached the form still works by opening the visitor's email app.

## 5. Folder structure

    portfolio/
    ├── index.html                 all sections (SEO tags, social cards, structured data in <head>)
    ├── css/styles.css             all styles
    ├── js/
    │   ├── loader.js              zip loading screen
    │   ├── perf.js                performance tiers: full (desktop) / lite (phones, tablets) / ultra (auto fallback)
    │   ├── main.js                nav, reveals, hero 3D scene (Three.js), cursor, contact-form submit
    │   ├── journey.js             Journey discs: live curved loop + scroll-driven milestones
    │   ├── clock.js               local-time readout in the hero
    │   ├── work-ring.js           merged Skills + Work: ring of floating panels
    │   ├── section-effects.js     Services conveyor + Company space background
    │   ├── about-marquee.js       About section moving boxes
    │   ├── about-curtain.js       About section theatre curtain (click to drop)
    │   ├── live-video.js          gap-free endless loop for the video section
    │   ├── contact-letter.js      Contact: click the envelope, the letter becomes the contact page
    │   ├── footer-bye.js          footer waving character: start/pause when on/off screen
    │   ├── enhancements.js        floating "Let's collaborate" + back-to-top dock, copy-email, résumé download, toast
    │   └── signature.js           Ctrl/Cmd+K quick menu, magnetic buttons, tab-title greeting, console signature
    ├── api/contact.js             serverless contact endpoint (Vercel) — emails you via Resend
    ├── server.js                  zero-dependency local/self-hosted server (site + API)
    ├── scripts/set-domain.js      replaces https://YOUR-DOMAIN everywhere
    ├── assets/
    │   ├── images/                portrait, project images, logo, waving-character layers
    │   ├── video/live.mp4         looping video section
    │   ├── Aditya-Patel-Resume.pdf   résumé download (see note below)
    │   ├── og-image.jpg           1200×630 social-share card
    │   └── favicon.svg / .ico, icon-192.png, icon-512.png, apple-touch-icon.png
    ├── 404.html, robots.txt, sitemap.xml, site.webmanifest
    ├── vercel.json                security + caching headers
    ├── package.json, .env.example, .gitignore, README.md

Script order in `index.html` matters: `loader.js` first, then Three.js, `main.js`, `journey.js`, `clock.js`,
`work-ring.js`, `section-effects.js`, `about-marquee.js`, `about-curtain.js`, `live-video.js`,
`contact-letter.js`, `footer-bye.js`, `enhancements.js`, `signature.js` (and `perf.js` right after `loader.js`).

## 6. Still to fill in (search `to be added` in `index.html`)

- **GitHub and LinkedIn links** in the Contact list and footer.
- **Real screenshot** for the Tuition Management Dashboard project (currently a concept preview).
- **Résumé:** `assets/Aditya-Patel-Resume.pdf` was generated from the information already on this site — read it
  once, and replace the file with your own résumé if you have one (keep the same file name).
- The "Replies within 1–2 days" line in the Collaborate section — change it if that isn't realistic for you.

## 7. Speed on phones, tablets and laptops

`js/perf.js` picks a tier on load: **full** on desktops, **lite** on phones, tablets and low-end laptops, and it
drops to **ultra** automatically if frames get slow. Lite/ultra show only the panels and discs you can see, skip
heavy shadows and glare layers, cache scroll positions (no layout reads while scrolling), cap pixel ratios and run
idle loops at 30 fps — the Education and Skills & Work sections measured about 2–4× smoother this way.
To compare tiers on any device add `?perf=full`, `?perf=lite` or `?perf=ultra` to the URL.

## 8. Quick menu

Press **Ctrl/Cmd + K** (or **/**) anywhere — or tap the ⌘ button in the floating dock — to jump to any section, copy
the email, download the résumé and more.

## 9. Accessibility and motion

A "Skip to content" link, keyboard access for the envelope, curtain and dock, and `prefers-reduced-motion`
support (the zip, curtain, envelope, video loop and footer character all switch to calm static versions).
