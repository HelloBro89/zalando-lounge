import FILTERS_CONFIG from '../../config/filters-config.json' assert { type: 'json' };

export const generateFilterSelectors = (filters) => {
  return filters.map((filter) => {
    const { productType } = filter;
    const type = FILTERS_CONFIG.PRODUCT_TYPES[productType];
    return {
      sex: `[aria-label=${filter.sex}] button`,
      productStyle:
        filter.productStyle === 'allShoes' || filter.productStyle === 'allClothes'
          ? `//*[starts-with(@class, 'ContainerDesktopstyles__CategoryContainer') and .//*[contains(@class, 'styles__Title') and .//span[contains(text(), '${type}')]]]/div[starts-with(@class, 'styles__CategoryWrapper')]/button`
          : `//*[starts-with(@class, 'ContainerDesktopstyles__CategoryContainer') and .//*[contains(@class, 'styles__Title') and .//span[contains(text(), '${type}')]]]/div[starts-with(@class, 'styles__CategoryWrapper')]//li/button[./span[text() = '${filter.productStyle}']]`,
      sizeVariantsSel: FILTERS_CONFIG.SIZE_STYLE[filter.productStyle].map((variant) => ({
        // variantSel: `//*[starts-with(@class, 'size___tabs')]//button[.//span[text() = '${variant}']]`,
        variantSel: `//*[starts-with(@class, 'size___tabs')]//button//span[text() = '${variant}']`,
        sizes: filter.sizes.map(
          (size) =>
            `//*[starts-with(@class, 'sizeSelectors___size-')]//label[.//span[text() = '${size}']]`
        ),
      })),
    };
  });
};
