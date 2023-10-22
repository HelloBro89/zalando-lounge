import { Dataset, PuppeteerCrawler, log, LogLevel, KeyValueStore, Configuration } from 'crawlee';
import { router } from './routers/routers.js';

export const startCrawler = async (urlToCampaign) => {
  const LOGIN_LINK = [
    {
      label: 'login',
      url: `https://www.zalando-lounge.pl/campaigns/${urlToCampaign}/1`,
    },
  ];

  const crawler = new PuppeteerCrawler(
    {
      minConcurrency: 4,
      maxConcurrency: 20,
      maxRequestRetries: 3,
      requestHandlerTimeoutSecs: 30,
      headless: false,
      requestHandler: router,
      useSessionPool: false,
      navigationTimeoutSecs: 60,
      preNavigationHooks: [
        async (crawlingContext, /* browserContext, */ gotoOptions) => {
          console.log(crawlingContext);
          gotoOptions.timeout = 60_000;
          gotoOptions.waitUntil = 'networkidle2';
          // gotoOptions.waitUntil = 'domcontentloaded';
          console.log(gotoOptions);
        },
      ],
      async failedRequestHandler({ request, error }) {
        log.error(`Request ${request.url} failed too many times.`);

        const store = await KeyValueStore.open('errors');
        await store.setValue(`error-${request.userData.index}`, {
          url: request.url,
          index: request.userData.index,
          status: 'Fail',
          message: error.message,
        });
      },
    }
    // config,
  );

  await crawler.run(LOGIN_LINK);
  await Dataset.exportToJSON('test-output');
};