import dotenv from 'dotenv';
import { Dataset, PuppeteerCrawler, log, LogLevel, KeyValueStore, Configuration } from 'crawlee';
import { router } from './routers/routers.js';
// dotenv.config();

// TODO: need to do custom props passing (proxy and other settings)

const LOGIN_LINK = [
  { label: 'login', url: 'https://www.zalando-lounge.pl/campaigns/ZZO2KBX/articles/N1243A18Q-G11' },
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
    preNavigationHooks: [
      async (crawlingContext, gotoOptions) => {
        gotoOptions.timeout = 60_000;
        gotoOptions.waitUntil = 'networkidle2';
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
console.log(
  ` \n ------------- LENGTH of LINKS LIST ${LOGIN_LINK.length} -------------------------------- \n`
);
await Dataset.exportToJSON('test-output');
