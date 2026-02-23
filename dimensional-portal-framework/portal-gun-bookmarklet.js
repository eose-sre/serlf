/**
 * 🔫 RICK'S PORTAL GUN - Bookmarklet Version
 * Drag this to your bookmarks bar and fire it at ANY portal!
 */

javascript:(function(){
    // Check if already loaded
    if (window.tetrabanPortalGun) {
        console.log('🔫 Portal Gun already loaded, firing again!');
        window.tetrabanPortalGun.fire();
        return;
    }

    // Load the Universal Injector
    const script = document.createElement('script');
    script.src = 'https://eose-sre.github.io/serlf/dimensional-portal-framework/universal-tetraban-injector.js';
    script.onload = function() {
        console.log('🔫 Portal Gun loaded, firing at portal...');
        
        const injector = new UniversalTetrabanInjector();
        injector.inject().then(result => {
            if (result.success) {
                alert(`🎯 Portal breached! Tetraban injected via ${result.method || result.framework}`);
            } else {
                alert('❌ Portal resistant! Check console for details.');
            }
        });
        
        // Create persistent portal gun object
        window.tetrabanPortalGun = {
            injector: injector,
            fire: () => injector.inject(),
            framework: injector.framework,
            loaded: true
        };
    };
    
    script.onerror = function() {
        alert('❌ Portal Gun failed to load! Check network connection.');
    };
    
    document.head.appendChild(script);
    
    // Show loading indicator
    const loader = document.createElement('div');
    loader.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(15, 23, 42, 0.95);
        color: #60a5fa;
        padding: 2rem;
        border-radius: 12px;
        border: 2px solid #3b82f6;
        z-index: 99999;
        text-align: center;
        font-family: monospace;
        box-shadow: 0 0 50px rgba(59, 130, 246, 0.8);
    `;
    loader.innerHTML = `
        <h2>🔫 RICK'S PORTAL GUN</h2>
        <p>Scanning portal architecture...</p>
        <p style="animation: pulse 1s infinite;">⚡ Preparing injection ⚡</p>
        <style>
            @keyframes pulse { 
                0%, 100% { opacity: 1; } 
                50% { opacity: 0.3; } 
            }
        </style>
    `;
    
    document.body.appendChild(loader);
    
    // Remove loader after 3 seconds
    setTimeout(() => {
        if (loader.parentNode) {
            loader.parentNode.removeChild(loader);
        }
    }, 3000);
})();

/* 
USAGE INSTRUCTIONS:
1. Copy this entire code block
2. Create a new bookmark in your browser  
3. Set the URL to this javascript code
4. Name it "🔫 Portal Gun"
5. Navigate to https://master1.eose.ca/#/tetraban
6. Click the Portal Gun bookmark
7. Watch the tetraban physics engine inject!

UNIVERSAL COMPATIBILITY:
✅ React portals
✅ Vue applications  
✅ Angular SPAs
✅ Hash-based routers
✅ Vanilla JS sites
✅ Custom frameworks
✅ Any portal that renders HTML!
*/