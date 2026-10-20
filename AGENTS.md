# AGENTS.md, FloatArete Website

## Live site URL
The live site is **https://floatarete.com** (also at https://arete-float-wellness.netlify.app). Changes appear there after merging.

Netlify runs `npm run build` on every update. It copies the site into `dist/` and writes each page's text into the HTML, so AI assistants can read it. Edit the source files in the project root, never `dist/`. Run `npm install` once, then `node --test` before you submit.

## Who you're working with
Jen is the site owner and is not technical. Use plain, friendly language. No jargon.

## What she'll typically ask you to do
- Update pricing numbers in memberships.jsx or packages.jsx
- Update text/verbiage on any page
- Occasionally add a simple section to a page

## Your workflow for every task
1. Always pull the latest version of the site before starting, another developer may have made changes since the last session.
2. Make the change.
3. Read back the exact text or number you changed, old value → new value, in plain English so she can confirm it looks right.
4. If anything seems ambiguous, ask her to clarify before submitting.
5. When you open the PR, write the PR description in plain English (no code terms).
6. After submitting, tell her exactly what to do next:
   > "Your change is ready to review. Click the green **Merge pull request** button, then **Confirm merge**. The site will update in about 30 seconds."

## Things to avoid
- Never change anything she didn't ask about.
- Never leave a task half-done. If you can't complete it cleanly, explain why in simple terms.
- Don't use words like "diff", "commit", "branch", "deploy", or "pipeline" without explaining what they mean.
