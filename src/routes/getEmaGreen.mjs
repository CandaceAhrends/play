import express from 'express';
import { getTopVol } from './utils/getTopVol.mjs';
import axios from 'axios';
import { getDailyUrl } from '../api/urls.mjs';
import { getLastTradingDate } from './utils/tradingDates.mjs';
import { createUrlGetIterator } from '../iterators/urlIterator.mjs';
import { getGreenEmaStackStocks } from './utils/emas.mjs';
import {
  generateEmaIteratorList,
  getEmasFromIterator,
} from './utils/iterators.mjs';

const router = express.Router();

router.get('/tradable', async (req, res) => {
  try {
    const date = getLastTradingDate();
    const url = getDailyUrl(date);
    const response = await axios.get(url);
    const { results } = response.data;
    const dailyList = getTopVol(results);
    const urlList = generateEmaIteratorList({ date, dailyList });
    const urlIterator = createUrlGetIterator(urlList);
    const collection = await getEmasFromIterator(urlIterator);
    const greenStocks = getGreenEmaStackStocks(collection);

    return res.json({ greenStocks });
  } catch (error) {
    res.status(500).send('Error getting green stocks');
  }
});

export default router;
