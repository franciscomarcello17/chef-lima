import { chromium } from './node_modules/playwright/index.mjs';

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto('file:///c:/Users/franc/Documents/GitHub/chef-lima/index.html');
await page.waitForTimeout(2000);
await page.screenshot({ path: './hero_screenshot.png', fullPage: false });
await browser.close();
console.log('done');
