import config from '../../config/app-config.js';

const SELECTORS = {
  products: '#articleListWrapper li',
};

export const getProductLinks = ($) => {
  const $products = $(SELECTORS.products).toArray();
  return $products.map((product) => {
    const $product = $(product);
    const url = $product.find('a').first().attr('href');
    return {
      label: config.LABELS.BASKET,
      url: `https://www.zalando-lounge.pl${url}`,
    };
  });
};
