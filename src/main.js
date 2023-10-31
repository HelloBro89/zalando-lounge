import * as fs from 'fs';
import { startCrawler } from './crawler.js';
import { generatePromoRequests } from './helpers/generatePromoRequests.js';
import FILTERS_CONFIG from '../config/filters-config.json' assert { type: 'json' };

// TODO: to solve the problem with more than one opened browser(login)

const TEMP_INPUT_DATA = {
  targetTime: '',
  listOfSizes: ['37-38', '58'],
  promos: [
    {
      promoId: 'ZZO2FHC',
      filters: [
        // {
        //   sex: 'Kobiety',
        //   productType: 'CLOTHES',
        //   productStyle: 'Koszulki klubowe i akcesoria dla kibiców',
        //   sizes: ['S', 'M'],
        // },
        // {
        //   sex: 'Kobiety',
        //   productType: 'SHOES',
        //   productStyle: FILTERS_CONFIG.PRODUCT_STYLE.SHOES.ALL,
        //   sizes: ['37', '41'],
        // },
        {
          sex: 'Kobiety',
          productType: 'SHOES',
          productStyle: FILTERS_CONFIG.PRODUCT_STYLE.SHOES.ALL,
          sizes: ['37-38', '58'],
        },
      ],
    },
  ],
};

const inputData = generatePromoRequests(TEMP_INPUT_DATA);
fs.writeFileSync('testJSON.json', JSON.stringify(inputData));

console.log(JSON.stringify(inputData, null, 2));
(async () => {
  await startCrawler(inputData);
  console.log(' Crawler finished !');
})();
