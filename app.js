const express = require('express');
// const userRoutes = require("./routes/userRoutes");
const userRoutes = require('./routes/userRoutes');
const menuRoutes = require('./routes/menuRoutes');
const orderRoutes = require('./routes/orderRoutes');
// const authController = require("./../contollers/authController");

const AppError = require('./utils/appError');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({ credentials: true }));
// app.use(bodyParser.json());
express.urlencoded({ extended: false });
// app.use((req, res, next) => {
//   console.log("hello from middleware ");
//   next();
// });

// module.exports = app.get('/OTS/', (req, res) => {
//   res.status(200).json({
//     msg: 'successful',
//   });
// });

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'));
  
}

module.exports = app.get('/OTS/getcookie', (req, res) => {
  res.cookie(`Cookie token name`, `encrypted cookie string Value`);
  res.status(200).json({
    msg: 'cookie set',
  });
});

app.use('/OTS/user', userRoutes);
app.use('/OTS/menu', menuRoutes);
app.use('/OTS/order', orderRoutes);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
  });
});
