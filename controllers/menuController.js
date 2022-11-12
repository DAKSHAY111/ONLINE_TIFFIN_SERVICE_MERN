const catchAsync = require('./../utils/catchAsync');
const Menu = require('./../models/menuModel');
const AppError = require('./../utils/appError');

exports.addMenu = catchAsync(async (req, res, next) => {
  const newMenu = await Menu.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      menu: newMenu,
    },
  });
});

exports.viewMenu = catchAsync(async (req, res, next) => {
  const menu = await Menu.find({
    $and: [
      { createdAt: { $lte: Date.now() } },
      { createdAt: { $gte: new Date().setHours(0, 0, 0, 0) } },
    ],
  });
  res.status(200).json({
    status: 'success',
    results: menu.length,
    data: {
      menu,
    },
  });
});

exports.viewMenuById = catchAsync(async (req, res, next) => {
  console.log(req.params.id);
  const menu = await Menu.findById(req.params.id);
  if (!menu) {
    return next(new AppError('Something is wrong', 404));
  }
  console.log('Menu Item ' + menu);
  res.status(200).json({
    status: 'success',
    data: {
      menu,
    },
  });
});

exports.updateMenu = catchAsync(async (req, res, next) => {
  const menu = await Menu.findOneAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!menu) {
    return next(new AppError('Something is wrong', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      menu,
    },
  });
});
