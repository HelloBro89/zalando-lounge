import config from '../../config/app-config.js';
import { generateFilterSelectors } from './generateFilterSelectors.js';

export const generatePromoRequests = ({ promos, targetTime }) => {
  return {
    targetTime,
    requests: promos.map((param, ind) => {
      const { filters, ...mainData } = param;
      return {
        label: config.LABELS.FILTERS_LINKS,
        url: `https://www.zalando-lounge.pl/campaigns/${mainData.id}/1`,
        jobIndex: ind,
        userData: {
          selFilters: generateFilterSelectors(filters),
        },
      };
    }),
  };
};
