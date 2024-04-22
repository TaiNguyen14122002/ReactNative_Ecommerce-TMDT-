const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  VoucherName:{
    type: String,
    required: true,
  },
  VoucherTime:{
    type: Date,
    required: true,
  },
  VoucherCode:{
    type: String,
    required: true,
  },
});

const Voucher = mongoose.model('Voucher', userSchema);

module.exports = Voucher;
