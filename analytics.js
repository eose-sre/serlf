/**
 * SERLF Analytics Tracker v1.0
 * Lightweight, privacy-respecting analytics for the SERLF fleet.
 * Tracks: page views, scroll depth, time on page, outbound clicks.
 * Stores data in localStorage for dashboard consumption.
 * Sends to GA4 (if configured) + Cloud Run backup ping.
 */
(function() {
  'use strict';

  const MEASUREMENT_ID = window.SERLF_GA4_ID || 'G-XXXXXXXXXX';
  const CLOUD_RUN_ENDPOINT = 'https://m1-gcp-466191622816.northamerica-northeast1.run.app/api/analytics';
  const STORAGE_KEY = 'serlf_analytics';
  const SESSION_KEY = 'serlf_session';
  const MAX_EVENTS = 500;

  // Session ID (random, not PII)
  function getSessionId() {
    let sid = sessionStorage.getItem(SESSION_KEY);
    if (!sid) { sid = 'S' + Math.random().toString(36).substr(2, 9); sessionStorage.setItem(SESSION_KEY, sid); }
    return sid;
  }

  // Detect country from timezone
  function getRegion() {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
      const map = { 'America/Toronto': 'CA-ON', 'America/Montreal': 'CA-QC', 'America/Vancouver': 'CA-BC',
        'America/New_York': 'US-East', 'America/Chicago': 'US-Central', 'America/Los_Angeles': 'US-West',
        'Europe/London': 'UK', 'Europe/Paris': 'EU', 'Asia/Tokyo': 'JP' };
      return map[tz] || tz.split('/')[0] || 'Unknown';
    } catch { return 'Unknown'; }
  }

  // Device type
  function getDevice() {
    const w = window.innerWidth;
    if (w < 768) return 'mobile';
    if (w < 1024) return 'tablet';
    return 'desktop';
  }

  // Get domain from URL
  function getDomain() {
    return location.hostname || 'localhost';
  }

  // Get page name
  function getPage() {
    const path = location.pathname.replace(/\/$/, '') || '/';
    const name = path.split('/').pop().replace('.html', '') || 'index';
    return name;
  }

  // Store event locally
  function storeEvent(evt) {
    let data;
    try { data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{"events":[],"counters":{}}'); } catch { data = { events: [], counters: {} }; }

    data.events.push(evt);
    if (data.events.length > MAX_EVENTS) data.events = data.events.slice(-MAX_EVENTS);

    // Update counters
    const today = new Date().toISOString().split('T')[0];
    if (!data.counters[today]) data.counters[today] = { views: 0, domains: {}, pages: {}, devices: {}, regions: {}, referrers: {}, hours: {} };
    const c = data.counters[today];
    c.views++;
    c.domains[evt.domain] = (c.domains[evt.domain] || 0) + 1;
    c.pages[evt.page] = (c.pages[evt.page] || 0) + 1;
    c.devices[evt.device] = (c.devices[evt.device] || 0) + 1;
    c.regions[evt.region] = (c.regions[evt.region] || 0) + 1;
    if (evt.referrer) { const ref = new URL(evt.referrer).hostname || 'direct'; c.referrers[ref] = (c.referrers[ref] || 0) + 1; }
    else { c.referrers['direct'] = (c.referrers['direct'] || 0) + 1; }
    const hour = new Date().getHours();
    c.hours[hour] = (c.hours[hour] || 0) + 1;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  // Send to Cloud Run (fire-and-forget)
  function pingCloudRun(evt) {
    try {
      fetch(CLOUD_RUN_ENDPOINT, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(evt), mode: 'no-cors', keepalive: true
      }).catch(function() {});
    } catch(e) {}
  }

  // Track page view
  function trackPageView() {
    const evt = {
      type: 'page_view',
      domain: getDomain(),
      page: getPage(),
      url: location.href,
      referrer: document.referrer || '',
      timestamp: Date.now(),
      session: getSessionId(),
      screen: window.innerWidth + 'x' + window.innerHeight,
      device: getDevice(),
      region: getRegion()
    };
    storeEvent(evt);
    pingCloudRun(evt);
  }

  // Track scroll depth
  let maxScroll = 0;
  function trackScroll() {
    const scrolled = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100) || 0;
    if (scrolled > maxScroll) maxScroll = scrolled;
  }

  // Track outbound clicks
  function trackOutbound(e) {
    const a = e.target.closest('a');
    if (a && a.hostname && a.hostname !== location.hostname) {
      storeEvent({ type: 'outbound_click', domain: getDomain(), page: getPage(), target: a.href, timestamp: Date.now(), session: getSessionId() });
    }
  }

  // Track time on page (on unload)
  const pageStart = Date.now();
  function trackUnload() {
    const timeOnPage = Math.round((Date.now() - pageStart) / 1000);
    const evt = { type: 'page_exit', domain: getDomain(), page: getPage(), timeOnPage: timeOnPage, scrollDepth: maxScroll, timestamp: Date.now(), session: getSessionId() };
    storeEvent(evt);
    pingCloudRun(evt);
  }

  // Initialize
  trackPageView();
  window.addEventListener('scroll', trackScroll, { passive: true });
  document.addEventListener('click', trackOutbound);
  window.addEventListener('beforeunload', trackUnload);

  // Expose for dashboard
  window.SERLF_ANALYTICS = {
    getSessionId: getSessionId,
    getData: function() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch { return {}; } },
    getCounters: function(date) {
      const d = date || new Date().toISOString().split('T')[0];
      const data = this.getData();
      return (data.counters && data.counters[d]) || null;
    },
    getEvents: function(limit) {
      const data = this.getData();
      const evts = data.events || [];
      return limit ? evts.slice(-limit) : evts;
    },
    trackCustom: function(name, props) {
      storeEvent(Object.assign({ type: name, domain: getDomain(), page: getPage(), timestamp: Date.now(), session: getSessionId() }, props || {}));
    }
  };
})();
