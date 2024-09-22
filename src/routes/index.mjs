import { Router } from 'express';

import getVolByDate from './getVolByDate.mjs';
import getEmaGreen from './getEmaGreen.mjs';

const router = Router();
const basePath = '';

router.use(basePath, getVolByDate);
router.use(basePath, getEmaGreen);

export default router;
