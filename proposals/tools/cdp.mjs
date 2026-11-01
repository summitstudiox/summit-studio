// Minimal Chrome DevTools Protocol client shared by the proposal tooling.
// Node 22+ is required for the built-in WebSocket and fetch.

import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export function findChrome() {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;

  const home = os.homedir();
  const candidates = [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
  ];

  const playwright = path.join(home, "Library/Caches/ms-playwright");
  if (fs.existsSync(playwright)) {
    const builds = fs
      .readdirSync(playwright)
      .filter((dir) => dir.startsWith("chromium-"))
      .sort()
      .reverse();
    for (const build of builds) {
      candidates.push(
        path.join(
          playwright,
          build,
          "chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing",
        ),
        path.join(
          playwright,
          build,
          "chrome-mac-x64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing",
        ),
        path.join(playwright, build, "chrome-linux/chrome"),
      );
    }
  }

  const found = candidates.find((candidate) => fs.existsSync(candidate));
  if (!found) {
    throw new Error("No Chrome or Chromium found. Set CHROME_PATH to the browser binary.");
  }
  return found;
}

export async function launchChrome() {
  const port = 9300 + Math.floor(Math.random() * 500);
  // A fresh profile per run: Chrome otherwise caches file:// pages and renders stale HTML.
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), "proposal-cdp-"));

  const chrome = spawn(
    findChrome(),
    [
      "--headless",
      "--disable-gpu",
      "--no-sandbox",
      `--remote-debugging-port=${port}`,
      `--user-data-dir=${profile}`,
      "about:blank",
    ],
    { stdio: "ignore" },
  );

  let target;
  for (let attempt = 0; attempt < 80 && !target; attempt += 1) {
    await sleep(250);
    try {
      const list = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
      target = list.find((entry) => entry.type === "page");
    } catch {
      // Chrome is not listening yet.
    }
  }
  if (!target) {
    chrome.kill();
    throw new Error("Chrome did not expose a DevTools page target.");
  }

  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    ws.onopen = resolve;
    ws.onerror = reject;
  });

  let nextId = 0;
  const pending = new Map();
  ws.onmessage = (event) => {
    const message = JSON.parse(event.data);
    const resolve = pending.get(message.id);
    if (resolve) {
      pending.delete(message.id);
      resolve(message);
    }
  };

  const send = (method, params = {}) =>
    new Promise((resolve) => {
      const id = ++nextId;
      pending.set(id, resolve);
      ws.send(JSON.stringify({ id, method, params }));
    });

  const close = () => {
    ws.close();
    chrome.kill();
    try {
      fs.rmSync(profile, { recursive: true, force: true });
    } catch {
      // Chrome may still be releasing the profile; the OS cleans tmp up later.
    }
  };

  return { send, close };
}
