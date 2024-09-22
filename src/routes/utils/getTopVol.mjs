import { sortByVolume } from './common.mjs';
const LIMIT = 100;
const excludedList = ['QQQ', 'TQQQ', 'SQQQ', 'SPY', 'SOXL', 'BAC'];

export const getTopVol = (results) => {
  return results
    .map((d) => {
      return {
        volume: d.v,
        ticker: d.T,
        price: d.o,
      };
    })
    .filter((d) => !excludedList.includes(d.ticker) && d.price > 5)
    .sort(sortByVolume)
    .slice(0, LIMIT);
};
