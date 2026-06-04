import { chromium } from './node_modules/playwright/index.mjs';

const browser = await chromium.launch();
const page = await browser.newPage();

// Capture console errors
page.on('console', msg => console.log('BROWSER:', msg.type(), msg.text()));
page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
page.on('requestfailed', req => console.log('FAILED REQUEST:', req.url()));

await page.setViewportSize({ width: 393, height: 852 });
await page.goto('http://localhost:3333');
await page.waitForTimeout(3000);

const menuHTML = await page.$eval('#menuCarousels', el => el.innerHTML.substring(0, 200));
const galleryHTML = await page.$eval('#galleryCarousel', el => el.innerHTML.substring(0, 200));
console.log('MENU:', menuHTML);
console.log('GALLERY:', galleryHTML);

await browser.close();
