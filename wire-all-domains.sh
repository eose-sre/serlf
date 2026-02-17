#!/bin/bash
# Wire all 8 serlf domains to GitHub Pages
# Run from a context with DNS write access (e.g., az login as admin)
#
# GitHub Pages IPs: 185.199.{108-111}.153
# CNAME www → eose-sre.github.io

set -e
RG="rg-eose-dns"
GH_PAGES="eose-sre.github.io"
GH_IPS="185.199.108.153 185.199.109.153 185.199.110.153 185.199.111.153"

DOMAINS="serlf.ca serlf.com serlf.net serlf.org serlf.club serlf.info serlf.shop serlf.store"

for domain in $DOMAINS; do
  echo "🌐 Wiring $domain..."
  
  # A records for apex
  for ip in $GH_IPS; do
    az network dns record-set a add-record -g $RG -z $domain -n "@" -a $ip -o none 2>/dev/null || true
  done
  
  # CNAME for www
  az network dns record-set cname set-record -g $RG -z $domain -n "www" -c $GH_PAGES -o none 2>/dev/null || true
  
  echo "✅ $domain → GitHub Pages"
done

echo ""
echo "🎯 All domains wired! Now add them to GitHub Pages:"
echo ""
echo "# Add custom domains to GitHub repo"
for domain in $DOMAINS; do
  echo "gh api repos/eose-sre/serlf/pages -X PUT -f cname=$domain 2>/dev/null || true"
done

echo ""
echo "Note: GitHub Pages only supports ONE custom domain at a time."
echo "For multi-domain, use this pattern:"
echo "  - serlf.ca → GitHub Pages (primary, CNAME file)"
echo "  - serlf.com → Cloudflare Pages (connect repo)"  
echo "  - serlf.net → Netlify (connect repo)"
echo "  - serlf.org → Vercel (connect repo)"
echo "  - serlf.club, .info, .shop, .store → CNAME to serlf.ca (redirect)"
echo ""
echo "Cost: \$0/mo for all 8 domains across 4 CDNs 🏴‍☠️"
