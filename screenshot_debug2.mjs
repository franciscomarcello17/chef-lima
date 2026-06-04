import { chromium } from './node_modules/playwright/index.mjs';
const browser = await chromium.launch();
const page = await browser.newPage();
page.on('console', m => { if (m.type()==='error') console.log('ERR:', m.text()); });
await page.setViewportSize({ width: 393, height: 852 });
await page.goto('http://localhost:3333');
await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
await page.waitForTimeout(3000);

const info = await page.evaluate(() => {
  const serviceCard = document.querySelector('.service-card');
  const serviceSlide = document.querySelector('.services__carousel .carousel__slide');
  const dishImg = document.querySelector('.dish-card__img');
  const sectionHeader = document.querySelector('.services .section-header');
  const servicesSection = document.querySelector('.services');
  return {
    serviceCardH: serviceCard?.offsetHeight,
    serviceCardW: serviceCard?.offsetWidth,
    slideH: serviceSlide?.offsetHeight,
    slideW: serviceSlide?.offsetWidth,
    dishImgH: dishImg?.offsetHeight,
    sectionHeaderH: sectionHeader?.offsetHeight,
    sectionHeaderMargin: sectionHeader ? getComputedStyle(sectionHeader).marginBottom : null,
    servicesPadding: servicesSection ? getComputedStyle(servicesSection).paddingTop : null,
    serviceMediaH: document.querySelector('.service-card__media')?.offsetHeight,
  };
});
console.log(JSON.stringify(info, null, 2));
await browser.close();
