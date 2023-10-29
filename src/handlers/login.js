import { Dataset, LogLevel, log, purgeDefaultStorages } from 'crawlee';
import { removeElement, runAtSpecificTime } from '../utils/index.js';
import config from '../../config/app-config.js';
import { setFiltersAndGetLinks } from './setFiltersAndGetLinks.js';

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
  console.log(' ------------ ENVS ------------------- \n', config);
  console.log(' ------------ LOGGING DATA------------------- \n', {
    REQUEST_FULL: request,
    USER_DATA: request.userData,
  });

  await removeElement(page, SELECTORS.cookies);
  await page.click(SELECTORS.loginBtn);

  await page.waitForSelector(SELECTORS.mailLoginBtn, { visible: true });
  await page.click(SELECTORS.mailLoginBtn);
  await page.waitForNavigation({ waitUntil: 'networkidle2' });

  await page.waitForSelector(SELECTORS.mailForm);
  await page.type(SELECTORS.mailForm, config.LOGIN);
  await page.waitForSelector(SELECTORS.passwordForm);

  await page.type(SELECTORS.passwordForm, config.PASSWORD);

  await page.waitForTimeout(1000);
  await page.click(SELECTORS.enterToAccountBtn);

  await page.waitForNavigation({ waitUntil: 'networkidle2' });

  await removeElement(page, SELECTORS.cookies);

  console.log(' ------------ START TIMER ------------------- \n');
  await runAtSpecificTime(async () => {
    await crawler.addRequests(request.userData.requests);
  }, request.userData.targetTime);
  console.log(' ------------ END TIMER ------------------- \n');
};
