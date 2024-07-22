const catchAsyncError = require("../middlewares/catchAsyncError");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");

const newOrder = catchAsyncError(async (req, res) => {
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
  } = req.body;

  const order = await Order.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
    paidAt: Date.now(), // Corrected typo
    user: req.user.id, // Ensure this is set correctly
  });
  res.status(200).json({
    success: true,
    order,
  });
});

const getSingleOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (!order) {
    return next(new ErrorHandler(`Order not found ${req.params.id}`, 404));
  }
  res.status(200).json({
    success: true,
    order,
  });
});

const myOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id });
  res.status(200).json({
    success: true,
    orders,
  });
});

//admin Orders product._id

const orders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find({ "orderItems.users": req.user.id });

  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });
  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

//Admin UpdateOrders

/* const UpdateOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (order.orderStatus == "Delivered") {
    return next(new ErrorHandler("Order has already been delivered", 400));
  }

  try {
    // Update stock for each order item

    //map
    await Promise.all(
      order.orderItems.forEach(async (orderItem) => {
        await updateStock(orderItem.product, orderItem.quantity);
      })
    );

    // Update order status and deliveredAt timestamp
    order.orderStatus = req.body.orderStatus;
    order.deliveredAt = Date.now();
    await order.save();

    res.status(201).json({
      success: true,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

async function updateStock(productId, quantity) {
  const product = await Product.findById(productId);
  if (!product) {
    throw new Error("Order not found");
  }

  product.stock -= quantity; // Reduce stock
  await product.save({ validateBeforeSave: false });
} */

const UpdateOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ErrorHandler("Order not found", 404));
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("Order has already been delivered", 400));
  }

  try {
    // Update stock for each order item
    await Promise.all(
      order.orderItems.map(async (orderItem) => {
        await updateStock(orderItem.product, orderItem.quantity);
      })
    );

    // Update order status and deliveredAt timestamp
    order.orderStatus = req.body.orderStatus;
    if (req.body.orderStatus === "Delivered") {
      order.deliveredAt = Date.now();
    }
    await order.save();

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

async function updateStock(productId, quantity) {
  const product = await Product.findById(productId);
  if (!product) {
    throw new Error("Product not found");
  }

  product.stock -= quantity; // Reduce stock
  await product.save({ validateBeforeSave: false });
}

//Admin delete order
// Admin delete order
const deleteOrder = catchAsyncError(async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return next(new ErrorHandler(`Order not found ${req.params.id}`, 404));
    }

    // await order.remove(); // Corrected line
    await Order.deleteOne({ _id: req.params.id }); // Corrected line

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

module.exports = {
  newOrder,
  getSingleOrder,
  myOrders,
  orders,
  UpdateOrder,
  deleteOrder,
};
