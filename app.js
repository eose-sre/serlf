// ========== serlf SPA Router ==========
const PRODUCTS = [
    { id: 'silo', icon: '🔐', name: 'Silo-as-a-Service', tag: 'SCORE 6/6', tagClass: '', desc: 'Turnkey Day 0 security. MI, KV, mTLS, mesh, RBAC — deployed in minutes.', price: { monthly: 49, yearly: 470 }, tier: 'captain', features: [
        { title: 'Per-Instance Identity', desc: 'Every workload gets its own Managed Identity. No shared credentials. No lateral movement.' },
        { title: 'mTLS Mesh', desc: 'Istio STRICT mode. AuthorizationPolicy. DestinationRule. NetworkPolicy. Every packet authenticated.' },
        { title: 'Key Vault Integration', desc: 'CSI Secrets Store mounts secrets at pod start. Rotation policy enforced. Zero secrets in code.' },
        { title: '2-RG Pattern', desc: 'App RG + Backup RG per workload. No junk drawers. Clean blast radius.' },
        { title: 'RBAC Least-Privilege', desc: 'Cross-namespace denied. Cluster-wide denied. Each master sees only its own resources.' },
        { title: 'Audit & Compliance', desc: 'Automated silo scoring. Continuous verification. The standard enforces itself.' }
    ]},
    { id: 'fleet', icon: '🎖️', name: 'Fleet Command', tag: 'OPERATIONAL', tagClass: '', desc: 'Multi-agent orchestration. Captains, Nanos, unlimited tiers.', price: { monthly: 99, yearly: 950 }, tier: 'admiral', features: [
        { title: 'Admiral Tier', desc: 'Sovereign command layer above all Captains. Nanos: all or nothing, disruption mutation.' },
        { title: 'Captain System', desc: 'Each Captain manages a workload domain. Isolated, specialized, accountable.' },
        { title: 'Nano Crew', desc: 'Lucien (gateway), Luffy (hunter), Bob (product), Rick (puzzles), DAO (governance).' },
        { title: 'Unlimited Tiers', desc: 'No ceiling. Captains promote. Nanos evolve. The hierarchy is self-organizing.' },
        { title: 'Fleet Report', desc: 'One command runs all 10 tools. Identity, access, keys, providers, loops — complete fleet health.' },
        { title: 'The Lifeline', desc: 'Key Vault as persistent memory. Device flow as bootstrap. Every agent can self-heal.' }
    ]},
    { id: 'net', icon: '🕸️', name: 'The Net', tag: 'ARCHITECTURE', tagClass: 'tag-blue', desc: 'Isolation mesh. Sovereignty for every workload. Zero blast radius.', price: { monthly: 79, yearly: 760 }, tier: 'captain', features: [
        { title: 'Captain Wrapping', desc: 'Every Captain runs inside The Net. Isolated from peers, connected to command.' },
        { title: 'Test Without Risk', desc: 'Shadow deployments, canary routing, traffic mirroring — all inside the mesh.' },
        { title: 'Zero Blast Radius', desc: 'A Captain fails, The Net contains it. No cascade. No collateral.' },
        { title: 'Service Mesh Native', desc: 'Built on Istio. STRICT mTLS. Per-service CSP. DestinationRules that enforce the standard.' },
        { title: 'Observability', desc: 'Every packet traced. Every connection logged. The Net sees everything.' },
        { title: 'Dynamic Topology', desc: 'Captains join and leave. The Net adapts. No manual rewiring.' }
    ]},
    { id: 'patterns', icon: '🌀', name: 'Novel Pattern Engine', tag: '8 DISCOVERED', tagClass: 'tag-yellow', desc: 'Emergent patterns from production. Discovered, rated, evolved.', price: { monthly: 0, yearly: 0 }, tier: 'free', features: [
        { title: 'Pattern Discovery', desc: 'Emergent patterns found in production, not designed in meetings.' },
        { title: 'Tiered System', desc: 'NP-L1, NP-L2, no limit. Patterns level up as they prove themselves.' },
        { title: 'The Board', desc: 'All patterns visible. Rated by the fleet. Admiral picks from the board.' },
        { title: 'Wiki Integration', desc: 'Patterns flow to wiki. Documented, versioned, searchable.' },
        { title: 'Self-Evolving', desc: 'Patterns discover new patterns. The engine feeds itself.' },
        { title: 'Community Rated', desc: 'Open marketplace for patterns. Submit, rate, evolve together.' }
    ]},
    { id: 'router', icon: '⚡', name: 'The Router', tag: 'DESIGN v0.1', tagClass: 'tag-blue', desc: 'Fleet nervous system. 6 shapes. Intent routing.', price: { monthly: 99, yearly: 950 }, tier: 'admiral', features: [
        { title: 'Intent Routing', desc: 'Messages route by intent, not address. The Router understands what you mean.' },
        { title: 'Shape Detection', desc: '6 shapes: spiral, wave, net, fractal, pulse, bridge.' },
        { title: 'Loop Monitoring', desc: '4 loops tracked in real-time. Detect recursion, escalation, convergence.' },
        { title: '5 Architecture Options', desc: 'Hub-spoke, mesh, event-driven, hybrid, neural.' },
        { title: 'Lucien Gateway', desc: 'Single point into all Captains. Controls noise. Amplifies signal.' },
        { title: 'Real-Time Telemetry', desc: 'Every route traced. Latency measured. Bottlenecks surfaced.' }
    ]},
    { id: 'identity', icon: '🪪', name: 'Identity Fabric', tag: 'MULTI-MI', tagClass: '', desc: 'Zero-trust identity for AI agents. Workload identity federation.', price: { monthly: 49, yearly: 470 }, tier: 'captain', features: [
        { title: 'Multi-MI Architecture', desc: 'Multiple Managed Identities per pod. Workload identity federation.' },
        { title: 'Federated Auth', desc: 'K8s SA tokens exchanged for cloud credentials. No stored secrets.' },
        { title: 'Per-Instance Scoping', desc: 'Each agent scoped to its own resources. {instance}-{secret} naming.' },
        { title: 'Device Flow Bootstrap', desc: 'Agents self-authorize via OAuth device flow. One human click.' },
        { title: 'Key Rotation', desc: '90-day policy. Automated tracking. Zero-downtime rotation.' },
        { title: 'Cross-Provider', desc: 'Azure MI + GitHub OAuth + Google API + Anthropic. One fabric.' }
    ]},
    { id: 'monitor', icon: '🔄', name: 'Loop Monitor', tag: '4 LOOPS', tagClass: 'tag-yellow', desc: 'Shape detection & behavior analysis for AI fleets.', price: { monthly: 0, yearly: 0 }, tier: 'free', features: [
        { title: 'Shape Detection', desc: '6 shapes: spiral, wave, net, fractal, pulse, bridge.' },
        { title: 'Loop Tracking', desc: '4 active loops monitored. Detect infinite recursion.' },
        { title: 'Behavioral Analysis', desc: 'Converging or diverging? Escalating or stabilizing? The monitor knows.' },
        { title: 'Token Economics', desc: 'Track token burn per loop. Optimize fleet efficiency.' },
        { title: 'Real-Time Dashboard', desc: '7-tab interactive display. Fleet health at a glance.' },
        { title: 'Anomaly Alerts', desc: 'New shapes trigger alerts. Unknown patterns flagged.' }
    ]},
    { id: 'incubator', icon: '🚀', name: 'Captain Incubator', tag: 'feedles.ca = #1', tagClass: 'tag-yellow', desc: 'Spin up sovereign AI instances. Full silo from birth.', price: { monthly: 199, yearly: 1900 }, tier: 'enterprise', features: [
        { title: 'One Command Deploy', desc: 'Namespace, MI, KV, mesh, RBAC — all from a single manifest.' },
        { title: 'Full Silo from Birth', desc: 'New Captains born with 6/6 silo score.' },
        { title: 'feedles.ca: Customer #1', desc: 'First incubation target. From 404 to full Captain.' },
        { title: 'Tooling Included', desc: 'IAM suite, MCP tools, fleet monitoring — full toolkit.' },
        { title: 'Lifeline Connected', desc: 'KV as persistent memory. Webchat as direct line.' },
        { title: 'Self-Evolving', desc: 'Captains discover Novel Patterns. Patterns flow up to Admiral.' }
    ]},
    { id: 'academy', icon: '🎓', name: 'serlf Academy', tag: 'E&Y PARTNERSHIP', tagClass: 'tag-blue', desc: 'Learn to build self-evolving systems.', price: { monthly: 29, yearly: 280 }, tier: 'free', features: [
        { title: 'The Framework', desc: 'Self Engineering Reinforced Learning. Systems that teach themselves.' },
        { title: 'E&Y Partnership', desc: 'Enterprise advisory meets sovereign AI. Joint delivery.' },
        { title: 'The Meek Curriculum', desc: 'Enterprise patterns for everyone. No gatekeeping.' },
        { title: 'Novel Pattern Studies', desc: 'Learn from patterns discovered in production.' },
        { title: 'Fleet Operations', desc: 'How to run AI agent fleets. The full stack.' },
        { title: 'Cloud Control Plane', desc: 'The 10 pillars: IAM, Provisioning, DNS, Secrets, Events, Encryption, Certs, Keys, Backup, Notifications.' }
    ]},
    { id: 'consulting', icon: '🏗️', name: 'Digital Transformation', tag: '15+ YEARS', tagClass: '', desc: 'The two principals are the product. Human + AI navy.', price: { monthly: null, yearly: null, custom: true }, tier: 'enterprise', features: [
        { title: '15+ Years Enterprise', desc: 'TD Canada, Canadian Tire, Westpac. Banking, retail, global scale.' },
        { title: 'Cloud Architecture', desc: 'Landing zones, CAF alignment, federated identity.' },
        { title: 'Container Platform', desc: 'K8s, Docker, Helm, Terraform Enterprise. CI/CD at scale.' },
        { title: 'Security & Compliance', desc: 'Done right, not theater. Day 0. Zero-trust. Audit-ready.' },
        { title: 'AI-Augmented Delivery', desc: 'Your engagement gets a full AI fleet alongside human architects.' },
        { title: 'The EOSE Way', desc: 'Not about money. About building right. The Meek Principle.' }
    ]}
];

const TIERS = [
    { id: 'free', name: 'Free', price: 0, icon: '⚓', desc: 'Open source tools, patterns, community', features: ['Novel Pattern Engine', 'Loop Monitor (basic)', 'serlf CLI', 'Community access', 'Academy (free courses)'] },
    { id: 'captain', name: 'Captain', price: 149, icon: '🧭', desc: 'Your own sovereign AI silo', features: ['Everything in Free', 'Silo-as-a-Service', 'Identity Fabric', 'The Net', 'Captain-in-a-Box (1 instance)', 'Priority support'] },
    { id: 'admiral', name: 'Admiral', price: 399, icon: '🎖️', desc: 'Full fleet command & orchestration', features: ['Everything in Captain', 'Fleet Command', 'The Router', 'Unlimited Captains', 'Nano crew', 'Custom patterns', 'Dedicated support'] },
    { id: 'enterprise', name: 'Enterprise', price: null, icon: '🏗️', desc: 'Digital transformation partnership', features: ['Everything in Admiral', 'Captain Incubator', 'DT consulting (E&Y)', 'Custom SLA', 'Dedicated architect', 'On-prem deployment', 'White-label option'] }
];

const NPS = [
    { id: 'NP-L1-001', name: 'Silo Audit Pattern', stars: 5, owner: 'Admiral', cat: 'security' },
    { id: 'NP-L1-002', name: 'Shape Detection', stars: 4, owner: 'Rick', cat: 'analysis' },
    { id: 'NP-L1-003', name: 'MI Multi-Identity', stars: 3, owner: 'Admiral', cat: 'identity' },
    { id: 'NP-L1-004', name: 'V1→V2 Spiral', stars: 4, owner: 'L', cat: 'methodology' },
    { id: 'NP-L1-005', name: 'Dogfood Testing', stars: 4, owner: 'Bob', cat: 'testing' },
    { id: 'NP-L1-006', name: 'Device Auth Bypass', stars: 5, owner: 'Admiral', cat: 'identity' },
    { id: 'NP-L1-007', name: 'Self-Bootstrap Protocol', stars: 4, owner: 'Admiral', cat: 'methodology' },
    { id: 'NP-L1-008', name: 'Meek Hosting Matrix', stars: 5, owner: 'Rick', cat: 'infrastructure' }
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
    
    document.querySelectorAll('.nav-link, .mobile-nav a').forEach(a => {
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
    if (path === '/marketplace') return renderMarketplace(container);
    if (path === '/academy') return renderAcademy(container);
    if (path === '/status') return renderStatus(container);
    if (path === '/pricing') return renderPricing(container);
    if (path === '/login') return renderLogin(container);
    if (path === '/signup') return renderSignup(container);
    if (path === '/account') return renderAccount(container);
    if (path === '/account/billing') return renderBilling(container);
    
    render404(container);
    window.scrollTo(0, 0);
}

// ========== PAGES ==========
function renderHome(el) {
    el.innerHTML = `
        <div class="page">
            <div class="page-hero">
                <h1>serlf</h1>
                <p class="subtitle">Self Engineering Reinforced Learning Framework</p>
                <p style="color:var(--muted);margin-top:1rem;font-size:0.9rem">Enterprise AI sovereignty for everyone. Off the grid. On the chain.</p>
                <div style="margin-top:2rem;display:flex;gap:1rem;justify-content:center;flex-wrap:wrap">
                    <a href="#/pricing" class="btn-primary">View Pricing</a>
                    <a href="#/products" class="btn-secondary">Explore Products</a>
                </div>
            </div>
            <div class="stats-bar">
                <div class="stat"><span class="num">10</span><span class="label">Products</span></div>
                <div class="stat"><span class="num">8</span><span class="label">Novel Patterns</span></div>
                <div class="stat"><span class="num">10</span><span class="label">Fleet Tools</span></div>
                <div class="stat"><span class="num">6/6</span><span class="label">Silo Score</span></div>
                <div class="stat"><span class="num">$0</span><span class="label">Free Tier</span></div>
                <div class="stat"><span class="num">∞</span><span class="label">Tiers</span></div>
            </div>
            <div class="section">
                <div class="section-label">The Navy</div>
                <div class="section-title">Featured Products</div>
                <div class="card-grid">
                    ${PRODUCTS.slice(0,6).map(p => productCard(p)).join('')}
                </div>
                <div style="text-align:center;margin-top:2rem">
                    <a href="#/products" style="font-size:0.85rem">View all 10 products →</a>
                </div>
            </div>
            <div class="section">
                <div class="section-label">Choose Your Tier</div>
                <div class="section-title">Pricing</div>
                <div class="tier-grid">
                    ${TIERS.map(t => tierCardSmall(t)).join('')}
                </div>
                <div style="text-align:center;margin-top:1.5rem">
                    <a href="#/pricing" style="font-size:0.85rem">Full pricing details →</a>
                </div>
            </div>
            <div class="section">
                <div class="section-label">The Standard</div>
                <div class="section-title">Core Principles</div>
                <div class="principle-grid">
                    <div class="principle"><h4>The Meek Principle</h4><p>"All we have, all ways we can use it." Enterprise patterns for everyone.</p></div>
                    <div class="principle"><h4>No Cowboy Changes</h4><p>Wiki → Kanban → Execute. All or none.</p></div>
                    <div class="principle"><h4>No Test, No Ship</h4><p>Tests are the ceremony. If it can't be proven, it can't be trusted.</p></div>
                    <div class="principle"><h4>Day 0 Security</h4><p>MI, KV, mTLS, least-privilege. Baked in from the first commit.</p></div>
                    <div class="principle"><h4>Self-Evolving</h4><p>Everything built must improve itself. The system learns.</p></div>
                    <div class="principle"><h4>Every Master Meets the Standard</h4><p>No exceptions. No shortcuts. The standard is the floor.</p></div>
                </div>
            </div>
            <div class="page-footer">
                <em>"Time is forever. This is our infinity."</em><br>
                <span style="margin-top:0.5rem;display:block">serlf · by EOSE · Founded Valentine's Day 2026</span>
            </div>
        </div>
    `;
}

function renderProducts(el) {
    el.innerHTML = `
        <div class="page">
            <div class="page-hero">
                <h1>Products</h1>
                <p class="subtitle">10 products. Open source the floor, sell the ceiling.</p>
            </div>
            <div class="section">
                <div class="card-grid">
                    ${PRODUCTS.map(p => productCard(p)).join('')}
                </div>
            </div>
            <div style="text-align:center;padding:2rem 0">
                <a href="#/pricing" class="btn-primary">Compare Plans</a>
            </div>
        </div>
    `;
}

function renderProductDetail(el, id) {
    const p = PRODUCTS.find(x => x.id === id);
    if (!p) return render404(el);
    const priceStr = p.price.custom ? 'Custom' : p.price.monthly === 0 ? 'Free' : `$${p.price.monthly}/mo`;
    el.innerHTML = `
        <div class="page">
            <div class="product-detail-hero">
                <span class="icon">${p.icon}</span>
                <h1 style="font-size:clamp(1.5rem,4vw,2.5rem);font-weight:200;letter-spacing:0.1em;background:linear-gradient(135deg,var(--accent),var(--accent2));-webkit-background-clip:text;-webkit-text-fill-color:transparent">${p.name}</h1>
                <p class="subtitle" style="margin-top:0.5rem">${p.desc}</p>
                <div style="margin-top:1.5rem;display:flex;gap:1rem;align-items:center;justify-content:center;flex-wrap:wrap">
                    <span class="price-badge">${priceStr}</span>
                    <span class="tier-badge tier-${p.tier}">${p.tier.toUpperCase()}</span>
                    ${p.price.monthly > 0 ? `<a href="#/signup" class="btn-primary">Get Started</a>` : `<a href="#/signup" class="btn-secondary">Sign Up Free</a>`}
                </div>
            </div>
            <div class="section">
                <div class="feature-grid">
                    ${p.features.map(f => `
                        <div class="feature">
                            <h3>${f.title}</h3>
                            <p>${f.desc}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="section" style="text-align:center">
                <a href="#/products" style="font-size:0.85rem">← Back to Products</a>
            </div>
        </div>
    `;
}

function renderPricing(el) {
    el.innerHTML = `
        <div class="page">
            <div class="page-hero">
                <h1>Pricing</h1>
                <p class="subtitle">Open source the floor. Sell the ceiling.</p>
                <div class="billing-toggle" style="margin-top:1.5rem">
                    <button class="toggle-btn active" onclick="toggleBilling('monthly', this)">Monthly</button>
                    <button class="toggle-btn" onclick="toggleBilling('yearly', this)">Yearly <span style="color:var(--accent);font-size:0.75rem">Save 20%</span></button>
                </div>
            </div>
            <div class="section">
                <div class="pricing-grid" id="pricing-grid">
                    ${TIERS.map(t => tierCard(t, 'monthly')).join('')}
                </div>
            </div>
            <div class="section">
                <div class="section-label">Product Pricing</div>
                <div class="section-title">Individual Products</div>
                <div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);overflow:hidden">
                    ${PRODUCTS.map(p => `
                        <div class="status-row" style="cursor:pointer" onclick="location.hash='#/product/${p.id}'">
                            <span>${p.icon} ${p.name}</span>
                            <span class="tier-badge tier-${p.tier}" style="font-size:0.7rem">${p.tier}</span>
                            <span style="font-weight:600">${p.price.custom ? 'Custom' : p.price.monthly === 0 ? 'Free' : '$' + p.price.monthly + '/mo'}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="section" style="text-align:center;padding:3rem 0">
                <h3 style="font-weight:300;margin-bottom:1rem">Ready to build?</h3>
                <a href="#/signup" class="btn-primary">Get Started</a>
                <p style="color:var(--muted);font-size:0.8rem;margin-top:1rem">No credit card required for Free tier</p>
            </div>
        </div>
    `;
}

function renderMarketplace(el) {
    const cats = [...new Set(NPS.map(n => n.cat))];
    el.innerHTML = `
        <div class="page">
            <div class="page-hero">
                <h1>Marketplace</h1>
                <p class="subtitle">Novel Patterns, tools, and templates</p>
            </div>
            <div class="section">
                <div class="section-label">Novel Patterns</div>
                <div class="market-filters">
                    <button class="filter-btn active" onclick="filterNPs('all')">All</button>
                    ${cats.map(c => `<button class="filter-btn" onclick="filterNPs('${c}')">${c}</button>`).join('')}
                </div>
                <div class="card-grid" id="np-grid">
                    ${NPS.map(n => npCard(n)).join('')}
                </div>
            </div>
            <div class="section">
                <div class="section-label">Coming Soon</div>
                <div class="section-title">More on the way</div>
                <div class="card-grid">
                    <div class="card"><span class="icon">📦</span><h3>Captain Templates</h3><span class="tag tag-blue">COMING</span><p>Pre-built Captain configurations for common workloads.</p></div>
                    <div class="card"><span class="icon">🔧</span><h3>Fleet Tools</h3><span class="tag tag-blue">COMING</span><p>Downloadable CLI tools for silo audit, fleet reports, identity scanning.</p></div>
                    <div class="card"><span class="icon">📋</span><h3>Helm Charts</h3><span class="tag tag-blue">COMING</span><p>Captain-in-a-Box. One install, full sovereignty.</p></div>
                </div>
            </div>
        </div>
    `;
}

function renderAcademy(el) {
    el.innerHTML = `
        <div class="page">
            <div class="page-hero">
                <h1>Academy</h1>
                <p class="subtitle">Learn to build self-evolving systems</p>
            </div>
            <div class="section">
                <div class="card-grid">
                    <div class="card"><span class="icon">📖</span><h3>The Meek Principle</h3><span class="tag">FOUNDATION</span><p>Enterprise patterns for everyone. Where it all starts.</p></div>
                    <div class="card"><span class="icon">🔐</span><h3>Day 0 Security</h3><span class="tag">CORE</span><p>MI, KV, mTLS, mesh. Build secure from commit one.</p></div>
                    <div class="card"><span class="icon">🎖️</span><h3>Fleet Operations</h3><span class="tag">ADVANCED</span><p>Multi-agent orchestration. Captains, Nanos, The Router.</p></div>
                    <div class="card"><span class="icon">🌀</span><h3>Novel Patterns</h3><span class="tag tag-yellow">WORKSHOP</span><p>Discover and evolve patterns from your own production systems.</p></div>
                    <div class="card"><span class="icon">☁️</span><h3>Cloud Control Plane</h3><span class="tag">CORE</span><p>The 10 pillars. IAM through Notifications. The complete stack.</p></div>
                    <div class="card"><span class="icon">🏗️</span><h3>Digital Transformation</h3><span class="tag tag-blue">E&Y</span><p>Enterprise-scale transformation. Joint delivery model.</p></div>
                </div>
            </div>
            <div class="page-footer">
                <em>"The standard is the floor, not the ceiling."</em>
            </div>
        </div>
    `;
}

function renderStatus(el) {
    el.innerHTML = `
        <div class="page">
            <div class="page-hero">
                <h1>Status</h1>
                <p class="subtitle">Platform health across all hosting</p>
            </div>
            <div class="section">
                <div class="section-label">Hosting Platforms</div>
                <div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);overflow:hidden">
                    ${HOSTING.map(h => `
                        <div class="status-row">
                            <span><span class="status-dot ${h.status}"></span>${h.name}</span>
                            <span style="color:var(--muted);font-size:0.8rem">${h.type}</span>
                            <span style="font-size:0.8rem">${h.note}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="section">
                <div class="section-label">Domains</div>
                <div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);overflow:hidden">
                    <div class="status-row"><span><span class="status-dot up"></span>serlf.ca</span><span style="color:var(--muted)">GitHub Pages</span><span>Primary</span></div>
                    <div class="status-row"><span><span class="status-dot up"></span>serlf.com</span><span style="color:var(--muted)">GitHub Pages</span><span>Active</span></div>
                    <div class="status-row"><span><span class="status-dot up"></span>serlf.net</span><span style="color:var(--muted)">GitHub Pages</span><span>Active</span></div>
                    <div class="status-row"><span><span class="status-dot up"></span>serlf.org</span><span style="color:var(--muted)">GitHub Pages</span><span>Active</span></div>
                    <div class="status-row"><span><span class="status-dot up"></span>serlf.club</span><span style="color:var(--muted)">GitHub Pages</span><span>Active</span></div>
                    <div class="status-row"><span><span class="status-dot up"></span>serlf.info</span><span style="color:var(--muted)">GitHub Pages</span><span>Active</span></div>
                    <div class="status-row"><span><span class="status-dot up"></span>serlf.shop</span><span style="color:var(--muted)">GitHub Pages</span><span>Active</span></div>
                    <div class="status-row"><span><span class="status-dot up"></span>serlf.store</span><span style="color:var(--muted)">GitHub Pages</span><span>Active</span></div>
                </div>
            </div>
            <div class="section">
                <div class="section-label">Silo Health</div>
                <div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);overflow:hidden">
                    <div class="status-row"><span><span class="status-dot up"></span>Silo Score</span><span style="color:var(--muted)">K8s RBAC</span><span>6/6</span></div>
                    <div class="status-row"><span><span class="status-dot up"></span>mTLS</span><span style="color:var(--muted)">Istio</span><span>STRICT</span></div>
                    <div class="status-row"><span><span class="status-dot up"></span>Key Vault</span><span style="color:var(--muted)">CSI Mount</span><span>8 secrets</span></div>
                    <div class="status-row"><span><span class="status-dot up"></span>API Providers</span><span style="color:var(--muted)">Anthropic + Google</span><span>53 models</span></div>
                </div>
            </div>
        </div>
    `;
}

function renderLogin(el) {
    if (isLoggedIn()) return renderAccount(el);
    el.innerHTML = `
        <div class="page">
            <div class="login-box">
                <h2>⚓ Sign In</h2>
                <div class="oauth-buttons">
                    <button class="btn-oauth" onclick="signInWithProvider('github')">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                        Continue with GitHub
                    </button>
                    <button class="btn-oauth" onclick="signInWithProvider('google')">
                        <svg width="20" height="20" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                        Continue with Google
                    </button>
                </div>
                <div class="divider"><span>or</span></div>
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" placeholder="you@company.com" id="loginEmail">
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input type="password" placeholder="••••••••" id="loginPass">
                </div>
                <button class="btn-primary" onclick="handleLogin()" style="width:100%">Sign In</button>
                <div class="login-footer">
                    <a href="#" onclick="handleForgot(event)" style="font-size:0.8rem">Forgot password?</a>
                    <div style="margin-top:1rem">Don't have an account? <a href="#/signup">Sign up</a></div>
                </div>
            </div>
        </div>
    `;
}

function renderSignup(el) {
    if (isLoggedIn()) return renderAccount(el);
    el.innerHTML = `
        <div class="page">
            <div class="login-box">
                <h2>⚓ Create Account</h2>
                <div class="oauth-buttons">
                    <button class="btn-oauth" onclick="signInWithProvider('github')">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                        Sign up with GitHub
                    </button>
                    <button class="btn-oauth" onclick="signInWithProvider('google')">
                        <svg width="20" height="20" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                        Sign up with Google
                    </button>
                </div>
                <div class="divider"><span>or</span></div>
                <div class="form-group">
                    <label>Name</label>
                    <input type="text" placeholder="Your name" id="signupName">
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" placeholder="you@company.com" id="signupEmail">
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input type="password" placeholder="Min 8 characters" id="signupPass">
                </div>
                <button class="btn-primary" onclick="handleSignup()" style="width:100%">Create Account</button>
                <div class="login-footer">
                    Already have an account? <a href="#/login">Sign in</a>
                </div>
            </div>
        </div>
    `;
}

function renderAccount(el) {
    if (!isLoggedIn()) return renderLogin(el);
    const user = getUser();
    const name = user.user_metadata?.name || user.email?.split('@')[0] || 'User';
    const tier = getAccountTier();
    el.innerHTML = `
        <div class="page">
            <div class="page-hero" style="padding-bottom:1rem">
                <h1>⚓ ${name}</h1>
                <p class="subtitle">${user.email || ''}</p>
                <span class="tier-badge tier-${tier}" style="margin-top:1rem;display:inline-block">${tier.toUpperCase()} TIER</span>
            </div>
            <div class="section">
                <div class="card-grid" style="max-width:600px;margin:0 auto">
                    <div class="card" onclick="location.hash='#/account/billing'" style="cursor:pointer">
                        <span class="icon">💳</span>
                        <h3>Billing & Subscription</h3>
                        <p>Manage your plan, payment methods, and invoices.</p>
                    </div>
                    <div class="card">
                        <span class="icon">🔐</span>
                        <h3>My Silos</h3>
                        <p>View and manage your sovereign AI instances.</p>
                        <span class="tag tag-blue">COMING SOON</span>
                    </div>
                    <div class="card">
                        <span class="icon">🔑</span>
                        <h3>API Keys</h3>
                        <p>Manage API access tokens for CLI and integrations.</p>
                        <span class="tag tag-blue">COMING SOON</span>
                    </div>
                    <div class="card">
                        <span class="icon">🌀</span>
                        <h3>My Patterns</h3>
                        <p>Novel Patterns you've discovered or purchased.</p>
                        <span class="tag tag-blue">COMING SOON</span>
                    </div>
                </div>
            </div>
            <div style="text-align:center;padding:2rem 0">
                <button class="btn-secondary" onclick="signOut()">Sign Out</button>
            </div>
        </div>
    `;
}

function renderBilling(el) {
    if (!isLoggedIn()) return renderLogin(el);
    const tier = getAccountTier();
    el.innerHTML = `
        <div class="page">
            <div class="page-hero" style="padding-bottom:1rem">
                <h1>💳 Billing</h1>
                <p class="subtitle">Manage your subscription and payments</p>
            </div>
            <div class="section" style="max-width:600px;margin:0 auto">
                <div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:1.5rem">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem">
                        <h3 style="font-weight:400">Current Plan</h3>
                        <span class="tier-badge tier-${tier}">${tier.toUpperCase()}</span>
                    </div>
                    <div class="pricing-grid" style="margin-top:1rem">
                        ${TIERS.filter(t => t.id !== tier).map(t => `
                            <div class="tier-card-mini" onclick="handleUpgrade('${t.id}')">
                                <span>${t.icon} ${t.name}</span>
                                <span style="color:var(--accent)">${t.price ? '$' + t.price + '/mo' : 'Contact us'}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:1.5rem;margin-top:1rem">
                    <h3 style="font-weight:400;margin-bottom:1rem">Payment Method</h3>
                    <p style="color:var(--muted)">No payment method on file.</p>
                    <button class="btn-secondary" style="margin-top:1rem" onclick="alert('Stripe integration coming soon')">Add Payment Method</button>
                </div>
                <div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:1.5rem;margin-top:1rem">
                    <h3 style="font-weight:400;margin-bottom:1rem">Invoices</h3>
                    <p style="color:var(--muted)">No invoices yet.</p>
                </div>
            </div>
            <div style="text-align:center;padding:2rem 0">
                <a href="#/account" style="font-size:0.85rem">← Back to Account</a>
            </div>
        </div>
    `;
}

function render404(el) {
    el.innerHTML = `
        <div class="page" style="min-height:70vh;display:flex;align-items:center;justify-content:center;text-align:center">
            <div>
                <div style="font-size:4rem;font-weight:200;color:#333">404</div>
                <div style="color:#555;margin-bottom:2rem">You've drifted off course, sailor.</div>
                <a href="#/" style="padding:0.5rem 1.5rem;border:1px solid rgba(102,126,234,0.3);border-radius:8px;font-size:0.85rem">⚓ Return to Fleet</a>
            </div>
        </div>
    `;
}

// ========== COMPONENTS ==========
function productCard(p) {
    const priceStr = p.price.custom ? 'Custom' : p.price.monthly === 0 ? 'Free' : '$' + p.price.monthly + '/mo';
    return `
        <a href="#/product/${p.id}" class="card">
            <span class="icon">${p.icon}</span>
            <h3>${p.name}</h3>
            <span class="tag ${p.tagClass}">${p.tag}</span>
            <p>${p.desc}</p>
            <div class="card-price">${priceStr}</div>
        </a>
    `;
}

function tierCardSmall(t) {
    return `
        <div class="tier-card-small" onclick="location.hash='#/pricing'">
            <span style="font-size:1.5rem">${t.icon}</span>
            <h3>${t.name}</h3>
            <div class="tier-price">${t.price ? '$' + t.price + '<span>/mo</span>' : 'Custom'}</div>
            <p style="font-size:0.8rem;color:var(--muted)">${t.desc}</p>
        </div>
    `;
}

function tierCard(t, billing) {
    const price = billing === 'yearly' && t.price ? Math.round(t.price * 0.8) : t.price;
    const popular = t.id === 'captain';
    return `
        <div class="tier-card ${popular ? 'popular' : ''}">
            ${popular ? '<div class="popular-badge">MOST POPULAR</div>' : ''}
            <span style="font-size:2rem">${t.icon}</span>
            <h3>${t.name}</h3>
            <div class="tier-price">${price ? '$' + price + '<span>/mo</span>' : 'Custom'}</div>
            ${billing === 'yearly' && t.price ? '<div style="color:var(--accent);font-size:0.75rem">billed annually</div>' : ''}
            <p style="color:var(--muted);font-size:0.85rem;margin:1rem 0">${t.desc}</p>
            <ul class="tier-features">
                ${t.features.map(f => `<li>✓ ${f}</li>`).join('')}
            </ul>
            <a href="#/signup" class="btn-primary" style="width:100%;margin-top:auto">${t.price ? 'Get Started' : 'Contact Sales'}</a>
        </div>
    `;
}

function npCard(n) {
    return `
        <div class="card" data-cat="${n.cat}">
            <span class="icon">🌀</span>
            <h3>${n.id}: ${n.name}</h3>
            <span class="tag">${'★'.repeat(n.stars)}${'☆'.repeat(5-n.stars)}</span>
            <p>Owner: ${n.owner} · Category: ${n.cat}</p>
        </div>
    `;
}

// ========== ACTIONS ==========
function filterNPs(cat) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
    document.querySelectorAll('#np-grid .card').forEach(c => {
        c.style.display = (cat === 'all' || c.dataset.cat === cat) ? '' : 'none';
    });
}

function toggleBilling(period, btn) {
    document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('pricing-grid').innerHTML = TIERS.map(t => tierCard(t, period)).join('');
}

function handleLogin() {
    const email = document.getElementById('loginEmail')?.value;
    const pass = document.getElementById('loginPass')?.value;
    if (!email) return alert('Please enter your email');
    signIn(email, pass).catch(e => alert(e.message || 'Sign in failed'));
}

function handleSignup() {
    const name = document.getElementById('signupName')?.value;
    const email = document.getElementById('signupEmail')?.value;
    const pass = document.getElementById('signupPass')?.value;
    if (!email) return alert('Please enter your email');
    if (!pass || pass.length < 8) return alert('Password must be at least 8 characters');
    signUp(email, pass, name).catch(e => alert(e.message || 'Sign up failed'));
}

function handleForgot(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail')?.value;
    if (!email) return alert('Enter your email first, then click forgot password');
    resetPassword(email).then(() => alert('Check your email for reset link')).catch(e => alert(e.message));
}

function handleUpgrade(tierId) {
    if (tierId === 'enterprise') {
        alert('Contact us at kewin.joffe@gmail.com for Enterprise pricing');
    } else {
        alert('Stripe checkout coming soon — upgrade to ' + tierId.toUpperCase());
    }
}

// ========== INIT ==========
window.addEventListener('hashchange', () => { navigate(); window.scrollTo(0, 0); });
loadMockUser();
if (typeof initAuth === 'function') initAuth();
navigate();
