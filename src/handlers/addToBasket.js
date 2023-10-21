import { Dataset, LogLevel, log, purgeDefaultStorages } from 'crawlee';
import { removeElement } from '../utils/index.js';

const SELECTORS = {
  cookies: 'div#usercentrics-button',
  productSize:
    '[class*="styles__ArticleSizeItemList"] [class^="styles__ArticleSizeItemWrapper"]:nth-child(2)',
  basketBtn: '.auto-tests-add-to-cart-button',
};

log.setLevel(LogLevel.DEBUG);
export const addToBasket = async ({ request, page }) => {
  console.log(request);
  await page.waitForTimeout(5000);
  await removeElement(page, SELECTORS.cookies);
  await page.click(SELECTORS.productSize);
  await page.waitForTimeout(2000);
  await page.click(SELECTORS.basketBtn);

  await Dataset.pushData({
    url: request.url,
    status: 'DONE-BASKET',
  });

  //   await page.waitForTimeout(20000);
  //   await dataset.pushData(outputObj);
};
