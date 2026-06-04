import { chromium } from './node_modules/playwright/index.mjs';
const browser = await chromium.launch();

for (const [id, file, delay] of [
  ['servicos', 'svc.png', 3000],
  ['cardapio', 'cdp.png', 3000],
]) {
  const page = await browser.newPage();
  page.on('console', m => { if (m.type()==='error') console.log('ERR:', m.text()); });
  await page.setViewportSize({ width: 393, height: 900 });
  await page.goto('http://localhost:3333');
  await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
  await page.waitForTimeout(500);
  // Scroll to section
  await page.evaluate(id => document.getElementById(id).scrollIntoView({ block: 'start' }), id);
  await page.waitForTimeout(delay);
  await page.screenshot({ path: `./${file}` });
  
  // Log dimensions
  const d = await page.evaluate(id => {
    const s = document.getElementById(id);
    const slide = s?.querySelector('.carousel__slide');
    const img = s?.querySelector('img, video');
    const btn = s?.querySelector('.carousel__btn');
    return {
      slideW: slide?.offsetWidth,
      slideH: slide?.offsetHeight,
      imgH: img?.offsetHeight,
      imgTagName: img?.tagName,
      btnDisplay: btn ? getComputedStyle(btn).display : 'no btn',
      carouselW: s?.querySelector('.carousel')?.offsetWidth,
    };
  }, id);
  console.log(id, JSON.stringify(d));
  await page.close();
}
await browser.close();
