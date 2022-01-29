import express, { json, urlencoded } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import urls from './models/urls';

dotenv.config();

const dbUrl = process.env.NODE_ENV === 'test' ? 'mongodb://mymongodb:27017/mongo-test' : 'mongodb://mymongodb:27017/mongo-development';

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Database connected'))
  .catch((error) => console.log(error));

const app = express();

app.use(express.static(`${__dirname}/public`));

console.log(`Worker ${process.pid} started`);

app.use(json());

app.use(
  urlencoded({
    extended: true,
  }),
);

app.use(cors());

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('combined'));
}

app.get('/short-urls', async (req, res, next) => {
  try {
    const results = await urls.find({}).sort({ createdAt: -1 });
    res.status(200).json({
      results,
    });
  } catch (error) {
    next(error);
  }
});

app.get('/:shortUrl', async (req, res, next) => {
  try {
    const result = await urls.findOne({
      shortUrl: req.params.shortUrl,
    });

    if (result === null) {
      return res.sendFile(`${__dirname}/public/404.html`);
    }
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    return res.redirect(302, result.fullUrl);
  } catch (error) {
    return next(error);
  }
});

app.post('/short-urls', async (req, res, next) => {
  try {
    if (!req.body.fullUrl) {
      return res.status(400).json({
        message: 'original long url is required',
      });
    }
    const result = await urls.create({
      fullUrl: req.body.fullUrl,
    });
    return res.status(201).json({
      result,
    });
  } catch (error) {
    return next(error);
  }
});

app.use('*', (req, res) => res.status(404).json({
  message: 'Page not found',
}));

app.use((err, req, res) => {
  res.status(500).send('Something broke!');
});

export default app;
