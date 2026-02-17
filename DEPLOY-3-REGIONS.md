# serlf — 3 Region Deployment Guide

## Region Map

| Region | Platform | Domain | CDN Edge | Cost |
|--------|----------|--------|----------|------|
| 🇨🇦 Region 1 | GitHub Pages | **serlf.ca** | Global (Fastly) | $0 |
| 🌍 Region 2 | Cloudflare Pages | **serlf.com** | 300+ cities (CF) | $0 |
| 🇺🇸 Region 3 | Netlify | **serlf.net** | Global (Netlify) | $0 |

**Total hosting cost: $0/mo** (NP-L1-008: Meek Hosting Matrix)

## Status

- ✅ **Region 1 (GitHub Pages)** — LIVE at serlf.ca
- ⬜ **Region 2 (Cloudflare Pages)** — Ready to connect
- ⬜ **Region 3 (Netlify)** — Ready to connect

## Setup: Region 2 — Cloudflare Pages (serlf.com)

1. Go to: https://dash.cloudflare.com → Pages → Create a project
2. Connect GitHub → Select `eose-sre/serlf`
3. Build settings: **None** (static site, no build needed)
4. Deploy
5. Custom domain → Add `serlf.com`
6. DNS: Point serlf.com to Cloudflare Pages (CNAME)

**Or CLI:**
```bash
# With CLOUDFLARE_API_TOKEN set:
wrangler pages project create serlf
wrangler pages deploy . --project-name=serlf
```

## Setup: Region 3 — Netlify (serlf.net)

1. Go to: https://app.netlify.com → Add new site → Import from Git
2. Connect GitHub → Select `eose-sre/serlf`
3. Build settings: Publish directory = `/` (root)
4. Deploy
5. Domain settings → Add `serlf.net`
6. DNS: Point serlf.net to Netlify (CNAME)

**Or CLI:**
```bash
# With NETLIFY_AUTH_TOKEN set:
netlify init
netlify deploy --prod --dir=.
netlify domains:add serlf.net
```

## DNS Records Needed

### serlf.com (Cloudflare Pages)
```
CNAME  serlf.com      serlf.pages.dev
CNAME  www.serlf.com  serlf.pages.dev
```

### serlf.net (Netlify)
```
CNAME  serlf.net      [site-name].netlify.app
CNAME  www.serlf.net  [site-name].netlify.app
```

## Multi-CNAME Issue

GitHub Pages uses a `CNAME` file. Only ONE domain can be set there.
Solution: Keep `serlf.ca` in CNAME file (primary). Other platforms don't need it.

## Auto-Deploy

All 3 platforms support GitHub auto-deploy:
- Push to `main` → All 3 regions update automatically
- Zero manual deployment after initial setup
- Each push = global rollout across 3 CDNs

## Benefits of 3 Regions

1. **Redundancy** — If one CDN goes down, others serve traffic
2. **Geographic optimization** — CF has best coverage in Europe/Asia, Netlify in Americas
3. **Domain strategy** — .ca (Canada), .com (global), .net (tech community)
4. **$0 total** — Free tier on all 3 platforms covers our needs
5. **SEO** — Multiple domains with canonical pointing to primary
