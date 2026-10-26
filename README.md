# crawlstat.com

The marketing site, help centre and blog for [CrawlStat](https://crawlstat.com). It's built with Nuxt 4 and Nuxt Content, generated as a fully static site, and hosted on GitHub Pages.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run generate   # static build into .output/public
npm run preview    # serve the static build
```

## Where things live

| What | Where |
| --- | --- |
| Pages (home, features, pricing, download, bot) | `app/pages/` |
| Blog posts | `content/blog/*.md` (front matter: `title`, `description`, `date`, `tag`, `readingTime`) |
| Help articles | `content/docs/*.md` (front matter: `section`, `order`) |
| Audit reference (`/docs/audits/*`) | `app/data/audits.json`, generated from the app |
| Screenshots | `public/screenshots/` |
| Price, download links, checkout URL | `app/app.config.ts` |
| Design tokens | `app/assets/css/main.css` |

Markdown components you can use in posts and docs:

- `::callout{type="tip"}` … `::` (the type can be `tip`, `note` or `warning`)
- `::screenshot{src="/screenshots/pages.png" alt="…" caption="…"}` … `::`
- `::steps` … `::`
- `:kbd[⌘N]`

### Audit reference

The audit pages are generated from the engine's catalogue, so they always match the app. The app's "Copy docs link" points at `/docs/audits/<slug>`, so keep these slugs stable. After you change audits in the app, run:

```bash
npm run sync:audits   # reads ../CrawlStat/engine/src/audit/catalog.rs (override with CRAWLSTAT_REPO=/path)
```

## Before launch

1. **Checkout:** set `pricing.checkoutUrl` in `app/app.config.ts` to your payment link (Stripe, Lemon Squeezy, …). Until you do, "Go Pro" sends people to `/download?plan=pro`.
2. **Downloads:** check `downloads.releases` in `app/app.config.ts` points at your real releases page.

## Deploy (GitHub Pages)

1. Create a GitHub repository and push this folder to its `main` branch.
2. In the repository, go to **Settings → Pages → Source** and choose **GitHub Actions**. Every push to `main` then builds and deploys the site using `.github/workflows/deploy.yml`.
3. Set **Settings → Pages → Custom domain** to `crawlstat.com`. `public/CNAME` already contains it. At your DNS provider:
   - add `A` records for `@` pointing to `185.199.108.153`, `185.199.109.153`, `185.199.110.153` and `185.199.111.153`
   - add a `CNAME` record for `www` pointing to `<your-user>.github.io`
4. Once the certificate is issued, tick **Enforce HTTPS**.
