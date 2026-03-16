const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const BASE_URL = "https://dominionepc.com";

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(BASE_URL, { waitUntil: "networkidle", timeout: 30000 });

  // Take screenshot
  await page.screenshot({ path: "dominionepc-screenshot.png", fullPage: true });
  console.log("Screenshot saved");

  // Get all section IDs and content
  const sections = await page.evaluate(() => {
    const data = [];

    // Get all sections
    document
      .querySelectorAll("section, .elementor-section, .section")
      .forEach((sec) => {
        const id = sec.id || "no-id";
        const classes = sec.className || "";
        const heading =
          sec.querySelector("h1, h2, h3")?.innerText?.trim() || "";

        // Get text content (first 500 chars)
        const text = sec.innerText?.substring(0, 800) || "";

        if (text.trim().length > 20) {
          data.push({ id, classes: classes.substring(0, 50), heading, text });
        }
      });

    return data;
  });

  console.log("\nSections found:", sections.length);
  sections.forEach((s, i) => {
    console.log(`\n--- Section ${i + 1}: ${s.heading || s.id} ---`);
    console.log(s.text.substring(0, 300) + "...");
  });

  // Get contact info
  const contact = await page.evaluate(() => {
    const emails = [...document.querySelectorAll('a[href^="mailto:"]')].map(
      (a) => a.href,
    );
    const phones = [...document.querySelectorAll('a[href^="tel:"]')].map(
      (a) => a.href,
    );
    return { emails, phones };
  });

  console.log("\n--- Contact Info ---");
  console.log(contact);

  await browser.close();
}

main().catch(console.error);
