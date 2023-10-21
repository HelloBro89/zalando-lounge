import dotenv from 'dotenv';
dotenv.config();

const config = {
  LOGIN: process.env.LOGIN,
  PASSWORD: process.env.PASSWORD,
};

export default config;
