// SERLF v5 Auth — Google OAuth + Stripe subscription check
const SERLF_AUTH = {
  ADMIN_EMAILS: ['kewinjoffe@gmail.com', 'kewin.joffe@gmail.com'],
  SESSION_KEY: 'serlf_session',
  SUB_KEY: 'serlf_subscription',

  isAuthenticated() {
    const session = this.getSession();
    if (!session) return false;
    if (session.expires && Date.now() > session.expires) {
      this.logout();
      return false;
    }
    return true;
  },

  getSession() {
    try {
      const s = sessionStorage.getItem(this.SESSION_KEY) || localStorage.getItem(this.SESSION_KEY);
      return s ? JSON.parse(s) : null;
    } catch (e) {
      return null;
    }
  },

  getUser() {
    const s = this.getSession();
    if (!s) return null;
    return { name: s.name, email: s.email, picture: s.picture, given_name: s.given_name };
  },

  isAdmin(email) {
    if (!email) { const u = this.getUser(); if (!u) return false; email = u.email; }
    return this.ADMIN_EMAILS.includes(email.toLowerCase());
  },

  isSubscribed() {
    // Admin always subscribed
    if (this.isAdmin()) return true;
    const sub = this.getSubscription();
    return sub && sub.status === 'active';
  },

  getSubscription() {
    try {
      const s = localStorage.getItem(this.SUB_KEY);
      return s ? JSON.parse(s) : null;
    } catch (e) { return null; }
  },

  setSubscription(data) {
    localStorage.setItem(this.SUB_KEY, JSON.stringify({
      status: 'active',
      plan: 'serlf-all',
      price: '$1/mo',
      activated: Date.now(),
      session_id: data.session_id || null,
      ...data
    }));
  },

  setSession(userData) {
    const session = {
      name: userData.name,
      email: userData.email,
      picture: userData.picture,
      given_name: userData.given_name,
      family_name: userData.family_name,
      created: Date.now(),
      expires: userData.exp ? userData.exp * 1000 : (Date.now() + 24 * 60 * 60 * 1000),
      token: userData.token || null
    };
    sessionStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
    localStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
  },

  logout() {
    sessionStorage.removeItem(this.SESSION_KEY);
    localStorage.removeItem(this.SESSION_KEY);
    window.location.href = '/login.html';
  },

  requireAuth() {
    if (!this.isAuthenticated()) {
      sessionStorage.setItem('serlf_redirect', window.location.href);
      window.location.href = '/login.html';
      return false;
    }
    return true;
  },

  getRedirectUrl() {
    const r = sessionStorage.getItem('serlf_redirect');
    sessionStorage.removeItem('serlf_redirect');
    // If subscribed go to app, otherwise go to stripe checkout
    if (this.isSubscribed()) return r || '/app.html';
    return '/stripe-checkout.html';
  },

  decodeJWT(token) {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;
      const padded = parts[1] + '='.repeat((4 - parts[1].length % 4) % 4);
      return JSON.parse(atob(padded.replace(/-/g, '+').replace(/_/g, '/')));
    } catch (e) { return null; }
  },

  validateGoogleToken(token) {
    const decoded = this.decodeJWT(token);
    if (!decoded || !decoded.email || !decoded.name) return null;
    if (decoded.exp && Date.now() > decoded.exp * 1000) return null;
    if (decoded.iss && !['accounts.google.com', 'https://accounts.google.com'].includes(decoded.iss)) return null;
    return decoded;
  }
};

if (typeof module !== 'undefined' && module.exports) module.exports = SERLF_AUTH;
