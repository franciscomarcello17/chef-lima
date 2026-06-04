import { chromium } from './node_modules/playwright/index.mjs';

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto('file:///c:/Users/franc/Documents/GitHub/chef-lima/index.html');

// Force dark theme
await page.evaluate(() => {
  document.documentElement.setAttribute('data-theme', 'dark');
});
await page.waitForTimeout(1500);
await page.screenshot({ path: './hero_dark.png', fullPage: false });

// Full page
await page.screenshot({ path: './full_dark.png', fullPage: true });

await browser.close();
console.log('done');
