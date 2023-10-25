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
  await removeElement(page, SELECTORS.cookies);
  await page.click(SELECTORS.productSize);
  await page.waitForTimeout(500);
  await page.click(SELECTORS.basketBtn);
  await page.waitForTimeout(1000);
  return;
};
