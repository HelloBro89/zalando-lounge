import config from '../../config/app-config.js';

export const generatePromoRequests = (inputParams) => {
  return {
    requests: inputParams.map((param, ind) => ({
      label: config.LABELS.FILTERS_LINKS,
      url: `https://www.zalando-lounge.pl/campaigns/${param.promoId}/1`,
      jobIndex: ind,
    })),
  };
};
