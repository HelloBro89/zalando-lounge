import { getHTML } from '../utils/index.js';
import { getProductLinks } from '../helpers/getLinks.js';
import { Dataset } from 'crawlee';
import { removeElement } from '../utils/index.js';

const SELECTORS = {
  cookies: 'div#usercentrics-button',
  mainCategory: {
    mainCategoryBtn: '#category-tab-selector',
    sex: {
      womenFilterBtn: '[aria-label="Kobiety"] button',
      menFilterBtn: '[aria-label="Mężczyźni"] button',
      productType: {
        shoesAll: `//*[starts-with(@class, 'ContainerDesktopstyles__CategoryContainer') and .//*[contains(@class, 'styles__Title') and .//span[contains(text(), 'Buty')]]]/div[starts-with(@class, 'styles__CategoryWrapper')]/button`,
        shoesBotki: `//*[starts-with(@class, 'ContainerDesktopstyles__CategoryContainer') and .//*[contains(@class, 'styles__Title') and .//span[contains(text(), 'Buty')]]]/div[starts-with(@class, 'styles__CategoryWrapper')]//li/button[./span[text() = 'Botki']]`,
        clothAll: `//*[starts-with(@class, 'ContainerDesktopstyles__CategoryContainer') and .//*[contains(@class, 'styles__Title') and .//span[contains(text(), 'Odzież')]]]/div[starts-with(@class, 'styles__CategoryWrapper')]/button`,
        clothSukienki: `//*[starts-with(@class, 'ContainerDesktopstyles__CategoryContainer') and .//*[contains(@class, 'styles__Title') and .//span[contains(text(), 'Odzież')]]]/div[starts-with(@class, 'styles__CategoryWrapper')]//li/button[./span[text() = 'Sukienki']]`,
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

export const setFiltersAndGetLinks = async ({ request, crawler, page }) => {
  console.log(' ------------ FILTERING ------------------- \n', request);

  await removeElement(page, SELECTORS.cookies);
  console.log(' ----- CHOOSE MAIN CATEGORY ----- \n');
  await page.waitForSelector(SELECTORS.mainCategory.mainCategoryBtn); //* static
  await page.click(SELECTORS.mainCategory.mainCategoryBtn);
  await page.waitForTimeout(1000);

  console.log(' ----- CHOOSE SEX ----- \n');
  await page.waitForSelector(SELECTORS.mainCategory.sex.womenFilterBtn);
  await page.click(SELECTORS.mainCategory.sex.womenFilterBtn);
  await page.waitForTimeout(1000);

  console.log(' ----- CHOOSE PRODUCT TYPE ----- \n');
  await page.waitForXPath(SELECTORS.mainCategory.sex.productType.shoesAll, { visible: true });
  const [productStyleBtn] = await page.$x(SELECTORS.mainCategory.sex.productType.shoesAll);
  await productStyleBtn.click();

  console.log(' ----- CHOOSE SIZE CATEGORY ----- \n');
  const [sizeFilterBtn] = await page.$x(SELECTORS.sizeCategory.sizeCategoryBtn); //* static
  await sizeFilterBtn.click();
  await page.waitForTimeout(1000);

  console.log(' ----- CHOOSE SIZE FOR PRODUCT TYPE ----- \n');
  await page.waitForXPath(SELECTORS.sizeCategory.productStyle.shoes, { visible: true });
  const [shoesType] = await page.$x(SELECTORS.sizeCategory.productStyle.shoes);
  await shoesType.click();
  await page.waitForTimeout(1000);

  console.log(' ----- CHOOSE REQUIRE SIZE ----- \n');
  await page.waitForXPath(SELECTORS.sizeCategory.productStyle.sizes['36'], { visible: true });
  const [requireSizeBtn] = await page.$x(SELECTORS.sizeCategory.productStyle.sizes['36']);
  await requireSizeBtn.click();

  await page.waitForTimeout(1000);

  const $ = await getHTML(page);
  const productLinks = getProductLinks($);

  for (const productLink of productLinks) {
    await Dataset.pushData(productLink);
  }
  await crawler.addRequests(productLinks); // ! add to basket handler
};
