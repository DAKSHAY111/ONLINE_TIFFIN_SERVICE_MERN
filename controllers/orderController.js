const catchAsync = require('./../utils/catchAsync');
const Order = require('./../models/orderModel');
const AppError = require('./../utils/appError');
const Razorpay = require('razorpay');
const crypto = require('crypto');

exports.placeOrder = catchAsync(async (req, res, next) => {
  console.log('************************************');
  console.log(req.body);
  console.log('************************************');

  req.body.orderBy = req.user._id;
  const placedOrder = await Order.create(req.body);

  const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
  console.log(req.body.totalPrice + req.body.deliveryCharge);
  const options = {
    amount: parseInt(req.body.totalPrice + req.body.deliveryCharge) * 100,
    currency: 'INR',
    receipt: crypto.randomBytes(10).toString('hex'),
  };

  instance.orders.create(options, (error, order) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ message: 'Something Went Wrong!' });
    }

    res.status(200).json({ data: order });
  });
});

exports.verifyOrder = catchAsync(async (req, res, next) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
  const sign = razorpay_order_id + '|' + razorpay_payment_id;
  const expectedSign = crypto
    .createHmac('sha256', process.env.KEY_SECRET)
    .update(sign.toString())
    .digest('hex');

  if (razorpay_signature === expectedSign) {
    return res.status(200).json({ message: 'Payment verified successfully' });
  } else {
    return res.status(400).json({ message: 'Invalid signature sent!' });
  }
});

exports.myOrders = catchAsync(async (req, res, next) => {
  console.log(req.user._id);
  const orders = await Order.find({ orderBy: req.user._id }).sort({
    placedAt: -1,
  });

  res.status(201).json({
    status: 'success',
    totalOrder: orders.length,
    data: {
      orders,
    },
  });
});

exports.allOrders = catchAsync(async (req, res, next) => {
  console.log(req.user._id);
  const orders = await Order.find({}).populate({
    path: 'orderBy',
    select: ['name', 'email'],
  });

  res.status(201).json({
    status: 'success',
    totalOrder: orders.length,
    data: {
      orders,
    },
  });
});

exports.filterOrder = catchAsync(async (req, res, next) => {
  console.log(req.body);
  // const orders = await Order.find({
  //   placedAt: { $gte: start, $lt: end },
  // });
});

// exports.payment = catchAsync(async (req, res, next) => {
//   const { totalPrize, orderId } = req.body;
//   const order = await Order.findById(orderId);
//   if (!order) {
//     return next(new AppError('No order found with this id', 404));
//   }

//   const options = {
//   amount: totalPrize * 100,
//   currency: 'INR',

//   receipt: orderId,
// };

// instance.order.create(options, async (err, payment) => {
//   if (err) {
//     return next(new AppError(err.message, 500));
//   }
//   order.paymentId = payment.id;
//   order.save();

// const payment = await instance.payments.create({
//   amount,
//   currency,
//   receipt: orderId,
// });
// order.paymentId = payment.id;
// order.save();
// res.status(201).json({
//   status: 'success',
//   data: {
//     payment,
//   },
// });
// });
