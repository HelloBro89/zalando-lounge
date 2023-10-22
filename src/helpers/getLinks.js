export const getProductLinks = ($) => {
  const $products = $('#articleListWrapper li').toArray();
  return $products.map((product) => {
    const $product = $(product);
    return {
      label: 'basket',
      url: `https://www.zalando-lounge.pl${$product.find('a').first().attr('href')}`,
    };
  });
};
