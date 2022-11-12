const express = require('express');
const menucontroller = require('./../controllers/menuController');
const authController = require('./../controllers/authController');

const router = express.Router();

router
  .route('/addMenu')
  .post(authController.protect, authController.isAdmin, menucontroller.addMenu);

router.route('/viewMenu').get(menucontroller.viewMenu);

router.route('/viewMenu/:id').get(menucontroller.viewMenuById);

router
  .route('/updateMenu/:id')
  .patch(
    authController.protect,
    authController.isAdmin,
    menucontroller.updateMenu
  );

module.exports = router;
