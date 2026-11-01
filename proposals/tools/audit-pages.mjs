// Report per-page layout overflow for a paginated proposal HTML file.
// Usage: node audit-pages.mjs <input.html>
// Exits non-zero if any page overflows.

import path from "node:path";
import { pathToFileURL } from "node:url";
import { launchChrome } from "./cdp.mjs";

const [input] = process.argv.slice(2);
if (!input) {
  console.error("usage: node audit-pages.mjs <input.html>");
  process.exit(1);
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const { send, close } = await launchChrome();
let failed = false;

try {
  // 210 × 297 mm at 96 dpi. The stylesheets have no print-only rules,
  // so this measurement matches what printToPDF renders.
  await send("Emulation.setDeviceMetricsOverride", {
    width: 794,
    height: 1123,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await send("Page.navigate", { url: pathToFileURL(path.resolve(input)).href });
  await sleep(1500);

  const response = await send("Runtime.evaluate", {
    returnByValue: true,
    expression: `(() => {
      const rows = [];
      document.querySelectorAll(".page").forEach((page, index) => {
        const pad = page.querySelector(".pad");
        const pageBox = page.getBoundingClientRect();
        const foot = page.querySelector(".foot")?.getBoundingClientRect();
        let contentBottom = 0;
        let lastElement = "";
        pad.querySelectorAll(":scope > *").forEach((element) => {
          if (element.classList.contains("foot") || element.classList.contains("page-numeral")) return;
          const box = element.getBoundingClientRect();
          if (box.height > 0 && box.bottom > contentBottom) {
            contentBottom = box.bottom;
            lastElement = element.className || element.tagName;
          }
        });
        rows.push({
          page: index + 1,
          padOverflow: pad.scrollHeight - pad.clientHeight,
          contentBottom: Math.round(contentBottom - pageBox.top),
          footTop: foot ? Math.round(foot.top - pageBox.top) : null,
          lastElement,
        });
      });
      return rows;
    })()`,
  });

  const pages = response.result?.result?.value ?? [];
  console.table(pages);
  failed = pages.some(
    (page) => page.padOverflow > 0 || (page.footTop !== null && page.contentBottom > page.footTop),
  );
} finally {
  close();
}

if (failed) {
  console.error("layout overflow detected");
  process.exit(1);
}
