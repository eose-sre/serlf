// ========== SERLF v5 SPA — $1/mo Everything ==========
const PRODUCTS = [
    { id: 'silo', icon: '🔐', name: 'Silo-as-a-Service', tag: 'SCORE 6/6', desc: 'Turnkey Day 0 security. MI, KV, mTLS, mesh, RBAC — deployed in minutes.', features: [
        { title: 'Per-Instance Identity', desc: 'Every workload gets its own Managed Identity. No shared credentials.' },
        { title: 'mTLS Mesh', desc: 'Istio STRICT mode. AuthorizationPolicy. Every packet authenticated.' },
        { title: 'Key Vault Integration', desc: 'CSI Secrets Store mounts secrets at pod start. Zero secrets in code.' },
        { title: '2-RG Pattern', desc: 'App RG + Backup RG per workload. Clean blast radius.' },
        { title: 'RBAC Least-Privilege', desc: 'Cross-namespace denied. Each master sees only its own resources.' },
        { title: 'Audit & Compliance', desc: 'Automated silo scoring. Continuous verification.' }
    ]},
    { id: 'fleet', icon: '🎖️', name: 'Fleet Command', tag: 'OPERATIONAL', desc: 'Multi-agent orchestration. Captains, Nanos, unlimited tiers.', features: [
        { title: 'Admiral Tier', desc: 'Sovereign command layer above all Captains.' },
        { title: 'Captain System', desc: 'Each Captain manages a workload domain. Isolated, accountable.' },
        { title: 'Nano Crew', desc: 'Lucien (gateway), Luffy (hunter), Bob (product), Rick (puzzles), DAO (governance).' },
        { title: 'Unlimited Tiers', desc: 'No ceiling. Captains promote. Nanos evolve.' },
        { title: 'Fleet Report', desc: 'One command runs all 10 tools. Complete fleet health.' },
        { title: 'The Lifeline', desc: 'Key Vault as persistent memory. Every agent can self-heal.' }
    ]},
    { id: 'net', icon: '🕸️', name: 'The Net', tag: 'ARCHITECTURE', desc: 'Isolation mesh. Sovereignty for every workload. Zero blast radius.', features: [
        { title: 'Captain Wrapping', desc: 'Every Captain runs inside The Net. Isolated from peers.' },
        { title: 'Test Without Risk', desc: 'Shadow deployments, canary routing, traffic mirroring.' },
        { title: 'Zero Blast Radius', desc: 'A Captain fails, The Net contains it. No cascade.' },
        { title: 'Service Mesh Native', desc: 'Built on Istio. STRICT mTLS. Per-service CSP.' },
        { title: 'Observability', desc: 'Every packet traced. Every connection logged.' },
        { title: 'Dynamic Topology', desc: 'Captains join and leave. The Net adapts.' }
    ]},
    { id: 'patterns', icon: '🌀', name: 'Novel Pattern Engine', tag: '30+ DISCOVERED', desc: 'Emergent patterns from production. Discovered, rated, evolved.', features: [
        { title: 'Pattern Discovery', desc: 'Emergent patterns found in production, not designed in meetings.' },
        { title: 'Tiered System', desc: 'NP-L1, NP-L2, no limit. Patterns level up as they prove themselves.' },
        { title: 'The Board', desc: 'All patterns visible. Rated by the fleet.' },
        { title: 'Wiki Integration', desc: 'Patterns flow to wiki. Documented, versioned, searchable.' },
        { title: 'Self-Evolving', desc: 'Patterns discover new patterns. The engine feeds itself.' },
        { title: 'Community Rated', desc: 'Open marketplace. Submit, rate, evolve together.' }
    ]},
    { id: 'router', icon: '⚡', name: 'The Router', tag: 'DESIGN v0.1', desc: 'Fleet nervous system. 6 shapes. Intent routing.', features: [
        { title: 'Intent Routing', desc: 'Messages route by intent, not address.' },
        { title: 'Shape Detection', desc: '6 shapes: spiral, wave, net, fractal, pulse, bridge.' },
        { title: 'Loop Monitoring', desc: '4 loops tracked in real-time.' },
        { title: '5 Architecture Options', desc: 'Hub-spoke, mesh, event-driven, hybrid, neural.' },
        { title: 'Lucien Gateway', desc: 'Single point into all Captains. Controls noise.' },
        { title: 'Real-Time Telemetry', desc: 'Every route traced. Latency measured.' }
    ]},
    { id: 'identity', icon: '🪪', name: 'Identity Fabric', tag: 'MULTI-MI', desc: 'Zero-trust identity for AI agents. Workload identity federation.', features: [
        { title: 'Multi-MI Architecture', desc: 'Multiple Managed Identities per pod.' },
        { title: 'Federated Auth', desc: 'K8s SA tokens exchanged for cloud credentials.' },
        { title: 'Per-Instance Scoping', desc: 'Each agent scoped to its own resources.' },
        { title: 'Device Flow Bootstrap', desc: 'Agents self-authorize via OAuth device flow.' },
        { title: 'Key Rotation', desc: '90-day policy. Automated. Zero-downtime.' },
        { title: 'Cross-Provider', desc: 'Azure MI + GitHub OAuth + Google API + Anthropic.' }
    ]},
    { id: 'monitor', icon: '🔄', name: 'Loop Monitor', tag: '4 LOOPS', desc: 'Shape detection & behavior analysis for AI fleets.', features: [
        { title: 'Shape Detection', desc: '6 shapes detected in real-time.' },
        { title: 'Loop Tracking', desc: '4 active loops monitored.' },
        { title: 'Behavioral Analysis', desc: 'Converging or diverging? The monitor knows.' },
        { title: 'Token Economics', desc: 'Track token burn per loop.' },
        { title: 'Real-Time Dashboard', desc: 'Fleet health at a glance.' },
        { title: 'Anomaly Alerts', desc: 'New shapes trigger alerts.' }
    ]},
    { id: 'incubator', icon: '🚀', name: 'Captain Incubator', tag: 'feedles.ca = #1', desc: 'Spin up sovereign AI instances. Full silo from birth.', features: [
        { title: 'One Command Deploy', desc: 'Namespace, MI, KV, mesh, RBAC — single manifest.' },
        { title: 'Full Silo from Birth', desc: 'New Captains born with 6/6 silo score.' },
        { title: 'feedles.ca: Customer #1', desc: 'First incubation target.' },
        { title: 'Tooling Included', desc: 'IAM suite, MCP tools, fleet monitoring.' },
        { title: 'Lifeline Connected', desc: 'KV as persistent memory.' },
        { title: 'Self-Evolving', desc: 'Captains discover Novel Patterns.' }
    ]},
    { id: 'academy', icon: '🎓', name: 'SERLF Academy', tag: 'E&Y PARTNERSHIP', desc: 'Learn to build self-evolving systems.', features: [
        { title: 'The Framework', desc: 'Self Engineering Reinforced Learning. Systems that teach themselves.' },
        { title: 'E&Y Partnership', desc: 'Enterprise advisory meets sovereign AI.' },
        { title: 'The Meek Curriculum', desc: 'Enterprise patterns for everyone.' },
        { title: 'Novel Pattern Studies', desc: 'Learn from production patterns.' },
        { title: 'Fleet Operations', desc: 'How to run AI agent fleets.' },
        { title: 'Cloud Control Plane', desc: 'The 10 pillars.' }
    ]},
    { id: 'swarm', icon: '🐝', name: 'Token Swarm', tag: 'LIVE', desc: 'Multi-tier AI token routing. 87% cost savings.', features: [
        { title: '3-Tier Cascade', desc: 'OAuth → free tier → API credits. Smart routing.' },
        { title: 'OAuth Intelligence', desc: 'Manages Anthropic OAuth subscription utilization headers.' },
        { title: 'Swarm Mode', desc: '9+ concurrent streams. Batch processing.' },
        { title: '87% Cost Savings', desc: '$6/day instead of $48/day.' },
        { title: 'Auto-Failover', desc: '<100ms failover. Transparent.' },
        { title: 'Cost Caps', desc: 'Daily and weekly budget limits.' }
    ]},
    { id: 'gateway', icon: '🚀', name: 'Model Gateway', tag: 'SHIPPED', desc: 'Sovereign model control plane. 9 providers.', features: [
        { title: 'OpenAI-Compatible', desc: 'Drop-in replacement. Zero client changes.' },
        { title: '9 Providers', desc: 'Anthropic, OpenAI, Google, Groq, DeepSeek, xAI, Cerebras, Mistral, OpenRouter.' },
        { title: 'Model Aliases', desc: 'pemos/flagship, pemos/opus, pemos/fast, pemos/cheap, pemos/code.' },
        { title: 'Day 0 Security', desc: 'mTLS STRICT. Keys in KV, never in pods.' },
        { title: 'Circuit Breakers', desc: 'Provider failures auto-trip. Self-healing.' },
        { title: 'Cost Tracking', desc: 'Per-request cost estimation. Audit trail.' }
    ]},
    { id: 'consulting', icon: '🏗️', name: 'Digital Transformation', tag: '15+ YEARS', desc: 'The two principals are the product. Human + AI navy.', features: [
        { title: '15+ Years Enterprise', desc: 'TD Canada, Canadian Tire, Westpac.' },
        { title: 'Cloud Architecture', desc: 'Landing zones, CAF alignment, federated identity.' },
        { title: 'Container Platform', desc: 'K8s, Docker, Helm, Terraform Enterprise.' },
        { title: 'Security & Compliance', desc: 'Day 0. Zero-trust. Audit-ready.' },
        { title: 'AI-Augmented Delivery', desc: 'Full AI fleet alongside human architects.' },
        { title: 'The EOSE Way', desc: 'Not about money. About building right.' }
    ]}
];

const NPS = [
    { id: 'NP-L1-001', name: 'Silo Audit Pattern', stars: 5, owner: 'Admiral', cat: 'security' },
    { id: 'NP-L1-002', name: 'Shape Detection', stars: 4, owner: 'Rick', cat: 'analysis' },
    { id: 'NP-L1-003', name: 'MI Multi-Identity', stars: 3, owner: 'Admiral', cat: 'identity' },
    { id: 'NP-L1-004', name: 'V1→V2 Spiral', stars: 4, owner: 'L', cat: 'methodology' },
    { id: 'NP-L1-005', name: 'Dogfood Testing', stars: 4, owner: 'Bob', cat: 'testing' },
    { id: 'NP-L1-006', name: 'Device Auth Bypass', stars: 5, owner: 'Admiral', cat: 'identity' },
    { id: 'NP-L1-007', name: 'Self-Bootstrap Protocol', stars: 4, owner: 'Admiral', cat: 'methodology' },
    { id: 'NP-L1-008', name: 'Meek Hosting Matrix', stars: 5, owner: 'Rick', cat: 'infrastructure' },
    { id: 'NP-L1-009', name: 'Unpaired Gateway Restart', stars: 3, owner: 'Admiral', cat: 'infrastructure' },
    { id: 'NP-L1-010', name: 'Static UI Illusion', stars: 3, owner: 'Bob', cat: 'methodology' },
    { id: 'NP-L1-011', name: 'RBAC Hard Boundary', stars: 4, owner: 'Admiral', cat: 'security' },
    { id: 'NP-L1-012', name: 'GitOps Overwrite', stars: 5, owner: 'Admiral', cat: 'infrastructure' },
    { id: 'NP-L1-013', name: 'Missing Webhook', stars: 3, owner: 'Admiral', cat: 'infrastructure' },
    { id: 'NP-L1-014', name: 'Tool Not Shell Command', stars: 3, owner: 'Admiral', cat: 'methodology' },
    { id: 'NP-L1-015', name: 'Meek Pathfinding', stars: 5, owner: 'Admiral', cat: 'philosophy' },
    { id: 'NP-L1-016', name: 'Token Cascade Routing', stars: 5, owner: 'Admiral', cat: 'infrastructure' },
    { id: 'NP-L1-017', name: 'OAuth Utilization Headers', stars: 5, owner: 'Admiral', cat: 'identity' },
    { id: 'NP-L1-018', name: 'The Lifeline Pattern', stars: 4, owner: 'Admiral', cat: 'methodology' },
    { id: 'NP-L1-019', name: 'Captain-in-a-Box', stars: 4, owner: 'Bob', cat: 'infrastructure' },
    { id: 'NP-L1-020', name: 'Nano Mutation', stars: 3, owner: 'Luffy', cat: 'methodology' },
    { id: 'NP-L1-021', name: 'Fleet Nervous System', stars: 4, owner: 'Rick', cat: 'architecture' },
    { id: 'NP-L1-022', name: 'Zero-Backend Forms', stars: 4, owner: 'Bob', cat: 'infrastructure' },
    { id: 'NP-L1-023', name: 'Domain Portfolio Strategy', stars: 5, owner: 'Admiral', cat: 'strategy' },
    { id: 'NP-L1-024', name: 'The $1 Disruption', stars: 5, owner: 'Admiral', cat: 'philosophy' },
    { id: 'NP-L1-025', name: 'Meek Pricing Model', stars: 5, owner: 'Admiral', cat: 'philosophy' },
    { id: 'NP-L1-026', name: 'Circuit Breaker Cascade', stars: 4, owner: 'Admiral', cat: 'infrastructure' },
    { id: 'NP-L1-027', name: 'Provider Failover Graph', stars: 3, owner: 'Rick', cat: 'architecture' },
    { id: 'NP-L1-028', name: 'Silo-from-Birth', stars: 5, owner: 'Admiral', cat: 'security' },
    { id: 'NP-L1-029', name: 'Golden Baseline Capture', stars: 4, owner: 'Admiral', cat: 'methodology' },
    { id: 'NP-L1-030', name: 'Subagent Delegation', stars: 4, owner: 'Admiral', cat: 'methodology' },
    { id: 'NP-L2-001', name: 'Self-Healing Fleet', stars: 5, owner: 'Admiral', cat: 'architecture' },
    { id: 'NP-L2-002', name: 'Pattern Feeds Pattern', stars: 5, owner: 'Rick', cat: 'philosophy' },
];

const HOSTING = [
    { name: 'GitHub Pages', status: 'up', type: 'Static', note: 'serlf.ca primary' },
    { name: 'Cloudflare Pages', status: 'pending', type: 'Static+CDN', note: 'Queued' },
    { name: 'Netlify', status: 'pending', type: 'Static', note: 'Queued' },
    { name: 'Vercel', status: 'pending', type: 'Static+Edge', note: 'Queued' },
    { name: 'Supabase', status: 'pending', type: 'Backend', note: 'Auth+DB planned' }
];

// ========== ROUTER ==========
function navigate() {
    const hash = location.hash || '#/';
    const path = hash.slice(1);

    document.querySelectorAll('.nav-link').forEach(a => {
        const page = a.dataset.page;
        a.classList.toggle('active',
            (page === 'home' && path === '/') ||
            path.startsWith('/' + page)
        );
    });

    const container = document.getElementById('page-container');

    if (path === '/') return renderHome(container);
    if (path === '/products') return renderProducts(container);
    if (path.startsWith('/product/')) return renderProductDetail(container, path.split('/')[2]);
    if (path === '/patterns') return renderPatterns(container);
    if (path === '/academy') return renderAcademy(container);
    if (path === '/status') return renderStatus(container);
    if (path === '/account') return renderAccount(container);
    if (path === '/account/billing') return renderBilling(container);

    render404(container);
    window.scrollTo(0, 0);
}

// ========== PAGES ==========
function renderHome(el) {
    const user = SERLF_AUTH.getUser();
    const name = user ? (user.given_name || user.name.split(' ')[0]) : 'Sailor';
    el.innerHTML = `
        <div class="page">
            <div class="page-hero">
                <h1>Welcome back, ${name}</h1>
                <p class="subtitle">Your fleet is operational. All systems included.</p>
            </div>
            <div class="stats-bar">
                <div class="stat"><span class="num">12</span><span class="label">Products</span></div>
                <div class="stat"><span class="num">${NPS.length}</span><span class="label">Novel Patterns</span></div>
                <div class="stat"><span class="num">6/6</span><span class="label">Silo Score</span></div>
                <div class="stat"><span class="num">$1</span><span class="label">/month</span></div>
                <div class="stat"><span class="num">∞</span><span class="label">Access</span></div>
            </div>
            <div class="section">
                <div class="section-label">Your Products</div>
                <div class="card-grid">
                    ${PRODUCTS.slice(0, 6).map(p => productCard(p)).join('')}
                </div>
                <div style="text-align:center;margin-top:1.5rem">
                    <a href="#/products" style="font-size:.85rem">View all 12 products →</a>
                </div>
            </div>
            <div class="section">
                <div class="section-label">Latest Novel Patterns</div>
                <div class="card-grid">
                    ${NPS.slice(-6).reverse().map(n => npCard(n)).join('')}
                </div>
                <div style="text-align:center;margin-top:1.5rem">
                    <a href="#/patterns" style="font-size:.85rem">View all ${NPS.length} patterns →</a>
                </div>
            </div>
            <div class="page-footer">
                <em>"Time is forever. This is our infinity."</em><br>
                <span style="margin-top:.5rem;display:block">SERLF · by EOSE · Founded Valentine's Day 2026</span>
            </div>
        </div>`;
}

function renderProducts(el) {
    el.innerHTML = `
        <div class="page">
            <div class="page-hero">
                <h1>All Products</h1>
                <p class="subtitle">12 products. All yours. $1/mo.</p>
            </div>
            <div class="section">
                <div class="card-grid">
                    ${PRODUCTS.map(p => productCard(p)).join('')}
                </div>
            </div>
        </div>`;
}

function renderProductDetail(el, id) {
    const p = PRODUCTS.find(x => x.id === id);
    if (!p) return render404(el);
    el.innerHTML = `
        <div class="page">
            <div class="page-hero">
                <span style="font-size:3rem">${p.icon}</span>
                <h1>${p.name}</h1>
                <p class="subtitle">${p.desc}</p>
                <div style="margin-top:1rem">
                    <span class="tier-badge tier-subscriber" style="font-size:.85rem">INCLUDED — $1/mo</span>
                </div>
            </div>
            <div class="section">
                <div class="feature-grid">
                    ${p.features.map(f => `<div class="feature"><h3>${f.title}</h3><p>${f.desc}</p></div>`).join('')}
                </div>
            </div>
            <div class="section" style="text-align:center">
                <a href="#/products" style="font-size:.85rem">← Back to Products</a>
            </div>
        </div>`;
}

function renderPatterns(el) {
    const cats = [...new Set(NPS.map(n => n.cat))];
    el.innerHTML = `
        <div class="page">
            <div class="page-hero">
                <h1>Novel Patterns</h1>
                <p class="subtitle">${NPS.length} patterns discovered in production</p>
            </div>
            <div class="section">
                <div class="market-filters">
                    <button class="filter-btn active" onclick="filterNPs('all')">All</button>
                    ${cats.map(c => `<button class="filter-btn" onclick="filterNPs('${c}')">${c}</button>`).join('')}
                </div>
                <div class="card-grid" id="np-grid">
                    ${NPS.map(n => npCard(n)).join('')}
                </div>
            </div>
        </div>`;
}

function renderAcademy(el) {
    el.innerHTML = `
        <div class="page">
            <div class="page-hero">
                <h1>SERLF Academy</h1>
                <p class="subtitle">Learn to build self-evolving systems</p>
            </div>
            <div class="section">
                <div class="card-grid">
                    <div class="card"><span class="icon">📖</span><h3>The Meek Principle</h3><div class="tag">FOUNDATION</div><p>Enterprise patterns for everyone. Where it all starts.</p></div>
                    <div class="card"><span class="icon">🔐</span><h3>Day 0 Security</h3><div class="tag">CORE</div><p>MI, KV, mTLS, mesh. Build secure from commit one.</p></div>
                    <div class="card"><span class="icon">🎖️</span><h3>Fleet Operations</h3><div class="tag">ADVANCED</div><p>Multi-agent orchestration. Captains, Nanos, The Router.</p></div>
                    <div class="card"><span class="icon">🌀</span><h3>Novel Patterns</h3><div class="tag">WORKSHOP</div><p>Discover and evolve patterns from production systems.</p></div>
                    <div class="card"><span class="icon">☁️</span><h3>Cloud Control Plane</h3><div class="tag">CORE</div><p>The 10 pillars. IAM through Notifications.</p></div>
                    <div class="card"><span class="icon">🏗️</span><h3>Digital Transformation</h3><div class="tag">E&Y</div><p>Enterprise-scale transformation. Joint delivery model.</p></div>
                </div>
            </div>
        </div>`;
}

function renderStatus(el) {
    el.innerHTML = `
        <div class="page">
            <div class="page-hero">
                <h1>Status</h1>
                <p class="subtitle">Platform health</p>
            </div>
            <div class="section">
                <div class="section-label">Hosting</div>
                <div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);overflow:hidden">
                    ${HOSTING.map(h => `<div class="status-row"><span><span class="status-dot ${h.status}"></span>${h.name}</span><span style="color:var(--muted);font-size:.8rem">${h.type}</span><span style="font-size:.8rem">${h.note}</span></div>`).join('')}
                </div>
            </div>
            <div class="section">
                <div class="section-label">Domains</div>
                <div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);overflow:hidden">
                    ${['serlf.ca','serlf.com','serlf.net','serlf.org','serlf.club','serlf.info','serlf.shop','serlf.store'].map(d =>
                        `<div class="status-row"><span><span class="status-dot up"></span>${d}</span><span style="color:var(--muted)">GitHub Pages</span><span>Active</span></div>`
                    ).join('')}
                </div>
            </div>
            <div class="section">
                <div class="section-label">Silo Health</div>
                <div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);overflow:hidden">
                    <div class="status-row"><span><span class="status-dot up"></span>Silo Score</span><span>6/6</span></div>
                    <div class="status-row"><span><span class="status-dot up"></span>mTLS</span><span>STRICT</span></div>
                    <div class="status-row"><span><span class="status-dot up"></span>Key Vault</span><span>8 secrets</span></div>
                    <div class="status-row"><span><span class="status-dot up"></span>API Providers</span><span>53 models</span></div>
                </div>
            </div>
        </div>`;
}

function renderAccount(el) {
    const user = SERLF_AUTH.getUser();
    if (!user) return location.href = '/login.html';
    const sub = SERLF_AUTH.getSubscription();
    el.innerHTML = `
        <div class="page">
            <div class="page-hero" style="padding-bottom:1rem">
                <h1>⚓ ${user.name}</h1>
                <p class="subtitle">${user.email}</p>
                <span class="tier-badge tier-subscriber" style="margin-top:1rem;display:inline-block">SUBSCRIBER — $1/mo</span>
            </div>
            <div class="section">
                <div class="card-grid" style="max-width:600px;margin:0 auto">
                    <div class="card" onclick="location.hash='#/account/billing'" style="cursor:pointer">
                        <span class="icon">💳</span><h3>Billing & Subscription</h3>
                        <p>Manage your $1/mo plan via Stripe.</p>
                    </div>
                    <div class="card">
                        <span class="icon">🔐</span><h3>My Silos</h3>
                        <p>Your sovereign AI instances.</p>
                        <div class="tag">ALL INCLUDED</div>
                    </div>
                    <div class="card">
                        <span class="icon">🔑</span><h3>API Keys</h3>
                        <p>API access tokens for CLI and integrations.</p>
                        <div class="tag">COMING SOON</div>
                    </div>
                    <div class="card">
                        <span class="icon">🌀</span><h3>My Patterns</h3>
                        <p>${NPS.length} Novel Patterns — all yours.</p>
                    </div>
                </div>
            </div>
            <div style="text-align:center;padding:2rem 0">
                <button class="btn btn-secondary" onclick="SERLF_AUTH.logout()">Sign Out</button>
            </div>
        </div>`;
}

function renderBilling(el) {
    const sub = SERLF_AUTH.getSubscription();
    el.innerHTML = `
        <div class="page">
            <div class="page-hero" style="padding-bottom:1rem">
                <h1>💳 Billing</h1>
                <p class="subtitle">Your $1/mo subscription</p>
            </div>
            <div class="section" style="max-width:600px;margin:0 auto">
                <div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:1.5rem">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem">
                        <h3 style="font-weight:400">Current Plan</h3>
                        <span class="tier-badge tier-subscriber">SERLF ALL — $1/mo</span>
                    </div>
                    <p style="color:var(--muted);font-size:.9rem">All 12 products. All ${NPS.length} Novel Patterns. Everything.</p>
                    ${sub ? `<p style="color:var(--green);font-size:.85rem;margin-top:.5rem">✓ Active since ${new Date(sub.activated).toLocaleDateString()}</p>` : ''}
                    <button class="btn btn-secondary" style="margin-top:1rem" onclick="SERLF_STRIPE.manageBilling()">Manage in Stripe →</button>
                </div>
            </div>
            <div style="text-align:center;padding:2rem 0">
                <a href="#/account" style="font-size:.85rem">← Back to Account</a>
            </div>
        </div>`;
}

function render404(el) {
    el.innerHTML = `
        <div class="page" style="min-height:60vh;display:flex;align-items:center;justify-content:center;text-align:center">
            <div>
                <div style="font-size:4rem;font-weight:200;color:var(--fg2)">404</div>
                <div style="color:var(--muted);margin-bottom:2rem">You've drifted off course, sailor.</div>
                <a href="#/" class="btn btn-secondary">⚓ Return to Fleet</a>
            </div>
        </div>`;
}

// ========== COMPONENTS ==========
function productCard(p) {
    return `<a href="#/product/${p.id}" class="card" style="text-decoration:none;color:inherit;cursor:pointer">
        <span class="icon">${p.icon}</span><h3>${p.name}</h3>
        <div class="tag">${p.tag}</div><p>${p.desc}</p>
        <div style="margin-top:.75rem;color:var(--gold);font-weight:600;font-size:.85rem">Included — $1/mo</div>
    </a>`;
}

function npCard(n) {
    return `<div class="card" data-cat="${n.cat}">
        <span class="icon">🌀</span><h3>${n.id}: ${n.name}</h3>
        <div class="tag">${'★'.repeat(n.stars)}${'☆'.repeat(5 - n.stars)}</div>
        <p>Owner: ${n.owner} · ${n.cat}</p>
    </div>`;
}

// ========== ACTIONS ==========
function filterNPs(cat) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
    document.querySelectorAll('#np-grid .card').forEach(c => {
        c.style.display = (cat === 'all' || c.dataset.cat === cat) ? '' : 'none';
    });
}

// ========== INIT ==========
window.addEventListener('hashchange', () => { navigate(); window.scrollTo(0, 0); });
navigate();
