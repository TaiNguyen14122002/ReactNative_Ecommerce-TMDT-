const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  OptionName:{
    type: String,
    required: true,
  },
  OptionPrice:{
    type: Number,
    required: true,
  },
});

const Option = mongoose.model('Option', userSchema);

module.exports = Option;
