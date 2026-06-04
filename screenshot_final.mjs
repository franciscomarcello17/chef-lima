import { chromium } from './node_modules/playwright/index.mjs';

const browser = await chromium.launch();
const page = await browser.newPage();

page.on('console', msg => { if (msg.type() === 'error') console.log('ERR:', msg.text()); });

await page.setViewportSize({ width: 393, height: 852 });
await page.goto('http://localhost:3333');
await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
await page.waitForTimeout(2500);

await page.evaluate(() => document.querySelector('#cardapio').scrollIntoView());
await page.waitForTimeout(800);
await page.screenshot({ path: './cardapio_final.png' });

await browser.close();
console.log('done');
