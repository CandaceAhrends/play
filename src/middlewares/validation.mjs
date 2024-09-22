import { z } from 'zod';

const dateValidator = z.object({
  date: z.string().refine(
    (val) => {
      // Check if the date is valid using Date.parse
      const parsedDate = Date.parse(val);
      return !isNaN(parsedDate) && /^\d{4}-\d{2}-\d{2}$/.test(val); // Ensure date format is YYYY-MM-DD
    },
    {
      message: 'Invalid date format, must be YYYY-MM-DD',
    }
  ),
});

export const validateGetDayVolumeRequest = (req, res, next) => {
  const { date } = req.query;

  try {
    dateValidator.parse({ date });
  } catch (error) {
    // Handle validation or query errors
    if (error instanceof z.ZodError) {
      // Zod validation errors
      res.status(400).json({ error: error.errors });
    } else {
      // Other errors
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  next();
};
