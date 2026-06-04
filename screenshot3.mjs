import { chromium } from './node_modules/playwright/index.mjs';

const browser = await chromium.launch();
const page = await browser.newPage();
// iPhone 14 Pro viewport
await page.setViewportSize({ width: 393, height: 852 });
await page.goto('file:///c:/Users/franc/Documents/GitHub/chef-lima/index.html');
await page.evaluate(() => {
  document.documentElement.setAttribute('data-theme', 'dark');
});
await page.waitForTimeout(2000);
await page.screenshot({ path: './hero_mobile.png', fullPage: false });
await browser.close();
console.log('done');
