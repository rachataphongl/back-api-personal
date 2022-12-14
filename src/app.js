require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const authRoute = require('./routes/authRoute');
const postRoute = require('./routes/postRoute');
const cartRoute = require('./routes/cartRoute');
const orderRoute = require('./routes/orderRourte');
const error = require('./middlewares/error');
const authenticate = require('./middlewares/authenticate');

// const { sequelize } = require('./models');
// sequelize.sync({ alter: true });

const app = express();

app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/auth', authRoute);
app.use('/posts', authenticate, postRoute);

app.use('/cart', authenticate, cartRoute);
app.use('/order', authenticate, orderRoute);

app.use(error);

const port = process.env.PORT;
app.listen(port, () =>
  console.log(port, `server is running on ${port}\n\n\n\n\n`)
);
