# Proposals

Client-facing, print-ready documents. Each one is a standalone HTML file styled as fixed A4 pages and exported to PDF with headless Chrome.

This folder is **not part of the website**. It sits outside `src/` and `public/`, so Vite, Nitro and the TanStack Start build never import or serve it, and Vercel only deploys the build output. Keep confidential pricing out of `public/`.

```
proposals/
  README.md
  tools/
    cdp.mjs           # shared headless-Chrome / DevTools Protocol helper
    render-pdf.mjs    # HTML -> PDF
    audit-pages.mjs   # per-page overflow report
  aiconomy/
    index.html                              # Project proposal & cost breakdown (6 pages)
    AIconomy-SummitStudio-Cost-Breakdown.pdf
    AIconomy-Brand-Direction.html           # Brand vision & creative direction (11 pages)
    AIconomy-SummitStudio-Brand-Direction.pdf
    assets/logo.png, logo-light.png
    fonts/                                  # woff2 files + fonts.css
```

## How the documents work

- One self-contained HTML file per document. All CSS lives in a `<style>` block; there is no framework, build step or network dependency.
- Each page is a `<section class="page">` sized 210 × 297 mm (A4), with an absolutely positioned `.pad` for content and a `.foot` footer. `@page { size: A4; margin: 0 }` plus `preferCSSPageSize` in the PDF step keeps the output exact.
- Page order in the file is page order in the PDF. To add a page, add a `<section class="page">` and extend the `html[data-preview-page="N"]` selectors at the end of the stylesheet.
- Theme tokens are in `:root`: background `#010101`, foreground `#F8F8F8`, muted `#8C8484`, accent `#E60016`. Both documents share the palette; keep them in sync when the theme changes.
- Preview a single page by opening the file with `?page=N`, e.g. `open "aiconomy/AIconomy-Brand-Direction.html?page=4"`. Without it, all pages render in one vertical stack.
- Footer page numbers, the cover "Issued" date and the cover status line are hard-coded text. Update them when pages shift or the document is reissued.

### Fonts

`fonts/fonts.css` points at `fonts/fonts/*.woff2`, which resolves to a path that does not exist. The documents therefore render with the system fallbacks (`Helvetica Neue`, `ui-monospace`), and the approved PDFs were produced that way. Correcting the paths would load Archivo and JetBrains Mono and can change line wrapping and pagination, so treat it as a design change: run the audit and re-export after.

## Generating the PDFs

Requirements: Node 22+ (built-in `fetch` and `WebSocket`) and a local Chrome, Chromium or Edge. The scripts find common installs and Playwright's Chrome for Testing automatically; override with `CHROME_PATH=/path/to/chrome`.

```bash
# from the repo root
node proposals/tools/render-pdf.mjs \
  proposals/aiconomy/index.html \
  proposals/aiconomy/AIconomy-SummitStudio-Cost-Breakdown.pdf

node proposals/tools/render-pdf.mjs \
  proposals/aiconomy/AIconomy-Brand-Direction.html \
  proposals/aiconomy/AIconomy-SummitStudio-Brand-Direction.pdf
```

The script launches headless Chrome with a fresh temporary profile (Chrome otherwise caches `file://` pages and prints stale HTML), waits for fonts, and calls `Page.printToPDF` with backgrounds, CSS page size, A4 paper and zero margins.

Verify an export:

```bash
python3 - <<'EOF'
p = "proposals/aiconomy/AIconomy-SummitStudio-Brand-Direction.pdf"
b = open(p, "rb").read()
print("pages:", b.count(b"/Type /Page") - b.count(b"/Type /Pages"))
EOF
```

Expected: 6 pages for the cost breakdown, 11 for the brand direction.

## Checking layout before exporting

```bash
node proposals/tools/audit-pages.mjs proposals/aiconomy/index.html
node proposals/tools/audit-pages.mjs proposals/aiconomy/AIconomy-Brand-Direction.html
```

The report shows, per page, `padOverflow` (pixels the content exceeds its padded area; must be `0`), the lowest content edge (`contentBottom`) and the footer top. `contentBottom` must stay above `footTop`. The script exits non-zero on overflow. Fix overflow by tightening type, spacing or copy on that page, never by changing the page size.

## Content rules for the cost breakdown

- Package total is ₹1,00,000; the 50/30/20 milestones must equal ₹50,000 / ₹30,000 / ₹20,000.
- Every fee ledger must sum to its page fee, and the overview ledger must sum to the package total.
- Website line: usual ₹45,000, discount −₹20,000, net ₹25,000.
- Do not reveal the Signature-tier plan price, and do not label the website work as part of that plan.

## Assets

`assets/logo.png` is the dark logo on an opaque white background, which reads as a white tile on the dark cover. `assets/logo-light.png` is the transparent light version used in the brand document.

## Adding another proposal

Create `proposals/<client>/` with the same shape, reuse the theme tokens and components, and drive it with the tools above. Add the new documents to the layout section of this README.
