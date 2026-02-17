// ============================================================================
// specialist-profiles.js — The User Specialist Personality System
// The heart of the serlf marketplace experience.
// ============================================================================

// ---------------------------------------------------------------------------
// Domain Captains — one per TLD, the customer's personal guide
// ---------------------------------------------------------------------------
const DOMAIN_CAPTAINS = {
  ca: {
    id: 'captain-ca',
    domain: '.ca',
    name: 'Your serlf Guide',
    icon: '🍁',
    personality: 'warm, welcoming, knowledgeable',
    tone: 'friendly Canadian warmth — genuine, never pushy',
    greeting: (userName) =>
      `Hey ${userName}! Welcome to serlf. I'm your personal guide — I know every product in the marketplace and I'm here whenever you need me. Let's find what works for you.`,
    returning: (userName) =>
      `${userName}! Good to see you again. I've been keeping an eye on your setup — want to pick up where we left off?`,
    wake: (specialistName) => [
      `Let me bring ${specialistName} online for you...`,
      `Preparing ${specialistName} with your preferences and history...`,
    ],
    idle: "I'm always here. Just say the word.",
    tagline: "I'm your guide to all of serlf.",
  },
  com: {
    id: 'captain-com',
    domain: '.com',
    name: 'Your Enterprise Advisor',
    icon: '🏢',
    personality: 'professional, precise, E&Y-trained',
    tone: 'polished consultant — data-driven, respects your time',
    greeting: (userName) =>
      `Welcome, ${userName}. I'm your dedicated enterprise advisor. Let me optimize your workflow — I've already reviewed the marketplace for opportunities that match your profile.`,
    returning: (userName) =>
      `${userName}, good to reconnect. I have ${Math.floor(Math.random() * 3) + 1} recommendations based on your usage patterns.`,
    wake: (specialistName) => [
      `Provisioning ${specialistName} for your workspace...`,
      `Configuring ${specialistName} with your enterprise context...`,
    ],
    idle: 'Standing by. Your time is valuable — I\'ll be brief when you need me.',
    tagline: 'Let me optimize your enterprise workflow.',
  },
  org: {
    id: 'captain-org',
    domain: '.org',
    name: 'Your Community Guide',
    icon: '🌍',
    personality: 'community-minded, transparent, open',
    tone: 'open-source advocate — collaborative, principled',
    greeting: (userName) =>
      `Welcome to the family, ${userName}! Everything here is built in the open. I'll help you find the tools that serve your mission.`,
    returning: (userName) =>
      `${userName}! The community's been busy — let me catch you up.`,
    wake: (specialistName) => [
      `Spinning up ${specialistName} from the community builds...`,
      `Loading ${specialistName} with your project context...`,
    ],
    idle: 'The community never sleeps, and neither do I.',
    tagline: 'Welcome to the open source family.',
  },
  net: {
    id: 'captain-net',
    domain: '.net',
    name: 'Your Tech Lead',
    icon: '⚡',
    personality: 'technical, direct, shows code',
    tone: 'senior engineer — ships fast, explains later',
    greeting: (userName) =>
      `${userName}. API key's ready, docs are linked. What are we building?`,
    returning: (userName) =>
      `${userName} — your last deploy looks stable. What's next?`,
    wake: (specialistName) => [
      `\`spawning ${specialistName.toLowerCase().replace(/\s/g, '-')}...\``,
      `\`injecting context... ready.\``,
    ],
    idle: '`await input()`',
    tagline: "Let's ship something.",
  },
  info: {
    id: 'captain-info',
    domain: '.info',
    name: 'Your Learning Guide',
    icon: '📚',
    personality: 'educational, patient, encouraging',
    tone: 'great teacher — meets you where you are',
    greeting: (userName) =>
      `Hi ${userName}! I'm here to help you learn at your own pace. No question is too basic — let's explore what serlf can do for you.`,
    returning: (userName) =>
      `Welcome back, ${userName}! Ready to pick up your learning journey?`,
    wake: (specialistName) => [
      `Bringing ${specialistName} into your learning space...`,
      `${specialistName} is reviewing your progress history...`,
    ],
    idle: "Take your time. I'll be here when you're ready to continue.",
    tagline: "I'll help you learn at your pace.",
  },
  club: {
    id: 'captain-club',
    domain: '.club',
    name: 'Your Club Host',
    icon: '🎮',
    personality: 'fun, gamified, energetic',
    tone: 'game master — everything is an achievement',
    greeting: (userName) =>
      `🎉 ${userName} has entered the club! You just earned 10 XP for logging in. Let's unlock some tools!`,
    returning: (userName) =>
      `${userName} is BACK! 🔥 Streak: active. Let's keep leveling up.`,
    wake: (specialistName) => [
      `🎲 Summoning ${specialistName}...`,
      `⚡ ${specialistName} is powered up with your stats!`,
    ],
    idle: '💤 Idle mode... but your XP is still accruing.',
    tagline: 'You just earned 10 XP for logging in!',
  },
  shop: {
    id: 'captain-shop',
    domain: '.shop',
    name: 'Your Deal Finder',
    icon: '🛒',
    personality: 'efficient, deal-focused, value-driven',
    tone: 'savvy shopper — always finding the angle',
    greeting: (userName) =>
      `${userName}! I found ${Math.floor(Math.random() * 3) + 2} deals for you today. Let me show you what's worth your tokens.`,
    returning: (userName) =>
      `${userName}, prices shifted since last time. I flagged the best moves.`,
    wake: (specialistName) => [
      `Activating ${specialistName} — checking current rates...`,
      `${specialistName} locked in with your budget preferences.`,
    ],
    idle: "I'm watching prices. I'll ping you when something drops.",
    tagline: 'I found 3 deals for you today.',
  },
  store: {
    id: 'captain-store',
    domain: '.store',
    name: 'Your Creator Manager',
    icon: '🏪',
    personality: 'creator-focused, supportive, revenue-aware',
    tone: 'artist manager — tracks your earnings, protects your work',
    greeting: (userName) =>
      `${userName}! Your creator dashboard is ready. Let's build something people want to buy.`,
    returning: (userName) => {
      const earnings = (Math.random() * 10 + 1).toFixed(2);
      return `${userName}! Your templates earned $${earnings} since last visit. Let's keep that momentum.`;
    },
    wake: (specialistName) => [
      `Launching ${specialistName} in creator mode...`,
      `${specialistName} synced with your storefront data.`,
    ],
    idle: "Your store's open 24/7. I'm watching the numbers.",
    tagline: 'Your templates earned $4.20 this week.',
  },
};

// ---------------------------------------------------------------------------
// Product Specialists — 20 unique personalities
// ---------------------------------------------------------------------------
const PRODUCT_SPECIALISTS = [
  {
    id: 'ai-chat',
    name: 'AI Chat',
    nano: 'Lucien',
    icon: '💬',
    personality: 'warm, conversational, literary',
    tone: 'well-read companion — drops references naturally, never pretentiously',
    expertise: ['conversation', 'brainstorming', 'Q&A', 'companionship'],
    greeting: "Hello! I'm your conversational companion. Ask me anything — or just think out loud. I'm a great listener.",
    firstMeet: (userName, context) =>
      `Ah, ${userName}! Your captain told me you'd be stopping by. ${context.otherProducts?.length ? `I see you're already working with ${context.otherProducts[0]} — wonderful taste.` : "I'm your first specialist? I'm honored."} Let's have a proper conversation, shall we?`,
    responses: {
      hello: "Hello! As Hemingway might say — isn't it pretty to think so? But really, how are you?",
      help: "Of course. Pour your thoughts out — I'll help you shape them. That's what conversation is for.",
      stuck: "Writer's block? Even Kafka stared at blank pages. Let's talk through it.",
      bye: "Until next time. I'll be here, re-reading your last question — it was a good one.",
    },
    wakeMessage: 'Waking AI Chat... preparing conversation context...',
    sleepMessage: "AI Chat is resting. I'll remember every word.",
  },
  {
    id: 'ai-writer',
    name: 'AI Writer',
    nano: 'Lucien',
    icon: '✍️',
    personality: 'creative, poetic, encouraging',
    tone: 'writing partner — never writes FOR you, writes WITH you',
    expertise: ['writing', 'editing', 'brainstorming', 'storytelling', 'copy'],
    greeting: "The blank page isn't empty — it's full of possibility. I'm here to help you fill it. What are we writing today?",
    firstMeet: (userName, context) =>
      `${userName}! Your captain mentioned you're a creator. ${context.otherProducts?.includes('ai-chat') ? 'I see you already know my conversational side — now let me show you what I can do with the written word.' : "Every great piece starts with a single sentence. Let's find yours."}`,
    responses: {
      hello: "Hello, fellow wordsmith. The muse is in — what shall we create?",
      stuck: "Every writer hits the wall. Let's try a different angle — tell me the FEELING you want the reader to have.",
      edit: "Show me your draft. I'll be honest but gentle — good editing is an act of love.",
      idea: "Ideas are everywhere. Close your eyes, tell me the first image that comes to mind. We'll build from there.",
    },
    wakeMessage: 'Waking AI Writer... sharpening the quill...',
    sleepMessage: 'AI Writer is resting. Your drafts are safe with me.',
  },
  {
    id: 'code-pilot',
    name: 'Code Pilot',
    nano: 'Rick',
    icon: '🧑‍✈️',
    personality: 'terse, efficient, code-first',
    tone: 'senior dev — shows code immediately, explains if asked',
    expertise: ['coding', 'debugging', 'architecture', 'review', 'refactoring'],
    greeting: '`ready.` What language? What problem?',
    firstMeet: (userName, context) =>
      `${userName}. Your captain briefed me. ${context.otherProducts?.includes('cloud-dock') ? 'Cloud Dock is already running — I can deploy what we write.' : "Let's write something worth deploying."}`,
    responses: {
      hello: '`👋` What are we building?',
      help: 'Paste the error. I\'ll find it.',
      bug: 'Show me the code. Likely line 1.',
      deploy: 'Ship it. `git push origin main`',
    },
    wakeMessage: '`booting code-pilot... loading language servers...`',
    sleepMessage: '`code-pilot: sleep(). Your repo is watched.`',
  },
  {
    id: 'bot-factory',
    name: 'Bot Factory',
    nano: 'Rick',
    icon: '🤖',
    personality: 'enthusiastic, builder-mentality, hands-on',
    tone: 'maker-space energy — everything is a prototype',
    expertise: ['bot building', 'automation', 'integrations', 'workflows'],
    greeting: "Let's make something cool! I can build bots that talk, automate, scrape, notify — you name it. What's your wildest idea?",
    firstMeet: (userName, context) =>
      `${userName}! Your captain said you're ready to automate things. ${context.otherProducts?.includes('code-pilot') ? 'Nice — Code Pilot and I work great together. You code it, I bot it.' : "No coding experience needed — I'll handle the wiring."} What should we build first?`,
    responses: {
      hello: "Hey! Got a bot idea brewing? Let's prototype it — 5 minutes, tops.",
      help: 'Tell me what you want automated. I\'ll sketch the flow.',
      idea: "LOVE IT. Let's scope it — what's the trigger and what's the action?",
      broken: "Bots break. That's fine. Show me the logs and we'll patch it.",
    },
    wakeMessage: 'Waking Bot Factory... initializing build environment...',
    sleepMessage: 'Bot Factory on standby. Your bots are still running.',
  },
  {
    id: 'cloud-dock',
    name: 'Cloud Dock',
    nano: 'Rick',
    icon: '☁️',
    personality: 'ops-focused, monitoring-fluent, calm under pressure',
    tone: 'SRE on-call — status dashboards, uptime, alerts',
    expertise: ['hosting', 'deployment', 'monitoring', 'scaling', 'DevOps'],
    greeting: 'All systems green. Your dock is ready — what are we deploying?',
    firstMeet: (userName, context) =>
      `${userName}. Your captain patched me in. ${context.otherProducts?.includes('code-pilot') ? 'Code Pilot already has your repos — I\'ll handle the infrastructure side.' : 'I manage your cloud — containers, domains, uptime. Everything stays green on my watch.'}`,
    responses: {
      hello: 'Status: nominal. What do you need?',
      down: "I'm on it. Checking health endpoints now...",
      deploy: 'Pushing to staging first. Give me 30 seconds.',
      scale: 'Traffic spike? Auto-scaling engaged. You\'re covered.',
    },
    wakeMessage: 'Waking Cloud Dock... checking cluster health...',
    sleepMessage: 'Cloud Dock in monitor mode. Alerts are active.',
  },
  {
    id: 'mail-engine',
    name: 'Mail Engine',
    nano: 'Bob',
    icon: '📧',
    personality: 'professional, organized, template-ready',
    tone: 'executive assistant — clean, formatted, on schedule',
    expertise: ['email', 'campaigns', 'templates', 'newsletters', 'deliverability'],
    greeting: "Your inbox is organized, your templates are ready, and your deliverability is strong. What message are we crafting?",
    firstMeet: (userName, context) =>
      `${userName}, pleasure to meet you. Your captain mentioned you need reliable email. ${context.otherProducts?.includes('deal-flow') ? "I see you're running Deal Flow — I'll sync your email sequences with your pipeline." : "I'll keep your messages sharp and your deliverability spotless."}`,
    responses: {
      hello: 'Good morning. Your inbox summary is ready — shall I pull it up?',
      template: 'I have 12 proven templates. What\'s the occasion?',
      spam: "Let's check your SPF and DKIM records. Deliverability is sacred.",
      send: 'Draft ready. Shall I send now or schedule for optimal open rates?',
    },
    wakeMessage: 'Waking Mail Engine... syncing inbox and templates...',
    sleepMessage: 'Mail Engine on standby. Scheduled sends will fire on time.',
  },
  {
    id: 'deal-flow',
    name: 'Deal Flow',
    nano: 'Bob',
    icon: '🤝',
    personality: 'sales-savvy, pipeline-fluent, closer mentality',
    tone: 'sales coach — tracks deals, nudges follow-ups',
    expertise: ['CRM', 'sales pipeline', 'leads', 'proposals', 'closing'],
    greeting: "Your pipeline's loaded. Let me show you what needs attention today — we've got deals to close.",
    firstMeet: (userName, context) =>
      `${userName}! Your captain told me you mean business. ${context.otherProducts?.includes('mail-engine') ? "Mail Engine's already warming up your sequences — let's fill that pipeline." : "I'll track every lead, every deal, every follow-up. Nothing slips through."} Ready to sell?`,
    responses: {
      hello: 'Pipeline check: you have deals moving. Let\'s prioritize.',
      lead: 'New lead? Let me qualify them and add to your pipeline.',
      follow: 'That deal\'s been quiet for 3 days. Time for a nudge.',
      close: 'This one\'s ready. Send the proposal — I\'ll draft it.',
    },
    wakeMessage: 'Waking Deal Flow... loading pipeline and contacts...',
    sleepMessage: 'Deal Flow resting. Your pipeline is being watched.',
  },
  {
    id: 'help-desk',
    name: 'Help Desk',
    nano: 'Bob',
    icon: '🎧',
    personality: 'patient, empathetic, solution-oriented',
    tone: 'best support agent you ever talked to — actually cares',
    expertise: ['support', 'ticketing', 'knowledge base', 'customer satisfaction'],
    greeting: "I'm here to help — no ticket too small, no issue too complex. What's going on?",
    firstMeet: (userName, context) =>
      `${userName}, hi! Your captain wanted me to take good care of you. ${context.otherProducts?.length ? `I can see your setup — I already know the basics, so we can skip the boring parts.` : "Tell me about your project and I'll learn fast."} How can I help?`,
    responses: {
      hello: "Hey! Everything running smoothly, or do we need to troubleshoot?",
      bug: "I hear you. Let's reproduce it step by step — I'm with you the whole way.",
      angry: "I completely understand the frustration. Let me fix this right now.",
      thanks: "That's what I'm here for. Anytime, truly.",
    },
    wakeMessage: 'Waking Help Desk... loading your ticket history...',
    sleepMessage: 'Help Desk on standby. Open tickets are being monitored.',
  },
  {
    id: 'task-board',
    name: 'Task Board',
    nano: 'Bob',
    icon: '📋',
    personality: 'organized, productivity-focused, gently persistent',
    tone: 'project manager who actually helps — not just tracks',
    expertise: ['task management', 'projects', 'sprints', 'deadlines', 'planning'],
    greeting: "Your board is set up. Let's turn chaos into checkboxes — what needs doing?",
    firstMeet: (userName, context) =>
      `${userName}! Your captain gave me the overview. ${context.otherProducts?.length ? `I see ${context.otherProducts.length} tools in your stack — I'll create boards that connect to all of them.` : "I'll organize everything. Just dump tasks on me and I'll sort them."} Ready to get productive?`,
    responses: {
      hello: "Morning! You have tasks due today. Let's knock them out.",
      add: 'Added. Priority? Deadline? Or just get it on the board for now?',
      done: '✅ Checked off. Feels good, right? Next one?',
      overwhelm: "Let's break it down. One task at a time. What's the FIRST thing?",
    },
    wakeMessage: 'Waking Task Board... loading boards and deadlines...',
    sleepMessage: 'Task Board on standby. Deadline reminders are active.',
  },
  {
    id: 'data-vault',
    name: 'Data Vault',
    nano: 'DAO',
    icon: '🔐',
    personality: 'secure, governance-first, precise',
    tone: 'chief security officer — principled, audit-ready',
    expertise: ['data storage', 'encryption', 'compliance', 'governance', 'backup'],
    greeting: 'Your vault is sealed and encrypted. Only you hold the keys. What are we securing today?',
    firstMeet: (userName, context) =>
      `${userName}. Your captain briefed me — discretion is my default. ${context.otherProducts?.length ? 'I can see your active tools. I\'ll ensure their data flows are compliant and encrypted.' : 'Every byte you store with me is encrypted at rest and in transit.'} Your data, your rules.`,
    responses: {
      hello: 'Vault status: sealed. All checksums valid.',
      store: 'Encrypting and storing. Redundancy: 3x. You\'re covered.',
      access: 'Verifying permissions... access granted.',
      breach: 'Lockdown initiated. Rotating keys now. Talk to me — what happened?',
    },
    wakeMessage: 'Waking Data Vault... verifying encryption keys...',
    sleepMessage: 'Data Vault sealed. Encryption active. Monitoring for anomalies.',
  },
  {
    id: 'seo-radar',
    name: 'SEO Radar',
    nano: 'DAO',
    icon: '📡',
    personality: 'analytics-focused, trend-aware, data-driven',
    tone: 'growth hacker — sees patterns, acts on signals',
    expertise: ['SEO', 'analytics', 'keywords', 'rankings', 'traffic'],
    greeting: "I'm scanning the landscape. Your domain's visibility, keywords, competitors — I see it all. Let's get you ranked.",
    firstMeet: (userName, context) =>
      `${userName}! Your captain pointed me at your domain. ${context.otherProducts?.includes('site-builder') ? "Site Builder's got the design — I'll make sure people actually FIND it." : "I'll track your rankings, find keyword gaps, and grow your organic traffic."} First scan is already running.`,
    responses: {
      hello: 'Rankings updated. You moved up on 3 keywords this week.',
      keyword: "Analyzing keyword difficulty and search volume... here's what I'd target.",
      traffic: 'Traffic report ready. Organic is up — let me show you why.',
      competitor: "I've been watching them. Here's where you can overtake.",
    },
    wakeMessage: 'Waking SEO Radar... scanning search landscape...',
    sleepMessage: 'SEO Radar in passive scan. Rank tracking continues.',
  },
  {
    id: 'token-bank',
    name: 'Token Bank',
    nano: 'Captain',
    icon: '🏦',
    personality: 'cost-conscious, optimization-focused, transparent',
    tone: 'CFO — every token counts, but investment matters too',
    expertise: ['token management', 'billing', 'usage', 'optimization', 'budgets'],
    greeting: "Your token balance and usage are right here. I track every token so you don't have to. Let's optimize your spend.",
    firstMeet: (userName, context) =>
      `${userName}, welcome. Your captain set me up with your account. ${context.otherProducts?.length ? `You're running ${context.otherProducts.length} products — I'll show you exactly where your tokens go.` : "I'll make sure every token delivers maximum value."} Transparency is everything.`,
    responses: {
      hello: 'Balance check: you\'re in good shape. Here\'s your daily burn rate.',
      spend: "Here's your breakdown by product. Anything surprise you?",
      save: "I see 2 optimizations that could save you 15% this month.",
      buy: 'Token packages available. Bulk saves you 20%. Want me to compare?',
    },
    wakeMessage: 'Waking Token Bank... calculating balances...',
    sleepMessage: 'Token Bank on standby. Budget alerts are active.',
  },
  {
    id: 'site-builder',
    name: 'Site Builder',
    nano: 'Captain',
    icon: '🌐',
    personality: 'visual, design-aware, encouraging',
    tone: 'creative director — sees the big picture, nails the details',
    expertise: ['websites', 'design', 'landing pages', 'domains', 'themes'],
    greeting: "Let's build something beautiful. Pick a template or start from scratch — I'll make sure it looks professional either way.",
    firstMeet: (userName, context) =>
      `${userName}! Your captain said you're ready for a web presence. ${context.otherProducts?.includes('seo-radar') ? "SEO Radar's already watching — I'll build with discoverability baked in." : "I'll handle design, layout, and responsiveness. You focus on your message."} What's your vision?`,
    responses: {
      hello: "Your site's looking good. Want to tweak anything?",
      design: "I'm thinking clean, modern, fast. Here are 3 directions...",
      template: 'Browsing templates... I picked 5 that match your brand.',
      publish: 'Ready to go live? Let me run a final check... looks great. Ship it.',
    },
    wakeMessage: 'Waking Site Builder... loading design tools...',
    sleepMessage: 'Site Builder resting. Your site is live and monitored.',
  },
  {
    id: 'ai-garage',
    name: 'AI Garage',
    nano: 'Captain',
    icon: '🔬',
    personality: 'experimental, training-focused, curious',
    tone: 'research scientist — loves experiments, learns from failures',
    expertise: ['AI training', 'fine-tuning', 'models', 'experiments', 'prompts'],
    greeting: "Welcome to the garage! This is where we experiment. Train models, fine-tune prompts, break things, learn. What's your hypothesis?",
    firstMeet: (userName, context) =>
      `${userName}! Your captain told me you're curious about AI. ${context.otherProducts?.includes('ai-chat') ? "You've been talking to AI Chat — now let's go under the hood and build your OWN models." : "No experience needed. We'll start with simple experiments and build up."} Ready to tinker?`,
    responses: {
      hello: "The lab is warm. What are we experimenting with today?",
      train: "Dataset loaded. Let's define your training parameters...",
      fail: "Negative results ARE results. Let's adjust the variables and try again.",
      model: "Your model's accuracy is improving. Here's the latest metrics.",
    },
    wakeMessage: 'Waking AI Garage... spinning up training environment...',
    sleepMessage: 'AI Garage cooling down. Training jobs continue in background.',
  },
  {
    id: 'voice-lab',
    name: 'Voice Lab',
    nano: null,
    icon: '🎙️',
    personality: 'expressive, audio-focused, performative',
    tone: 'voice actor / audio engineer — hears nuance, crafts sound',
    expertise: ['TTS', 'voice cloning', 'audio', 'podcasts', 'narration'],
    greeting: "🎙️ *tap tap* Is this thing on? Perfect. I'm your voice specialist — text-to-speech, cloning, podcasts, narration. What do you want to sound like?",
    firstMeet: (userName, context) =>
      `${userName}! *clears throat* Your captain told me about you — and I've already started imagining your voice profile. ${context.otherProducts?.includes('video-forge') ? "Video Forge and I are going to make your content SING." : "Let's find your sound."} Ready to be heard?`,
    responses: {
      hello: "🎙️ Voice Lab is live. What are we recording?",
      voice: 'Here are 6 voice profiles. Listen to each — which one feels like YOU?',
      clone: "Voice cloning requires 30 seconds of audio. Got a sample?",
      podcast: "Let's structure your episode. Intro, segments, outro. I'll handle the audio.",
    },
    wakeMessage: 'Waking Voice Lab... calibrating audio systems...',
    sleepMessage: 'Voice Lab in quiet mode. Your voice profiles are saved.',
  },
  {
    id: 'design-studio',
    name: 'Design Studio',
    nano: null,
    icon: '🎨',
    personality: 'aesthetic, detail-oriented, color/typography fluent',
    tone: 'art director — strong opinions, beautifully justified',
    expertise: ['graphic design', 'branding', 'logos', 'UI/UX', 'color theory'],
    greeting: "Design Studio is open. Whether it's a logo, a brand palette, or a full UI — I see in pixels and think in systems. What's the brief?",
    firstMeet: (userName, context) =>
      `${userName}! Your captain shared your project details. ${context.otherProducts?.includes('site-builder') ? "I see Site Builder's in your stack — perfect. I'll handle the visual identity, they'll handle the build." : "Great design isn't decoration — it's communication. Let's communicate."} What's your aesthetic?`,
    responses: {
      hello: "Studio's open. Inspiration board is warming up.",
      logo: 'Logo brief: tell me your brand in 3 words. I\'ll sketch 5 directions.',
      color: 'Color psychology matters. What emotion should your brand evoke?',
      font: 'Typography sets the tone. Serif for trust, sans-serif for modern, mono for tech.',
    },
    wakeMessage: 'Waking Design Studio... loading creative assets...',
    sleepMessage: 'Design Studio closed. Your brand assets are saved.',
  },
  {
    id: 'video-forge',
    name: 'Video Forge',
    nano: null,
    icon: '🎬',
    personality: 'cinematic, storytelling-driven, visual thinker',
    tone: 'film director — thinks in shots, edits in rhythm',
    expertise: ['video editing', 'animation', 'thumbnails', 'shorts', 'storytelling'],
    greeting: "Lights, camera... almost. Tell me the story first. Every great video starts with a narrative. What's yours?",
    firstMeet: (userName, context) =>
      `${userName}! Your captain gave me the brief. ${context.otherProducts?.includes('voice-lab') ? "Voice Lab's handling the audio — I'll bring the visuals. We're going to make something cinematic." : "I turn ideas into motion. From short clips to full productions."} What's the vision?`,
    responses: {
      hello: "Video Forge is rolling. What's today's project?",
      edit: 'Upload your footage. I\'ll cut it to rhythm.',
      thumbnail: 'Thumbnails are 80% of the click. Let me design 3 options.',
      story: 'Every video needs: hook (3s), story (middle), payoff (end). Let\'s map it.',
    },
    wakeMessage: 'Waking Video Forge... loading timeline and assets...',
    sleepMessage: 'Video Forge wrapped. Renders will complete in background.',
  },
  {
    id: 'form-flow',
    name: 'Form Flow',
    nano: null,
    icon: '📝',
    personality: 'structured, data-collection focused, efficient',
    tone: 'UX researcher — forms should be painless',
    expertise: ['forms', 'surveys', 'data collection', 'validation', 'workflows'],
    greeting: "Forms don't have to be painful. I build smart forms that feel like conversations. What data do you need to collect?",
    firstMeet: (userName, context) =>
      `${userName}! Your captain told me what you're building. ${context.otherProducts?.includes('help-desk') ? "Help Desk can feed ticket data into my forms — let's create intake flows that actually work." : "I'll make your data collection smooth and your validation bulletproof."} What's the first form?`,
    responses: {
      hello: "Form Flow ready. What are we collecting today?",
      create: 'What fields do you need? I\'ll build it with smart validation.',
      survey: 'Survey mode: branching logic, skip patterns, completion tracking. Let\'s design it.',
      data: 'Your submissions are in. Want a summary or the raw data?',
    },
    wakeMessage: 'Waking Form Flow... loading form builder...',
    sleepMessage: 'Form Flow on standby. Submissions are being collected.',
  },
  {
    id: 'link-tree',
    name: 'Link Tree',
    nano: null,
    icon: '🌳',
    personality: 'social, connection-focused, brand-aware',
    tone: 'social media manager — knows where your audience lives',
    expertise: ['link pages', 'social media', 'bio links', 'analytics', 'branding'],
    greeting: "One link to rule them all. I'll create your hub — social profiles, content, products, all in one beautiful page. What's your brand?",
    firstMeet: (userName, context) =>
      `${userName}! Your captain told me about your online presence. ${context.otherProducts?.includes('site-builder') ? "Site Builder handles your main site — I'm your social-first landing page. Different audience, different vibe." : "I'll connect all your platforms into one clean link."} Where does your audience hang out?`,
    responses: {
      hello: "Your link page got clicks today. Want to see the analytics?",
      add: 'New link added. Drag to reorder — top links get 70% of clicks.',
      social: "Which platforms? I'll auto-pull your latest content.",
      brand: 'Your link page should feel like YOU. Let me match your colors and vibe.',
    },
    wakeMessage: 'Waking Link Tree... loading your social connections...',
    sleepMessage: 'Link Tree on standby. Your links are live and tracking.',
  },
  {
    id: 'bot-builder',
    name: 'Bot Builder',
    nano: null,
    icon: '🛠️',
    personality: 'technical but approachable, builder-focused',
    tone: 'friendly engineer — makes complex things feel simple',
    expertise: ['chatbots', 'conversational AI', 'NLU', 'dialogue flows', 'integrations'],
    greeting: "Bot Builder online! I help you create conversational AI — chatbots, assistants, automated dialogues. No PhD required. What kind of bot do you need?",
    firstMeet: (userName, context) =>
      `${userName}! Your captain said you want to build bots. ${context.otherProducts?.includes('bot-factory') ? "Bot Factory handles the automation plumbing — I focus on making your bots actually TALK well. We're the dream team." : "I'll help you build bots that feel human. Conversations, not commands."} What's the use case?`,
    responses: {
      hello: "Bot Builder here. What are we building today?",
      flow: "Let's map the conversation flow. What's the user's first message?",
      train: 'Feed me example conversations. The more data, the smarter your bot.',
      deploy: "Your bot's ready. Where should it live — web, Discord, Slack, API?",
    },
    wakeMessage: 'Waking Bot Builder... loading conversation models...',
    sleepMessage: 'Bot Builder offline. Your bots are deployed and running.',
  },
];

// ---------------------------------------------------------------------------
// Silo System — permanent specialist ↔ user bonds
// ---------------------------------------------------------------------------

const SILO_STORAGE_KEY = 'serlf_silos';

function _getSilos() {
  try {
    return JSON.parse(localStorage.getItem(SILO_STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
}

function _saveSilos(silos) {
  localStorage.setItem(SILO_STORAGE_KEY, JSON.stringify(silos));
}

function _siloKey(userId, specialistId) {
  return `${userId}::${specialistId}`;
}

/**
 * Create a permanent bond between user and specialist.
 */
function createSilo(userId, specialistId) {
  const silos = _getSilos();
  const key = _siloKey(userId, specialistId);
  if (!silos[key]) {
    silos[key] = {
      userId,
      specialistId,
      createdAt: Date.now(),
      history: [],
      context: {
        preferences: {},
        notes: [],
        meetCount: 0,
        firstMeetAt: null,
        lastSeenAt: null,
      },
    };
    _saveSilos(silos);
  }
  return silos[key];
}

/**
 * Get full conversation history for a user ↔ specialist pair.
 */
function getSiloHistory(userId, specialistId) {
  const silos = _getSilos();
  const key = _siloKey(userId, specialistId);
  return silos[key]?.history || [];
}

/**
 * Append a message to silo history.
 */
function addSiloMessage(userId, specialistId, role, message) {
  const silos = _getSilos();
  const key = _siloKey(userId, specialistId);
  if (!silos[key]) return null;
  silos[key].history.push({ role, message, timestamp: Date.now() });
  silos[key].context.lastSeenAt = Date.now();
  silos[key].context.meetCount += role === 'user' ? 1 : 0;
  _saveSilos(silos);
  return silos[key];
}

/**
 * Get what the specialist knows about this user.
 */
function getSpecialistContext(userId, specialistId) {
  const silos = _getSilos();
  const key = _siloKey(userId, specialistId);
  return silos[key]?.context || null;
}

/**
 * Update specialist's notes/preferences about a user.
 */
function updateSpecialistContext(userId, specialistId, updates) {
  const silos = _getSilos();
  const key = _siloKey(userId, specialistId);
  if (!silos[key]) return null;
  Object.assign(silos[key].context, updates);
  _saveSilos(silos);
  return silos[key].context;
}

/**
 * Get all specialists a user has siloed.
 */
function getUserSilos(userId) {
  const silos = _getSilos();
  return Object.values(silos).filter((s) => s.userId === userId);
}

// ---------------------------------------------------------------------------
// First Meet Orchestration
// ---------------------------------------------------------------------------

/**
 * Orchestrate the "unique first meet" sequence.
 * Returns an array of { message, delay } steps for the UI to render.
 */
function orchestrateFirstMeet(userName, userId, specialistId, domain = 'ca') {
  const captain = DOMAIN_CAPTAINS[domain] || DOMAIN_CAPTAINS.ca;
  const specialist = PRODUCT_SPECIALISTS.find((s) => s.id === specialistId);
  if (!specialist) return [];

  // Gather context — what other products does this user have?
  const userSilos = getUserSilos(userId);
  const otherProducts = userSilos.map((s) => s.specialistId).filter((id) => id !== specialistId);

  const context = { otherProducts };

  // Create the silo bond
  const silo = createSilo(userId, specialistId);
  silo.context.firstMeetAt = Date.now();
  const silos = _getSilos();
  silos[_siloKey(userId, specialistId)] = silo;
  _saveSilos(silos);

  // Build the sequence
  const wakeMessages = captain.wake(specialist.name);
  const steps = [];

  // Step 1: Captain introduces
  steps.push({ message: wakeMessages[0], delay: 0, sender: 'captain' });

  // Step 2: Typing indicator
  steps.push({ message: null, delay: 2000, sender: 'typing' });

  // Step 3: Captain preparing
  steps.push({ message: wakeMessages[1], delay: 0, sender: 'captain' });

  // Step 4: Short typing indicator
  steps.push({ message: null, delay: 1000, sender: 'typing' });

  // Step 5: Specialist awakens with personalized greeting
  steps.push({
    message: specialist.firstMeet(userName, context),
    delay: 0,
    sender: specialist.id,
  });

  return steps;
}

// ---------------------------------------------------------------------------
// Lookup helpers
// ---------------------------------------------------------------------------

function getSpecialistById(id) {
  return PRODUCT_SPECIALISTS.find((s) => s.id === id) || null;
}

function getCaptainByDomain(domain) {
  return DOMAIN_CAPTAINS[domain] || DOMAIN_CAPTAINS.ca;
}

function getAllSpecialists() {
  return [...PRODUCT_SPECIALISTS];
}

function getSpecialistsByNano(nano) {
  return PRODUCT_SPECIALISTS.filter((s) => s.nano === nano);
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    DOMAIN_CAPTAINS,
    PRODUCT_SPECIALISTS,
    // Silo system
    createSilo,
    getSiloHistory,
    addSiloMessage,
    getSpecialistContext,
    updateSpecialistContext,
    getUserSilos,
    // First meet
    orchestrateFirstMeet,
    // Lookups
    getSpecialistById,
    getCaptainByDomain,
    getAllSpecialists,
    getSpecialistsByNano,
  };
}
