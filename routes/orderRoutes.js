const express = require('express');
const orderController = require('../controllers/orderController');
const authController = require('./../controllers/authController');

const router = express.Router();

router
  .route('/placeorder')
  .post(authController.protect, orderController.placeOrder);
router
  .route('/verify')
  .post(authController.protect, orderController.verifyOrder);
router.route('/myorder').get(authController.protect, orderController.myOrders);
router
  .route('/getAllOrders')
  .get(
    authController.protect,
    authController.isAdmin,
    orderController.allOrders
  );
router
  .route('/getFilterOrder')
  .post(authController.isAdmin, orderController.filterOrder);

module.exports = router;
