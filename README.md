# China EV Battery Diplomacy

Interactive systems analysis built with Next.js, TypeScript, React Flow and
MapLibre.

## Local development

Install dependencies and start the development server:

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## GitHub Pages

The workflow in `.github/workflows/deploy-pages.yml` builds and deploys the
website whenever a commit is pushed to `main`.

Before the first deployment:

1. Open the repository on GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, select **GitHub Actions** as the source.
4. Push the project to the `main` branch.

The published URL is:

```text
https://florianludwig01.github.io/china-battery-diplomacy/
```

To test the same static export locally, run:

```bash
npm run build:pages
```

The generated website is written to `out/`. Regular local and Vercel builds
continue to use `npm run build` without the GitHub Pages base path.
