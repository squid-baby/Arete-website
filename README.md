# Areté Float + Wellness, Website

Rebuild of the Areté Float + Wellness website, migrating off Wix onto a flat HTML/React site deployed via Netlify.

## Live URLs

| Environment | URL |
|---|---|
| **Live site** | https://floatarete.com (served by Netlify from this repo) |
| **Netlify address** | https://arete-float-wellness.netlify.app |

## Tech stack

- Flat HTML + inline React (via Babel CDN when you open a file locally)
- Netlify hosting with `_redirects` for URL management
- One file trio per page: `*.html` + `*.jsx` + `*.css`
- A small build step (`scripts/build.mjs`). Netlify runs it on every update. It copies the site into `dist/`, compiles the `*.jsx` files, and writes each page's text into its HTML file, so search engines and AI assistants can read the pages without running JavaScript. Edit the source files as before. Never edit `dist/`.

## Checks

Run these with Node 22 or newer:

```
npm install     # one time, gets the build tools
npm run build   # makes dist/, the same files Netlify publishes
node --test     # runs the checks
```

The checks confirm every page's menu carries the same links (for example the Decor link to decorbyarete.com), every page has real text and an H1 without JavaScript, no page links to the old FloatHelm booking site, and robots.txt, sitemap.xml and llms.txt use the final page addresses.

## Key files

```
home.html / home.jsx / home.css    , landing page (SEO reference template)
memberships.html / memberships.jsx , pricing
packages.html / packages.jsx       , packages
styles.css                         , global tokens, nav, fonts
_redirects                         , Netlify 301 redirects
docs/HANDOFF.md                    , full project context and what's left to build
docs/SEO-PLAN.md                   , SEO checklist and schema boilerplates
docs/AI-SEARCH-PLAN.md             , plan to get Areté into AI assistant answers
scripts/build.mjs                  , build step Netlify runs (see above)
AGENTS.md                          , instructions for AI coding assistants (Codex, Claude)
```
