import { chromium } from './node_modules/playwright/index.mjs';
const browser = await chromium.launch();

for (const [id, file] of [['servicos','svc2.png'], ['footer','footer2.png']]) {
  const page = await browser.newPage();
  await page.setViewportSize({ width: 393, height: 900 });
  await page.goto('http://localhost:3333');
  await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
  await page.waitForTimeout(2500);
  if (id === 'footer') {
    await page.evaluate(() => document.querySelector('.footer').scrollIntoView({ block: 'start' }));
  } else {
    await page.evaluate(id => document.getElementById(id).scrollIntoView({ block: 'start' }), id);
  }
  await page.waitForTimeout(800);
  await page.screenshot({ path: `./${file}` });
  await page.close();
}
await browser.close();
console.log('done');
