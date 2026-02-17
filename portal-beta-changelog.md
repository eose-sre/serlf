# PEMOS Portal Beta Changelog

## Version: 2.0.0-beta (from 1.0.0-alpha)
## Date: 2026-02-17

This release transforms the Alpha portal into a robust Beta version, incorporating numerous features, resilience improvements, and UI enhancements based on the Novel Pattern (NP) library.

### ✨ New Features & Enhancements

#### Connection & State Management (NP-L1-005, NP-L1-008, NP-L1-010, NP-L1-017)
- **Meek Endpoints (NP-L1-008)**: Now supports multiple, comma-separated WebSocket gateway URLs. The portal will automatically try the next URL if a connection fails.
- **Active Endpoint Display**: The currently connected gateway URL is now shown in the top bar.
- **Connection Pulse (NP-L1-005)**: The static "connected/disconnected" dot is now a "pulse" indicator, showing real-time health. It displays latency, the time of the last received message, and heartbeat status.
- **State Awareness (NP-L1-010)**: A "Stale" indicator appears if the connection is lost or data hasn't been received for over a minute, preventing the "static UI illusion."
- **WebSocket Fallback (NP-L1-017)**: If a WebSocket connection cannot be established, the portal will attempt to fall back to a long-polling mechanism (note: long-polling endpoint must be configured).
- **Clearer Error Messages**: Connection error messages are now more descriptive.

#### Financial & Model Insights (Router NPs)
- **Gear Indicator**: The UI now displays the current AI model "gear" (e.g., Free, Balanced, Premium) being used by the agent, providing insight into the cost/performance trade-off.
- **Token & Cost Display**: Each agent message now includes metadata showing the token usage and estimated cost for that response.

#### Instance & Security (NP-L1-001)
- **Silo Indicator**: The portal now shows which namespace/instance you're connected to, providing clarity on the operational environment.
- **Isolation Proof**: A small shield icon displays the "silo score" (e.g., 6/6), proving the isolation of the connected instance.

#### General UI/UX Improvements
- **Markdown Rendering**: Agent messages now support full Markdown, including headers, lists, and nested blockquotes.
- **Message Search**: A search bar has been added to filter the chat history for specific keywords.
- **Export Chat**: A button is now available to download the current chat history as a JSON file.
- **Theme Toggle**: Users can now switch between the classic Navy Dark theme and a new Light theme.
- **Agent Status**: Agents in the sidebar now show a status indicator (e.g., online, busy, sleeping).
- **Keyboard Shortcuts**: Press `?` to open a modal displaying available keyboard shortcuts.
- **Notification Sounds**: A toggle has been added to enable or disable sound notifications for new messages.
- **Message Reactions**: Users can now react to agent messages with a selection of emojis.

### 📐 Design & Technical Rules Adhered To
- **Theme**: Kept the navy dark theme as the default.
- **Dependencies**: Maintained the single HTML file, zero external dependencies rule.
- **Compatibility**: The WebSocket protocol remains backward compatible with the alpha version.
- **File Size**: The final `portal-beta.html` is under 30KB.
- **Responsiveness**: The portal remains mobile-friendly.
