import { chromium } from './node_modules/playwright/index.mjs';
const browser = await chromium.launch();

for (const [label, scrollFn, file] of [
  ['servicos', 'document.getElementById("servicos").scrollIntoView({block:"start"})', 'svc3.png'],
  ['footer',   'document.querySelector(".footer").scrollIntoView({block:"start"})',   'footer3.png'],
]) {
  const page = await browser.newPage();
  await page.setViewportSize({ width: 393, height: 900 });
  await page.goto('http://localhost:3333');
  await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
  await page.waitForTimeout(2500);
  await page.evaluate(fn => eval(fn), scrollFn);
  await page.waitForTimeout(800);
  await page.screenshot({ path: `./${file}` });
  await page.close();
}
await browser.close();
console.log('done');
