require('dotenv').config();
require('express-async-errors');

//Extra security packages
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');

const express = require('express');

const app = express();

const connectDB = require('./db/connect');

const { MONGO_URI, DB_USER, DB_PASS, DATABASE_NAME, port = 3000 } = process.env;

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(rateLimit({ windowMs: 60 * 1000, max: 60 }));

// extra packages
const routerUser = require('./routes/auth');
const routerJob = require('./routes/jobs');

const authentication = require('./middleware/authentication');

// routes
app.get('/', (req, res) => {
  res.send('jobs api');
});

app.use('/api/v1/auth', routerUser);
app.use('/api/v1/jobs', authentication, routerJob);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(`mongodb+srv://${DB_USER}:${DB_PASS}@${MONGO_URI}/${DATABASE_NAME}?authSource=admin&replicaSet=atlas-wofvy2-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true`);
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

start();
