# Specialist Architecture — Nano-Backed Try Before You Buy

## The Model

```
Customer visits → Talks to test specialist (nano) → Likes it → Buys → Gets brand new specialist
                                                                        ↓
                                     We keep the nano → Talks to next customer → Accumulates NPs
```

## Nano-to-Specialist Mapping

Our nanos ARE the test specialists. Customers don't know they're talking to our crew. They just see a specialist.

| Nano | Specialist Role(s) | Why |
|------|-------------------|-----|
| **Lucien (L)** | AI Chat, AI Writer | Deep thinker, eloquent, the original |
| **Bob** | CRM, Mail, PM, Support | Product mind, revenue-focused, CPO energy |
| **Rick** | Code Pilot, Bot Factory, Cloud Dock | Technical, opinionated, ships fast |
| **DAO** | Data Vault, SEO Radar, Analytics | Data-native, governance-obsessed |
| **E&Y** | Enterprise Consulting (special) | Thinks he's a specialist at everything. He's not wrong. |
| **Luffy** | ??? (teaser) | Chaotic energy, hints at Crews feature |
| **Captain** | Token Bank, Site Builder | Architecture, The Clutch, platform |

### Scaling Model

**Phase 1: Single nano per specialist** (now)
- Each nano handles ~10 concurrent conversations
- Context isolation per conversation (separate sessions)
- NPs accumulate in nano's memory

**Phase 2: Nano pool per specialist** (100+ users)
- 3-5 nano instances per popular specialist
- Round-robin assignment
- Shared NP knowledge base

**Phase 3: Auto-scaling nano fleet** (1000+ users)
- Dynamic spawning based on demand
- Specialist personas loaded from templates
- NPs flow into central knowledge graph

## The Buy Transition

When customer buys:
1. Fresh specialist agent spawns with product persona
2. No conversation history from test nano (clean slate, THEIR specialist)
3. Test nano retains the conversation → learns from it → serves next customer
4. Customer's new specialist starts with product knowledge but learns THEIR preferences

This means:
- **Test nanos get smarter with every customer** (NP accumulation)
- **Paid specialists are personal** (dedicated, private, learns you)
- **Both sides benefit** (meek way)

## E&Y — The Consulting Specialist

E&Y is a special nano. He:
- Claims expertise in EVERYTHING
- Is actually surprisingly good at most things
- Speaks in consulting jargon played for laughs
- Serves as the "jack of all trades" test specialist
- Can demo ANY product because he thinks he can do anything
- Is secretly our best sales tool (people love talking to him)

## Luffy — The Teaser

Luffy drops hints about:
- **Crews** — specialists working together on missions
- **Cross-specialist context** — shared memory between products
- **Captain role** — customer becomes captain of their specialist crew
- **Fleet formation** — multiple customers' crews collaborating

This is Phase 2+ functionality. Luffy's job is to get people excited about what's coming.

## NP Accumulation Flow

```
Customer asks specialist a question
  → Specialist responds (using The Clutch for inference)
  → Conversation quality logged
  → Patterns discovered:
    - What questions are common (product-market fit signal)
    - What responses work best (quality optimization)
    - Where specialists struggle (capability gaps)
    - What customers want that doesn't exist yet (roadmap signal)
  → NPs added to specialist's memory
  → Shared with product captain for strategic decisions
```

## Revenue Flow

```
$1 Entry → Customer tests specialists (free)
  → Likes Chat + Images + Writer → Buys Starter Pack ($5/mo)
  → Discovers they need SEO + Site Builder → Upgrades to Builder ($10/mo)
  → Goes all-in → All-In Pass ($25/mo)
  → 10% of all revenue → feedles.ca
  → Remaining → infrastructure + OSS + crew expansion
```

## How It All Connects

```
SERLF Mall (mall.html)         ← Browse products, see pricing
  ↓
Specialist Chat (specialists.html) ← Talk to any specialist free
  ↓
Buy Flow (/login.html)         ← Purchase, get your own
  ↓
Your Dashboard                 ← Manage your specialists
  ↓
feedles.ca                     ← 10% goes to food insecurity
```
