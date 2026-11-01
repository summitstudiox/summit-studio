// Render a paginated proposal HTML file to PDF.
// Usage: node render-pdf.mjs <input.html> <output.pdf>

import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { launchChrome } from "./cdp.mjs";

const [input, output] = process.argv.slice(2);
if (!input || !output) {
  console.error("usage: node render-pdf.mjs <input.html> <output.pdf>");
  process.exit(1);
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const { send, close } = await launchChrome();

try {
  await send("Page.enable");
  await send("Page.navigate", { url: pathToFileURL(path.resolve(input)).href });
  await sleep(1500);
  await send("Runtime.evaluate", {
    expression: "document.fonts.ready.then(() => true)",
    awaitPromise: true,
  });

  // A4 at 25.4 mm per inch; the documents' @page rules already define the size.
  const result = await send("Page.printToPDF", {
    printBackground: true,
    preferCSSPageSize: true,
    paperWidth: 8.268,
    paperHeight: 11.693,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    displayHeaderFooter: false,
  });

  if (!result.result?.data) {
    throw new Error(`printToPDF failed: ${JSON.stringify(result)}`);
  }
  fs.writeFileSync(output, Buffer.from(result.result.data, "base64"));
  console.log(`wrote ${output} (${fs.statSync(output).size} bytes)`);
} finally {
  close();
}
