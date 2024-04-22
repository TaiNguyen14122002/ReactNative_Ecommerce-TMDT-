const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  // id: String,
  // title: String,
  // category: String,
  // oldPrice: String,
  // price: String,
  // image: String,
  // carouselImages: String,
  // color: String,
  // ram: String,
  // size: String,
  ProductName:{
    type: String,
    required: true,
  },
  Category:[
    {
      CategoryName:{
        type: String,
        required: true,
      }
    }
  ],
  Image:{
    type: String,
    required: true,
  },
  Price:{
    type: String,
    required: true,
  }
});

const Product = mongoose.model('Product', userSchema);

module.exports = Product;
