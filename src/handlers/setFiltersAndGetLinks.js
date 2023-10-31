import { getHTML } from '../utils/index.js';
import { getProductLinks } from '../helpers/getLinks.js';
import { Dataset } from 'crawlee';
import { removeElement } from '../utils/index.js';

const SELECTORS = {
  cookies: 'div#usercentrics-button',
  colorCategory: '//*[starts-with(@class, "tabs___link") and contains(., "Kolor")]',
  colorWhite: 'input[aria-label="biały"]',
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
  console.log(' ------------ FILTERING userData ------------------- \n', request.userData);
  const { selFilters } = request.userData;
  const productLinks = [];
  for (const filter of selFilters) {
    const { sex, productStyle, sizeVariantsSel } = filter;
    await removeElement(page, SELECTORS.cookies);
    console.log(' ----- CHOOSE MAIN CATEGORY ----- \n');
    await page.waitForSelector(SELECTORS.mainCategory.mainCategoryBtn); //* static
    await page.click(SELECTORS.mainCategory.mainCategoryBtn);

    console.log(' ----- CHOOSE SEX ----- \n');
    await page.waitForSelector(sex);
    await page.click(sex);

    console.log(' ----- CHOOSE PRODUCT TYPE ----- \n');
    await page.waitForXPath(productStyle, { visible: true }); // ! mb doesn't exist
    const [productStyleBtn] = await page.$x(productStyle);
    await productStyleBtn.click();
    await page.waitForTimeout(500);

    console.log(' ----- CHOOSE SIZE CATEGORY ----- \n');
    const [sizeFilterBtn] = await page.$x(SELECTORS.sizeCategory.sizeCategoryBtn); //* static
    await sizeFilterBtn.click();
    for (const sizeVariant of sizeVariantsSel) {
      const { variantSel, sizes, listOfSizes } = sizeVariant;

      await page.waitForTimeout(1000);

      console.log(' ----- CHOOSE SIZE FOR PRODUCT TYPE ----- \n');
      // await page.waitForXPath(variantSel, { visible: true });
      const [shoesType] = await page.$x(variantSel);

      if (shoesType) {
        await shoesType.click();
        await page.waitForTimeout(700);
        for (const size of sizes) {
          console.log(' ----- CHOOSE REQUIRE SIZE ----- \n');
          const [requireSizeBtn] = await page.$x(size);
          if (requireSizeBtn) {
            await requireSizeBtn.click();
          }
        }
      }
    }

    // ! ----------------------------- TEMP -----------------------------
    console.log(' ----- CHOOSE WHITE COLOR ----- \n');
    await page.waitForXPath(SELECTORS.colorCategory, { visible: true }); // ! mb doesn't exist
    const [colorCategoryBtn] = await page.$x(SELECTORS.colorCategory);
    await colorCategoryBtn.click();
    await page.waitForTimeout(500);
    const whiteBtn = await page.$(SELECTORS.colorWhite);
    if (whiteBtn) {
      await page.click(SELECTORS.colorWhite);
    }
    // ! ----------------------------------------------------------------

    await page.waitForTimeout(2500);
    const $ = await getHTML(page);
    const links = getProductLinks($, request.userData.listOfSizes);
    productLinks.push(...links);
  }

  for (const link of productLinks) {
    await Dataset.pushData(link);
  }
  await crawler.addRequests(productLinks);
};
