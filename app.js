// ========== serlf v6 SPA — The Friendly Mall · $1/mo Per Store ==========
const PRODUCTS = [
    { id: 'admiral-pair', icon: '⚓🧭', name: 'The Mall Office', tag: 'THE MAIN ATTRACTION', desc: 'Two AI helpers working together to keep the mall running smoothly. Like having two friendly managers.', features: [
        { title: 'Two Helpers, One Team', desc: 'Captain and m1 work together across two cloud locations. Teamwork makes the dream work.' },
        { title: 'Always In Sync', desc: 'Both helpers share context and coordinate. Like a well-rehearsed duo.' },
        { title: 'Three Locations', desc: 'Cloud + Cloud + Local. If one has a bad day, the others keep going.' }
    ]},
    { id: 'silo', icon: '🔐', name: 'The Security Desk', tag: 'SAFE & SOUND', desc: 'Your stuff stays safe. Locked doors, private rooms, no peeking. Like a really good mall security team.', features: [
        { title: 'Your Own Key', desc: 'Every workspace gets its own identity. No sharing keys with strangers.' },
        { title: 'Locked Doors', desc: 'Everything is encrypted. Like a mall with really good locks.' },
        { title: 'Secret Safe', desc: 'Passwords and secrets are stored in a vault, never on a sticky note.' }
    ]},
    { id: 'fleet', icon: '🎖️', name: 'The Command Center', tag: 'ALL HANDS ON DECK', desc: 'Where all the AI helpers get their assignments. Like the mall\'s operations room, but friendly.', features: [
        { title: 'The Pair', desc: 'Captain + m1 working together at the top. Two heads, one team.' },
        { title: 'Full Crew', desc: 'A whole team of helpers, each with a special job.' },
        { title: 'Health Check', desc: 'One look and you can see how everything\'s doing. Simple dashboard.' }
    ]},
    { id: 'net', icon: '🕸️', name: 'The Safety Net', tag: 'NO DOMINOES', desc: 'If one thing breaks, nothing else does. Each store is its own little world. No dominoes.', features: [
        { title: 'Each Store Isolated', desc: 'Every workspace runs in its own bubble. Problems stay contained.' },
        { title: 'Try Without Risk', desc: 'Test new things safely. If it doesn\'t work, nothing else is affected.' },
        { title: 'No Chain Reactions', desc: 'One store has a bad day? The others don\'t even notice.' }
    ]},
    { id: 'patterns', icon: '🌀', name: 'The Idea Shop', tag: '32+ IDEAS', desc: '32+ clever solutions we discovered. All documented, all shared. Come learn something new.', features: [
        { title: 'Real-World Solutions', desc: 'Every pattern came from actually building things, not from a whiteboard.' },
        { title: 'Browse Them All', desc: 'All patterns are visible. Look around and learn something new.' },
        { title: 'Always Growing', desc: 'New patterns keep showing up. The more we build, the more we learn.' }
    ]},
    { id: 'router', icon: '⚡', name: 'The Mailroom', tag: 'FRIENDLY GUIDE', desc: 'Gets messages to the right place, every time. Like the mall\'s information desk.', features: [
        { title: 'Smart Delivery', desc: 'Messages go where they need to go. Automatically.' },
        { title: 'Keeps Things Flowing', desc: 'Monitors traffic and prevents bottlenecks.' },
        { title: 'Lucien at the Desk', desc: 'Our guide AI, Lucien, knows where everything is.' }
    ]},
    { id: 'identity', icon: '🪪', name: 'The ID Desk', tag: 'SIMPLE & SECURE', desc: 'You are who you say you are. Simple, secure, no hassle. Like getting a library card.', features: [
        { title: 'One ID, Many Doors', desc: 'One identity works across all the stores. No juggling passwords.' },
        { title: 'Private Spaces', desc: 'Each helper only accesses what it needs. Nothing more.' },
        { title: 'Easy Setup', desc: 'Getting started is simple. No complicated forms.' }
    ]},
    { id: 'monitor', icon: '🔄', name: 'The Watch Tower', tag: 'EYES OPEN', desc: 'Keeps an eye on everything so you don\'t have to. If something looks funny, we\'ll let you know.', features: [
        { title: 'Pattern Watch', desc: 'Spots unusual activity automatically.' },
        { title: 'Continuous Monitoring', desc: 'Always watching, never sleeping.' },
        { title: 'Friendly Alerts', desc: 'Get a heads-up when something needs attention. No alarm bells.' }
    ]},
    { id: 'incubator', icon: '🚀', name: 'The Launchpad', tag: 'READY SET GO', desc: 'Ready to build your own thing? Start here. We\'ll give you everything you need on day one.', features: [
        { title: 'One-Click Start', desc: 'Everything set up automatically. Security, identity, monitoring — all ready.' },
        { title: 'Safe from Day One', desc: 'New projects start fully secured. No afterthoughts.' },
        { title: 'All Tools Included', desc: 'Everything you need comes bundled. No shopping around.' }
    ]},
    { id: 'academy', icon: '🎓', name: 'The Classroom', tag: 'LEARN STUFF', desc: 'Learn how all this works. No jargon, just friendly lessons. Like after-school tutoring.', features: [
        { title: 'How It Works', desc: 'Self-improving systems explained simply. No jargon.' },
        { title: 'For Everyone', desc: 'Affordable learning. $1 per store gets you access.' },
        { title: 'Real Examples', desc: 'Learn from 32+ real-world patterns and solutions.' }
    ]},
    { id: 'swarm', icon: '🐝', name: 'The Savings Counter', tag: 'SAVE MONEY', desc: 'AI can be expensive. We figured out how to make it 87% cheaper. You\'re welcome. 😄', features: [
        { title: 'Smart Routing', desc: 'Uses free tiers first, then cheap options, then premium. Automatic.' },
        { title: '87% Cheaper', desc: 'What used to cost $48/day now costs about $6. Real savings.' },
        { title: 'Budget Controls', desc: 'Set daily and weekly spending limits. No surprise bills.' }
    ]},
    { id: 'gateway', icon: '🚀', name: 'The Gateway', tag: 'ONE DOOR', desc: 'One door to 9 different AI providers. No juggling keys, no confusion. Just walk in.', features: [
        { title: 'Drop-In Easy', desc: 'Works with tools you already use. No changes needed.' },
        { title: '9 AI Providers', desc: 'Access Anthropic, OpenAI, Google, and more, all from one place.' },
        { title: 'Simple Names', desc: 'Instead of long model names, use simple ones like "fast" or "smart".' }
    ]}
];

const CREW = [
    { name: 'Admiral Pair', emoji: '⚓🧭', role: 'The Mall Managers', silo: 'Two locations', tier: 'admiral' },
    { name: 'Captain', emoji: '⚓', role: 'The Original Helper', silo: 'Canada', tier: 'master' },
    { name: 'm1', emoji: '🧭', role: 'The Backup Helper', silo: 'Montreal', tier: 'master' },
    { name: 'Ubu', emoji: '🐧', role: 'The Bridge', silo: 'Connects everything', tier: 'silo' },
    { name: 'Lucien', emoji: '🔀', role: 'The Guide', silo: 'Mall-wide', tier: 'nano' },
    { name: 'Luffy', emoji: '🏴‍☠️', role: 'The Fact-Checker', silo: 'Mall-wide', tier: 'nano' },
    { name: 'Bob', emoji: '🎯', role: 'The Planner', silo: 'Mall-wide', tier: 'nano' },
    { name: 'Rick', emoji: '🧩', role: 'The Creative', silo: 'Mall-wide', tier: 'nano' }
];

// ========== ROUTER ==========
function navigate() {
    const hash = location.hash || '#/';
    const container = document.getElementById('page-container');
    if (hash.startsWith('#/store/')) {
        return renderStoreDetail(container, hash.split('/')[2]);
    }
    renderHome(container);
    window.scrollTo(0, 0);
}

// ========== PAGES ==========
function renderHome(el) {
    const user = SERLF_AUTH.getUser();
    const name = user ? (user.given_name || user.name.split(' ')[0]) : 'friend';
    el.innerHTML = `
        <div class="page">
            <div class="page-hero">
                <h1>Welcome back, ${name}!</h1>
                <p class="subtitle">The mall is open. Feel free to look around.</p>
            </div>
            <div class="section">
                <div class="section-label">Mall Directory</div>
                <div class="card-grid">${PRODUCTS.map(p => storeCard(p)).join('')}</div>
            </div>
            <div class="section">
                <div class="section-label">A Few of the Crew</div>
                <div class="card-grid">${CREW.map(c => crewCard(c)).join('')}</div>
                 <div style="text-align:center;margin-top:1.5rem">
                    <a href="crew.html" style="font-size:.85rem">Meet everyone →</a>
                </div>
            </div>
        </div>`;
}

function renderStoreDetail(el, id) {
    const store = PRODUCTS.find(x => x.id === id);
    if (!store) return navigate(); // Go home if store not found
    el.innerHTML = `
        <div class="page">
             <a href="#/" style="font-size:.85rem; color: var(--fg2); text-decoration:none;">← Back to Mall Directory</a>
            <div class="page-hero">
                <span style="font-size:3rem">${store.icon}</span>
                <h1>${store.name}</h1>
                <p class="subtitle">${store.desc}</p>
                <div style="margin-top:1rem">
                    <span class="tier-badge tier-subscriber" style="font-size:.85rem">$1/mo to join</span>
                </div>
            </div>
            <div class="section">
                <div class="feature-grid">
                    ${store.features.map(f => `<div class="feature"><h3>${f.title}</h3><p>${f.desc}</p></div>`).join('')}
                </div>
            </div>
             <div style="text-align:center;padding:2rem 0">
                <a href="/login.html" class="btn btn-gold">Join for $1/mo</a>
            </div>
        </div>`;
}

// ========== COMPONENTS ==========
function storeCard(p) {
    return `<a href="#/store/${p.id}" class="card" style="text-decoration:none;color:inherit;cursor:pointer">
        <span class="icon">${p.icon}</span><h3>${p.name}</h3>
        <div class="tag">${p.tag}</div><p style="font-size:.85rem; color: var(--fg2);">${p.desc}</p>
    </a>`;
}

function crewCard(c) {
    return `<div class="card" style="text-align:center;">
        <span style="font-size:2rem;display:block;margin-bottom:.5rem">${c.emoji}</span>
        <h3>${c.name}</h3>
        <div style="color:var(--warm-gold);font-size:.8rem;font-weight:600">${c.role}</div>
    </div>`;
}

// ========== INIT ==========
window.addEventListener('hashchange', navigate);
// Ensure auth.js is loaded before running
document.addEventListener('DOMContentLoaded', navigate);
