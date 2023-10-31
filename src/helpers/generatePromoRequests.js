import config from '../../config/app-config.js';
import { generateFilterSelectors } from './generateFilterSelectors.js';

export const generatePromoRequests = ({ promos, targetTime, listOfSizes }) => {
  return {
    targetTime,
    requests: promos.map((param, ind) => {
      const { filters, ...mainData } = param;
      return {
        label: config.LABELS.FILTERS_LINKS,
        url: `https://www.zalando-lounge.pl/campaigns/${mainData.promoId}/1`,
        jobIndex: ind,
        userData: {
          listOfSizes,
          selFilters: generateFilterSelectors(filters),
        },
      };
    }),
  };
};
