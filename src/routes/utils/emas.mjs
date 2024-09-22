export const getGreenEmaStackStocks = (collection) => {
  const emasByTicker = collection.reduce((acc, stock) => {
    if (acc.has(stock.ticker)) {
      const accStock = acc.get(stock.ticker);
      accStock.push(stock);
      acc.set(stock.ticker, accStock);
    } else {
      acc.set(stock.ticker, [stock]);
    }
    return acc;
  }, new Map());

  return [...emasByTicker.values()]
    .filter((ema) => {
      try {
        const ticker = ema[0].ticker;
        const ema21 = Number.parseFloat(
          ema.find((stock) => stock.emaType === '21').ema
        );
        const ema5 = Number.parseFloat(
          ema.find((stock) => stock.emaType === '5').ema
        );

        if (ema5 >= ema21) {
          return ticker;
        } else {
          return null;
        }
      } catch (err) {
        return null;
      }
    })
    .filter((s) => s);
};
