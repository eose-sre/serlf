// SERLF v5 Stripe Checkout — $1/mo per product
// Configure these in Stripe Dashboard and replace:
const STRIPE_CONFIG = {
  paymentLink: 'https://buy.stripe.com/fZufZbgo3cxr0Li9ZAgjC03',
  billingPortal: 'https://billing.stripe.com/p/login/5kQ7v3c5L5pE5b2cMM',
  successUrl: window.location.origin + '/welcome.html?session_id={CHECKOUT_SESSION_ID}',
  cancelUrl: window.location.origin + '/login.html?cancelled=true'
};

const SERLF_STRIPE = {
  /**
   * Redirect to Stripe Checkout via Payment Link
   */
  checkout() {
    // Append customer email if available
    const user = typeof SERLF_AUTH !== 'undefined' ? SERLF_AUTH.getUser() : null;
    let url = STRIPE_CONFIG.paymentLink;
    if (user && user.email) {
      url += '?prefilled_email=' + encodeURIComponent(user.email);
    }
    window.location.href = url;
  },

  /**
   * Check if returning from successful checkout
   */
  checkSuccess() {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get('session_id');
    if (sessionId) {
      // Store subscription status
      if (typeof SERLF_AUTH !== 'undefined') {
        SERLF_AUTH.setSubscription({ session_id: sessionId });
      } else {
        localStorage.setItem('serlf_subscription', JSON.stringify({
          status: 'active',
          plan: 'serlf-all',
          price: '$1/mo per product',
          activated: Date.now(),
          session_id: sessionId
        }));
      }
      return true;
    }
    return false;
  },

  /**
   * Check if user cancelled checkout
   */
  checkCancelled() {
    return new URLSearchParams(window.location.search).has('cancelled');
  },

  /**
   * Open Stripe Customer Portal (for managing subscription)
   * This requires a portal link from Stripe Dashboard
   */
  manageBilling() {
    // Replace with your Stripe Customer Portal link
    window.open(STRIPE_CONFIG.billingPortal, '_blank');
  }
};
