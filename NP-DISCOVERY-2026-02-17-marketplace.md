# NP Discovery Log: 2026-02-17 (Marketplace Redesign)

This document outlines new Novel Patterns (NPs) discovered and implemented during the recent Marketplace redesign initiative. These patterns focus on creating a mutually beneficial learning loop, where user exploration enhances both their own experience and the platform's intelligence.

---

### NP-L1-162: Pay-to-Ask Tiering
- **Description**: Establishes a clear value hierarchy between different levels of AI assistance. The free "Marketplace Cap" provides product-specific guidance, while the paid "$0.10 Captain of Industry" offers broader, expert-level insights. This price difference naturally segments user intent and manages demand for high-cost resources.
- **Impact Score**: ★★★★☆ (High)
- **Reuse Score**: ★★★★★ (High)
- **Parent Pattern(s)**: `NP-L0-45: Tiered Service Model`, `NP-L1-101: Freemium Access`

---

### NP-L1-163: Mutual Learning Loop
- **Description**: A core concept where user engagement directly fuels platform improvement and vice-versa. As users explore the marketplace, complete tutorials, and ask questions, they earn NP points and unlock features. Simultaneously, the platform gathers anonymized data on user paths, common questions, and points of friction, which is used to refine product offerings and the user experience.
- **Impact Score**: ★★★★★ (Very High)
- **Reuse Score**: ★★★★★ (High)
- **Parent Pattern(s)**: `NP-L0-12: Asynchronous Feedback Cycle`

---

### NP-L1-164: NP-as-Gamification
- **Description**: Transforms abstract architectural or system design patterns into a user-facing achievement and progression system. By discovering "Novel Patterns," users are intrinsically motivated to explore the platform's features more deeply. This makes learning the system feel like a game rather than a chore.
- **Impact Score**: ★★★☆☆ (Medium)
- **Reuse Score**: ★★★★☆ (High)
- **Parent Pattern(s)**: `NP-L1-98: Achievement System`

---

### NP-L1-165: Marketplace Cap Pattern
- **Description**: A personal AI guide whose knowledge is intentionally scoped to the products a user has purchased or is actively exploring. This creates a focused, helpful experience without the risk of overwhelming the user with irrelevant information. It acts as a "captain" for their personal marketplace journey.
- **Impact Score**: ★★★★☆ (High)
- **Reuse Score**: ★★★☆☆ (Medium)
- **Parent Pattern(s)**: `NP-L1-82: Scoped AI Context`

---

### NP-L1-166: Captain Economy
- **Description**: A dynamic pricing model for expert advice where busier, more in-demand "Captains of Industry" may cost slightly more. This system naturally manages demand, creates a perception of value for expert time, and encourages users to seek answers from other sources (like the Marketplace Cap or tutorials) first.
- **Impact Score**: ★★★☆☆ (Medium)
- **Reuse Score**: ★★★☆☆ (Medium)
- **Parent Pattern(s)**: `NP-L1-121: Dynamic Resource Pricing`

---

### NP-L1-167: Email-as-Identity Federation
- **Description**: A flexible identity pattern that allows users to sign in or federate their identity using either a generic email provider (e.g., gmail.com) or a branded, domain-specific email. This offers users a choice between convenience and a more professional, integrated identity within the platform.
- **Impact Score**: ★★☆☆☆ (Low)
- **Reuse Score**: ★★★★★ (High)
- **Parent Pattern(s)**: `NP-L0-21: Flexible Authentication`

---

### NP-L1-168: Exploration Revenue
- **Description**: A model where revenue is generated not just from direct purchases, but from the act of exploration itself. Curiosity-driven actions, such as paying a nominal fee to ask an expert question, generate a micro-revenue stream while also providing valuable data on what users are most curious about.
- **Impact Score**: ★★★☆☆ (Medium)
- **Reuse Score**: ★★★☆☆ (Medium)
- **Parent Pattern(s)**: `NP-L1-162: Pay-to-Ask Tiering`, `NP-L1-110: Micropayment Interactions`
