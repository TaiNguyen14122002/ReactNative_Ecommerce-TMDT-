const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  ItemName: {
    type: String,
    required: true,
  },
  Category: [
    {
      CategoryName: {
        type: String,
        required: true,
      },
    },
  ],
  Price: {
    type: Number,
    required: true,
  },
});

const MenuItems = mongoose.model('MenuItems', userSchema);

module.exports = MenuItems;
