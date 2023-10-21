export const removeElement = (page, selector, elementHandle) =>
  page.evaluate(
    (selector, elementHandle) => {
      const remove = (el) => el && el.remove();
      const source = elementHandle || document;
      const nodeList = source.querySelectorAll(selector);
      const elements = Array.from(nodeList);

      for (const el of elements) {
        remove(el);
      }
    },
    selector,
    elementHandle
  );
