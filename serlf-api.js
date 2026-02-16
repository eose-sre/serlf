// SERLF v5 API — FormSubmit + auth helpers
const SERLF_API = {
  // Use environment variable or generic contact email
  endpoint: process.env.SERLF_CONTACT_ENDPOINT || 'https://formsubmit.co/ajax/hello@serlf.com',

  async submit(product, data) {
    const auth = SERLF_AUTH.getUser() || {};
    const payload = {
      _subject: `serlf ${product} — New Request`,
      _template: 'box',
      product,
      customer_email: auth.email || 'unknown',
      customer_name: auth.name || 'unknown',
      submitted_at: new Date().toISOString(),
      ...data
    };
    try {
      const res = await fetch(this.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      return { ok: json.success !== false, data: json };
    } catch (e) {
      const body = Object.entries(payload).map(([k, v]) => `${k}: ${v}`).join('\n');
      window.location.href = `mailto:hello@serlf.com?subject=${encodeURIComponent(payload._subject)}&body=${encodeURIComponent(body)}`;
      return { ok: true, fallback: true };
    }
  }
};