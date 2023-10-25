import dotenv from 'dotenv';
dotenv.config();

const config = {
  LOGIN: process.env.LOGIN,
  PASSWORD: process.env.PASSWORD,
  LOGIN_URL: 'https://www.zalando-lounge.pl/event#',
  LABELS: {
    LOGIN: 'login',
    BASKET: 'basket',
    FILTERS_LINKS: 'filters-links',
  },
};

export default config;
