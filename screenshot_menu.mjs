import { chromium } from './node_modules/playwright/index.mjs';

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 393, height: 852 });
await page.goto('http://localhost:3333');
await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
await page.waitForTimeout(2000);

// Scroll to menu section
await page.evaluate(() => document.querySelector('#cardapio').scrollIntoView());
await page.waitForTimeout(1000);
await page.screenshot({ path: './menu_mobile.png' });

// Scroll to gallery
await page.evaluate(() => document.querySelector('#galeria').scrollIntoView());
await page.waitForTimeout(1000);
await page.screenshot({ path: './gallery_mobile.png' });

await browser.close();
console.log('done');
