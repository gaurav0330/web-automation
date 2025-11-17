const { chromium } = require("playwright");
const fs = require("fs");

(async () => {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 50
  });

  const context = await browser.newContext({
    viewport: null
  });

  const page = await context.newPage();

  console.log("Opening Asana login page...");
  await page.goto("https://app.asana.com/-/login");

  console.log("\n⭐ Login manually using EMAIL + PASSWORD");
  console.log("⏳ Waiting for Asana Home page to load...\n");

  // ⭐ NEW: Sidebar Home link — always present
  await page.waitForSelector('text=Home', { timeout: 0 });

  console.log("🎉 Logged in successfully!");

  console.log("📸 Taking screenshot...");
  await page.screenshot({ path: "agent_output/home.png", fullPage: true });

  console.log("🎨 Extracting CSS from first button...");
  const css = await page.evaluate(() => {
    const btn = document.querySelector("button");
    if (!btn) return "No button found on page.";
    return getComputedStyle(btn);
  });

  fs.writeFileSync(
    "agent_output/css.json",
    JSON.stringify(css, null, 2)
  );

  console.log("✅ CSS & Screenshot saved in agent_output folder");
  console.log("🟢 Browser will stay open. Close manually.");
})();
