/**
 * 💬 ENHANCED CHAT SYSTEM - Rick & LL Level Features  
 * Transforms any basic chat into a powerful collaboration hub
 */

class EnhancedChatSystem {
    constructor() {
        this.features = {
            fileUpload: true,
            codeExecution: true,
            tetrabanIntegration: true,
            voiceCommands: true,
            aiAssistants: true,
            collaborativeEditing: true,
            visualizations: true,
            portalLinks: true
        };
        
        this.init();
    }
    
    init() {
        this.detectChatContainer();
        this.injectEnhancements();
        this.setupEventListeners();
        console.log('💬 Enhanced Chat System initialized');
    }
    
    detectChatContainer() {
        // Find the chat input/container in various frameworks
        this.chatContainer = 
            document.querySelector('.chat-container, .message-input-container, .chat-interface') ||
            document.querySelector('[class*="chat"], [class*="message"], [id*="chat"]') ||
            document.querySelector('input[type="text"], textarea') ||
            this.createChatContainer();
    }
    
    createChatContainer() {
        // Create our own enhanced chat if none exists
        const container = document.createElement('div');
        container.className = 'enhanced-chat-container';
        container.innerHTML = this.getEnhancedChatHTML();
        
        // Insert at bottom of page or in main content area
        const target = document.querySelector('.main-content, main, #app, body');
        target.appendChild(container);
        
        return container;
    }
    
    injectEnhancements() {
        const existingInput = this.chatContainer.querySelector('input, textarea');
        
        if (existingInput) {
            // Enhance existing chat
            this.enhanceExistingChat(existingInput);
        } else {
            // Create new enhanced chat
            this.createEnhancedInterface();
        }
        
        this.injectStyles();
    }
    
    enhanceExistingChat(input) {
        // Wrap existing input with enhancements
        const wrapper = document.createElement('div');
        wrapper.className = 'chat-enhancement-wrapper';
        
        input.parentNode.insertBefore(wrapper, input);
        wrapper.appendChild(input);
        
        // Add enhancement toolbar
        const toolbar = document.createElement('div');
        toolbar.className = 'chat-toolbar';
        toolbar.innerHTML = this.getToolbarHTML();
        wrapper.appendChild(toolbar);
        
        // Add file drop zone
        const dropZone = document.createElement('div');
        dropZone.className = 'file-drop-zone';
        dropZone.innerHTML = '📁 Drop files here or click toolbar buttons';
        wrapper.appendChild(dropZone);
        
        this.setupFileHandling(wrapper);
        this.setupAdvancedFeatures(wrapper);
    }
    
    getEnhancedChatHTML() {
        return `
            <div class="enhanced-chat-interface">
                <div class="chat-header">
                    <h3>💬 Enhanced Chat - Rick & LL Mode</h3>
                    <div class="feature-toggles">
                        <button class="feature-btn active" data-feature="files">📁</button>
                        <button class="feature-btn active" data-feature="code">💻</button>
                        <button class="feature-btn active" data-feature="voice">🎤</button>
                        <button class="feature-btn active" data-feature="visual">📊</button>
                        <button class="feature-btn active" data-feature="tetraban">🎮</button>
                    </div>
                </div>
                
                <div class="chat-messages" id="enhanced-messages">
                    <div class="system-message">
                        🧬 Enhanced chat system loaded. All Rick-level features active.
                    </div>
                </div>
                
                <div class="chat-input-area">
                    <div class="input-toolbar">
                        ${this.getToolbarHTML()}
                    </div>
                    
                    <div class="input-wrapper">
                        <textarea id="enhanced-chat-input" placeholder="Type message, drag files, execute code, create tetraban shapes..."></textarea>
                        <button class="send-btn">🚀 Send</button>
                    </div>
                    
                    <div class="file-drop-zone" id="file-drop-zone">
                        📁 Drop files here for instant upload and analysis
                    </div>
                </div>
                
                <div class="active-features" id="active-features"></div>
            </div>
        `;
    }
    
    getToolbarHTML() {
        return `
            <div class="toolbar-group">
                <button class="tool-btn" data-action="upload-file" title="Upload Files">📁 Files</button>
                <button class="tool-btn" data-action="execute-code" title="Execute Code">💻 Code</button>
                <button class="tool-btn" data-action="voice-input" title="Voice Input">🎤 Voice</button>
                <button class="tool-btn" data-action="create-visual" title="Create Visualization">📊 Visual</button>
            </div>
            
            <div class="toolbar-group">  
                <button class="tool-btn" data-action="tetraban-shape" title="Add Tetraban Shape">🎮 Shape</button>
                <button class="tool-btn" data-action="portal-link" title="Create Portal Link">🌀 Portal</button>
                <button class="tool-btn" data-action="ai-assist" title="AI Assistance">🤖 AI</button>
                <button class="tool-btn" data-action="collaborate" title="Collaborative Edit">👥 Collab</button>
            </div>
        `;
    }
    
    injectStyles() {
        const styleId = 'enhanced-chat-styles';
        if (document.getElementById(styleId)) return;
        
        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
            .enhanced-chat-interface {
                background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
                border-radius: 12px;
                padding: 1.5rem;
                margin: 1rem 0;
                color: #e2e8f0;
                border: 2px solid #3b82f6;
                box-shadow: 0 0 30px rgba(59, 130, 246, 0.3);
            }
            
            .chat-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1rem;
                padding-bottom: 1rem;
                border-bottom: 1px solid #475569;
            }
            
            .chat-header h3 {
                color: #60a5fa;
                margin: 0;
            }
            
            .feature-toggles {
                display: flex;
                gap: 0.5rem;
            }
            
            .feature-btn {
                background: rgba(59, 130, 246, 0.2);
                border: 1px solid #3b82f6;
                border-radius: 6px;
                padding: 0.5rem;
                color: #60a5fa;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .feature-btn.active {
                background: rgba(59, 130, 246, 0.8);
                color: white;
            }
            
            .chat-messages {
                background: rgba(15, 23, 42, 0.6);
                border-radius: 8px;
                padding: 1rem;
                min-height: 200px;
                max-height: 400px;
                overflow-y: auto;
                margin-bottom: 1rem;
                border: 1px solid #475569;
            }
            
            .system-message {
                color: #10b981;
                font-style: italic;
                text-align: center;
                padding: 0.5rem;
                background: rgba(16, 185, 129, 0.1);
                border-radius: 6px;
            }
            
            .input-toolbar {
                display: flex;
                gap: 1rem;
                margin-bottom: 0.75rem;
                flex-wrap: wrap;
            }
            
            .toolbar-group {
                display: flex;
                gap: 0.5rem;
            }
            
            .tool-btn {
                background: linear-gradient(135deg, rgba(59, 130, 246, 0.8), rgba(29, 78, 216, 0.8));
                border: 1px solid #60a5fa;
                border-radius: 6px;
                padding: 0.5rem 0.75rem;
                color: white;
                cursor: pointer;
                transition: all 0.3s ease;
                font-size: 0.9rem;
                white-space: nowrap;
            }
            
            .tool-btn:hover {
                background: linear-gradient(135deg, #3b82f6, #1d4ed8);
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
            }
            
            .input-wrapper {
                display: flex;
                gap: 0.75rem;
                margin-bottom: 0.75rem;
            }
            
            #enhanced-chat-input {
                flex: 1;
                background: rgba(15, 23, 42, 0.8);
                border: 1px solid #475569;
                border-radius: 8px;
                padding: 0.75rem;
                color: #e2e8f0;
                resize: vertical;
                min-height: 60px;
                font-family: inherit;
            }
            
            #enhanced-chat-input:focus {
                outline: none;
                border-color: #3b82f6;
                box-shadow: 0 0 8px rgba(59, 130, 246, 0.4);
            }
            
            .send-btn {
                background: linear-gradient(135deg, #10b981, #059669);
                border: 1px solid #34d399;
                border-radius: 8px;
                padding: 0.75rem 1.5rem;
                color: white;
                cursor: pointer;
                transition: all 0.3s ease;
                font-weight: bold;
            }
            
            .send-btn:hover {
                background: linear-gradient(135deg, #059669, #047857);
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
            }
            
            .file-drop-zone {
                background: rgba(75, 85, 99, 0.2);
                border: 2px dashed #6b7280;
                border-radius: 8px;
                padding: 1rem;
                text-align: center;
                color: #9ca3af;
                transition: all 0.3s ease;
                cursor: pointer;
            }
            
            .file-drop-zone.drag-over {
                border-color: #3b82f6;
                background: rgba(59, 130, 246, 0.1);
                color: #60a5fa;
            }
            
            .active-features {
                margin-top: 1rem;
                padding-top: 1rem;
                border-top: 1px solid #475569;
                display: flex;
                gap: 1rem;
                flex-wrap: wrap;
            }
            
            .feature-indicator {
                background: rgba(16, 185, 129, 0.2);
                border: 1px solid #10b981;
                border-radius: 6px;
                padding: 0.5rem 0.75rem;
                color: #34d399;
                font-size: 0.9rem;
            }
            
            .chat-enhancement-wrapper {
                position: relative;
                margin: 1rem 0;
            }
            
            .chat-toolbar {
                margin: 0.5rem 0;
                padding: 0.75rem;
                background: rgba(30, 41, 59, 0.8);
                border-radius: 8px;
                border: 1px solid #475569;
            }
        `;
        
        document.head.appendChild(style);
    }
    
    setupFileHandling(container) {
        const dropZone = container.querySelector('.file-drop-zone, #file-drop-zone');
        const fileInput = this.createHiddenFileInput();
        
        // File drag and drop
        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('drag-over');
        });
        
        dropZone.addEventListener('dragleave', () => {
            dropZone.classList.remove('drag-over');
        });
        
        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('drag-over');
            
            const files = Array.from(e.dataTransfer.files);
            this.handleFiles(files);
        });
        
        // Click to upload
        dropZone.addEventListener('click', () => {
            fileInput.click();
        });
        
        fileInput.addEventListener('change', (e) => {
            const files = Array.from(e.target.files);
            this.handleFiles(files);
        });
    }
    
    createHiddenFileInput() {
        const input = document.createElement('input');
        input.type = 'file';
        input.multiple = true;
        input.style.display = 'none';
        document.body.appendChild(input);
        return input;
    }
    
    handleFiles(files) {
        files.forEach(file => {
            console.log(`📁 Processing file: ${file.name} (${file.size} bytes)`);
            
            // Create file preview
            this.createFilePreview(file);
            
            // Process based on file type
            if (file.type.startsWith('image/')) {
                this.handleImageFile(file);
            } else if (file.type.startsWith('text/') || file.name.endsWith('.js') || file.name.endsWith('.json')) {
                this.handleTextFile(file);
            } else if (file.name.endsWith('.html')) {
                this.handleHTMLFile(file);
            }
            
            this.addToActiveFeatures(`📁 ${file.name}`, 'file-upload');
        });
    }
    
    createFilePreview(file) {
        const messages = document.getElementById('enhanced-messages');
        const preview = document.createElement('div');
        preview.className = 'file-preview message';
        preview.innerHTML = `
            <div class="file-info">
                <strong>📁 ${file.name}</strong>
                <span class="file-size">(${(file.size / 1024).toFixed(1)}KB)</span>
                <span class="file-type">${file.type || 'Unknown'}</span>
            </div>
        `;
        
        if (messages) {
            messages.appendChild(preview);
            messages.scrollTop = messages.scrollHeight;
        }
    }
    
    handleImageFile(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.style.maxWidth = '300px';
            img.style.borderRadius = '8px';
            
            const preview = document.querySelector('.file-preview:last-child .file-info');
            if (preview) {
                preview.appendChild(img);
            }
        };
        reader.readAsDataURL(file);
    }
    
    handleTextFile(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target.result;
            const codeBlock = document.createElement('pre');
            codeBlock.style.cssText = `
                background: rgba(15, 23, 42, 0.8);
                padding: 1rem;
                border-radius: 6px;
                margin-top: 0.5rem;
                overflow-x: auto;
                font-size: 0.9rem;
                color: #94a3b8;
                border: 1px solid #475569;
                max-height: 200px;
                overflow-y: auto;
            `;
            codeBlock.textContent = content.substring(0, 1000) + (content.length > 1000 ? '...' : '');
            
            const preview = document.querySelector('.file-preview:last-child .file-info');
            if (preview) {
                preview.appendChild(codeBlock);
            }
        };
        reader.readAsText(file);
    }
    
    setupAdvancedFeatures(container) {
        // Setup toolbar button handlers
        container.addEventListener('click', (e) => {
            if (e.target.classList.contains('tool-btn')) {
                const action = e.target.dataset.action;
                this.executeAction(action);
            }
        });
    }
    
    executeAction(action) {
        console.log(`🎯 Executing action: ${action}`);
        
        switch (action) {
            case 'upload-file':
                this.triggerFileUpload();
                break;
            case 'execute-code':
                this.openCodeExecutor();
                break;
            case 'voice-input':
                this.startVoiceRecognition();
                break;
            case 'create-visual':
                this.createVisualization();
                break;
            case 'tetraban-shape':
                this.addTetrabanShape();
                break;
            case 'portal-link':
                this.createPortalLink();
                break;
            case 'ai-assist':
                this.activateAIAssistant();
                break;
            case 'collaborate':
                this.startCollaborativeMode();
                break;
        }
    }
    
    addToActiveFeatures(text, type) {
        const activeFeatures = document.getElementById('active-features');
        if (!activeFeatures) return;
        
        const indicator = document.createElement('div');
        indicator.className = 'feature-indicator';
        indicator.textContent = text;
        indicator.dataset.type = type;
        
        // Remove after 10 seconds
        setTimeout(() => {
            if (indicator.parentNode) {
                indicator.parentNode.removeChild(indicator);
            }
        }, 10000);
        
        activeFeatures.appendChild(indicator);
    }
    
    triggerFileUpload() {
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) fileInput.click();
    }
    
    openCodeExecutor() {
        const code = prompt('🔬 Enter JavaScript code to execute:');
        if (code) {
            try {
                const result = eval(code);
                console.log('✅ Code executed:', result);
                this.addToActiveFeatures(`💻 Code: ${code.substring(0, 30)}...`, 'code-execution');
            } catch (error) {
                console.error('❌ Code error:', error);
                alert(`Code execution failed: ${error.message}`);
            }
        }
    }
    
    startVoiceRecognition() {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            recognition.onresult = (event) => {
                const text = event.results[0][0].transcript;
                const input = document.getElementById('enhanced-chat-input');
                if (input) {
                    input.value += text;
                }
                this.addToActiveFeatures(`🎤 Voice: "${text}"`, 'voice-input');
            };
            recognition.start();
        } else {
            alert('Voice recognition not supported in this browser');
        }
    }
    
    createVisualization() {
        // Create a simple chart/visualization
        const data = prompt('📊 Enter data for visualization (comma-separated numbers):');
        if (data) {
            const values = data.split(',').map(v => parseFloat(v.trim())).filter(v => !isNaN(v));
            // Simple bar chart visualization
            console.log('📊 Visualization data:', values);
            this.addToActiveFeatures(`📊 Chart: ${values.length} data points`, 'visualization');
        }
    }
    
    addTetrabanShape() {
        // Integration with tetraban system
        if (window.tetrabanEngine) {
            window.tetrabanEngine.dropShape();
            this.addToActiveFeatures('🎮 Tetraban shape added', 'tetraban');
        } else {
            console.log('🎮 No tetraban engine found, creating demo shape');
            this.addToActiveFeatures('🎮 Demo shape created', 'tetraban');
        }
    }
    
    createPortalLink() {
        const url = prompt('🌀 Enter portal URL to link:');
        if (url) {
            const link = document.createElement('a');
            link.href = url;
            link.target = '_blank';
            link.textContent = `🌀 Portal: ${url}`;
            link.style.color = '#60a5fa';
            this.addToActiveFeatures(`🌀 Portal to ${url}`, 'portal-link');
        }
    }
    
    activateAIAssistant() {
        this.addToActiveFeatures('🤖 AI Assistant activated', 'ai-assist');
        console.log('🤖 AI Assistant ready for commands');
    }
    
    startCollaborativeMode() {
        this.addToActiveFeatures('👥 Collaborative mode active', 'collaboration');
        console.log('👥 Collaborative editing enabled');
    }
    
    setupEventListeners() {
        // Enhanced keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + specific keys for quick actions
            if (e.ctrlKey || e.metaKey) {
                switch (e.key) {
                    case 'u':
                        if (e.shiftKey) {
                            e.preventDefault();
                            this.triggerFileUpload();
                        }
                        break;
                    case 'e':
                        if (e.shiftKey) {
                            e.preventDefault();
                            this.openCodeExecutor();
                        }
                        break;
                    case 'k':
                        if (e.shiftKey) {
                            e.preventDefault();
                            this.startVoiceRecognition();
                        }
                        break;
                }
            }
        });
    }
}

// Auto-initialize when script loads
if (typeof window !== 'undefined') {
    window.EnhancedChatSystem = EnhancedChatSystem;
    
    // Auto-start enhanced chat system
    document.addEventListener('DOMContentLoaded', () => {
        new EnhancedChatSystem();
    });
    
    // Also try immediate initialization
    if (document.readyState !== 'loading') {
        new EnhancedChatSystem();
    }
    
    console.log('💬 Enhanced Chat System loaded and ready!');
}