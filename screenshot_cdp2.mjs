import { chromium } from './node_modules/playwright/index.mjs';
const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 393, height: 900 });
await page.goto('http://localhost:3333');
await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
await page.waitForTimeout(3500);

// Scroll past the header into the carousel
await page.evaluate(() => {
  const menu = document.getElementById('cardapio');
  const carousel = menu?.querySelector('.menu__carousels');
  carousel?.scrollIntoView({ block: 'start' });
});
await page.waitForTimeout(2000);
await page.screenshot({ path: './cdp2.png' });

const d = await page.evaluate(() => {
  const active = document.querySelector('.menu__carousels [data-segment]');
  const carousels = document.querySelectorAll('.menu__carousel');
  const activeCarousel = document.querySelector('.menu__carousels .menu__carousel[style*="flex"], .menu__carousels[data-active] .menu__carousel');
  const menuCarousels = document.getElementById('menuCarousels');
  const dataActive = menuCarousels?.getAttribute('data-active');
  const activeEl = menuCarousels?.querySelector(`.menu__carousel[data-segment="${dataActive}"]`);
  return {
    dataActive,
    activeElDisplay: activeEl ? getComputedStyle(activeEl).display : null,
    activeCarouselW: activeEl?.querySelector('.carousel')?.offsetWidth,
    activeSlideW: activeEl?.querySelector('.carousel__slide')?.offsetWidth,
    activeImgH: activeEl?.querySelector('.dish-card__img')?.offsetHeight,
  };
});
console.log(JSON.stringify(d, null, 2));
await browser.close();
