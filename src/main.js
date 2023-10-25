import { startCrawler } from './crawler.js';
import { generatePromoRequests } from './helpers/generatePromoRequests.js';

// TODO: need to improve adding to basket speed and and to solve the problem with more than one opened browser(login)
// TODO: set input filters

const TEMP_INPUT_DATA = [
  {
    promoId: 'ZZO2H8U',
  },
];

const inputData = generatePromoRequests(TEMP_INPUT_DATA);

(async () => {
  await startCrawler(inputData);
  console.log(' Crawler finished !');
})();
