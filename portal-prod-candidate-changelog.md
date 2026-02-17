# PEMOS Portal v1.0.0 Production Candidate Changelog

This document lists the changes made to the PEMOS Portal beta to create the v1.0.0 production candidate.

## Functional Fixes

- **[Critical] Add Timestamps:** (from Alpha Test Report, Bug #9)
  - Modified the `addMsgDOM` and `finalizeStream` JavaScript functions to include a formatted UTC timestamp in the metadata of every user and agent message.

- **[Medium] Add Accessibility Label:** (from Alpha Test Report, Bug #17)
  - Added an `aria-label="Toggle navigation"` to the hamburger menu button for improved screen reader support.

## Security Fixes

- **[High] Implement Content-Security-Policy (CSP):** (from Security Audit Report, ID P-001)
  - Added a `<meta http-equiv="Content-Security-Policy" ...>` tag to the HTML `<head>`.
  - The policy is: `default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; connect-src 'self' wss:;`.

- **[Low] Add Security Headers Note:** (from Security Audit Report, ID P-004)
  - Added an HTML comment in the `<head>` to remind the operations team to configure `X-Frame-Options`, `X-Content-Type-Options`, and `Permissions-Policy` headers in the production webserver.

- **[Medium] Sanitize Chat Output:** (from Security Audit Report, ID P-003)
  - **Verification:** Confirmed that the existing `md()` and `esc()` functions already sanitize agent and user message content by escaping HTML characters (`<`, `>`, `&`). No changes were required as the implementation is already compliant with the recommendation.
