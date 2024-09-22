//format 2023-01-09
import dotenv from 'dotenv';

dotenv.config();

const APIKEY = process.env.POLYGON_APIKEY;

export const getDailyUrl = (date) =>
  `https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks/${date}?adjusted=true&include_otc=false&apiKey=${APIKEY}`;

export const getDailyEma = ({ ticker, date, window }) =>
  `https://api.polygon.io/v1/indicators/ema/${ticker}?timestamp=${date}&timespan=day&adjusted=true&window=${window}&series_type=close&order=desc&limit=10&apiKey=${APIKEY}`;
