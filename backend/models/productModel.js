const mongoose = require("mongoose");

// Define a schema for individual images
/*const imageSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
});*/

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter product Name"],
    trim: true,
    maxLength: [100, "Product name cannot exceed 100 characters"],
  },
  price: {
    type: Number,
    required: true,
    default: 0.0,
  },
  description: {
    type: String,
    required: [true, "Please enter product description"],
  },
  rating: {
    type: Number,
    default: 0,
  },
  images: [
    {
      image: {
        type: String,
        required: true,
      },
    },
  ], // Use the nested schema for the images array
  //mm
  users: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },

  category: {
    type: String,
    required: [true, "Please enter category"],
    enum: {
      values: [
        "Electronics",
        "MobilePhone",
        "Laptop",
        "Food",
        "Books",
        "Clothes",
        "Beauty",
        "Sports",
        "Outdoor",
        "Home",
      ],
      message: "Please enter correct category",
    },
  },
  seller: {
    type: String,
    required: [true, "Please enter Product seller"],
  },
  stock: {
    type: Number,
    required: [true, "Please enter product stock"],
    maxLength: [20, "Product stock cannot exceed 20"],
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
      rating: {
        type: Number,
        required: [true, "Please enter rating"],
      },
      comment: {
        type: String,
        required: [true, "Please enter comment"],
      },
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
