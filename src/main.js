import { startCrawler } from './crawler.js';
import { generatePromoRequests } from './helpers/generatePromoRequests.js';

// TODO: refactor setFilters handler (need to parse request userData and to add loops)

// TODO: need to improve adding to basket speed and and to solve the problem with more than one opened browser(login)

const TEMP_INPUT_DATA = {
  targetTime: '20:05:43',
  promos: [
    {
      id: 'ZZO2KXU',
      filters: [
        {
          sex: 'Kobiety',
          productStyle: 'Sneakersy',
          sizes: ['36', '37'],
        },
        {
          sex: 'Kobiety',
          productStyle: 'Sukienki',
          sizes: ['32', '34'],
        },
      ],
    },
  ],
};

const inputData = generatePromoRequests(TEMP_INPUT_DATA);

console.log(JSON.stringify(inputData, null, 2));
(async () => {
  await startCrawler(inputData);
  console.log(' Crawler finished !');
})();
