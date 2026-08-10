# saqib-portfolio

Personal portfolio website of **Muhammad Saqib Khan** — Android Developer (Kotlin · Jetpack Compose), Lahore, Pakistan.

Static site: plain HTML, CSS and JavaScript. No build step, no dependencies.

**Live site:** https://saqibandroiddeveloper.github.io/saqib-portfolio/

## Structure

```
.
├── index.html                     # the whole page (hero, about, skills, projects, experience, contact)
├── assets/
│   ├── css/style.css              # design tokens + all styling
│   └── js/main.js                 # theme toggle, mobile nav, project filter, scroll effects
├── .github/workflows/deploy.yml   # deploys to GitHub Pages on every push to main
└── .nojekyll                      # serve files as-is, skip Jekyll processing
```

## Run it locally

No tooling required — open `index.html` in a browser, or serve it:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Enable GitHub Pages (one-time)

1. Go to **Settings → Pages** in this repository.
2. Under **Build and deployment → Source**, choose **GitHub Actions**.
3. Push to `main` — the workflow in `.github/workflows/deploy.yml` publishes the site.

The repository must be public for GitHub Pages on a free account.

## Editing

- **Text, links, projects** — all in `index.html`. Each project is one `<article class="project-card">` block; copy one and edit it to add another. The `data-tags` attribute controls which filter chips show it (`android`, `compose`, `backend`).
- **Colours** — the CSS custom properties at the top of `assets/css/style.css` (`:root` for dark, `[data-theme="light"]` for light).
- **Experience** — the `#experience` section has a commented-out template for adding more roles.

## License

[MIT](LICENSE)
