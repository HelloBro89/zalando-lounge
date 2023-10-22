import { startCrawler } from './crawler.js';

const PART_OF_URL_TO_CAMPAIGN = 'ZZO2DSN';
(async () => {
  await startCrawler(PART_OF_URL_TO_CAMPAIGN);
  console.log('Crawler finished !');
})();
