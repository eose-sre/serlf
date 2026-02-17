/**
 * serlf shared Stripe payment flow
 * Simulation layer with Stripe-ready structure.
 */

const STRIPE_LINK = 'https://buy.stripe.com/fZufZbgo3cxr0Li9ZAgjC03';
const TRANSACTION_KEY = 'serlf_transactions';

let _paymentState = {
  active: false,
  product: null,
  amount: 0,
  productId: null,
};

function getTransactions() {
  try { return JSON.parse(localStorage.getItem(TRANSACTION_KEY) || '[]'); }
  catch { return []; }
}

function saveTransaction(tx) {
  const all = getTransactions();
  all.push(tx);
  localStorage.setItem(TRANSACTION_KEY, JSON.stringify(all));
}

/**
 * Show payment modal. In production, redirects to Stripe.
 */
function initPayment(amount, productName, productId) {
  _paymentState = { active: true, product: productName, amount, productId };

  const existing = document.getElementById('serlf-payment-modal');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.id = 'serlf-payment-modal';
  modal.className = 'serlf-modal-overlay';
  modal.innerHTML = `
    <div class="serlf-modal">
      <h2>Complete Your Purchase</h2>
      <div class="serlf-payment-summary">
        <p><strong>${esc(productName)}</strong></p>
        <p class="serlf-price">$${amount}</p>
        <p class="serlf-payment-note">One-time payment. Your specialist is yours forever.</p>
      </div>
      <div class="serlf-payment-methods">
        <button class="serlf-btn serlf-btn-primary" onclick="serlfStripe.processPayment()">
          💳 Pay $${amount} (Demo)
        </button>
        <a href="${STRIPE_LINK}" target="_blank" class="serlf-btn serlf-btn-stripe">
          Pay with Stripe →
        </a>
      </div>
      <button class="serlf-btn serlf-btn-cancel" onclick="serlfStripe.cancelPayment()">Cancel</button>
    </div>
  `;
  document.body.appendChild(modal);
}

/**
 * Simulate successful payment. Adds product to user and triggers onboarding.
 */
function processPayment() {
  if (!_paymentState.active) return;

  const tx = {
    id: 'tx_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 6),
    productId: _paymentState.productId,
    productName: _paymentState.product,
    amount: _paymentState.amount,
    status: 'succeeded',
    timestamp: new Date().toISOString(),
  };

  saveTransaction(tx);

  // Add product to user
  if (window.serlfAuth) {
    try {
      window.serlfAuth.addProduct(_paymentState.productId, _paymentState.product);
    } catch (e) {
      console.warn('Product add error:', e.message);
    }
  }

  // Close modal, show receipt
  closeModal();
  showReceipt(tx);

  // Trigger specialist onboarding
  if (window.serlfEngine) {
    const onboardMsg = window.serlfEngine.onProductPurchased(_paymentState.productId);
    if (onboardMsg) {
      const msgs = document.getElementById('serlf-chat-messages');
      if (msgs) {
        const div = document.createElement('div');
        div.className = 'serlf-msg serlf-msg-assistant';
        div.innerHTML = simpleMarkdown(onboardMsg);
        msgs.appendChild(div);
        msgs.scrollTop = msgs.scrollHeight;
      }
    }
  }

  _paymentState = { active: false, product: null, amount: 0, productId: null };
}

function cancelPayment() {
  closeModal();
  _paymentState = { active: false, product: null, amount: 0, productId: null };
}

function showReceipt(tx) {
  const existing = document.getElementById('serlf-receipt-modal');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.id = 'serlf-receipt-modal';
  modal.className = 'serlf-modal-overlay';
  modal.innerHTML = `
    <div class="serlf-modal serlf-receipt">
      <h2>🎉 Welcome aboard!</h2>
      <div class="serlf-receipt-details">
        <p><strong>${esc(tx.productName)}</strong> is now yours.</p>
        <p>Transaction: ${tx.id}</p>
        <p>Amount: $${tx.amount}</p>
        <p>Date: ${new Date(tx.timestamp).toLocaleString()}</p>
      </div>
      <p class="serlf-receipt-note">Your specialist is being prepped right now. Check the chat!</p>
      <button class="serlf-btn serlf-btn-primary" onclick="serlfStripe.closeReceipt()">Got it!</button>
    </div>
  `;
  document.body.appendChild(modal);
}

function closeModal() {
  document.getElementById('serlf-payment-modal')?.remove();
}

function closeReceipt() {
  document.getElementById('serlf-receipt-modal')?.remove();
}

function simpleMarkdown(text) {
  return esc(text)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br>');
}

function esc(s) {
  const d = document.createElement('div');
  d.textContent = s || '';
  return d.innerHTML;
}

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { initPayment, processPayment, cancelPayment, showReceipt, getTransactions, STRIPE_LINK };
}
if (typeof window !== 'undefined') {
  window.serlfStripe = { initPayment, processPayment, cancelPayment, showReceipt, closeReceipt, getTransactions, STRIPE_LINK };
}
