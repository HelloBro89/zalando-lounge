import { Dataset, LogLevel, log, purgeDefaultStorages } from 'crawlee';
import { removeElement } from '../utils/index.js';
import config from '../../config/envs-config.js';
import { setFilters } from './setFilters.js';

const PRODUCTS_TO_BASKET = [
  {
    label: 'basket',
    url: 'https://www.zalando-lounge.pl/campaigns/ZZO2KBX/articles/N1243A18G-Q16',
  },
  {
    label: 'basket',
    url: 'https://www.zalando-lounge.pl/campaigns/ZZO2DCL/articles/ZZO171519-Q00',
  },
];

const SELECTORS = {
  cookies: 'div#usercentrics-button',
  loginBtn: '#topbar-cta-btn',
  mailLoginBtn: '[aria-labelledby="sso-login-lounge"]',
  mailForm: '#form-email',
  passwordForm: '#form-password',
  enterToAccountBtn: '[aria-labelledby="login-form-submit"]',

  productSize:
    '[class*="styles__ArticleSizeItemList"] [class^="styles__ArticleSizeItemWrapper"]:nth-child(2)',
  basketBtn: '.auto-tests-add-to-cart-button',
  showPass: '[class^="ToggleWrapper"]',
};

log.setLevel(LogLevel.DEBUG);

export const loginHandler = async ({ request, crawler, page }) => {
  // await page.waitForTimeout(2000);
  console.log(' ------------ ENVS ------------------- \n', config);
  console.log(' ------------ LOGING ------------------- \n', request);
  await removeElement(page, SELECTORS.cookies);
  await page.click(SELECTORS.loginBtn);
  await page.waitForTimeout(30000);
  // await page.waitForSelector(SELECTORS.mailLoginBtn, { visible: true });
  // await page.click(SELECTORS.mailLoginBtn);
  // await page.waitForNavigation({ waitUntil: 'networkidle2' });

  // await page.waitForSelector(SELECTORS.mailForm);
  // await page.type(SELECTORS.mailForm, config.LOGIN, { delay: 50 });
  // await page.waitForSelector(SELECTORS.passwordForm);

  // await page.type(SELECTORS.passwordForm, config.PASSWORD, { delay: 50 });

  // // await page.click(SELECTORS.showPass); // * click to hide password and login
  // await page.waitForTimeout(1000);
  // await page.click(SELECTORS.enterToAccountBtn);

  // await page.waitForNavigation({ waitUntil: 'networkidle2' });
  // // page.setTimeout(60000);
  // await removeElement(page, SELECTORS.cookies);

  // await setFilters(page);

  // // await crawler.addRequests(PRODUCTS_TO_BASKET); // ! add to basket handler

  // await Dataset.pushData({
  //   url: request.url,
  //   status: 'DONE-LOGIN',
  // });
};
