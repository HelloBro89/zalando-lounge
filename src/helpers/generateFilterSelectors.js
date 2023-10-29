import FILTERS_CONFIG from '../../config/filters-config.json' assert { type: 'json' };

export const generateFilterSelectors = (filters) => {
  return filters.map((filter) => {
    return {
      sex: `[aria-label=${filter.sex}] button`,
      //   productType: filters.productType,
      productStyle:
        filter.productStyle === 'allShoes' || filter.productStyle === 'allClothes'
          ? `//*[starts-with(@class, 'ContainerDesktopstyles__CategoryContainer') and .//*[contains(@class, 'styles__Title') and .//span[contains(text(), 'Buty')]]]/div[starts-with(@class, 'styles__CategoryWrapper')]/button`
          : `//*[starts-with(@class, 'ContainerDesktopstyles__CategoryContainer') and .//*[contains(@class, 'styles__Title') and .//span[contains(text(), 'Buty')]]]/div[starts-with(@class, 'styles__CategoryWrapper')]//li/button[./span[text() = '${filter.productStyle}']]`,
      sizeVariantsSel: FILTERS_CONFIG.SIZE_STYLE[filter.productStyle].map((variant) => ({
        variantSel: `//*[starts-with(@class, 'size___tabs')]//button[.//span[text() = '${variant}']]`,
        // sizes: filter.sizes,
        sizes: filter.sizes.map(
          (size) =>
            `//*[starts-with(@class, 'sizeSelectors___size-')]//label[.//span[text() = '${size}']]`
        ),
      })),
    };
  });
};
