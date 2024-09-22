import { getDailyEma } from '../../api/urls.mjs';

export const generateEmaIteratorList = ({ date, dailyList }) => {
  return dailyList
    .map((stock) => {
      return [
        {
          url: getDailyEma({ ticker: stock.ticker, date, window: 5 }),
          key: `${stock.ticker}-5`,
        },
        {
          url: getDailyEma({ ticker: stock.ticker, date, window: 21 }),
          key: `${stock.ticker}-21`,
        },
      ];
    })
    .flatMap((list) => list);
};

export const getEmasFromIterator = async (emaIterator) => {
  const collection = [];
  for await (const iter of emaIterator) {
    const {
      results: { values },
    } = iter;
    const { key } = iter;
    const [ticker, emaType] = key.split('-');
    console.log('getting results for ticker ', ticker);
    const ema = values.length ? values[0].value : 0;
    collection.push({
      ticker,
      emaType,
      ema: Number.parseFloat(ema).toFixed(2),
    });
  }
  return collection;
};
