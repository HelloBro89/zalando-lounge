import { Dataset, LogLevel, log } from 'crawlee';
import { removeElement } from '../utils/index.js';

const SELECTORS = {
  categoryBtn: '#category-tab-selector',
  sex: {
    womenFilterBtn: '[aria-label="Kobiety"] button',
    menFilterBtn: '[aria-label="Mężczyźni"] button',
  },
  productType: {
    shoes: `//*[starts-with(@class, 'ContainerDesktopstyles__CategoryContainer') and .//*[contains(@class, 'styles__Title') and .//span[contains(text(), 'Buty')]]]/div[starts-with(@class, 'styles__CategoryWrapper')]/button`,
    // shoes: `//*[starts-with(@class, 'ContainerDesktopstyles__CategoryContainer') and .//*[contains(@class, 'styles__Title') and .//span[contains(text(), 'Buty')]]]`,
    cloth: `//*[starts-with(@class, 'ContainerDesktopstyles__CategoryContainer') and .//*[contains(@class, 'styles__Title') and .//span[contains(text(), 'Odzież')]]]`,
    productStyle: {
      all: `./div[starts-with(@class, 'styles__CategoryWrapper')]/button`,
    },
  },
};

export const setFilters = async (page) => {
  // await page.setDefaultTimeout(60000);
  await page.waitForSelector(SELECTORS.categoryBtn);
  await page.click(SELECTORS.categoryBtn);
  await page.waitForTimeout(3000);
  console.log(' ----- CHOOSE MAIN CATEGORY ----- \n');

  await page.waitForSelector(SELECTORS.sex.womenFilterBtn);
  await page.click(SELECTORS.sex.womenFilterBtn);
  await page.waitForTimeout(3000);
  console.log(' ----- CHOOSE WOMEN ----- \n');
  await page.waitForTimeout(30000);

  await page.waitForXPath(SELECTORS.productType.shoes, { visible: true });
  const [productStyleBtn] = await page.$x(SELECTORS.productType.shoes);
  await productStyleBtn.click();
  console.log(' ----- CHOOSE ALL SHOES ----- \n');
  // await page.waitForTimeout(10000);

  // await page.click(SELECTORS.basketBtn);

  //   await page.waitForTimeout(20000);
  //   await dataset.pushData(outputObj);
};
