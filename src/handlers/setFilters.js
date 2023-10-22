// import { Dataset, LogLevel, log } from 'crawlee';
// import { removeElement } from '../utils/index.js';
import { getHTML } from '../utils/index.js';
import { getProductLinks } from '../helpers/getLinks.js';

const SELECTORS = {
  mainCategory: {
    mainCategoryBtn: '#category-tab-selector',
    sex: {
      womenFilterBtn: '[aria-label="Kobiety"] button',
      menFilterBtn: '[aria-label="Mężczyźni"] button',
      productType: {
        shoes: `//*[starts-with(@class, 'ContainerDesktopstyles__CategoryContainer') and .//*[contains(@class, 'styles__Title') and .//span[contains(text(), 'Buty')]]]/div[starts-with(@class, 'styles__CategoryWrapper')]/button`,
        // shoes: `//*[starts-with(@class, 'ContainerDesktopstyles__CategoryContainer') and .//*[contains(@class, 'styles__Title') and .//span[contains(text(), 'Buty')]]]`,
        cloth: `//*[starts-with(@class, 'ContainerDesktopstyles__CategoryContainer') and .//*[contains(@class, 'styles__Title') and .//span[contains(text(), 'Odzież')]]]`,
        productStyle: {
          all: `./div[starts-with(@class, 'styles__CategoryWrapper')]/button`,
        },
      },
    },
  },
  sizeCategory: {
    sizeCategoryBtn: `//*[starts-with(@class, 'tabs___link') and contains(., 'Rozmiar')]`,
    productStyle: {
      shoes: `//*[starts-with(@class, 'size___tabs')]//button[.//span[text() = 'Obuwie']]`,
      sizes: {
        36: `//*[starts-with(@class, 'sizeSelectors___size-')]//label[.//span[text() = '36']]`,
      },
    },
  },
};

export const setFilters = async (page) => {
  await page.waitForSelector(SELECTORS.mainCategory.mainCategoryBtn);
  await page.click(SELECTORS.mainCategory.mainCategoryBtn);
  await page.waitForTimeout(1000);
  console.log(' ----- CHOOSE MAIN CATEGORY ----- \n');

  await page.waitForSelector(SELECTORS.mainCategory.sex.womenFilterBtn);
  await page.click(SELECTORS.mainCategory.sex.womenFilterBtn);
  await page.waitForTimeout(1000);
  console.log(' ----- CHOOSE WOMEN ----- \n');

  await page.waitForXPath(SELECTORS.mainCategory.sex.productType.shoes, { visible: true });
  const [productStyleBtn] = await page.$x(SELECTORS.mainCategory.sex.productType.shoes);
  await productStyleBtn.click();
  console.log(' ----- CHOOSE ALL SHOES ----- \n');

  const [sizeFilterBtn] = await page.$x(SELECTORS.sizeCategory.sizeCategoryBtn);
  await sizeFilterBtn.click();
  console.log(' ----- CHOOSE SIZE CATEGORY ----- \n');
  await page.waitForTimeout(1000);

  await page.waitForXPath(SELECTORS.sizeCategory.productStyle.shoes, { visible: true });
  const [shoesType] = await page.$x(SELECTORS.sizeCategory.productStyle.shoes);
  await shoesType.click();
  await page.waitForTimeout(1000);
  // await page.waitForTimeout(300000);

  await page.waitForXPath(SELECTORS.sizeCategory.productStyle.sizes['36'], { visible: true });
  const [requireSizeBtn] = await page.$x(SELECTORS.sizeCategory.productStyle.sizes['36']);
  await requireSizeBtn.click();
  console.log(' ----- CHOOSE REQUIRE SIZE ----- \n');
  await page.waitForTimeout(1000);

  const $ = await getHTML(page);
  const productLinks = getProductLinks($);
  return productLinks;
  //   await dataset.pushData(outputObj);
};
