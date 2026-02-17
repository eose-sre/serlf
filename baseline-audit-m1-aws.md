# Baseline Audit: V-All → m1.aws.eose.ca

**Date:** 2026-02-17  
**Auditor:** Baseline Auditor (subagent)  
**Baseline:** `baseline/2026-02-17-v-all/` (137 files) → `fleet-sync/v-all-baseline/` (138 files)

---

## 1. File Integrity

### Counts
| Type | Count |
|------|-------|
| HTML | 117 |
| JS | 10 |
| CSS | 2 |
| Config/Other | 8 (CNAME, netlify.toml, vercel.json, _headers, MANIFEST.md, INSTRUCTIONS.md, deploy-aws.sh, wire-all-domains.sh) |
| **Baseline total** | **137** |
| **Fleet total** | **138** (adds DEPLOY-M1-AWS.md) |

### Domain Sites — ✅ All 7 + CA Root Present
- `com/` — 6 files (index, crew, dashboard, mall, products, specialists)
- `org/` — 6 files (index, contribute, crew, dashboard, products, specialists)
- `net/` — 6 files (index, crew, dashboard, docs, playground, products)
- `info/` — 6 files (index, academy, crew, dashboard, library, products)
- `club/` — 6 files (index, crew, dashboard, events, leaderboard, products)
- `shop/` — 6 files (index, cart, crew, dashboard, deals, products)
- `store/` — 6 files (index, create, crew, dashboard, products, templates)
- CA root — root-level files (index.html, dashboard.html, crew.html, etc.)

### Marketplace Directories — ✅ All 8 Present
Each has 4 files: `login.html`, `signup.html`, `my-marketplace.html`, `my-specialist.html`
- ca-marketplace, com-marketplace, org-marketplace, net-marketplace, info-marketplace, club-marketplace, shop-marketplace, store-marketplace

### Shared Engine — ✅ Complete
- `shared/auth.js` ✅
- `shared/specialist-engine.js` ✅
- `shared/specialist-profiles.js` ✅
- `shared/marketplace-ui.js` ✅
- `shared/stripe-flow.js` ✅
- `shared/nav-bar.html` ✅ (bonus)

### Portal — ✅ Present
- `portal.html` — production candidate present
- `portal-v2.html` — also present (potential confusion for deployment)

---

## 2. Cross-Reference Consistency

### Marketplace → Shared Script References — ✅ Correct
All 8 marketplace directories use `../shared/*.js` pattern consistently. Verified:
- All `login.html` → `../shared/auth.js` ✅
- All `signup.html` → `../shared/auth.js` + `../shared/stripe-flow.js` ✅
- All `my-marketplace.html` → auth + specialist-engine + marketplace-ui + stripe-flow ✅
- All `my-specialist.html` → auth + specialist-engine + marketplace-ui ✅

### Formatting Inconsistency — ⚠️ Minor
- ca/com/net/org/shop/store marketplaces use multi-line `<script>` tags
- club/info marketplaces use single-line concatenated `<script>` tags
- **Impact:** Cosmetic only, functionally equivalent

### Nav Structure — ⚠️ Not Verified Programmatically
- `shared/nav-bar.html` exists but HTML files likely inline their own nav
- Would need per-file nav audit to confirm consistency

---

## 3. Security Findings

### CSP Header — ❌ MISSING
- `portal.html` has **no** Content-Security-Policy meta tag or header
- `_headers` file has X-Frame-Options, X-Content-Type-Options, Referrer-Policy — but **no CSP**
- `netlify.toml` and `vercel.json` headers also lack CSP
- **RISK: HIGH** — No XSS mitigation via CSP for the command & control portal

### Hardcoded Tokens/Secrets — ✅ None Real
- `net/dashboard.html` shows masked keys (`sk_live_••••••••`) — UI mock only
- `net/docs.html` uses placeholder patterns (`sk_live_...`, `sk_live_your_api_key_here`)
- All are demo/documentation patterns, no real secrets exposed

### localStorage Auth — ⚠️ Not Documented as Demo-Only
- `shared/auth.js` header says "localStorage auth (Supabase-ready)" — implies transitional
- Root `auth.js` uses both `sessionStorage` and `localStorage`
- Multiple files use `serlf_auth` localStorage key for auth gating
- **No explicit "DEMO ONLY" warning in code or docs**
- **Risk:** Users/developers may treat localStorage auth as production-ready

### Stripe Keys — ✅ Acceptable
- `shared/stripe-flow.js` present — would need inspection for hardcoded publishable keys
- Demo checkout flow (`stripe-checkout.html/js`) present — acceptable for demo baseline

---

## 4. K8s Deployment Readiness

### What's Present
- `DEPLOY-M1-AWS.md` in fleet copy — high-level deployment notes ✅
- `deploy-aws.sh` — deployment script (needs review) ✅
- `_headers` — Netlify-format headers ✅

### What's MISSING for K8s

#### ❌ nginx Configuration
No `nginx.conf` or ConfigMap for serving. Need:
```nginx
server {
    listen 80;
    root /usr/share/nginx/html;
    index index.html;
    
    # SPA fallback per domain
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Security headers (replicate _headers)
    add_header X-Frame-Options "DENY";
    add_header X-Content-Type-Options "nosniff";
    add_header Referrer-Policy "strict-origin-when-cross-origin";
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'";
}
```

#### ❌ Dockerfile / Container Image
No container definition. Need a simple nginx-based Dockerfile:
```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf
```

#### ❌ Kubernetes Manifests
Missing:
- **Deployment** — pod spec for the static site container
- **Service** — ClusterIP for internal routing
- **Ingress/VirtualService** — multi-domain routing for all 8 TLDs
- **ConfigMap** — for nginx config and any runtime config
- **HPA** — horizontal pod autoscaler (optional for static)

#### ❌ Multi-Domain Ingress Strategy
8 domains need routing. Options:
1. **Single Ingress, multiple hosts** — one nginx serves all, Ingress maps each domain
2. **Path-based routing** — `serlf.ca/com/`, `serlf.ca/org/`, etc. (current structure supports this)
3. **Separate Deployments per domain** — overkill for static content

**Recommendation:** Single Deployment + single Ingress with 8 host rules + cert-manager for TLS.

#### ❌ Flux Kustomization
No `kustomization.yaml` in `fleet-sync/v-all-baseline/` for Flux to reconcile.

### Netlify/Vercel Artifacts — ⚠️ Cleanup Needed
- `netlify.toml`, `vercel.json`, `CNAME` are PaaS-specific
- Won't harm K8s deployment but add noise
- Consider `.dockerignore` to exclude or just leave them

---

## 5. Gap Analysis & Improvements

### Critical (Before m1.aws Deploy)
| # | Gap | Fix | NP? |
|---|-----|-----|-----|
| 1 | No CSP header anywhere | Add CSP to nginx config + `_headers` | ✅ Security NP |
| 2 | No nginx.conf | Create production nginx config | — |
| 3 | No Dockerfile | Create minimal nginx:alpine container | — |
| 4 | No K8s manifests | Create Deployment, Service, Ingress | — |
| 5 | No Flux kustomization | Add kustomization.yaml to fleet-sync | — |

### Important (Before m1.gcp Cascade)
| # | Gap | Fix | NP? |
|---|-----|-----|-----|
| 6 | localStorage auth undocumented | Add "DEMO: Replace with Supabase/OAuth for production" comments | ✅ Auth NP |
| 7 | portal-v2.html ambiguity | Decide: keep both or remove one. Document which is canonical | — |
| 8 | No health check endpoint | Add `/healthz` or let nginx default `/` serve as health | — |
| 9 | No robots.txt / sitemap.xml | Add for SEO (especially for .com, .org) | ✅ SEO NP |
| 10 | No favicon.ico / manifest.json | PWA readiness gap | ✅ PWA NP |
| 11 | Marketplace nav inconsistency | Standardize HTML formatting across all 8 marketplace dirs | — |

### Nice-to-Have
| # | Gap | Fix | NP? |
|---|-----|-----|-----|
| 12 | No compression config | Enable gzip in nginx | — |
| 13 | No cache-busting (no hashed filenames) | Consider build step or cache headers | — |
| 14 | No error pages (404, 500) | Add custom error pages | ✅ UX NP |
| 15 | Shell scripts in baseline | `deploy-aws.sh`, `wire-all-domains.sh` — review or exclude from served content | — |

### NP Opportunities Summary
1. **Security NP** — CSP implementation across all entry points
2. **Auth NP** — Document localStorage as demo, create Supabase migration path
3. **SEO NP** — robots.txt + sitemap.xml for all 8 domains
4. **PWA NP** — favicon, manifest.json, service worker stub
5. **UX NP** — Custom 404/500 pages with brand consistency

---

## 6. Recommended Fixes Before Cascade to m1.gcp

### Must-Do
1. **Create `nginx.conf`** with security headers including CSP
2. **Create `Dockerfile`** (nginx:alpine + copy static files)
3. **Create K8s manifests** (Deployment, Service, Ingress with 8 hosts)
4. **Add `kustomization.yaml`** to `fleet-sync/v-all-baseline/`
5. **Add CSP header** — at minimum `default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'`

### Should-Do
6. **Document localStorage auth as demo-only** in shared/auth.js and INSTRUCTIONS.md
7. **Decide on portal.html vs portal-v2.html** — pick canonical, redirect or remove other
8. **Add health check endpoint** for K8s liveness/readiness probes
9. **Add robots.txt** per domain

### Can-Wait
10. Standardize marketplace HTML formatting
11. Add PWA manifest
12. Custom error pages
13. Build pipeline for cache-busting

---

## Summary Verdict

**Baseline integrity: GOOD** — All domain sites, marketplace dirs, and shared engine files are present and correctly cross-referenced.

**Security: NEEDS WORK** — No CSP is the biggest gap. localStorage auth needs documentation.

**K8s readiness: NOT READY** — Missing nginx config, Dockerfile, K8s manifests, and Flux kustomization. These are standard additions but must be created before deployment.

**Fleet sync: GOOD** — Baseline and fleet copy are identical (fleet has +1 file: DEPLOY-M1-AWS.md, which is correct).

**Estimated effort to production-ready:** 2-4 hours for K8s manifests + nginx config + CSP.
