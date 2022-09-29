require('dotenv').config();
const express = require('express');
const cors = require('cors');

// const sequelize = require('../models')
// sequelize.sync()

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT;
app.listen(port, () =>
  console.log(port, `server is running on ${port}\n\n\n\n\n`)
);
