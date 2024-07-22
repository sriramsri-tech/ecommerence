const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");
const ApiFeatures = require("../utils/apiFeauture");

exports.getProducts = async (req, res, next) => {
  const resPerPage = 2;

  let buildQuery = () => {
    return new ApiFeatures(Product.find(), req.query).search().filter();
  };

  const filterProductsCount = await buildQuery().query.countDocuments({});
  const totalProductsCount = await Product.countDocuments({});
  let productsCount = totalProductsCount;

  if (filterProductsCount != totalProductsCount) {
    productsCount = filterProductsCount;
  }
  //give the result
  const data = await buildQuery().paginate(resPerPage).query; // Retrieve the products after applying all the API features
  res.status(200).json({
    success: true,
    count: productsCount,
    resPerPage,
    data,
  });
};

exports.newProduct = catchAsyncError(async (req, res, next) => {
  try {
    // Create a new product

    // Debugging logs
    console.log("Files:", req.files);
    console.log("Body:", req.body);

    let images = [];

    if (req.files.length > 0) {
      req.files.forEach((file) => {
        let url = `${process.env.BACKEND_URL}/uploads/product/${file.originalname}`;

        images.push({ image: url });
      });
    }
    req.body.images = images;
    req.body.user = req.user.id;
    req.body.users = req.user.id;
    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    // Handle validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      // Handle other errors
      res.status(500).json({
        success: false,
        error: "Server Error",
      });
    }
  }
});

exports.getSingleProducts = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "reviews.user",
      "name email"
    );
    if (!product) {
      return next(new ErrorHandler("Product no found", 400));
    }

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {}
};

exports.updateProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);

    //uploading images
    let images = [];
    // if images not cleared we existing images
    if (req.body.imagesCleared === "false") {
      images = product.images;
    }

    if (req.files.length > 0) {
      req.files.forEach((file) => {
        let url = `${process.env.BACKEND_URL}/uploads/product/${file.originalname}`;

        images.push({ image: url });
      });
    }
    req.body.images = images;

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      product: product,
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    await Product.deleteOne({ _id: req.params.id }); // Use deleteOne method
    res.status(200).json({
      success: true,
      message: "Product Deleted",
    });
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.createReview = catchAsyncError(async (req, res, next) => {
  // get the front end code
  const { productId, rating, comment } = req.body;
  //set the review
  const review = {
    user: req.user.id,
    rating,
    comment,
  };
  //find the existing review
  const product = await Product.findById(productId);
  const isReviewed = product.reviews.find((review) => {
    review.user.toString() == req.user.id.toString();
  });
  //find the existing user in field give exixting review
  if (isReviewed) {
    product.reviews.forEach((review) => {
      if (review.user.toString() == req.user.id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    //new user
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }
  //find the avaerge reviews
  product.rating =
    product.reviews.reduce((acc, review) => {
      return review.rating + acc;
    }, 0) / product.reviews.length;
  product.rating = isNaN(product.rating) ? 0 : product.rating;
  await product.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});
//get reviews
exports.getReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.id).populate(
    "reviews.user",
    "name email"
  );
  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});
//Delete reviews
exports.deleteReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  const reviews = product.reviews.filter((review) => {
    return review._id.toString() !== req.query.id.toString();
  });
  const numOfReviews = reviews.length;
  let ratings =
    reviews.reduce((acc, review) => {
      return review.rating + acc;
    }, 0) / reviews.length;
  ratings = isNaN(ratings) ? 0 : ratings;
  await Product.findByIdAndUpdate(req.query.productId, {
    reviews,
    numOfReviews,
    ratings,
  });
  res.status(200).json({
    success: true,
  });
});

//get admin products
exports.getAdminProducts = catchAsyncError(async (req, res, next) => {
  const products = await Product.find({ users: req.user.id });

  res.status(200).json({
    success: true,
    products,
    // output,
    // length,
  });
});
