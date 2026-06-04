import { chromium } from './node_modules/playwright/index.mjs';
const browser = await chromium.launch();

for (const [id, file] of [['servicos', 'services_final.png'], ['cardapio', 'cardapio_final2.png']]) {
  const page = await browser.newPage();
  page.on('console', m => { if (m.type()==='error') console.log('ERR:', m.text()); });
  await page.setViewportSize({ width: 393, height: 852 });
  await page.goto('http://localhost:3333');
  await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
  await page.waitForTimeout(2500);
  await page.evaluate((id) => document.querySelector('#'+id)?.scrollIntoView(), id);
  await page.waitForTimeout(600);
  await page.screenshot({ path: './' + file });
  await page.close();
}

await browser.close();
console.log('done');
