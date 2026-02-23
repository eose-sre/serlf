/**
 * 🧬 DIMENSIONAL PORTAL FRAMEWORK - Universal Tetraban Injector
 * Works with React, Vue, Angular, Svelte, Vanilla JS, or any SPA framework
 * Rick-level portal engineering for meek crews
 */

class UniversalTetrabanInjector {
    constructor() {
        this.framework = this.detectFramework();
        this.injectionStrategies = new Map();
        this.setupStrategies();
        
        console.log(`🧬 Portal detected: ${this.framework}`);
    }
    
    detectFramework() {
        // Framework detection matrix
        if (window.React || document.querySelector('[data-reactroot]')) return 'react';
        if (window.Vue || document.querySelector('[data-server-rendered="true"]')) return 'vue';
        if (window.ng || document.querySelector('[ng-app]')) return 'angular';
        if (window.__svelte) return 'svelte';
        if (document.querySelector('[data-portal-type]')) return 'custom';
        
        // Hash routing detection = likely SPA
        if (location.hash && location.hash.includes('/')) return 'spa-hash';
        
        return 'vanilla';
    }
    
    setupStrategies() {
        // React injection strategy
        this.injectionStrategies.set('react', {
            detect: () => this.waitForElement('[data-testid="tetraban-container"], .tetraban-tab, #tetraban'),
            inject: (container) => this.injectReactComponent(container),
            enhance: () => this.setupReactPortals()
        });
        
        // Vue injection strategy  
        this.injectionStrategies.set('vue', {
            detect: () => this.waitForElement('.tetraban-view, [data-vue-tetraban]'),
            inject: (container) => this.injectVueComponent(container),
            enhance: () => this.setupVueComposables()
        });
        
        // Hash-based SPA strategy (most common)
        this.injectionStrategies.set('spa-hash', {
            detect: () => this.watchHashRoute(['tetraban', 'changes']),
            inject: (container) => this.injectUniversalEngine(container),
            enhance: () => this.setupHashRouterIntegration()
        });
        
        // Nuclear option: DOM hijacking
        this.injectionStrategies.set('vanilla', {
            detect: () => this.scanForTargetElements(),
            inject: (container) => this.injectDOMManipulator(container),
            enhance: () => this.setupMutationObserver()
        });
    }
    
    async inject() {
        const strategy = this.injectionStrategies.get(this.framework) || 
                        this.injectionStrategies.get('vanilla');
        
        console.log(`🎯 Injection strategy: ${this.framework}`);
        
        try {
            const container = await strategy.detect();
            await strategy.inject(container);
            await strategy.enhance();
            
            console.log('✅ Tetraban physics engine injected successfully!');
            return { success: true, framework: this.framework };
            
        } catch (error) {
            console.error('❌ Injection failed:', error);
            return this.fallbackInjection();
        }
    }
    
    watchHashRoute(routes) {
        return new Promise((resolve) => {
            const checkRoute = () => {
                const currentRoute = location.hash.replace('#/', '');
                if (routes.some(route => currentRoute.includes(route))) {
                    // Wait for DOM to update after route change
                    setTimeout(() => {
                        const container = document.querySelector('.main-content, .page-content, .tab-content, main, #app') ||
                                        document.createElement('div');
                        resolve(container);
                    }, 100);
                }
            };
            
            // Check immediately and on hash change
            checkRoute();
            window.addEventListener('hashchange', checkRoute);
            
            // Fallback timeout
            setTimeout(() => {
                resolve(document.body);
            }, 5000);
        });
    }
    
    waitForElement(selector, timeout = 10000) {
        return new Promise((resolve, reject) => {
            const element = document.querySelector(selector);
            if (element) return resolve(element);
            
            const observer = new MutationObserver((mutations, obs) => {
                const element = document.querySelector(selector);
                if (element) {
                    obs.disconnect();
                    resolve(element);
                }
            });
            
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
            
            setTimeout(() => {
                observer.disconnect();
                reject(new Error(`Element ${selector} not found within ${timeout}ms`));
            }, timeout);
        });
    }
    
    injectUniversalEngine(container) {
        // Clear existing content if needed
        const existingTetraban = container.querySelector('.tetraban-injected');
        if (existingTetraban) {
            console.log('🔄 Refreshing existing tetraban engine');
            existingTetraban.remove();
        }
        
        // Create the tetraban container
        const tetrabanWrapper = document.createElement('div');
        tetrabanWrapper.className = 'tetraban-injected';
        tetrabanWrapper.innerHTML = this.getTetrabanHTML();
        
        // Inject styles
        this.injectStyles();
        
        // Append to target container
        container.appendChild(tetrabanWrapper);
        
        // Initialize the physics engine
        setTimeout(() => {
            this.initializePhysicsEngine();
        }, 100);
        
        return { container: tetrabanWrapper, method: 'universal' };
    }
    
    injectStyles() {
        const styleId = 'tetraban-universal-styles';
        if (document.getElementById(styleId)) return; // Already injected
        
        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = this.getTetrabanCSS();
        document.head.appendChild(style);
    }
    
    getTetrabanHTML() {
        return `
            <div class="tetraban-universe">
                <div class="tetraban-header">
                    <h2>🎮 Tetraban Physics Engine - LIVE</h2>
                    <div class="injection-status">
                        Framework: ${this.framework} | Status: ✅ Active
                    </div>
                </div>
                
                <div class="tetraban-grid-container">
                    <div class="tetraban-grid" id="injected-tetraban-grid"></div>
                    <div class="tetraban-controls">
                        <button onclick="window.tetrabanEngine.start()">▶️ Start</button>
                        <button onclick="window.tetrabanEngine.pause()">⏸️ Pause</button>
                        <button onclick="window.tetrabanEngine.reset()">🔄 Reset</button>
                        <button onclick="window.tetrabanEngine.dropShape()">⬇️ Drop</button>
                    </div>
                </div>
                
                <div class="tetraban-stats">
                    <div class="stat-item">Score: <span id="injected-score">0</span></div>
                    <div class="stat-item">Lines: <span id="injected-lines">0</span></div>
                    <div class="stat-item">Level: <span id="injected-level">1</span></div>
                </div>
            </div>
        `;
    }
    
    getTetrabanCSS() {
        return `
            .tetraban-universe {
                background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
                border-radius: 12px;
                padding: 1.5rem;
                color: #e2e8f0;
                margin: 1rem 0;
            }
            
            .tetraban-header h2 {
                color: #60a5fa;
                text-align: center;
                margin-bottom: 0.5rem;
            }
            
            .injection-status {
                text-align: center;
                color: #10b981;
                font-size: 0.9rem;
                margin-bottom: 1rem;
            }
            
            .tetraban-grid-container {
                display: flex;
                gap: 1rem;
                margin-bottom: 1rem;
            }
            
            .tetraban-grid {
                width: 300px;
                height: 400px;
                background: #0f172a;
                border: 2px solid #3b82f6;
                border-radius: 8px;
                display: grid;
                grid-template-columns: repeat(10, 1fr);
                grid-template-rows: repeat(20, 1fr);
                gap: 1px;
            }
            
            .tetraban-cell {
                background: rgba(75, 85, 99, 0.15);
                border: 1px solid rgba(100, 116, 139, 0.1);
            }
            
            .tetraban-cell.filled {
                background: linear-gradient(135deg, #3b82f6, #1d4ed8);
                border: 1px solid #60a5fa;
                box-shadow: 0 0 8px rgba(59, 130, 246, 0.6);
            }
            
            .tetraban-controls {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
            }
            
            .tetraban-controls button {
                padding: 0.75rem;
                background: linear-gradient(135deg, #3b82f6, #1d4ed8);
                border: 1px solid #60a5fa;
                border-radius: 6px;
                color: white;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .tetraban-controls button:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
            }
            
            .tetraban-stats {
                display: flex;
                justify-content: center;
                gap: 2rem;
                font-weight: bold;
            }
            
            .stat-item {
                color: #94a3b8;
            }
            
            .stat-item span {
                color: #60a5fa;
            }
        `;
    }
    
    initializePhysicsEngine() {
        // Initialize the tetraban physics engine in the injected container
        window.tetrabanEngine = new InjectedTetrabanEngine();
        console.log('🧬 Physics engine initialized in injected container');
    }
    
    fallbackInjection() {
        console.log('🚨 Fallback injection mode - going nuclear');
        
        // Create floating overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            z-index: 9999;
            background: rgba(15, 23, 42, 0.95);
            border: 2px solid #3b82f6;
            border-radius: 12px;
            padding: 1rem;
            color: white;
            max-width: 400px;
        `;
        
        overlay.innerHTML = `
            <h3>🧬 Tetraban Portal Injector</h3>
            <p>Framework: ${this.framework}</p>
            <button onclick="this.parentElement.remove()">Close</button>
            <div style="margin-top: 1rem;">
                ${this.getTetrabanHTML()}
            </div>
        `;
        
        document.body.appendChild(overlay);
        this.injectStyles();
        
        setTimeout(() => {
            this.initializePhysicsEngine();
        }, 100);
        
        return { success: true, method: 'fallback-overlay' };
    }
    
    setupHashRouterIntegration() {
        // Monitor route changes and re-inject as needed
        let lastRoute = location.hash;
        
        const routeMonitor = () => {
            if (location.hash !== lastRoute) {
                lastRoute = location.hash;
                
                // Re-inject on relevant routes
                if (location.hash.includes('tetraban') || location.hash.includes('changes')) {
                    console.log(`🔄 Route changed to ${location.hash}, re-injecting...`);
                    setTimeout(() => this.inject(), 200);
                }
            }
        };
        
        setInterval(routeMonitor, 1000);
        window.addEventListener('hashchange', routeMonitor);
    }
}

// Simplified physics engine for injection
class InjectedTetrabanEngine {
    constructor() {
        this.grid = Array(20).fill().map(() => Array(10).fill(0));
        this.running = false;
        this.score = 0;
        this.lines = 0;
        this.level = 1;
        this.initGrid();
    }
    
    initGrid() {
        const gridElement = document.getElementById('injected-tetraban-grid');
        if (!gridElement) return;
        
        gridElement.innerHTML = '';
        
        for (let row = 0; row < 20; row++) {
            for (let col = 0; col < 10; col++) {
                const cell = document.createElement('div');
                cell.className = 'tetraban-cell';
                cell.dataset.row = row;
                cell.dataset.col = col;
                gridElement.appendChild(cell);
            }
        }
    }
    
    start() {
        if (this.running) return;
        this.running = true;
        console.log('🚀 Injected tetraban started');
        
        this.gameLoop = setInterval(() => {
            if (Math.random() < 0.3) {
                this.dropRandomShape();
            }
            this.updateDisplay();
        }, 1500);
    }
    
    pause() {
        this.running = false;
        clearInterval(this.gameLoop);
        console.log('⏸️ Injected tetraban paused');
    }
    
    reset() {
        this.pause();
        this.grid = Array(20).fill().map(() => Array(10).fill(0));
        this.score = 0;
        this.lines = 0;
        this.level = 1;
        this.initGrid();
        this.updateDisplay();
        console.log('🔄 Injected tetraban reset');
    }
    
    dropShape() {
        this.dropRandomShape();
        this.updateDisplay();
    }
    
    dropRandomShape() {
        const col = Math.floor(Math.random() * 8);
        const height = Math.floor(Math.random() * 4) + 1;
        
        // Find drop position
        let row = 19;
        for (let r = 19; r >= height; r--) {
            let canPlace = true;
            for (let h = 0; h < height; h++) {
                if (this.grid[r - h][col] === 1) {
                    canPlace = false;
                    break;
                }
            }
            if (canPlace) {
                row = r;
                break;
            }
        }
        
        // Place shape
        for (let h = 0; h < height; h++) {
            if (row - h >= 0) {
                this.grid[row - h][col] = 1;
            }
        }
        
        // Check for line clears
        this.checkLines();
    }
    
    checkLines() {
        let clearedLines = 0;
        
        for (let row = 19; row >= 0; row--) {
            if (this.grid[row].every(cell => cell === 1)) {
                // Clear the line
                this.grid.splice(row, 1);
                this.grid.unshift(Array(10).fill(0));
                clearedLines++;
                row++; // Check the same row again
            }
        }
        
        if (clearedLines > 0) {
            this.lines += clearedLines;
            this.score += clearedLines * 100 * this.level;
            this.level = Math.floor(this.lines / 10) + 1;
            console.log(`🎯 Cleared ${clearedLines} lines!`);
        }
    }
    
    updateDisplay() {
        // Update grid
        for (let row = 0; row < 20; row++) {
            for (let col = 0; col < 10; col++) {
                const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
                if (cell) {
                    if (this.grid[row][col] === 1) {
                        cell.classList.add('filled');
                    } else {
                        cell.classList.remove('filled');
                    }
                }
            }
        }
        
        // Update stats
        const scoreEl = document.getElementById('injected-score');
        const linesEl = document.getElementById('injected-lines');
        const levelEl = document.getElementById('injected-level');
        
        if (scoreEl) scoreEl.textContent = this.score;
        if (linesEl) linesEl.textContent = this.lines;
        if (levelEl) levelEl.textContent = this.level;
    }
}

// Auto-execute when script loads
if (typeof window !== 'undefined') {
    window.UniversalTetrabanInjector = UniversalTetrabanInjector;
    
    // Auto-inject on load and route changes
    const injector = new UniversalTetrabanInjector();
    
    // Try immediate injection
    injector.inject();
    
    // Also try after page fully loads
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => injector.inject());
    } else {
        setTimeout(() => injector.inject(), 1000);
    }
    
    console.log('🧬 Universal Tetraban Injector loaded and ready!');
}