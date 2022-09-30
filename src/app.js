require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoute = require('../routes/authRoute');
const error = require('../middlewares/error');

// const { sequelize } = require('../models');
// sequelize.sync({ alter: true });

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/auth', authRoute);

app.use(error);

const port = process.env.PORT;
app.listen(port, () =>
  console.log(port, `server is running on ${port}\n\n\n\n\n`)
);
