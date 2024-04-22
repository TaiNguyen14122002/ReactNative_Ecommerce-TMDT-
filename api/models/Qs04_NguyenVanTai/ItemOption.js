const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  MenuItem: [
    {
      ItemName: {
        type: String,
        required: true,
      },
      Price: {
        type: Number,
        required: true,
      },
    },
  ],
  Options: [
    {
      OptionName: {
        type: String,
        required: true,
      },
      OptionPrice: {
        type: Number,
        required: true,
      },
    },
  ],
});

const ItemOption = mongoose.model('ItemOption', userSchema);

module.exports = ItemOption;
