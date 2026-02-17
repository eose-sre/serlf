# SERLF Multi-Domain Wiring Architecture

> **Silo:** m1.aws.eose.ca | **Domains:** 8 | **Date:** 2026-02-17

## Domains

| Domain | TLD Purpose | Content Path |
|---|---|---|
| serlf.ca | Primary (Canadian identity) | /ca/ |
| serlf.com | Global commercial | /com/ |
| serlf.org | Community/nonprofit | /org/ |
| serlf.net | Network/developer | /net/ |
| serlf.info | Knowledge base | /info/ |
| serlf.club | Social/membership | /club/ |
| serlf.shop | Marketplace storefront | /shop/ |
| serlf.store | Digital goods store | /store/ |

---

## 1. DNS Strategy

### Architecture

Each domain gets an **Azure DNS zone**. external-dns on m1.aws auto-manages records by watching Ingress annotations.

### Record Strategy

- **A records** for apex domains (serlf.ca, serlf.com, etc.) → Ingress LB external IP
- **CNAME** for `www.*` and subdomains → apex domain
- No CNAMEs at apex (RFC violation); use A records or Azure alias records

### external-dns Configuration

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: external-dns
  namespace: kube-system
spec:
  template:
    spec:
      containers:
      - name: external-dns
        image: registry.k8s.io/external-dns/external-dns:v0.14.0
        args:
        - --source=ingress
        - --provider=azure
        - --azure-resource-group=serlf-dns-rg
        - --domain-filter=serlf.ca
        - --domain-filter=serlf.com
        - --domain-filter=serlf.org
        - --domain-filter=serlf.net
        - --domain-filter=serlf.info
        - --domain-filter=serlf.club
        - --domain-filter=serlf.shop
        - --domain-filter=serlf.store
        - --policy=upsert-only
        - --txt-owner-id=m1-aws
```

### DNS Zone Delegation

At each registrar, set NS records to point to the Azure DNS zone nameservers:

```
# For each domain, at registrar:
NS → ns1-XX.azure-dns.com.
NS → ns2-XX.azure-dns.net.
NS → ns3-XX.azure-dns.org.
NS → ns4-XX.azure-dns.info.
```

### TTL Recommendations

| Record Type | TTL | Rationale |
|---|---|---|
| A (apex) | 300s | Fast failover |
| CNAME (www) | 3600s | Stable |
| TXT (ownership) | 3600s | Rarely changes |

---

## 2. Certificate Strategy

### Recommendation: Single Certificate with SAN

**Why:** One cert, one renewal, one secret. cert-manager handles it cleanly. Let's Encrypt supports up to 100 SANs. 8 domains is trivial.

Individual certs add 8× renewal traffic, 8× secrets, 8× failure points — no benefit.

### ClusterIssuer

```yaml
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    email: certs@eose.ca
    privateKeySecretRef:
      name: letsencrypt-prod-key
    solvers:
    - dns01:
        azureDNS:
          subscriptionID: <SUB_ID>
          resourceGroupName: serlf-dns-rg
          hostedZoneName: serlf.ca  # solver per zone
          environment: AzurePublicCloud
          managedIdentity:
            clientID: <MI_CLIENT_ID>
```

> Use **dns01** solver (not http01) — required for apex domains and simplifies multi-domain certs.

### Certificate Resource

```yaml
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: serlf-domains-tls
  namespace: serlf
spec:
  secretName: serlf-domains-tls
  issuerRef:
    name: letsencrypt-prod
    kind: ClusterIssuer
  dnsNames:
  - serlf.ca
  - serlf.com
  - serlf.org
  - serlf.net
  - serlf.info
  - serlf.club
  - serlf.shop
  - serlf.store
  - www.serlf.ca
  - www.serlf.com
  - www.serlf.org
  - www.serlf.net
  - www.serlf.info
  - www.serlf.club
  - www.serlf.shop
  - www.serlf.store
```

---

## 3. Ingress / Routing Strategy

### Nginx Ingress with Domain-Based Virtual Hosting

One Ingress per domain (or a single Ingress with multiple rules). Single Ingress is simpler:

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: serlf-domains
  namespace: serlf
  annotations:
    external-dns.alpha.kubernetes.io/hostname: >-
      serlf.ca,serlf.com,serlf.org,serlf.net,
      serlf.info,serlf.club,serlf.shop,serlf.store
    nginx.ingress.kubernetes.io/use-regex: "true"
    nginx.ingress.kubernetes.io/configuration-snippet: |
      # Map domain to content path
      set $domain_path "/com";
      if ($host = "serlf.ca")    { set $domain_path "/ca"; }
      if ($host = "serlf.org")   { set $domain_path "/org"; }
      if ($host = "serlf.net")   { set $domain_path "/net"; }
      if ($host = "serlf.info")  { set $domain_path "/info"; }
      if ($host = "serlf.club")  { set $domain_path "/club"; }
      if ($host = "serlf.shop")  { set $domain_path "/shop"; }
      if ($host = "serlf.store") { set $domain_path "/store"; }
spec:
  ingressClassName: nginx
  tls:
  - hosts:
    - serlf.ca
    - serlf.com
    - serlf.org
    - serlf.net
    - serlf.info
    - serlf.club
    - serlf.shop
    - serlf.store
    secretName: serlf-domains-tls
  rules:
  - host: serlf.ca
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: serlf-portal
            port:
              number: 80
  # ... repeat for each domain, same backend
```

### Portal Application Routing

The **serlf-portal** service is a single app that reads `Host` header and serves domain-specific content:

```
Request → nginx → serlf-portal → reads Host header → serves /ca/, /com/, etc.
```

The portal is the **universal gateway**. Every domain lands on the same app. The app personalizes based on `Host`:
- Theme/branding per TLD
- Content path selection
- Domain-specific marketplace listings

### Cross-Domain SSO

**Approach: Server-side session + domain-aware auth**

Since these are different TLDs (not subdomains), cookies can't be shared. Strategy:

1. **Auth service** issues a JWT on login (any domain)
2. **Token relay** — after login on serlf.ca, redirect to `serlf.com/auth/relay?token=<short-lived-code>` for each domain the user wants SSO on
3. Each domain stores JWT in `localStorage`
4. **Server-side fallback** — API checks JWT signature (same signing key across all domains)

```
User logs in on serlf.ca
  → Gets JWT
  → Portal triggers hidden redirects:
    serlf.com/auth/sso?code=XYZ
    serlf.org/auth/sso?code=XYZ
    ... (each exchanges code for local session)
```

**Simpler alternative:** Don't SSO. Each domain has independent login, but the **same user account** (by email). Auth DB is shared. User logs in separately per domain but has one account.

**Recommendation:** Start with shared-account/separate-login. Add SSO relay later if users demand it.

---

## 4. Stripe Unified Billing

### Architecture

**One Stripe account.** All 8 domains share it. The serlf-portal backend talks to Stripe with a single API key.

### Signup Flow

```
User visits serlf.shop → clicks "Sign Up" → creates account in shared auth DB
  → Stripe Customer created with metadata:
    {
      "signup_domain": "serlf.shop",
      "signup_tld": "shop",
      "user_id": "usr_abc123"
    }
```

### Domain-Tagged Metadata

Every Stripe object carries `source_domain`:

```javascript
const customer = await stripe.customers.create({
  email: user.email,
  metadata: {
    source_domain: req.hostname,     // "serlf.shop"
    user_id: user.id,
    signup_date: new Date().toISOString()
  }
});

const subscription = await stripe.subscriptions.create({
  customer: customer.id,
  items: [{ price: MARKETPLACE_PRICE_ID }],
  metadata: {
    source_domain: req.hostname,
    plan: "marketplace-access"
  }
});
```

### $1/Domain Marketplace Access

```yaml
# Stripe Product Setup
Product: "SERLF Marketplace Access"
Price: $1.00 CAD / month (or one-time per domain)

# Per-domain access model:
# User pays $1 to list on serlf.shop
# User pays $1 to list on serlf.store
# Or: $1 flat = access to ALL domain marketplaces
```

**Recommendation:** $1 flat = access to all 8 domain marketplaces. Simpler, higher conversion. Track which domains they actually use via metadata.

### Analytics

Stripe Dashboard custom reports filter by `source_domain` metadata. Build a simple dashboard:

```
Domain       | Signups | MRR    | Conversion
serlf.com    | 342     | $342   | 4.2%
serlf.shop   | 891     | $891   | 7.1%
...
```

---

## 5. Cascade Strategy (m1.aws → m1.gcp)

### Flow

```
m1.aws.eose.ca (primary)
  ├── Deploy & validate
  ├── Run smoke tests (all 8 domains respond, certs valid, Stripe webhook works)
  ├── Tag release: serlf-v1.x.x
  └── Push to m1.gcp via fleet-sync

m1.gcp.eose.ca (secondary)
  ├── Receive fleet-sync push
  ├── Apply manifests
  ├── Run independent test suite
  ├── Report status back via NP (Node Policy)
  └── If fail → block promotion, alert
```

### Automation

```yaml
# fleet-sync trigger (pseudo)
on:
  tag: serlf-v*
  cluster: m1-aws
  tests: passed
do:
  - sync manifests → m1-gcp
  - wait for m1-gcp health check (5 min timeout)
  - if healthy → mark release "cascade-validated"
  - if unhealthy → rollback m1-gcp, alert owner
```

### NP (Node Policy) Upstream Flow

```
m1.gcp discovers issue (e.g., GCP-specific DNS propagation delay)
  → Creates NP: "dns-propagation-buffer: 120s"
  → fleet-sync pushes NP upstream to m1.aws
  → m1.aws incorporates NP into next release
```

### Timeline

| Phase | Duration | What |
|---|---|---|
| 1. DNS zones + delegation | Day 1 | Create 8 Azure DNS zones, update registrars |
| 2. cert-manager + certs | Day 1-2 | ClusterIssuer + SAN cert, verify issuance |
| 3. Ingress + portal | Day 2-3 | Deploy nginx ingress rules, test all 8 domains |
| 4. Stripe integration | Day 3-4 | Wire up Stripe, test signup flow |
| 5. Smoke test suite | Day 4-5 | Automated tests for all domains |
| 6. Cascade to m1.gcp | Day 5-7 | fleet-sync setup, validate on GCP |
| **Total** | **~1 week** | Full multi-domain deployment |

---

## Quick Reference: Key Resources

| Resource | Name | Namespace |
|---|---|---|
| ClusterIssuer | `letsencrypt-prod` | cluster-scoped |
| Certificate | `serlf-domains-tls` | serlf |
| TLS Secret | `serlf-domains-tls` | serlf |
| Ingress | `serlf-domains` | serlf |
| Service | `serlf-portal` | serlf |
| DNS RG | `serlf-dns-rg` | Azure |
| external-dns | `external-dns` | kube-system |

---

*Architecture designed 2026-02-17. Owner: SERLF Owner Creator.*
