require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const transactionsApi = require('./routes/transactionsapi');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(cors());
mongoose.connect(
  process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/BankDB',
  { useNewUrlParser: true, useUnifiedTopology: true }
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, Content-Length, X-Requested-With'
  );
  next();
});
app.use('/api/transactions', transactionsApi);
app.get('*', (req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    return res.status(404).send('Not found');
  }
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});
const db = mongoose.connection;
db.on('connected', () => {
  console.log('Connected to MongoDB');
});
db.on('error', (err) => {
  console.error('Failed to connect to MongoDB', err);
});
db.on('disconnected', () => {
  console.log('Disconnected from MongoDB');
});
app.listen(process.env.PORT || port, () => {
  console.log(`Server is running on port ${port}`);
});
