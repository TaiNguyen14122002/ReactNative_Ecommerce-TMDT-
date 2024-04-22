const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  CategoryName:{
    type: String,
    required: true,
  }
});

const Category = mongoose.model('Category', userSchema);

module.exports = Category;
