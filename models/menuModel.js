const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  mealType: {
    type: String,
    required: [true, 'mealType is required'],
    enum: ['breakfast', 'lunch', 'dinner'],
  },

  foodItems: [
    {
      ItemName: { type: String, required: true },
      ItemPrice: { type: Number, required: true },
      Quantity: { type: Number, required: true },
    },
  ],

  createdAt: { type: Date, default: Date.now },

  stock: { type: Number, required: true },

  totalPrice: { type: Number, default: 0 },
});

menuSchema.pre('save', async function (next) {
  this.totalPrice = this.foodItems.reduce((acc, cur) => {
    return acc + cur.ItemPrice * cur.Quantity;
  }, 0);
});

menuSchema.pre(/Update/, async function (next) {
  const foodItems = this.getUpdate().foodItems;
  totalPrice = foodItems.reduce((acc, cur) => {
    return acc + cur.ItemPrice * cur.Quantity;
  }, 0);
  this.update({}, { totalPrice: totalPrice }); //* get the foodItems from the update because this keyword is not pointin to the document
});

module.exports = mongoose.model('Menu', menuSchema);
