import { createPuppeteerRouter, log, purgeDefaultStorages } from 'crawlee';
import { loginHandler } from '../handlers/login.js';
import { addToBasket } from '../handlers/addToBasket.js';
import { setFiltersAndGetLinks } from '../handlers/setFiltersAndGetLinks.js';
import config from '../../config/app-config.js';

export const router = createPuppeteerRouter();

router.addHandler(config.LABELS.LOGIN, loginHandler);
router.addHandler(config.LABELS.BASKET, addToBasket);
router.addHandler(config.LABELS.FILTERS_LINKS, setFiltersAndGetLinks);
