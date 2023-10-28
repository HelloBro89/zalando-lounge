import config from '../../config/app-config.js';

export const generatePromoRequests = ({ promos, targetTime }) => {
  return {
    targetTime,
    requests: promos.map((param, ind) => ({
      label: config.LABELS.FILTERS_LINKS,
      url: `https://www.zalando-lounge.pl/campaigns/${param.id}/1`,
      jobIndex: ind,
      targetTime: '19:59:58',
    })),
  };
};
