# Areté Float + Wellness — Website

Rebuild of the Areté Float + Wellness website, migrating off Wix onto a flat HTML/React site deployed via Netlify.

## Live URLs

| Environment | URL |
|---|---|
| **Current staging site** | https://arete-float-wellness.netlify.app |
| **Future production domain** | https://floatarete.com (old Wix site — not this repo) |

> **Note:** floatarete.com currently points to the old Wix site. The domain switch to this build has not happened yet. Until then, the live version of this codebase is at the Netlify URL above.

## Tech stack

- Flat HTML + inline React (via Babel CDN, no build step)
- Netlify hosting with `_redirects` for URL management
- One file trio per page: `*.html` + `*.jsx` + `*.css`

## Key files

```
home.html / home.jsx / home.css     — landing page (SEO reference template)
memberships.html / memberships.jsx  — pricing
packages.html / packages.jsx        — packages
styles.css                          — global tokens, nav, fonts
_redirects                          — Netlify 301 redirects
docs/HANDOFF.md                     — full project context and what's left to build
docs/SEO-PLAN.md                    — SEO checklist and schema boilerplates
AGENTS.md                           — instructions for AI coding assistants (Codex, Claude)
```
