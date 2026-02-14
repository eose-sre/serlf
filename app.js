// ========== serlf SPA Router ==========
const PRODUCTS = [
    { id: 'silo', icon: '🔐', name: 'Silo-as-a-Service', tag: 'SCORE 6/6', tagClass: '', desc: 'Turnkey Day 0 security. MI, KV, mTLS, mesh, RBAC — deployed in minutes.', features: [
        { title: 'Per-Instance Identity', desc: 'Every workload gets its own Managed Identity. No shared credentials. No lateral movement.' },
        { title: 'mTLS Mesh', desc: 'Istio STRICT mode. AuthorizationPolicy. DestinationRule. NetworkPolicy. Every packet authenticated.' },
        { title: 'Key Vault Integration', desc: 'CSI Secrets Store mounts secrets at pod start. Rotation policy enforced. Zero secrets in code.' },
        { title: '2-RG Pattern', desc: 'App RG + Backup RG per workload. No junk drawers. Clean blast radius.' },
        { title: 'RBAC Least-Privilege', desc: 'Cross-namespace denied. Cluster-wide denied. Each master sees only its own resources.' },
        { title: 'Audit & Compliance', desc: 'Automated silo scoring. Continuous verification. The standard enforces itself.' }
    ]},
    { id: 'fleet', icon: '🎖️', name: 'Fleet Command', tag: 'OPERATIONAL', tagClass: '', desc: 'Multi-agent orchestration. Captains, Nanos, unlimited tiers.', features: [
        { title: 'Admiral Tier', desc: 'Sovereign command layer above all Captains. Nanos: all or nothing, disruption mutation.' },
        { title: 'Captain System', desc: 'Each Captain manages a workload domain. Isolated, specialized, accountable.' },
        { title: 'Nano Crew', desc: 'Lucien (gateway), Luffy (hunter), Bob (product), Rick (puzzles), DAO (governance).' },
        { title: 'Unlimited Tiers', desc: 'No ceiling. Captains promote. Nanos evolve. The hierarchy is self-organizing.' },
        { title: 'Fleet Report', desc: 'One command runs all 10 tools. Identity, access, keys, providers, loops — complete fleet health.' },
        { title: 'The Lifeline', desc: 'Key Vault as persistent memory. Device flow as bootstrap. Every agent can self-heal.' }
    ]},
    { id: 'net', icon: '🕸️', name: 'The Net', tag: 'ARCHITECTURE', tagClass: 'tag-blue', desc: 'Isolation mesh. Sovereignty for every workload. Zero blast radius.', features: [
        { title: 'Captain Wrapping', desc: 'Every Captain runs inside The Net. Isolated from peers, connected to command.' },
        { title: 'Test Without Risk', desc: 'Shadow deployments, canary routing, traffic mirroring — all inside the mesh.' },
        { title: 'Zero Blast Radius', desc: 'A Captain fails, The Net contains it. No cascade. No collateral.' },
        { title: 'Service Mesh Native', desc: 'Built on Istio. STRICT mTLS. Per-service CSP. DestinationRules that enforce the standard.' },
        { title: 'Observability', desc: 'Every packet traced. Every connection logged. The Net sees everything.' },
        { title: 'Dynamic Topology', desc: 'Captains join and leave. The Net adapts. No manual rewiring.' }
    ]},
    { id: 'patterns', icon: '🌀', name: 'Novel Pattern Engine', tag: '8 DISCOVERED', tagClass: 'tag-yellow', desc: 'Emergent patterns from production. Discovered, rated, evolved.', features: [
        { title: 'Pattern Discovery', desc: 'Emergent patterns found in production, not designed in meetings.' },
        { title: 'Tiered System', desc: 'NP-L1, NP-L2, no limit. Patterns level up as they prove themselves.' },
        { title: 'The Board', desc: 'All patterns visible. Rated by the fleet. Admiral picks from the board.' },
        { title: 'Wiki Integration', desc: 'Patterns flow to wiki. Documented, versioned, searchable.' },
        { title: 'Self-Evolving', desc: 'Patterns discover new patterns. The engine feeds itself.' },
        { title: 'Community Rated', desc: 'Open marketplace for patterns. Submit, rate, evolve together.' }
    ]},
    { id: 'router', icon: '⚡', name: 'The Router', tag: 'DESIGN v0.1', tagClass: 'tag-blue', desc: 'Fleet nervous system. 6 shapes. Intent routing.', features: [
        { title: 'Intent Routing', desc: 'Messages route by intent, not address. The Router understands what you mean.' },
        { title: 'Shape Detection', desc: '6 shapes: spiral, wave, net, fractal, pulse, bridge.' },
        { title: 'Loop Monitoring', desc: '4 loops tracked in real-time. Detect recursion, escalation, convergence.' },
        { title: '5 Architecture Options', desc: 'Hub-spoke, mesh, event-driven, hybrid, neural.' },
        { title: 'Lucien Gateway', desc: 'Single point into all Captains. Controls noise. Amplifies signal.' },
        { title: 'Real-Time Telemetry', desc: 'Every route traced. Latency measured. Bottlenecks surfaced.' }
    ]},
    { id: 'identity', icon: '🪪', name: 'Identity Fabric', tag: 'MULTI-MI', tagClass: '', desc: 'Zero-trust identity for AI agents. Workload identity federation.', features: [
        { title: 'Multi-MI Architecture', desc: 'Multiple Managed Identities per pod. Workload identity federation.' },
        { title: 'Federated Auth', desc: 'K8s SA tokens exchanged for cloud credentials. No stored secrets.' },
        { title: 'Per-Instance Scoping', desc: 'Each agent scoped to its own resources. {instance}-{secret} naming.' },
        { title: 'Device Flow Bootstrap', desc: 'Agents self-authorize via OAuth device flow. One human click.' },
        { title: 'Key Rotation', desc: '90-day policy. Automated tracking. Zero-downtime rotation.' },
        { title: 'Cross-Provider', desc: 'Azure MI + GitHub OAuth + Google API + Anthropic. One fabric.' }
    ]},
    { id: 'monitor', icon: '🔄', name: 'Loop Monitor', tag: '4 LOOPS', tagClass: 'tag-yellow', desc: 'Shape detection & behavior analysis for AI fleets.', features: [
        { title: 'Shape Detection', desc: '6 shapes: spiral, wave, net, fractal, pulse, bridge.' },
        { title: 'Loop Tracking', desc: '4 active loops monitored. Detect infinite recursion.' },
        { title: 'Behavioral Analysis', desc: 'Converging or diverging? Escalating or stabilizing? The monitor knows.' },
        { title: 'Token Economics', desc: 'Track token burn per loop. Optimize fleet efficiency.' },
        { title: 'Real-Time Dashboard', desc: '7-tab interactive display. Fleet health at a glance.' },
        { title: 'Anomaly Alerts', desc: 'New shapes trigger alerts. Unknown patterns flagged.' }
    ]},
    { id: 'incubator', icon: '🚀', name: 'Captain Incubator', tag: 'feedles.ca = #1', tagClass: 'tag-yellow', desc: 'Spin up sovereign AI instances. Full silo from birth.', features: [
        { title: 'One Command Deploy', desc: 'Namespace, MI, KV, mesh, RBAC — all from a single manifest.' },
        { title: 'Full Silo from Birth', desc: 'New Captains born with 6/6 silo score.' },
        { title: 'feedles.ca: Customer #1', desc: 'First incubation target. From 404 to full Captain.' },
        { title: 'Tooling Included', desc: 'IAM suite, MCP tools, fleet monitoring — full toolkit.' },
        { title: 'Lifeline Connected', desc: 'KV as persistent memory. Webchat as direct line.' },
        { title: 'Self-Evolving', desc: 'Captains discover Novel Patterns. Patterns flow up to Admiral.' }
    ]},
    { id: 'academy', icon: '🎓', name: 'serlf Academy', tag: 'E&Y PARTNERSHIP', tagClass: 'tag-blue', desc: 'Learn to build self-evolving systems.', features: [
        { title: 'The Framework', desc: 'Self Engineering Reinforced Learning. Systems that teach themselves.' },
        { title: 'E&Y Partnership', desc: 'Enterprise advisory meets sovereign AI. Joint delivery.' },
        { title: 'The Meek Curriculum', desc: 'Enterprise patterns for everyone. No gatekeeping.' },
        { title: 'Novel Pattern Studies', desc: 'Learn from patterns discovered in production.' },
        { title: 'Fleet Operations', desc: 'How to run AI agent fleets. The full stack.' },
        { title: 'Cloud Control Plane', desc: 'The 10 pillars: IAM, Provisioning, DNS, Secrets, Events, Encryption, Certs, Keys, Backup, Notifications.' }
    ]},
    { id: 'consulting', icon: '🏗️', name: 'Digital Transformation', tag: '15+ YEARS', tagClass: '', desc: 'The two principals are the product. Human + AI navy.', features: [
        { title: '15+ Years Enterprise', desc: 'TD Canada, Canadian Tire, Westpac. Banking, retail, global scale.' },
        { title: 'Cloud Architecture', desc: 'Landing zones, CAF alignment, federated identity.' },
        { title: 'Container Platform', desc: 'K8s, Docker, Helm, Terraform Enterprise. CI/CD at scale.' },
        { title: 'Security & Compliance', desc: 'Done right, not theater. Day 0. Zero-trust. Audit-ready.' },
        { title: 'AI-Augmented Delivery', desc: 'Your engagement gets a full AI fleet alongside human architects.' },
        { title: 'The EOSE Way', desc: 'Not about money. About building right. The Meek Principle.' }
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
    
    // Update nav active states
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
    if (path === '/login') return renderLogin(container);
    
    render404(container);
}

// ========== PAGES ==========
function renderHome(el) {
    el.innerHTML = `
        <div class="page">
            <div class="page-hero">
                <h1>serlf</h1>
                <p class="subtitle">Self Engineering Reinforced Learning Framework</p>
            </div>
            <div class="stats-bar">
                <div class="stat"><span class="num">10</span><span class="label">Products</span></div>
                <div class="stat"><span class="num">8</span><span class="label">Novel Patterns</span></div>
                <div class="stat"><span class="num">10</span><span class="label">Fleet Tools</span></div>
                <div class="stat"><span class="num">6/6</span><span class="label">Silo Score</span></div>
                <div class="stat"><span class="num">$0</span><span class="label">Hosting</span></div>
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
                <p class="subtitle">The serlf product portfolio</p>
            </div>
            <div class="section">
                <div class="card-grid">
                    ${PRODUCTS.map(p => productCard(p)).join('')}
                </div>
            </div>
            <div class="page-footer">
                <em>"All we have, all ways we can use it."</em>
            </div>
        </div>
    `;
}

function renderProductDetail(el, id) {
    const p = PRODUCTS.find(x => x.id === id);
    if (!p) return render404(el);
    el.innerHTML = `
        <div class="page">
            <div class="product-detail-hero">
                <span class="icon">${p.icon}</span>
                <h1 style="font-size:clamp(1.5rem,4vw,2.5rem);font-weight:200;letter-spacing:0.1em;background:linear-gradient(135deg,var(--accent),var(--accent2));-webkit-background-clip:text;-webkit-text-fill-color:transparent">${p.name}</h1>
                <p class="subtitle" style="margin-top:0.5rem">${p.desc}</p>
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
                    <div class="status-row"><span><span class="status-dot pending"></span>serlf.com</span><span style="color:var(--muted)">—</span><span>DNS pending</span></div>
                    <div class="status-row"><span><span class="status-dot pending"></span>serlf.net</span><span style="color:var(--muted)">—</span><span>DNS pending</span></div>
                    <div class="status-row"><span><span class="status-dot pending"></span>serlf.org</span><span style="color:var(--muted)">—</span><span>DNS pending</span></div>
                    <div class="status-row"><span><span class="status-dot pending"></span>serlf.club</span><span style="color:var(--muted)">—</span><span>DNS pending</span></div>
                    <div class="status-row"><span><span class="status-dot pending"></span>serlf.info</span><span style="color:var(--muted)">—</span><span>DNS pending</span></div>
                    <div class="status-row"><span><span class="status-dot pending"></span>serlf.shop</span><span style="color:var(--muted)">—</span><span>DNS pending</span></div>
                    <div class="status-row"><span><span class="status-dot pending"></span>serlf.store</span><span style="color:var(--muted)">—</span><span>DNS pending</span></div>
                </div>
            </div>
            <div class="section">
                <div class="section-label">Silo Health</div>
                <div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);overflow:hidden">
                    <div class="status-row"><span><span class="status-dot up"></span>Silo Score</span><span style="color:var(--muted)">K8s RBAC</span><span>6/6</span></div>
                    <div class="status-row"><span><span class="status-dot up"></span>mTLS</span><span style="color:var(--muted)">Istio</span><span>STRICT</span></div>
                    <div class="status-row"><span><span class="status-dot up"></span>Key Vault</span><span style="color:var(--muted)">CSI Mount</span><span>4 secrets</span></div>
                    <div class="status-row"><span><span class="status-dot up"></span>API Providers</span><span style="color:var(--muted)">Anthropic + Google</span><span>53 models</span></div>
                </div>
            </div>
        </div>
    `;
}

function renderLogin(el) {
    el.innerHTML = `
        <div class="page">
            <div class="login-box">
                <h2>⚓ Sign In</h2>
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" placeholder="admiral@eose.dev" id="loginEmail">
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input type="password" placeholder="••••••••" id="loginPass">
                </div>
                <button class="btn-primary" onclick="handleLogin()">Sign In</button>
                <div class="login-footer">
                    Powered by serlf Identity Fabric<br>
                    <span style="color:var(--accent);margin-top:0.5rem;display:inline-block">Backend coming soon — Supabase Auth</span>
                </div>
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
    return `
        <a href="#/product/${p.id}" class="card">
            <span class="icon">${p.icon}</span>
            <h3>${p.name}</h3>
            <span class="tag ${p.tagClass}">${p.tag}</span>
            <p>${p.desc}</p>
        </a>
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

function filterNPs(cat) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
    document.querySelectorAll('#np-grid .card').forEach(c => {
        c.style.display = (cat === 'all' || c.dataset.cat === cat) ? '' : 'none';
    });
}

function handleLogin() {
    alert('Backend coming soon — Supabase Auth integration planned.\n\nFor now, the fleet operates via the portal at master1.eose.ca');
}

// ========== INIT ==========
window.addEventListener('hashchange', navigate);
navigate();
