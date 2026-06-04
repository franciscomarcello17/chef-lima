import { chromium } from './node_modules/playwright/index.mjs';

const browser = await chromium.launch();

for (const theme of ['dark', 'light']) {
  const page = await browser.newPage();
  await page.setViewportSize({ width: 393, height: 852 });
  await page.goto('file:///c:/Users/franc/Documents/GitHub/chef-lima/index.html');
  await page.evaluate((t) => document.documentElement.setAttribute('data-theme', t), theme);
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `./hero_${theme}.png` });
  await page.close();
}

await browser.close();
console.log('done');
