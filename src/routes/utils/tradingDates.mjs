import dayjs from 'dayjs';
import { spinWheelBack } from './common.mjs';
import { DATE_FORMAT } from '../consts.mjs';
import { WheelSpinner } from './common.mjs';

const dayNames = [
  'Sunday', // 0
  'Monday',
  'Tuesday', // 2
  'Wednesday', // 3
  'Thursday', // 4
  'Friday', // 5
  'Saturday', // 6
];
const tradingDays = [...dayNames.slice(1, 6)];

const getPredFn = () => (pos) => tradingDays.includes(dayNames[pos]);

export const findPreviousTradingDay = (date = dayjs()) => {
  try {
    if (!(date instanceof dayjs)) {
      throw new Error('date must be a dayjs date');
    }
    const ws = new WheelSpinner(dayNames);
    const dayOfWeek = date.day();
    ws.setCurrentPosition(dayOfWeek);
    ws.setSpinPredicate(getPredFn());
    const totalSpins = ws.spin(WheelSpinner.BCK);

    return date.subtract(totalSpins, 'day').format(DATE_FORMAT);
  } catch (err) {
    return null;
  }
};

export const getLastTradingDate = () => {
  const currentDay = dayjs();
  return findPreviousTradingDay(currentDay);
};
