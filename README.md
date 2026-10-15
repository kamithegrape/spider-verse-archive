# SPIDER-VERSE // ARCHIVE

A cinematic, interactive Spider-Verse-inspired archive built with plain HTML, CSS, and JavaScript. No framework, build step, or API key required.

## Features
- Classified landing page and mission board
- Spider-Signature quiz with four archetypes
- Spider-Sense reaction-time mini-game
- Universe generator with randomized Earth designation and editable variables
- Searchable/filterable classified files
- Final mission with three branching endings
- Progress saved locally in the browser with `localStorage`
- Responsive layout for desktop and mobile

## Run locally
Open `index.html` in a browser. For best results, use a local static server (VS Code Live Server, or `python -m http.server`).

## Deploy to GitHub Pages
1. Create a new GitHub repository.
2. Upload `index.html`, `style.css`, `script.js`, and the `assets` folder.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select `main` and `/ (root)`, then Save.
6. Wait for GitHub to publish the site.

## Deploy to Vercel
Import the repository into Vercel. Framework preset: **Other**. Build command: leave blank. Output directory: `.` (or leave default if static files are detected).

## Personalize
- Change the name/labels in `index.html`.
- Change quiz outcomes and file text in `script.js`.
- Change colors and typography at the top of `style.css`.
- Add your own artwork as `assets/archive-art.png`. If it is missing, the built-in CSS artwork fallback appears.

Progress is saved in the visitor's browser. The reset button clears local progress.

## Note
This is a fan-made, non-commercial creative project inspired by Spider-Man / Spider-Verse. It is not affiliated with or endorsed by Marvel.
