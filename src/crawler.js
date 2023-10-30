import * as fs from 'fs';
import { Dataset, PuppeteerCrawler, log, LogLevel, KeyValueStore, Configuration } from 'crawlee';
import { router } from './routers/routers.js';
import config from '../config/app-config.js';

export const startCrawler = async (params) => {
  const LOGIN_DATA_LINK = [
    {
      label: 'login',
      url: config.LOGIN_URL,
      userData: {
        jobIndex: 0,
        ...params,
      },
    },
  ];
  const crawler = new PuppeteerCrawler(
    {
      minConcurrency: 5,
      maxConcurrency: 20,
      maxRequestRetries: 0,
      headless: false,
      requestHandler: router,
      useSessionPool: true,
      // sessionPoolOptions: { maxPoolSize: 100 },
      requestHandlerTimeoutSecs: 999999,
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

  await crawler.run(LOGIN_DATA_LINK);
  await Dataset.exportToJSON('test-output');
};
