/**
 * serlf shared marketplace UI components
 * Renders the dashboard, product grid, specialist status, and account panel.
 */

function renderMarketplace(domain, user) {
  const container = document.createElement('div');
  container.className = 'serlf-marketplace';
  container.innerHTML = `
    <div class="serlf-mp-header">
      <h1>serlf<span class="serlf-domain">.${domain}</span> marketplace</h1>
      <div class="serlf-mp-account">${renderAccountSummary(user)}</div>
    </div>
    <div class="serlf-mp-body">
      <div class="serlf-mp-grid">${renderProductGrid(user)}</div>
      <div class="serlf-mp-sidebar">
        ${renderSpecialistPanel(user)}
        ${renderQuickActions(user)}
      </div>
    </div>
  `;
  return container;
}

function renderAccountSummary(user) {
  if (!user) return `<div class="serlf-account-bar"><span>Not signed in</span><button onclick="serlfUI.showLogin()">Sign In</button></div>`;
  const cap = user.specialist;
  const productCount = user.products ? user.products.length : 0;
  return `
    <div class="serlf-account-bar">
      <span class="serlf-user-name">👤 ${esc(user.name)}</span>
      <span class="serlf-user-captain">🫡 Captain: ${esc(cap.name)}</span>
      <span class="serlf-user-products">${productCount} specialist${productCount !== 1 ? 's' : ''}</span>
      <span class="serlf-user-domain">${esc(user.domain)}</span>
      <button onclick="serlfUI.openChat()">💬 Chat with ${esc(cap.name)}</button>
      <button onclick="serlfAuth.logout(); location.reload();">Logout</button>
    </div>
  `;
}

function renderProductGrid(user) {
  const catalog = window.serlfEngine ? window.serlfEngine.getCatalog() : {};
  const owned = new Set((user && user.products ? user.products : []).map(p => p.productId));
  let html = '';

  for (const p of Object.values(catalog)) {
    const isOwned = owned.has(p.id);
    const statusClass = isOwned ? 'owned' : 'available';
    const statusLabel = isOwned ? '✅ Owned' : `$${p.price}`;
    const actionBtn = isOwned
      ? `<button class="serlf-btn serlf-btn-talk" onclick="serlfUI.talkTo('${p.id}')">Talk to Specialist</button>`
      : `<button class="serlf-btn serlf-btn-buy" onclick="serlfUI.buyProduct('${p.id}')">Get for $${p.price}</button>`;

    html += `
      <div class="serlf-product-card ${statusClass}" data-product="${p.id}">
        <div class="serlf-product-icon">${p.icon}</div>
        <h3>${esc(p.name)}</h3>
        <p>${esc(p.desc)}</p>
        <div class="serlf-product-status">${statusLabel}</div>
        <div class="serlf-product-actions">
          <button class="serlf-btn serlf-btn-show" onclick="serlfUI.showProduct('${p.id}')">Details</button>
          ${actionBtn}
        </div>
      </div>
    `;
  }
  return html;
}

function renderSpecialistPanel(user) {
  if (!user) return '';
  const products = user.products || [];
  const engineState = window.serlfEngine ? window.serlfEngine.getState() : {};
  const awakened = engineState.awakenedSpecialists || {};

  let html = '<div class="serlf-specialist-panel"><h3>Your Crew</h3>';

  if (products.length === 0) {
    html += '<p class="serlf-empty">No specialists yet. Browse the marketplace to get started!</p>';
  } else {
    for (const p of products) {
      const catalog = window.serlfEngine ? window.serlfEngine.getCatalog() : {};
      const info = catalog[p.productId];
      const icon = info ? info.icon : '📦';
      const name = info ? info.name : p.specialistName;
      const isAwake = awakened[p.productId];
      const active = engineState.activeSpecialist === p.productId;
      const statusDot = active ? '🟢 Chatting' : isAwake ? '🟡 Awake' : '😴 Sleeping';

      html += `
        <div class="serlf-specialist-row ${active ? 'active' : ''}" onclick="serlfUI.talkTo('${p.productId}')">
          <span class="serlf-sp-icon">${icon}</span>
          <span class="serlf-sp-name">${esc(name)}</span>
          <span class="serlf-sp-status">${statusDot}</span>
        </div>
      `;
    }
  }

  // Captain always shows
  const cap = user.specialist;
  const capActive = !engineState.activeSpecialist;
  html += `
    <div class="serlf-specialist-row captain ${capActive ? 'active' : ''}" onclick="serlfUI.backToCaptain()">
      <span class="serlf-sp-icon">🫡</span>
      <span class="serlf-sp-name">${esc(cap.name)} (Captain)</span>
      <span class="serlf-sp-status">${capActive ? '🟢 Active' : '🟡 Standby'}</span>
    </div>
  `;

  html += '</div>';
  return html;
}

function renderQuickActions(user) {
  if (!user) return '';
  return `
    <div class="serlf-quick-actions">
      <h3>Quick Actions</h3>
      <button class="serlf-btn" onclick="serlfUI.openChat()">💬 Chat</button>
      <button class="serlf-btn" onclick="serlfUI.showAllProducts()">🛒 Browse Products</button>
      <button class="serlf-btn" onclick="serlfUI.showMyStuff()">📦 My Stuff</button>
    </div>
  `;
}

function renderChatWindow(user) {
  const cap = user.specialist;
  return `
    <div class="serlf-chat-window" id="serlf-chat">
      <div class="serlf-chat-header">
        <span id="serlf-chat-title">💬 Chat with ${esc(cap.name)}</span>
        <button onclick="serlfUI.closeChat()">✕</button>
      </div>
      <div class="serlf-chat-messages" id="serlf-chat-messages"></div>
      <div class="serlf-chat-input">
        <input type="text" id="serlf-chat-input" placeholder="Type a message..." onkeydown="if(event.key==='Enter')serlfUI.sendMessage()">
        <button onclick="serlfUI.sendMessage()">Send</button>
      </div>
    </div>
  `;
}

function renderLoginForm() {
  return `
    <div class="serlf-login-form" id="serlf-login">
      <h2>Welcome to serlf</h2>
      <p>Sign up for $1 and meet your personal captain.</p>
      <input type="text" id="serlf-login-name" placeholder="Your name">
      <input type="email" id="serlf-login-email" placeholder="Email">
      <button onclick="serlfUI.doSignup()">Join serlf — $1</button>
      <p class="serlf-login-alt">Already have an account? <a href="#" onclick="serlfUI.doLogin()">Log in</a></p>
    </div>
  `;
}

// --- UI controller (wires into serlfAuth + serlfEngine) ---
const serlfUI = {
  chatOpen: false,

  mount(containerId, domain) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const user = window.serlfAuth ? window.serlfAuth.getUser() : null;
    if (!user) {
      el.innerHTML = renderLoginForm();
      return;
    }
    if (window.serlfEngine) window.serlfEngine.init(user);
    el.innerHTML = '';
    el.appendChild(renderMarketplace(domain, user));
    el.insertAdjacentHTML('beforeend', renderChatWindow(user));
  },

  openChat() {
    const chat = document.getElementById('serlf-chat');
    if (chat) chat.style.display = 'flex';
    const msgs = document.getElementById('serlf-chat-messages');
    if (msgs && msgs.children.length === 0 && window.serlfEngine) {
      const greeting = window.serlfEngine.getState().chatHistory.length === 0
        ? window.serlfEngine.handleMessage('hello')
        : null;
      if (greeting) appendMessage('assistant', typeof greeting === 'string' ? greeting : greeting.message);
    }
    this.chatOpen = true;
  },

  closeChat() {
    const chat = document.getElementById('serlf-chat');
    if (chat) chat.style.display = 'none';
    this.chatOpen = false;
  },

  sendMessage() {
    const input = document.getElementById('serlf-chat-input');
    if (!input || !input.value.trim()) return;
    const msg = input.value.trim();
    input.value = '';
    appendMessage('user', msg);

    if (window.serlfEngine) {
      const resp = window.serlfEngine.handleMessage(msg);
      if (typeof resp === 'object' && resp.type === 'payment_required') {
        appendMessage('assistant', resp.message);
        if (window.serlfStripe) window.serlfStripe.initPayment(resp.product.price, resp.product.name, resp.product.id);
      } else {
        appendMessage('assistant', typeof resp === 'string' ? resp : resp.message);
      }
    }
    updateChatTitle();
  },

  showProduct(id) { this.openChat(); this.injectCommand(`show me ${id}`); },
  buyProduct(id)  { this.openChat(); this.injectCommand(`I want ${id}`); },
  talkTo(id)      { this.openChat(); this.injectCommand(`talk to ${id}`); },
  backToCaptain() { this.openChat(); this.injectCommand('back to captain'); },
  showAllProducts() { this.openChat(); this.injectCommand('products'); },
  showMyStuff()     { this.openChat(); this.injectCommand('my stuff'); },

  injectCommand(text) {
    appendMessage('user', text);
    if (window.serlfEngine) {
      const resp = window.serlfEngine.handleMessage(text);
      if (typeof resp === 'object' && resp.type === 'payment_required') {
        appendMessage('assistant', resp.message);
        if (window.serlfStripe) window.serlfStripe.initPayment(resp.product.price, resp.product.name, resp.product.id);
      } else {
        appendMessage('assistant', typeof resp === 'string' ? resp : resp.message);
      }
    }
    updateChatTitle();
  },

  showLogin() {
    document.querySelector('.serlf-marketplace')?.remove();
    const container = document.querySelector('[id]');
    if (container) container.innerHTML = renderLoginForm();
  },

  doSignup() {
    const name = document.getElementById('serlf-login-name')?.value;
    const email = document.getElementById('serlf-login-email')?.value;
    if (!name || !email) return alert('Please fill in all fields.');
    const domain = location.hostname.split('.').pop() || 'com';
    try {
      window.serlfAuth.signup(email, name, domain);
      location.reload();
    } catch (e) { alert(e.message); }
  },

  doLogin() {
    const email = document.getElementById('serlf-login-email')?.value;
    if (!email) return alert('Enter your email.');
    try {
      window.serlfAuth.login(email);
      location.reload();
    } catch (e) { alert(e.message); }
  },
};

function appendMessage(role, text) {
  const msgs = document.getElementById('serlf-chat-messages');
  if (!msgs) return;
  const div = document.createElement('div');
  div.className = `serlf-msg serlf-msg-${role}`;
  div.innerHTML = simpleMarkdown(text);
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function updateChatTitle() {
  const title = document.getElementById('serlf-chat-title');
  if (!title || !window.serlfEngine) return;
  const active = window.serlfEngine.getActiveSpecialist();
  const catalog = window.serlfEngine.getCatalog();
  if (active && catalog[active]) {
    title.textContent = `${catalog[active].icon} Chatting with ${catalog[active].name}`;
  } else {
    const user = window.serlfAuth ? window.serlfAuth.getUser() : null;
    title.textContent = user ? `💬 Chat with ${user.specialist.name}` : '💬 Chat';
  }
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
  module.exports = { renderMarketplace, renderChatWindow, renderLoginForm, serlfUI };
}
if (typeof window !== 'undefined') {
  window.serlfUI = serlfUI;
}
