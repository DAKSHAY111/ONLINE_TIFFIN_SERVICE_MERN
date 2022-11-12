const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  mealType: {
    type: String,
    required: [true, 'mealType is required'],
    enum: ['breakfast', 'lunch', 'dinner'],
  },
  shippingAddress: {
    type: String,
    required: [true, 'shippingAddress is required'],
  },
  OrderedItems: [
    {
      ItemName: { type: String, required: true },
      ItemPrice: { type: Number, required: true },
      Quantity: { type: Number, required: true },
    },
  ],
  contactNumber: {
    type: String,
    required: [true, 'Contact Number is required'],
  },
  deliveryCharge: {
    type: Number,
    required: [true, 'Delivery Charge is required'],
    default: 20,
  },
  placedAt: {
    type: Date,
    default: Date.now,
  },
  totalPrice: { type: Number, default: 0 },
});

orderSchema.pre('save', async function (next) {
  totalPrice = this.OrderedItems.reduce((acc, cur) => {
    return acc + cur.ItemPrice * cur.Quantity;
  }, 0);

  this.totalPrice = totalPrice + this.deliveryCharge;
});

module.exports = mongoose.model('Order', orderSchema);
