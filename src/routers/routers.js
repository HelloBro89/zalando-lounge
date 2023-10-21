import { createPuppeteerRouter, log, purgeDefaultStorages } from 'crawlee';
import { loginHandler } from '../handlers/login.js';
import { addToBasket } from '../handlers/addToBasket.js';

export const router = createPuppeteerRouter();

router.addHandler('login', loginHandler);
router.addHandler('basket', addToBasket);
