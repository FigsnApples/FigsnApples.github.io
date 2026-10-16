# Omeed Djassemi — Personal website

A responsive, static portfolio ready for GitHub Pages. Open index.html to preview locally. No build tools or dependencies required. Google Fonts are optional; system fonts are used offline.

## Publish on GitHub Pages

1. Create a repository named YOUR-GITHUB-USERNAME.github.io for a root personal website, or use a different repository name for a project website.
2. Upload the CONTENTS of this folder to the repository root, including index.html, style.css, script.js, assets, and .nojekyll.
3. In Settings → Pages, select Deploy from a branch, main, and / (root), then Save.
4. GitHub provides the live URL when deployment completes.

All asset paths are relative, so this works at either a username.github.io root or a repository subpath. No account credentials or secrets belong in these files.

## Edit

- index.html: biography, research, publications, experience, education, contact.
- style.css: layout, colors, fonts, and responsive breakpoints.
- script.js: dark mode, mobile navigation, and publication filters.
- resume.pdf: replace with an updated resume using the same filename.

## Content notes

Credentials and publication list are based on the supplied August 2026 resume. PhD is marked in progress. Publication counts refer to that resume, not live bibliometrics. The fingertip urea/ammonium entry links to the manuscript DOI supplied in the resume. The resume's malformed clinical lactate DOI URL was normalized to doi.org. Contact uses real email and LinkedIn links. Signal drawings are decorative, not experimental data. No portrait was supplied, so no substitute person is used.

Original implementation inspired by the layout and visual direction of https://josecv04.github.io/; no reference-site photographs or personal content included.

## Manage My Music

Open `music-editor.html` locally, or at `/music-editor.html` on your personal GitHub Pages website (under your repository path for a project website). Add or edit Spotify artist names and URLs and add up to 12 featured track URLs, optional titles, and notes. Click Save draft & preview, then Download music-config.js. Replace the repository's music-config.js with the downloaded file and commit it to publish the changes. You can also send the exported file back to ChatGPT for help applying it.

The editor is a browser-local drafting tool, not an authenticated CMS. It cannot write to GitHub. Any visitor can open the editor, but their drafts only affect their own browser; only someone with repository write access can update the public site. The public site always uses the published configuration. No Spotify account credentials are required. Artist pages are configured for deemO and Juiceorange. Featured songs are intentionally empty. Spotify embeds are loaded only for configured tracks; playback availability depends on Spotify.
