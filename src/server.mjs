import express from 'express';
import cors from 'cors';
import routes from './routes/index.mjs';

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 7070;

app.get('/', (req, res) => {
  res.json({ stocks: true });
});

app.use('/api/v1', routes);

app.listen(port, () => {
  console.log(`stock investigator server listening on port ${port}`);
});
