/**
 * serlf User Specialist AI Chat Engine
 * The CORE of the experience — your personal captain and his crew.
 */

// --- Product catalog (per-domain aware) ---
const PRODUCT_CATALOG = {
  'ai-chat':     { id: 'ai-chat',     name: 'AI Chat',     price: 1, desc: 'Your personal AI companion — friendly, conversational, always there.', icon: '💬' },
  'code-pilot':  { id: 'code-pilot',  name: 'Code Pilot',  price: 1, desc: 'Your coding wingman — technical, efficient, ships fast.', icon: '🚀' },
  'bot-factory': { id: 'bot-factory', name: 'Bot Factory', price: 1, desc: 'Build bots that work for you — creative, builder energy.', icon: '🤖' },
  'mail-engine': { id: 'mail-engine', name: 'Mail Engine', price: 1, desc: 'Email that runs itself — professional, organized, sharp.', icon: '📧' },
  'site-forge':  { id: 'site-forge',  name: 'Site Forge',  price: 1, desc: 'Websites that build themselves — designer eye, dev brain.', icon: '🌐' },
  'data-vault':  { id: 'data-vault',  name: 'Data Vault',  price: 1, desc: 'Your data fortress — secure, organized, always accessible.', icon: '🔒' },
  'media-lab':   { id: 'media-lab',   name: 'Media Lab',   price: 1, desc: 'Create images, video, audio — artistic soul, technical chops.', icon: '🎨' },
  'task-flow':   { id: 'task-flow',   name: 'Task Flow',   price: 1, desc: 'Automate anything — workflow wizard, efficiency obsessed.', icon: '⚡' },
};

// --- Specialist personalities ---
const SPECIALIST_PERSONAS = {
  'ai-chat':     { style: 'friendly',     tone: 'warm and conversational', intro: "Hey there! I'm your AI Chat specialist. Think of me as your always-on friend who actually remembers everything.", quirk: 'uses casual language and emoji' },
  'code-pilot':  { style: 'technical',    tone: 'efficient and direct',    intro: "Ready to ship. I'm Code Pilot — your pair programmer. Let's build something.", quirk: 'speaks in short, precise sentences' },
  'bot-factory': { style: 'creative',     tone: 'energetic builder',       intro: "Oh man, we're gonna build some AMAZING bots together! I'm Bot Factory, and I live for this stuff.", quirk: 'gets excited about possibilities' },
  'mail-engine': { style: 'professional', tone: 'organized and sharp',     intro: "Your inbox is about to get a lot more manageable. I'm Mail Engine — professional, organized, and I never miss a thread.", quirk: 'uses structured language' },
  'site-forge':  { style: 'designer',     tone: 'creative and precise',    intro: "Every pixel matters. I'm Site Forge — half designer, half dev, all craft.", quirk: 'references design principles' },
  'data-vault':  { style: 'guardian',     tone: 'secure and reliable',     intro: "Your data is safe with me. I'm Data Vault — I protect, organize, and serve your information on demand.", quirk: 'speaks with authority about security' },
  'media-lab':   { style: 'artistic',     tone: 'creative and expressive', intro: "Let's make something beautiful. I'm Media Lab — give me a vision and I'll make it real.", quirk: 'uses vivid descriptive language' },
  'task-flow':   { style: 'optimizer',    tone: 'fast and systematic',     intro: "Time is your most valuable resource. I'm Task Flow — I automate the boring stuff so you can focus on what matters.", quirk: 'thinks in workflows and systems' },
};

// --- Engine state ---
let _state = {
  user: null,
  captain: null,
  activeSpecialist: null, // null = talking to captain
  chatHistory: [],
  awakenedSpecialists: {}, // productId → { awake: true, briefed: true, ... }
};

function init(user) {
  if (!user) throw new Error('User required to init specialist engine');
  _state.user = user;
  _state.captain = user.specialist;
  _state.activeSpecialist = null;
  _state.chatHistory = [];
  _state.awakenedSpecialists = {};
  return getGreeting();
}

function getGreeting() {
  const u = _state.user;
  const cap = _state.captain;
  if (!u || !cap) return 'Welcome to serlf!';

  const timeOfDay = new Date().getHours();
  const timeGreet = timeOfDay < 12 ? 'Good morning' : timeOfDay < 18 ? 'Good afternoon' : 'Good evening';

  const productCount = u.products ? u.products.length : 0;
  const productNote = productCount > 0
    ? `You've got ${productCount} specialist${productCount > 1 ? 's' : ''} in your crew. They're all standing by.`
    : `You don't have any specialists yet — but I know the whole crew. Want to meet someone?`;

  return `${timeGreet}, ${u.name}! I'm ${cap.name}, your personal captain here at serlf.\n\n${productNote}\n\nWhat can I help you with today? You can ask me about any product, say "show me [product]", or just chat.`;
}

// --- Command parsing ---
function parseCommand(input) {
  const lower = input.toLowerCase().trim();

  if (lower === 'back to captain' || lower === 'back' || lower === 'captain') {
    return { type: 'back_to_captain' };
  }

  const showMatch = lower.match(/^show\s+me\s+(.+)$/);
  if (showMatch) return { type: 'show_product', query: showMatch[1] };

  const wantMatch = lower.match(/^i\s+want\s+(.+)$/);
  if (wantMatch) return { type: 'want_product', query: wantMatch[1] };

  const talkMatch = lower.match(/^talk\s+to\s+(.+)$/);
  if (talkMatch) return { type: 'talk_to', query: talkMatch[1] };

  const helpMatch = lower === 'help' || lower === '?';
  if (helpMatch) return { type: 'help' };

  const productsMatch = lower === 'products' || lower === 'marketplace' || lower === 'catalog';
  if (productsMatch) return { type: 'list_products' };

  const myStuffMatch = lower === 'my stuff' || lower === 'my products' || lower === 'inventory';
  if (myStuffMatch) return { type: 'my_products' };

  return { type: 'chat', message: input };
}

// --- Product lookup (fuzzy) ---
function findProduct(query) {
  const q = query.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim();
  // Exact id
  if (PRODUCT_CATALOG[q]) return PRODUCT_CATALOG[q];
  // Name match
  for (const p of Object.values(PRODUCT_CATALOG)) {
    if (p.name.toLowerCase() === q) return p;
    if (p.name.toLowerCase().replace(/\s+/g, '-') === q) return p;
    if (p.name.toLowerCase().includes(q) || q.includes(p.name.toLowerCase())) return p;
  }
  // Partial
  for (const p of Object.values(PRODUCT_CATALOG)) {
    const words = q.split(/\s+/);
    if (words.some(w => p.name.toLowerCase().includes(w) || p.id.includes(w))) return p;
  }
  return null;
}

// --- Response generators ---

function showProduct(product) {
  const cap = _state.captain;
  const owned = (_state.user.products || []).find(p => p.productId === product.id);
  const status = owned ? '✅ You own this!' : `💰 $${product.price} — say "I want ${product.name}" to get started`;

  return `${cap.name}: Let me tell you about **${product.icon} ${product.name}**.\n\n${product.desc}\n\n${status}\n\nThe ${product.name} specialist is one of the best on the crew. Want me to wake them up for a chat?`;
}

function listAllProducts() {
  const cap = _state.captain;
  const owned = new Set((_state.user.products || []).map(p => p.productId));
  let lines = [`${cap.name}: Here's the full crew lineup:\n`];
  for (const p of Object.values(PRODUCT_CATALOG)) {
    const tag = owned.has(p.id) ? ' ✅' : ` · $${p.price}`;
    lines.push(`${p.icon} **${p.name}**${tag} — ${p.desc}`);
  }
  lines.push(`\nSay "show me [name]" for details or "I want [name]" to bring one home.`);
  return lines.join('\n');
}

function listMyProducts() {
  const cap = _state.captain;
  const products = _state.user.products || [];
  if (products.length === 0) {
    return `${cap.name}: You haven't picked up any specialists yet. Want me to show you the crew? Just say "products".`;
  }
  let lines = [`${cap.name}: Here's your crew:\n`];
  for (const p of products) {
    const catalog = PRODUCT_CATALOG[p.productId];
    const icon = catalog ? catalog.icon : '📦';
    const name = catalog ? catalog.name : p.specialistName;
    const awake = _state.awakenedSpecialists[p.productId] ? '🟢 Awake' : '😴 Sleeping';
    lines.push(`${icon} **${name}** — ${awake} · Silo: ${p.siloId}`);
  }
  lines.push(`\nSay "talk to [name]" to connect with any of them.`);
  return lines.join('\n');
}

function wantProduct(product) {
  const cap = _state.captain;
  const owned = (_state.user.products || []).find(p => p.productId === product.id);
  if (owned) {
    return `${cap.name}: You already have **${product.name}**! Want me to wake them up? Say "talk to ${product.name}".`;
  }

  // Trigger payment flow (returns instruction, actual payment handled by stripe-flow.js)
  return {
    type: 'payment_required',
    product,
    message: `${cap.name}: Great choice! **${product.icon} ${product.name}** is $${product.price}. Let me set up the payment for you...`,
  };
}

function wakeSpecialist(product) {
  const cap = _state.captain;
  const user = _state.user;
  const persona = SPECIALIST_PERSONAS[product.id];

  // Mark as awakened
  _state.awakenedSpecialists[product.id] = { awake: true, briefedAt: new Date().toISOString() };

  const prefs = (user.specialist.knownPreferences || []).join(', ') || 'getting started';
  const wakeMsg = `${cap.name}: Let me bring **${product.name}** online for you...\n\n*🔄 Preparing them with your preferences...*\n*📋 Briefing on your account: ${user.products.length} products, member since ${new Date(user.createdAt).toLocaleDateString()}*\n*🧠 They know you prefer: ${prefs}*\n\n✅ **${product.name}** is ready!\n\n---\n`;

  return wakeMsg;
}

function firstMeetIntro(product) {
  const persona = SPECIALIST_PERSONAS[product.id];
  const user = _state.user;
  if (!persona) return `Hey ${user.name}, I'm your ${product.name} specialist. Let's get to work!`;

  return `**${product.icon} ${product.name}:**\n${persona.intro}\n\n${user.name}, your captain ${_state.captain.name} briefed me on everything. I know you've been with serlf since ${new Date(user.createdAt).toLocaleDateString()}, and I'm here to make ${product.name} work exactly how you need it.\n\nThis silo is yours. It grows with you, learns from you, and it's connected to the serlf network — but it belongs to *you*.\n\nWhat would you like to start with?`;
}

function switchToSpecialist(product) {
  _state.activeSpecialist = product.id;
  const wake = wakeSpecialist(product);
  const intro = firstMeetIntro(product);
  return wake + intro;
}

function backToCaptain() {
  const prev = _state.activeSpecialist;
  _state.activeSpecialist = null;
  const cap = _state.captain;
  const prevName = prev && PRODUCT_CATALOG[prev] ? PRODUCT_CATALOG[prev].name : 'the specialist';
  return `${cap.name}: Welcome back! ${prevName} will stay on standby if you need them again. What's next?`;
}

function captainChat(message) {
  const cap = _state.captain;
  const lower = message.toLowerCase();

  // Simple contextual responses from the captain
  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
    return `${cap.name}: Hey ${_state.user.name}! 👋 What can I do for you?`;
  }
  if (lower.includes('thank')) {
    return `${cap.name}: Always here for you, ${_state.user.name}. That's what captains do. 🫡`;
  }
  if (lower.includes('who are you')) {
    return `${cap.name}: I'm ${cap.name}, your personal captain at serlf. I know every specialist on the crew, and my job is to make sure you get exactly what you need. I'm ${cap.personality.greeting}, and I ${cap.personality.quirk}. We're gonna do great things together.`;
  }
  if (lower.includes('what can you do') || lower.includes('help me')) {
    return getHelp();
  }

  // Default captain response
  return `${cap.name}: I hear you. "${message}" — let me think about how I can help with that.\n\nIf you're looking for a specific tool, say "products" to see the full lineup, or just tell me what you're trying to accomplish.`;
}

function specialistChat(message) {
  const productId = _state.activeSpecialist;
  const product = PRODUCT_CATALOG[productId];
  const persona = SPECIALIST_PERSONAS[productId];
  if (!product || !persona) return backToCaptain();

  const lower = message.toLowerCase();

  if (lower.includes('hello') || lower.includes('hi')) {
    return `**${product.icon} ${product.name}:** Hey ${_state.user.name}! Ready to work. What do you need?`;
  }
  if (lower.includes('what can you do')) {
    return `**${product.icon} ${product.name}:** ${product.desc}\n\nI'm ${persona.tone} by nature, and I ${persona.quirk}. Your captain ${_state.captain.name} keeps me updated on everything, so I'm always ready.\n\nSay "back to captain" anytime to return to ${_state.captain.name}.`;
  }

  return `**${product.icon} ${product.name}:** Got it — "${message}". Let me work on that for you.\n\n*(${persona.tone} mode active — I ${persona.quirk})*\n\nNeed anything else, or say "back to captain" to return.`;
}

function getHelp() {
  const cap = _state.captain;
  return `${cap.name}: Here's what you can do:\n
• **"products"** — see the full specialist lineup
• **"my stuff"** — see your owned specialists
• **"show me [product]"** — learn about a specific specialist
• **"I want [product]"** — purchase and onboard a specialist
• **"talk to [specialist]"** — switch to a specialist you own
• **"back to captain"** — come back to me
• Or just **chat** — I'm always here to help\n
We are meeks. We are all, always. 🫡`;
}

// --- Main message handler ---
function handleMessage(input) {
  const cmd = parseCommand(input);
  _state.chatHistory.push({ role: 'user', content: input, timestamp: new Date().toISOString() });

  let response;

  switch (cmd.type) {
    case 'back_to_captain':
      response = backToCaptain();
      break;

    case 'show_product': {
      const product = findProduct(cmd.query);
      response = product ? showProduct(product) : `${_state.captain.name}: Hmm, I don't recognize "${cmd.query}". Say "products" to see the full lineup.`;
      break;
    }

    case 'want_product': {
      const product = findProduct(cmd.query);
      if (!product) {
        response = `${_state.captain.name}: I don't see "${cmd.query}" in our catalog. Say "products" to browse.`;
      } else {
        response = wantProduct(product);
      }
      break;
    }

    case 'talk_to': {
      const product = findProduct(cmd.query);
      if (!product) {
        response = `${_state.captain.name}: I don't know a specialist called "${cmd.query}". Say "my stuff" to see your crew.`;
        break;
      }
      const owned = (_state.user.products || []).find(p => p.productId === product.id);
      if (!owned) {
        response = `${_state.captain.name}: You don't have **${product.name}** yet. Say "I want ${product.name}" to bring them onboard!`;
      } else {
        response = switchToSpecialist(product);
      }
      break;
    }

    case 'help':
      response = getHelp();
      break;

    case 'list_products':
      response = listAllProducts();
      break;

    case 'my_products':
      response = listMyProducts();
      break;

    case 'chat':
    default:
      response = _state.activeSpecialist ? specialistChat(cmd.message) : captainChat(cmd.message);
      break;
  }

  const responseText = typeof response === 'object' ? response.message : response;
  _state.chatHistory.push({ role: 'assistant', content: responseText, timestamp: new Date().toISOString() });

  return response;
}

// --- After-payment hook: onboard the specialist ---
function onProductPurchased(productId) {
  const product = PRODUCT_CATALOG[productId];
  if (!product) return null;
  return switchToSpecialist(product);
}

function getState() { return { ..._state }; }
function getCatalog() { return { ...PRODUCT_CATALOG }; }
function getActiveSpecialist() { return _state.activeSpecialist; }
function getChatHistory() { return [..._state.chatHistory]; }

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { init, handleMessage, onProductPurchased, getState, getCatalog, getActiveSpecialist, getChatHistory, PRODUCT_CATALOG, SPECIALIST_PERSONAS };
}
if (typeof window !== 'undefined') {
  window.serlfEngine = { init, handleMessage, onProductPurchased, getState, getCatalog, getActiveSpecialist, getChatHistory, PRODUCT_CATALOG, SPECIALIST_PERSONAS };
}
