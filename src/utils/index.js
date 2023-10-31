import cheerio from 'cheerio';
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

export const getHTML = async (page) => {
  const html = await page.evaluate(() => document.querySelector('html').outerHTML);
  return cheerio.load(html);
};

export const runAtSpecificTime = async (callback, targetTime = 0) => {
  const currentTime = new Date();
  console.log(` ------ ${targetTime} ------- `);
  const timeToTarget = new Date(currentTime);

  if (targetTime) {
    const targetTimeParts = targetTime.split(':');
    const [hours, minutes, seconds] = targetTimeParts;

    const targetHour = parseInt(hours);
    const targetMinute = parseInt(minutes);
    const targetSecond = parseInt(seconds || 0);
    timeToTarget.setHours(targetHour);
    timeToTarget.setMinutes(targetMinute);
    timeToTarget.setSeconds(targetSecond);
    timeToTarget.setMilliseconds(0);
  }

  const timeDiff = timeToTarget - currentTime;
  console.log({ timeDiff });
  if (timeDiff < 0) {
    timeToTarget.setDate(timeToTarget.getDate() + 1);
  }

  const delay = timeToTarget - currentTime;
  console.log({ delay });
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        await callback();
        resolve();
      } catch (error) {
        console.error(error);
        reject(error);
      }
    }, delay);
  });
};
