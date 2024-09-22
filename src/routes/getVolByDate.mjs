import express from 'express';
import { validateGetDayVolumeRequest } from '../middlewares/validation.mjs';
import axios from 'axios';
import { getDailyUrl } from '../api/urls.mjs';
import { getTopVol } from './utils/getTopVol.mjs';

const router = express.Router();

router.get('/volbydate', validateGetDayVolumeRequest, async (req, res) => {
  const { date } = req.query;

  try {
    const url = getDailyUrl(date);

    const response = await axios.get(url);
    const { results } = response.data;
    const dailyList = getTopVol(results);

    return res.json({ dailyList });
  } catch (error) {
    res.status(500).send('Error getting day volumes');
  }
});

export default router;
