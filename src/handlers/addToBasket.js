import { Dataset, LogLevel, log, purgeDefaultStorages } from 'crawlee';
import { removeElement } from '../utils/index.js';

const SELECTORS = {
  cookies: 'div#usercentrics-button',
  chooseModule:
    '//div[starts-with(@class, "Content-sc")]//label//span[text()="Mimo to zamawiam oba rozmiary"]',
  basketBtn: '.auto-tests-add-to-cart-button',
  confirm: '//button[@color="primary" and .//span[text()="Potwierdź"]]',
};

log.setLevel(LogLevel.DEBUG);
export const addToBasket = async ({ request, page }) => {
  await removeElement(page, SELECTORS.cookies);
  const { sizes } = request.userData;
  const [firstSize, secSize] = sizes;

  const firstSelSize = `//*[contains(@class, "styles__ArticleSizeItemList")]//*[starts-with(@class, "styles__ArticleSizeItemWrapper")]//button[not(@disabled) and .//span[text()=${firstSize}]]`;
  const [firstSizeBtn] = await page.$x(firstSelSize);

  let isFirstSize = false;
  if (firstSizeBtn) {
    isFirstSize = true;
    await firstSizeBtn.click();
    await page.waitForSelector(SELECTORS.basketBtn);
    await page.click(SELECTORS.basketBtn);
  }

  const secSelSize = `//*[contains(@class, "styles__ArticleSizeItemList")]//*[starts-with(@class, "styles__ArticleSizeItemWrapper")]//button[not(@disabled) and .//span[text()=${secSize}]]`;
  const [secSizeBtn] = await page.$x(secSelSize);
  if (secSizeBtn) {
    await secSizeBtn.click();
    await page.waitForSelector(SELECTORS.basketBtn);
    await page.waitForTimeout(2000);
    await page.click(SELECTORS.basketBtn);
    if (isFirstSize) {
      await page.waitForXPath(SELECTORS.chooseModule, { visible: true });
      const [bothSize] = await page.$x(SELECTORS.chooseModule);
      await bothSize.click();
      await page.waitForXPath(SELECTORS.confirm, { visible: true });
      // await page.waitForTimeout(500);
      const [confirmBtn] = await page.$x(SELECTORS.confirm);
      await confirmBtn.click();
    }
  }

  return;
};
