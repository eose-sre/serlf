/**
 * 🧬 NOVEL PATTERN GENERATOR - Full Crew NP Discovery Engine
 * Turns every framework integration challenge into Novel Patterns
 */

class NovelPatternGenerator {
    constructor() {
        this.patterns = new Map();
        this.discoveryEngine = new PatternDiscoveryEngine();
        this.categories = [
            'framework-detection',
            'injection-strategies', 
            'universal-compatibility',
            'portal-architecture',
            'chat-enhancement',
            'collaboration-systems',
            'physics-integration',
            'ui-transformation'
        ];
        
        this.init();
    }
    
    init() {
        this.startPatternDiscovery();
        this.analyzeCurrentContext();
        this.generateInitialPatterns();
        console.log('🧬 Novel Pattern Generator initialized - NP Galore Mode active');
    }
    
    startPatternDiscovery() {
        // Continuous pattern discovery from user interactions
        this.observeDOM();
        this.monitorEvents();
        this.trackIntegrations();
        this.analyzeFailures();
    }
    
    observeDOM() {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach(mutation => {
                if (mutation.type === 'childList') {
                    this.analyzeNewElements(mutation.addedNodes);
                }
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    
    analyzeNewElements(nodes) {
        nodes.forEach(node => {
            if (node.nodeType === Node.ELEMENT_NODE) {
                const patterns = this.extractPatternsFromElement(node);
                patterns.forEach(pattern => this.registerPattern(pattern));
            }
        });
    }
    
    extractPatternsFromElement(element) {
        const patterns = [];
        
        // Framework detection patterns
        if (element.classList.contains('react-') || element.hasAttribute('data-react')) {
            patterns.push(this.createPattern('NP-F1-001', 'React Element Detection', 
                'Elements with react- prefix or data-react attributes indicate React framework',
                { element: element.tagName, classes: Array.from(element.classList) }));
        }
        
        if (element.classList.contains('vue-') || element.hasAttribute('v-')) {
            patterns.push(this.createPattern('NP-F1-002', 'Vue Element Detection',
                'Elements with vue- prefix or v- attributes indicate Vue framework', 
                { element: element.tagName, attributes: Array.from(element.attributes).map(a => a.name) }));
        }
        
        // Route-based patterns
        if (element.classList.contains('route-') || element.classList.contains('page-')) {
            patterns.push(this.createPattern('NP-F1-003', 'Route Container Detection',
                'Elements with route- or page- prefixes likely contain routed content',
                { routeIndicators: Array.from(element.classList).filter(c => c.includes('route') || c.includes('page')) }));
        }
        
        // Chat interface patterns
        if (this.isChatElement(element)) {
            patterns.push(this.createPattern('NP-C1-001', 'Chat Interface Detection',
                'Chat interfaces have predictable patterns in class names and structure',
                { chatIndicators: this.getChatIndicators(element) }));
        }
        
        return patterns;
    }
    
    isChatElement(element) {
        const chatKeywords = ['chat', 'message', 'input', 'conversation', 'dialog'];
        const classes = Array.from(element.classList).join(' ').toLowerCase();
        const id = element.id.toLowerCase();
        
        return chatKeywords.some(keyword => classes.includes(keyword) || id.includes(keyword));
    }
    
    getChatIndicators(element) {
        return {
            classes: Array.from(element.classList),
            id: element.id,
            children: element.children.length,
            hasInput: !!element.querySelector('input, textarea'),
            hasButton: !!element.querySelector('button')
        };
    }
    
    createPattern(id, name, description, metadata = {}) {
        return {
            id,
            name,
            description,
            metadata,
            timestamp: Date.now(),
            context: {
                url: location.href,
                framework: this.detectCurrentFramework(),
                userAgent: navigator.userAgent.substring(0, 100)
            }
        };
    }
    
    detectCurrentFramework() {
        if (window.React) return 'React';
        if (window.Vue) return 'Vue';
        if (window.angular) return 'Angular';
        if (window.__svelte) return 'Svelte';
        if (location.hash.includes('/')) return 'SPA-Hash-Router';
        return 'Unknown';
    }
    
    registerPattern(pattern) {
        if (!this.patterns.has(pattern.id)) {
            this.patterns.set(pattern.id, pattern);
            console.log(`🧬 New Pattern Discovered: ${pattern.id} - ${pattern.name}`);
            this.triggerPatternEvent(pattern);
        }
    }
    
    triggerPatternEvent(pattern) {
        // Dispatch custom event for pattern discovery
        const event = new CustomEvent('novelPatternDiscovered', {
            detail: pattern
        });
        document.dispatchEvent(event);
    }
    
    monitorEvents() {
        // Monitor various events that can reveal patterns
        const eventTypes = ['click', 'hashchange', 'popstate', 'load', 'error'];
        
        eventTypes.forEach(eventType => {
            window.addEventListener(eventType, (e) => {
                const patterns = this.analyzeEvent(eventType, e);
                patterns.forEach(pattern => this.registerPattern(pattern));
            });
        });
    }
    
    analyzeEvent(eventType, event) {
        const patterns = [];
        
        switch (eventType) {
            case 'hashchange':
                patterns.push(this.createPattern('NP-R1-001', 'Hash Route Change Pattern',
                    'Hash changes indicate client-side routing behavior',
                    { 
                        oldHash: event.oldURL?.split('#')[1] || '',
                        newHash: event.newURL?.split('#')[1] || '',
                        timestamp: Date.now()
                    }));
                break;
                
            case 'click':
                if (event.target.matches('a[href^="#/"], .nav-item, .tab')) {
                    patterns.push(this.createPattern('NP-N1-001', 'Navigation Click Pattern',
                        'Navigation elements follow predictable patterns',
                        {
                            selector: this.getElementSelector(event.target),
                            text: event.target.textContent?.trim(),
                            href: event.target.href
                        }));
                }
                break;
                
            case 'error':
                patterns.push(this.createPattern('NP-E1-001', 'Error Pattern Analysis',
                    'Errors reveal integration points and failure modes',
                    {
                        message: event.error?.message || event.message,
                        source: event.filename || 'unknown',
                        line: event.lineno || 0
                    }));
                break;
        }
        
        return patterns;
    }
    
    getElementSelector(element) {
        if (element.id) return `#${element.id}`;
        if (element.className) return `.${element.className.split(' ')[0]}`;
        return element.tagName.toLowerCase();
    }
    
    trackIntegrations() {
        // Track successful and failed integration attempts
        const originalFetch = window.fetch;
        window.fetch = async (...args) => {
            const start = Date.now();
            try {
                const response = await originalFetch(...args);
                this.registerIntegrationPattern('fetch-success', args[0], Date.now() - start);
                return response;
            } catch (error) {
                this.registerIntegrationPattern('fetch-failure', args[0], Date.now() - start, error);
                throw error;
            }
        };
        
        // Track script loading
        const originalCreateElement = document.createElement;
        document.createElement = function(tagName) {
            const element = originalCreateElement.call(document, tagName);
            
            if (tagName.toLowerCase() === 'script') {
                element.addEventListener('load', () => {
                    this.registerIntegrationPattern('script-load-success', element.src);
                });
                element.addEventListener('error', (e) => {
                    this.registerIntegrationPattern('script-load-failure', element.src, 0, e);
                });
            }
            
            return element;
        }.bind(this);
    }
    
    registerIntegrationPattern(type, resource, duration = 0, error = null) {
        const pattern = this.createPattern(
            `NP-I1-${String(this.patterns.size + 1).padStart(3, '0')}`,
            `Integration Pattern: ${type}`,
            `Resource integration pattern observed: ${type}`,
            {
                type,
                resource: String(resource),
                duration,
                error: error ? error.message : null,
                success: !error
            }
        );
        
        this.registerPattern(pattern);
    }
    
    analyzeFailures() {
        // Analyze common failure patterns
        window.addEventListener('error', (e) => {
            const pattern = this.createPattern(
                `NP-F1-${String(this.patterns.size + 1).padStart(3, '0')}`,
                'Failure Analysis Pattern',
                'JavaScript errors reveal system integration weaknesses',
                {
                    message: e.message,
                    filename: e.filename,
                    lineno: e.lineno,
                    colno: e.colno,
                    stack: e.error?.stack?.substring(0, 500)
                }
            );
            
            this.registerPattern(pattern);
            this.suggestSolution(pattern);
        });
    }
    
    suggestSolution(pattern) {
        const solutions = this.generateSolutions(pattern);
        if (solutions.length > 0) {
            console.log(`🔧 Suggested solutions for ${pattern.id}:`, solutions);
        }
    }
    
    generateSolutions(pattern) {
        const solutions = [];
        
        // Framework-specific solutions
        if (pattern.metadata.message?.includes('React')) {
            solutions.push('Try React.createElement instead of JSX');
            solutions.push('Ensure React is loaded before components');
        }
        
        if (pattern.metadata.message?.includes('Vue')) {
            solutions.push('Check Vue instance mounting');
            solutions.push('Verify Vue component registration');
        }
        
        // Network-related solutions
        if (pattern.metadata.type === 'fetch-failure') {
            solutions.push('Check CORS policy');
            solutions.push('Verify URL is accessible');
            solutions.push('Try with different HTTP method');
        }
        
        // Script loading solutions
        if (pattern.metadata.type === 'script-load-failure') {
            solutions.push('Check script URL accessibility');
            solutions.push('Try loading script with async/defer');
            solutions.push('Implement fallback loading mechanism');
        }
        
        return solutions;
    }
    
    generateInitialPatterns() {
        // Generate patterns based on current analysis
        const currentPatterns = [
            {
                id: 'NP-M1-001',
                name: 'Master1 Portal Architecture Pattern',
                description: 'Hash-based routing with tab navigation indicates React/Vue SPA architecture',
                metadata: {
                    evidence: [
                        'URL pattern: https://master1.eose.ca/#/tetraban',
                        'Tab-based navigation observed',
                        'Client-side routing behavior'
                    ],
                    solution: 'Use hash change monitoring + DOM injection strategy'
                }
            },
            {
                id: 'NP-M1-002', 
                name: 'Empty Skeleton Tab Pattern',
                description: 'Tabs exist in navigation but contain empty/skeleton content',
                metadata: {
                    evidence: [
                        'Tetraban tab exists but shows basic UI',
                        'Changes tab exists but shows import messages',
                        'Navigation structure present, functionality missing'
                    ],
                    solution: 'Inject functionality into existing DOM containers'
                }
            },
            {
                id: 'NP-M1-003',
                name: 'Cross-Domain Physics Engine Pattern', 
                description: 'Physics engine works on one domain but needs integration on another',
                metadata: {
                    evidence: [
                        'Working system at serlf.ca/dashboard-v5.html',
                        'Empty system at master1.eose.ca/#/tetraban',
                        'Same functionality needed in different context'
                    ],
                    solution: 'Universal injector with framework detection'
                }
            },
            {
                id: 'NP-C1-002',
                name: 'Basic Chat Enhancement Pattern',
                description: 'Simple chat interfaces can be enhanced with advanced features',
                metadata: {
                    evidence: [
                        'Existing chat lacks file upload',
                        'No code execution capabilities',
                        'Missing collaboration features'
                    ],
                    solution: 'Progressive enhancement with feature injection'
                }
            },
            {
                id: 'NP-U1-001',
                name: 'Framework Universal Compatibility',
                description: 'Single solution should work across any framework',
                metadata: {
                    evidence: [
                        'Multiple framework targets (React, Vue, Angular)',
                        'Different routing systems (hash, history)',
                        'Various DOM structures'
                    ],
                    solution: 'Multi-strategy injection with fallbacks'
                }
            }
        ];
        
        currentPatterns.forEach(pattern => {
            pattern.timestamp = Date.now();
            pattern.context = {
                url: location.href,
                framework: this.detectCurrentFramework(),
                discoveryMethod: 'initial-analysis'
            };
            
            this.registerPattern(pattern);
        });
    }
    
    analyzeCurrentContext() {
        // Analyze the current page context for patterns
        const analysis = {
            framework: this.detectCurrentFramework(),
            routing: this.analyzeRoutingType(),
            chatSystem: this.analyzeChatSystem(), 
            tabSystem: this.analyzeTabSystem(),
            integrationTargets: this.findIntegrationTargets()
        };
        
        console.log('🔍 Context Analysis:', analysis);
        return analysis;
    }
    
    analyzeRoutingType() {
        if (location.hash.includes('/')) return 'hash-based';
        if (window.history.pushState) return 'history-api';
        return 'traditional';
    }
    
    analyzeChatSystem() {
        const chatElements = document.querySelectorAll('[class*="chat"], [class*="message"], [id*="chat"]');
        return {
            found: chatElements.length > 0,
            elements: chatElements.length,
            hasInput: !!document.querySelector('input[type="text"], textarea'),
            hasFileUpload: !!document.querySelector('input[type="file"]')
        };
    }
    
    analyzeTabSystem() {
        const tabElements = document.querySelectorAll('.tab, [role="tab"], .nav-tab');
        const hashTabs = Array.from(document.querySelectorAll('a')).filter(a => 
            a.href.includes('#/') || a.getAttribute('href')?.startsWith('#/'));
            
        return {
            found: tabElements.length > 0 || hashTabs.length > 0,
            tabElements: tabElements.length,
            hashTabs: hashTabs.length,
            routes: hashTabs.map(tab => tab.getAttribute('href'))
        };
    }
    
    findIntegrationTargets() {
        const targets = [];
        
        // Look for tetraban targets
        const tetrabanTargets = [
            ...document.querySelectorAll('[class*="tetraban"], [id*="tetraban"]'),
            ...document.querySelectorAll('.main-content, .page-content, .tab-content')
        ];
        
        if (tetrabanTargets.length > 0) {
            targets.push({ type: 'tetraban', elements: tetrabanTargets.length });
        }
        
        // Look for changes targets
        const changeTargets = document.querySelectorAll('[class*="change"], [id*="change"]');
        if (changeTargets.length > 0) {
            targets.push({ type: 'changes', elements: changeTargets.length });
        }
        
        return targets;
    }
    
    exportPatterns() {
        return {
            total: this.patterns.size,
            patterns: Array.from(this.patterns.values()),
            categories: this.getCategoryCounts(),
            timestamp: Date.now()
        };
    }
    
    getCategoryCounts() {
        const counts = {};
        this.categories.forEach(cat => counts[cat] = 0);
        
        this.patterns.forEach(pattern => {
            const category = this.categorizePattern(pattern);
            if (counts.hasOwnProperty(category)) {
                counts[category]++;
            }
        });
        
        return counts;
    }
    
    categorizePattern(pattern) {
        const id = pattern.id.toLowerCase();
        
        if (id.includes('f1')) return 'framework-detection';
        if (id.includes('r1')) return 'injection-strategies';
        if (id.includes('u1')) return 'universal-compatibility';
        if (id.includes('m1')) return 'portal-architecture';
        if (id.includes('c1')) return 'chat-enhancement';
        if (id.includes('n1')) return 'collaboration-systems';
        if (id.includes('p1')) return 'physics-integration';
        if (id.includes('i1')) return 'ui-transformation';
        
        return 'uncategorized';
    }
}

class PatternDiscoveryEngine {
    constructor() {
        this.observationWindow = 5000; // 5 seconds
        this.observations = [];
    }
    
    observe(event, data) {
        this.observations.push({
            event,
            data,
            timestamp: Date.now()
        });
        
        // Clean old observations
        const cutoff = Date.now() - this.observationWindow;
        this.observations = this.observations.filter(obs => obs.timestamp > cutoff);
        
        return this.analyzePatterns();
    }
    
    analyzePatterns() {
        // Look for patterns in recent observations
        const patterns = [];
        
        // Frequency patterns
        const eventCounts = {};
        this.observations.forEach(obs => {
            eventCounts[obs.event] = (eventCounts[obs.event] || 0) + 1;
        });
        
        // High frequency events might indicate automation or user behavior patterns
        Object.entries(eventCounts).forEach(([event, count]) => {
            if (count >= 3) {
                patterns.push({
                    type: 'frequency',
                    event,
                    count,
                    description: `High frequency ${event} events detected`
                });
            }
        });
        
        return patterns;
    }
}

// Auto-initialize when script loads
if (typeof window !== 'undefined') {
    window.NovelPatternGenerator = NovelPatternGenerator;
    
    // Start pattern discovery immediately
    window.patternGenerator = new NovelPatternGenerator();
    
    // Expose pattern export function globally
    window.exportNovelPatterns = () => {
        const export_data = window.patternGenerator.exportPatterns();
        console.log('🧬 Novel Patterns Export:', export_data);
        return export_data;
    };
    
    // Listen for pattern discovery events
    document.addEventListener('novelPatternDiscovered', (e) => {
        console.log('🎯 Pattern Event:', e.detail);
    });
    
    console.log('🧬 Novel Pattern Generator initialized - Discovering patterns...');
}